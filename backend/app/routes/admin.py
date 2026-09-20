import time
import secrets
import hmac
from datetime import datetime, timezone
from functools import wraps
from flask import Blueprint, request, jsonify, session, g
from sqlalchemy import or_
from ..extensions import db
from ..models.admin_user import AdminUser
from ..models.enquiry import Enquiry
from .enquiries import VERIFIED_SERVICES, VALID_PROJECT_TYPES

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

# Valid enquiry statuses
VALID_STATUSES = {"new", "contacted", "in_progress", "closed"}

# In-memory sliding window rate limiting for admin login attempts
# Key: client identifier (IP or email) -> list of timestamp floats
FAILED_LOGIN_ATTEMPTS = {}
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_WINDOW_SECONDS = 900  # 15 minutes


def get_client_ip():
    """Extract client IP address from request headers."""
    if request.headers.get("X-Forwarded-For"):
        return request.headers.get("X-Forwarded-For").split(",")[0].strip()
    return request.remote_addr or "unknown"


def is_rate_limited(identifier: str) -> bool:
    """Check if identifier has exceeded failed login threshold."""
    now = time.time()
    attempts = FAILED_LOGIN_ATTEMPTS.get(identifier, [])
    # Keep only attempts within the sliding window
    valid_attempts = [t for t in attempts if now - t < LOCKOUT_WINDOW_SECONDS]
    FAILED_LOGIN_ATTEMPTS[identifier] = valid_attempts
    return len(valid_attempts) >= MAX_FAILED_ATTEMPTS


def record_failed_attempt(identifier: str):
    """Record a failed login attempt timestamp."""
    now = time.time()
    attempts = FAILED_LOGIN_ATTEMPTS.get(identifier, [])
    attempts.append(now)
    FAILED_LOGIN_ATTEMPTS[identifier] = attempts


def clear_failed_attempts(identifier: str):
    """Clear failed attempts on successful login."""
    if identifier in FAILED_LOGIN_ATTEMPTS:
        del FAILED_LOGIN_ATTEMPTS[identifier]


def get_or_create_csrf_token() -> str:
    """Retrieve existing session CSRF token or generate a fresh cryptographic token."""
    token = session.get("csrf_token")
    if not token:
        token = secrets.token_hex(32)
        session["csrf_token"] = token
    return token


def verify_csrf_token() -> bool:
    """Verify incoming CSRF token against active session token."""
    session_token = session.get("csrf_token")
    if not session_token:
        return False

    client_token = (
        request.headers.get("X-CSRF-Token")
        or request.headers.get("X-CSRFToken")
    )
    if not client_token and request.is_json:
        payload = request.get_json(silent=True) or {}
        client_token = payload.get("csrf_token")

    if not client_token:
        return False

    return hmac.compare_digest(str(session_token), str(client_token))


def csrf_protect(fn):
    """Decorator requiring valid CSRF token for state-changing requests."""

    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not verify_csrf_token():
            return (
                jsonify(
                    {
                        "error": "CSRF validation failed.",
                        "message": "Invalid or missing CSRF token.",
                    }
                ),
                403,
            )
        return fn(*args, **kwargs)

    return wrapper


def admin_required(fn):
    """Authentication decorator protecting admin API endpoints."""

    @wraps(fn)
    def wrapper(*args, **kwargs):
        admin_id = session.get("admin_id")
        if not admin_id:
            return (
                jsonify(
                    {
                        "authenticated": False,
                        "error": "Authentication required.",
                    }
                ),
                401,
            )

        admin = db.session.get(AdminUser, admin_id)
        if not admin or not admin.is_active:
            session.clear()
            return (
                jsonify(
                    {
                        "authenticated": False,
                        "error": "Authentication required or account deactivated.",
                    }
                ),
                401,
            )

        g.current_admin = admin
        return fn(*args, **kwargs)

    return wrapper


@admin_bp.route("/csrf", methods=["GET"])
def admin_csrf():
    """Retrieve or generate session CSRF token."""
    token = get_or_create_csrf_token()
    return jsonify({"csrf_token": token}), 200


@admin_bp.route("/login", methods=["POST"])
@csrf_protect
def admin_login():
    """Admin login endpoint with brute-force rate limiting and CSRF protection."""
    client_ip = get_client_ip()

    if is_rate_limited(client_ip):
        return (
            jsonify(
                {
                    "error": "Too many failed login attempts. Please try again later.",
                }
            ),
            429,
        )

    if not request.is_json:
        return (
            jsonify({"error": "Malformed request. JSON payload required."}),
            400,
        )

    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return (
            jsonify({"error": "Invalid email or password."}),
            401,
        )

    # Check email rate limit as well
    if is_rate_limited(email):
        return (
            jsonify(
                {
                    "error": "Too many failed login attempts. Please try again later.",
                }
            ),
            429,
        )

    admin = AdminUser.query.filter_by(email=email).first()

    if not admin or not admin.is_active or not admin.check_password(password):
        record_failed_attempt(client_ip)
        record_failed_attempt(email)
        return (
            jsonify({"error": "Invalid email or password."}),
            401,
        )

    # Authentication successful
    clear_failed_attempts(client_ip)
    clear_failed_attempts(email)

    session["admin_id"] = admin.id
    session.permanent = True
    admin.last_login_at = datetime.now(timezone.utc)

    # Regenerate CSRF token on login to prevent token fixation
    new_csrf_token = secrets.token_hex(32)
    session["csrf_token"] = new_csrf_token
    db.session.commit()

    return (
        jsonify(
            {
                "success": True,
                "csrf_token": new_csrf_token,
                "admin": {
                    "id": admin.id,
                    "username": admin.username,
                    "email": admin.email,
                },
            }
        ),
        200,
    )


@admin_bp.route("/logout", methods=["POST"])
@admin_required
@csrf_protect
def admin_logout():
    """Admin logout endpoint invalidating the current session."""
    session.clear()
    return jsonify({"success": True}), 200


@admin_bp.route("/me", methods=["GET"])
@admin_required
def admin_me():
    """Retrieve current authenticated admin information."""
    return (
        jsonify(
            {
                "authenticated": True,
                "csrf_token": get_or_create_csrf_token(),
                "admin": {
                    "id": g.current_admin.id,
                    "username": g.current_admin.username,
                    "email": g.current_admin.email,
                },
            }
        ),
        200,
    )


@admin_bp.route("/dashboard", methods=["GET"])
@admin_required
def admin_dashboard():
    """Summary counts for the administrative dashboard."""
    total = Enquiry.query.count()
    new_count = Enquiry.query.filter_by(status="new").count()
    contacted_count = Enquiry.query.filter_by(status="contacted").count()
    in_progress_count = Enquiry.query.filter_by(status="in_progress").count()
    closed_count = Enquiry.query.filter_by(status="closed").count()

    return (
        jsonify(
            {
                "total": total,
                "new": new_count,
                "contacted": contacted_count,
                "in_progress": in_progress_count,
                "closed": closed_count,
            }
        ),
        200,
    )


@admin_bp.route("/enquiries", methods=["GET"])
@admin_required
def list_enquiries():
    """Paginated, searchable, filterable list of client enquiries."""
    # Pagination
    try:
        page = max(1, int(request.args.get("page", 1)))
        limit = min(100, max(1, int(request.args.get("limit", 20))))
    except ValueError:
        return jsonify({"error": "Invalid pagination parameters."}), 400

    query = Enquiry.query

    # Status filter
    status_filter = request.args.get("status")
    if status_filter:
        status_filter = status_filter.strip().lower()
        if status_filter not in VALID_STATUSES:
            return (
                jsonify(
                    {
                        "error": f"Invalid status filter. Allowed: {', '.join(sorted(VALID_STATUSES))}"
                    }
                ),
                400,
            )
        query = query.filter(Enquiry.status == status_filter)

    # Service filter
    service_filter = request.args.get("service")
    if service_filter:
        service_filter = service_filter.strip()
        if service_filter not in VERIFIED_SERVICES:
            return (
                jsonify(
                    {
                        "error": "Invalid service filter. Must be one of the verified services."
                    }
                ),
                400,
            )
        query = query.filter(Enquiry.service == service_filter)

    # Search filter
    search_term = request.args.get("search")
    if search_term:
        search_term = search_term.strip()
        if len(search_term) > 0:
            like_pattern = f"%{search_term}%"
            query = query.filter(
                or_(
                    Enquiry.name.ilike(like_pattern),
                    Enquiry.email.ilike(like_pattern),
                    Enquiry.phone.ilike(like_pattern),
                    Enquiry.project_location.ilike(like_pattern),
                    Enquiry.service.ilike(like_pattern),
                    Enquiry.message.ilike(like_pattern),
                )
            )

    # Sorting
    sort_param = request.args.get("sort", "newest").strip().lower()
    if sort_param == "newest":
        query = query.order_by(Enquiry.created_at.desc(), Enquiry.id.desc())
    elif sort_param == "oldest":
        query = query.order_by(Enquiry.created_at.asc(), Enquiry.id.asc())
    else:
        return (
            jsonify({"error": "Invalid sort option. Allowed: newest, oldest"}),
            400,
        )

    pagination = query.paginate(page=page, per_page=limit, error_out=False)

    return (
        jsonify(
            {
                "items": [item.to_dict() for item in pagination.items],
                "page": pagination.page,
                "limit": pagination.per_page,
                "total": pagination.total,
                "total_pages": pagination.pages,
            }
        ),
        200,
    )


@admin_bp.route("/enquiries/<int:enquiry_id>", methods=["GET"])
@admin_required
def get_enquiry_detail(enquiry_id: int):
    """Retrieve detailed information for a single enquiry."""
    enquiry = db.session.get(Enquiry, enquiry_id)
    if not enquiry:
        return jsonify({"error": "Enquiry not found."}), 404

    return jsonify({"success": True, "enquiry": enquiry.to_dict()}), 200


@admin_bp.route("/enquiries/<int:enquiry_id>", methods=["PATCH"])
@admin_required
@csrf_protect
def update_enquiry_status(enquiry_id: int):
    """Update status of an enquiry."""
    if not request.is_json:
        return (
            jsonify({"error": "Malformed request. JSON payload required."}),
            400,
        )

    data = request.get_json() or {}
    new_status = (data.get("status") or "").strip().lower()

    if new_status not in VALID_STATUSES:
        return (
            jsonify(
                {
                    "error": f"Invalid status. Must be one of: {', '.join(sorted(VALID_STATUSES))}"
                }
            ),
            400,
        )

    enquiry = db.session.get(Enquiry, enquiry_id)
    if not enquiry:
        return jsonify({"error": "Enquiry not found."}), 404

    enquiry.status = new_status
    enquiry.updated_at = datetime.now(timezone.utc)
    db.session.commit()

    return jsonify({"success": True, "enquiry": enquiry.to_dict()}), 200
