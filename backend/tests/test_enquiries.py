from app.extensions import db
from app.models.enquiry import Enquiry

VALID_PAYLOAD = {
    "name": "Arjun Verma",
    "phone": "+91 98765 43210",
    "email": "arjun.verma@example.com",
    "service": "Planning",
    "project_type": "Residential",
    "project_location": "Morabadi, Ranchi",
    "budget": "25 Lakhs - 50 Lakhs",
    "message": "We have a 4500 sq ft plot in Morabadi requiring architectural planning and municipal sanction drawings.",
}


def test_create_valid_enquiry_and_persistence(client, app):
    """Verify POST /api/enquiries creates and persists enquiry in PostgreSQL."""
    response = client.post("/api/enquiries", json=VALID_PAYLOAD)
    assert response.status_code == 201

    data = response.get_json()
    assert data.get("success") is True
    assert "Your enquiry has been received." in data.get("message", "")
    enquiry_data = data.get("enquiry", {})
    assert "id" in enquiry_data
    assert enquiry_data.get("status") == "new"

    # Verify persistence in database
    with app.app_context():
        persisted = db.session.get(Enquiry, enquiry_data["id"])
        assert persisted is not None
        assert persisted.name == VALID_PAYLOAD["name"]
        assert persisted.email == VALID_PAYLOAD["email"]
        assert persisted.service == VALID_PAYLOAD["service"]
        assert persisted.project_location == VALID_PAYLOAD["project_location"]
        assert persisted.status == "new"
        assert persisted.created_at is not None


def test_missing_name(client):
    """Verify missing name is rejected with validation error."""
    payload = {**VALID_PAYLOAD, "name": ""}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "name" in data.get("fields", {})


def test_missing_email(client):
    """Verify missing email is rejected with validation error."""
    payload = {**VALID_PAYLOAD, "email": ""}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "email" in data.get("fields", {})


def test_invalid_email(client):
    """Verify invalid email format is rejected."""
    payload = {**VALID_PAYLOAD, "email": "not-an-email"}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "email" in data.get("fields", {})


def test_missing_message(client):
    """Verify missing message is rejected."""
    payload = {**VALID_PAYLOAD, "message": ""}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "message" in data.get("fields", {})


def test_invalid_service(client):
    """Verify unverified service is rejected."""
    payload = {**VALID_PAYLOAD, "service": "Unverified Blockchain Service"}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "service" in data.get("fields", {})


def test_invalid_project_type(client):
    """Verify invalid project classification is rejected."""
    payload = {**VALID_PAYLOAD, "project_type": "Spaceport"}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "project_type" in data.get("fields", {})


def test_missing_location(client):
    """Verify missing location is rejected."""
    payload = {**VALID_PAYLOAD, "project_location": ""}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "project_location" in data.get("fields", {})


def test_oversized_input(client):
    """Verify input exceeding maximum character limit is rejected."""
    payload = {**VALID_PAYLOAD, "message": "A" * 3500}
    response = client.post("/api/enquiries", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "message" in data.get("fields", {})


def test_malformed_json(client):
    """Verify non-JSON request is cleanly rejected with 400."""
    response = client.post(
        "/api/enquiries",
        data="this is not json",
        content_type="text/plain",
    )
    assert response.status_code == 400


def test_duplicate_submission_handling(client, app):
    """Verify duplicate submission within short timeframe is handled safely."""
    payload = {
        "name": "Priya Sharma",
        "phone": "+91 91234 56789",
        "email": "priya.sharma@example.com",
        "service": "Interior Designing",
        "project_type": "Interior",
        "project_location": "Kanke Road, Ranchi",
        "message": "Interior turnkey design requirements for 3BHK flat.",
    }

    resp1 = client.post("/api/enquiries", json=payload)
    assert resp1.status_code == 201
    id1 = resp1.get_json()["enquiry"]["id"]

    # Immediate second click
    resp2 = client.post("/api/enquiries", json=payload)
    assert resp2.status_code == 201
    id2 = resp2.get_json()["enquiry"]["id"]

    # Deduped to same id
    assert id1 == id2
