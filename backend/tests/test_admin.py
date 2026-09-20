import os
import pytest
from app import create_app
from app.config import ProductionConfig, DevelopmentConfig
from app.models.admin_user import AdminUser
from app.models.enquiry import Enquiry
from app.routes.admin import FAILED_LOGIN_ATTEMPTS


@pytest.fixture(autouse=True)
def reset_rate_limits():
    """Clear failed login attempts dictionary before each test."""
    FAILED_LOGIN_ATTEMPTS.clear()
    yield
    FAILED_LOGIN_ATTEMPTS.clear()


@pytest.fixture
def sample_admin(db_session):
    """Ensure a test admin exists with known credentials."""
    email = "testadmin@infinityspacegroup.in"
    admin = AdminUser.query.filter_by(email=email).first()
    if not admin:
        admin = AdminUser(
            username="testadmin",
            email=email,
            is_active=True,
        )
        admin.set_password("SecureTestPassword123!")
        db_session.add(admin)
        db_session.commit()
    return admin


def get_csrf(client):
    """Helper to fetch an active session CSRF token."""
    res = client.get("/api/admin/csrf")
    assert res.status_code == 200
    return res.get_json()["csrf_token"]


@pytest.fixture
def auth_client(client, sample_admin):
    """Client with an authenticated admin session and valid CSRF token."""
    csrf_token = get_csrf(client)
    res = client.post(
        "/api/admin/login",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "email": sample_admin.email,
            "password": "SecureTestPassword123!",
        },
    )
    assert res.status_code == 200
    client.csrf_token = res.get_json().get("csrf_token") or get_csrf(client)
    return client


# 1. Create initial admin
def test_create_admin_model(db_session):
    test_email = "unique_admin@infinityspacegroup.in"
    existing = AdminUser.query.filter_by(email=test_email).first()
    if existing:
        db_session.delete(existing)
        db_session.commit()

    admin = AdminUser(username="unique_admin", email=test_email, is_active=True)
    admin.set_password("AdminPassWord2026!")
    db_session.add(admin)
    db_session.commit()

    saved = AdminUser.query.filter_by(email=test_email).first()
    assert saved is not None
    assert saved.username == "unique_admin"
    assert saved.password_hash != "AdminPassWord2026!"
    assert saved.check_password("AdminPassWord2026!") is True
    assert saved.check_password("WrongPass") is False


# 2. Successful login
def test_successful_login(client, sample_admin):
    csrf_token = get_csrf(client)
    response = client.post(
        "/api/admin/login",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "email": sample_admin.email,
            "password": "SecureTestPassword123!",
        },
    )
    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] is True
    assert data["admin"]["email"] == sample_admin.email
    assert data["admin"]["username"] == sample_admin.username
    assert "csrf_token" in data
    assert "password" not in data
    assert "password_hash" not in data


# 3. Invalid password
def test_invalid_password(client, sample_admin):
    csrf_token = get_csrf(client)
    response = client.post(
        "/api/admin/login",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "email": sample_admin.email,
            "password": "IncorrectPassword!",
        },
    )
    assert response.status_code == 401
    data = response.get_json()
    assert data["error"] == "Invalid email or password."


# 4. Unknown email
def test_unknown_email(client):
    csrf_token = get_csrf(client)
    response = client.post(
        "/api/admin/login",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "email": "nonexistent@infinityspacegroup.in",
            "password": "AnyPassword123!",
        },
    )
    assert response.status_code == 401
    data = response.get_json()
    assert data["error"] == "Invalid email or password."


# 5. Logout
def test_logout(client, sample_admin):
    # Log in first
    csrf_token = get_csrf(client)
    login_resp = client.post(
        "/api/admin/login",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "email": sample_admin.email,
            "password": "SecureTestPassword123!",
        },
    )
    new_csrf = login_resp.get_json()["csrf_token"]

    # Log out with CSRF token
    response = client.post(
        "/api/admin/logout",
        headers={"X-CSRF-Token": new_csrf},
    )
    assert response.status_code == 200
    assert response.get_json()["success"] is True

    # Check subsequent protected call is unauthorized
    me_resp = client.get("/api/admin/me")
    assert me_resp.status_code == 401


# 6. /api/admin/me unauthenticated
def test_me_unauthenticated(client):
    response = client.get("/api/admin/me")
    assert response.status_code == 401
    assert response.get_json()["authenticated"] is False


# 7. /api/admin/me authenticated
def test_me_authenticated(auth_client, sample_admin):
    response = auth_client.get("/api/admin/me")
    assert response.status_code == 200
    data = response.get_json()
    assert data["authenticated"] is True
    assert data["admin"]["email"] == sample_admin.email
    assert "csrf_token" in data
    assert "password_hash" not in data["admin"]


# 8. Admin enquiry list unauthorized
def test_enquiry_list_unauthorized(client):
    response = client.get("/api/admin/enquiries")
    assert response.status_code == 401


# 9. Admin enquiry list authorized
def test_enquiry_list_authorized(auth_client):
    response = auth_client.get("/api/admin/enquiries")
    assert response.status_code == 200
    data = response.get_json()
    assert "items" in data
    assert "page" in data
    assert "limit" in data
    assert "total" in data
    assert isinstance(data["items"], list)


# 10. Pagination
def test_enquiry_pagination(auth_client):
    response = auth_client.get("/api/admin/enquiries?page=1&limit=2")
    assert response.status_code == 200
    data = response.get_json()
    assert data["page"] == 1
    assert data["limit"] == 2
    assert len(data["items"]) <= 2


# 11. Search
def test_enquiry_search(auth_client, db_session):
    # Ensure a known record exists
    test_enquiry = Enquiry(
        name="UniqueSearchName",
        phone="9876543210",
        email="uniquesearch@example.com",
        service="Planning",
        project_type="Residential",
        project_location="Ranchi",
        budget="INR 25L - 50L",
        message="Special search test project message.",
    )
    db_session.add(test_enquiry)
    db_session.commit()

    response = auth_client.get("/api/admin/enquiries?search=UniqueSearchName")
    assert response.status_code == 200
    data = response.get_json()
    assert any(item["name"] == "UniqueSearchName" for item in data["items"])


# 12. Status filter
def test_enquiry_status_filter(auth_client):
    response = auth_client.get("/api/admin/enquiries?status=new")
    assert response.status_code == 200
    data = response.get_json()
    for item in data["items"]:
        assert item["status"] == "new"


# 13. Service filter
def test_enquiry_service_filter(auth_client):
    response = auth_client.get("/api/admin/enquiries?service=Planning")
    assert response.status_code == 200
    data = response.get_json()
    for item in data["items"]:
        assert item["service"] == "Planning"


# 14. Invalid status filter
def test_invalid_status_filter(auth_client):
    response = auth_client.get("/api/admin/enquiries?status=invalid_status")
    assert response.status_code == 400
    assert "Invalid status filter" in response.get_json()["error"]


# 15. Enquiry detail
def test_enquiry_detail(auth_client, db_session):
    test_enquiry = Enquiry(
        name="Detail Test User",
        phone="9876543210",
        email="detail@example.com",
        service="Renovation",
        project_type="Commercial",
        project_location="Kanke Road, Ranchi",
        budget="INR 15L - 25L",
        message="Detail test message.",
    )
    db_session.add(test_enquiry)
    db_session.commit()

    response = auth_client.get(f"/api/admin/enquiries/{test_enquiry.id}")
    assert response.status_code == 200
    data = response.get_json()
    assert data["success"] is True
    assert data["enquiry"]["id"] == test_enquiry.id
    assert data["enquiry"]["name"] == "Detail Test User"
    assert data["enquiry"]["reference"] == f"ISG-{test_enquiry.id}"


# 16. Missing enquiry
def test_missing_enquiry(auth_client):
    response = auth_client.get("/api/admin/enquiries/9999999")
    assert response.status_code == 404
    assert response.get_json()["error"] == "Enquiry not found."


# 17. Status update
def test_status_update(auth_client, db_session):
    test_enquiry = Enquiry(
        name="Status Change User",
        phone="9876543210",
        email="statuschange@example.com",
        service="Interior Designing",
        project_type="Residential",
        project_location="Ranchi",
        budget="INR 10L - 15L",
        message="Status change message.",
        status="new",
    )
    db_session.add(test_enquiry)
    db_session.commit()

    # Update to contacted with CSRF token
    patch_resp = auth_client.patch(
        f"/api/admin/enquiries/{test_enquiry.id}",
        headers={"X-CSRF-Token": auth_client.csrf_token},
        json={"status": "contacted"},
    )
    assert patch_resp.status_code == 200
    data = patch_resp.get_json()
    assert data["success"] is True
    assert data["enquiry"]["status"] == "contacted"

    # Verify persisted in database
    db_session.refresh(test_enquiry)
    assert test_enquiry.status == "contacted"


# 18. Invalid status update
def test_invalid_status_update(auth_client, db_session):
    test_enquiry = Enquiry(
        name="Invalid Status User",
        phone="9876543210",
        email="invalidstatus@example.com",
        service="Landscaping",
        project_type="Residential",
        project_location="Ranchi",
        budget="INR 5L - 10L",
        message="Invalid status update test.",
    )
    db_session.add(test_enquiry)
    db_session.commit()

    response = auth_client.patch(
        f"/api/admin/enquiries/{test_enquiry.id}",
        headers={"X-CSRF-Token": auth_client.csrf_token},
        json={"status": "archived_deleted"},
    )
    assert response.status_code == 400
    assert "Invalid status" in response.get_json()["error"]


# 19. Dashboard summary
def test_dashboard_summary(auth_client):
    response = auth_client.get("/api/admin/dashboard")
    assert response.status_code == 200
    data = response.get_json()
    assert "total" in data
    assert "new" in data
    assert "contacted" in data
    assert "in_progress" in data
    assert "closed" in data
    assert data["total"] == (
        data["new"] + data["contacted"] + data["in_progress"] + data["closed"]
    )


# 20. Session expiration/auth failure
def test_session_auth_failure(client, sample_admin):
    # Log in
    csrf_token = get_csrf(client)
    client.post(
        "/api/admin/login",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "email": sample_admin.email,
            "password": "SecureTestPassword123!",
        },
    )

    # Manually clear session cookie to simulate session expiration
    with client.session_transaction() as sess:
        sess.clear()

    # Access protected route
    response = client.get("/api/admin/enquiries")
    assert response.status_code == 401
    assert response.get_json()["authenticated"] is False


# 21. Rate limiting on failed login attempts
def test_login_rate_limiting(client, sample_admin):
    csrf_token = get_csrf(client)
    for _ in range(5):
        client.post(
            "/api/admin/login",
            headers={"X-CSRF-Token": csrf_token},
            json={
                "email": sample_admin.email,
                "password": "WrongPassword!",
            },
        )

    # 6th attempt should return 429
    blocked_resp = client.post(
        "/api/admin/login",
        headers={"X-CSRF-Token": csrf_token},
        json={
            "email": sample_admin.email,
            "password": "WrongPassword!",
        },
    )
    assert blocked_resp.status_code == 429
    assert "Too many failed login attempts" in blocked_resp.get_json()["error"]


# ==============================================================================
# SECURITY HARDENING SPECIFIC TESTS (Requirements 14-26)
# ==============================================================================

# 22. State-changing admin request without CSRF token -> rejected (403)
def test_state_changing_request_without_csrf_rejected(auth_client, db_session):
    enquiry = Enquiry(
        name="CSRF Missing User",
        phone="9876543210",
        email="csrfmissing@example.com",
        service="Planning",
        project_type="Residential",
        project_location="Ranchi",
        message="CSRF test without token.",
    )
    db_session.add(enquiry)
    db_session.commit()

    # Attempt PATCH without X-CSRF-Token header
    response = auth_client.patch(
        f"/api/admin/enquiries/{enquiry.id}",
        json={"status": "contacted"},
    )
    assert response.status_code == 403
    data = response.get_json()
    assert "CSRF validation failed" in data.get("error", "")


# 23. State-changing admin request with invalid CSRF token -> rejected (403)
def test_state_changing_request_with_invalid_csrf_rejected(auth_client, db_session):
    enquiry = Enquiry(
        name="CSRF Invalid User",
        phone="9876543210",
        email="csrfinvalid@example.com",
        service="Planning",
        project_type="Residential",
        project_location="Ranchi",
        message="CSRF test with invalid token.",
    )
    db_session.add(enquiry)
    db_session.commit()

    # Attempt PATCH with fraudulent token
    response = auth_client.patch(
        f"/api/admin/enquiries/{enquiry.id}",
        headers={"X-CSRF-Token": "bogus_counterfeit_csrf_token_abc123"},
        json={"status": "contacted"},
    )
    assert response.status_code == 403
    data = response.get_json()
    assert "CSRF validation failed" in data.get("error", "")


# 24. Valid CSRF-protected admin request -> succeeds
def test_valid_csrf_protected_admin_request_succeeds(auth_client, db_session):
    enquiry = Enquiry(
        name="CSRF Valid User",
        phone="9876543210",
        email="csrfvalid@example.com",
        service="Planning",
        project_type="Residential",
        project_location="Ranchi",
        message="CSRF test with valid token.",
        status="new",
    )
    db_session.add(enquiry)
    db_session.commit()

    # Send valid PATCH with proper CSRF token
    response = auth_client.patch(
        f"/api/admin/enquiries/{enquiry.id}",
        headers={"X-CSRF-Token": auth_client.csrf_token},
        json={"status": "contacted"},
    )
    assert response.status_code == 200
    assert response.get_json()["success"] is True
    assert response.get_json()["enquiry"]["status"] == "contacted"


# 25. Production configuration has DEBUG=False
def test_production_config_debug_is_false():
    assert ProductionConfig.DEBUG is False


# 26. Production session cookie has Secure=True
def test_production_session_cookie_is_secure():
    assert ProductionConfig.SESSION_COOKIE_SECURE is True


# 27. Session cookie has HttpOnly=True
def test_session_cookie_httponly(app):
    assert app.config["SESSION_COOKIE_HTTPONLY"] is True


# 28. Session cookie has SameSite=Lax
def test_session_cookie_samesite(app):
    assert app.config["SESSION_COOKIE_SAMESITE"] == "Lax"


# 29. Session cookie name is isg_admin_session
def test_session_cookie_name(app):
    assert app.config["SESSION_COOKIE_NAME"] == "isg_admin_session"


# 30. CORS does not allow wildcard origin with credentials
def test_cors_no_wildcard_with_credentials(app):
    origins = app.config.get("FRONTEND_ORIGIN", [])
    assert "*" not in origins
    for origin in origins:
        assert origin != "*"


# 31. Missing production SECRET_KEY fails safely
def test_missing_production_secret_key_fails_safely(monkeypatch):
    monkeypatch.delenv("SECRET_KEY", raising=False)
    # create_app("production") must raise a clear RuntimeError
    with pytest.raises(RuntimeError, match="SECRET_KEY"):
        create_app("production")


# 32. Valid production SECRET_KEY initializes app
def test_valid_production_secret_key_initializes(monkeypatch):
    monkeypatch.setenv("SECRET_KEY", "super-secret-prod-token-2026-very-secure")
    prod_app = create_app("production")
    assert prod_app.config["DEBUG"] is False
    assert prod_app.config["SESSION_COOKIE_SECURE"] is True
    assert prod_app.config["SECRET_KEY"] == "super-secret-prod-token-2026-very-secure"


# 33. Development configuration still works with HTTP localhost
def test_development_config_works_for_localhost():
    assert DevelopmentConfig.DEBUG is True
    assert DevelopmentConfig.SESSION_COOKIE_SECURE is False


# 34. Security headers present in responses
def test_security_headers_present(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.headers.get("X-Content-Type-Options") == "nosniff"
    assert response.headers.get("X-Frame-Options") == "DENY"
    assert response.headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
    assert "geolocation=()" in response.headers.get("Permissions-Policy", "")
