import re
from datetime import datetime, timezone, timedelta
from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.enquiry import Enquiry

enquiries_bp = Blueprint("enquiries", __name__)

# The 9 strictly verified services of Infinity Space Group
VERIFIED_SERVICES = {
    "Planning",
    "Interior Designing",
    "2D & 3D Civil Work",
    "Structural Designing",
    "Estimating & Costing",
    "Landscaping",
    "Renovation",
    "Map Approval",
    "3D Animation / 3D Visualization",
}

# Supported project types
VALID_PROJECT_TYPES = {
    "Residential",
    "Commercial",
    "Interior",
    "Renovation",
    "Landscape",
    "Other",
}

# Regex validation patterns
EMAIL_REGEX = re.compile(
    r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
)
# Normal Indian phone format: permits optional +91, spaces, dashes, parentheses, 7-15 digits
PHONE_CLEAN_REGEX = re.compile(r"[^\d+]")


def validate_phone(phone_str: str) -> bool:
    """Validates realistic contact number format."""
    clean = PHONE_CLEAN_REGEX.sub("", phone_str)
    digits_only = re.sub(r"\D", "", clean)
    return 7 <= len(digits_only) <= 15


@enquiries_bp.route("/api/enquiries", methods=["POST"])
def create_enquiry():
    """Endpoint for prospective clients to submit architectural/engineering enquiries."""
    if not request.is_json:
        return (
            jsonify(
                {
                    "error": "Malformed request",
                    "message": "Request payload must be valid JSON.",
                }
            ),
            400,
        )

    data = request.get_json()
    if not isinstance(data, dict):
        return (
            jsonify(
                {
                    "error": "Malformed request",
                    "message": "JSON body must be an object.",
                }
            ),
            400,
        )

    fields_errors = {}

    # 1. Name validation
    name = (data.get("name") or "").strip()
    if not name:
        fields_errors["name"] = "Full name is required."
    elif len(name) < 2 or len(name) > 100:
        fields_errors["name"] = "Full name must be between 2 and 100 characters."

    # 2. Phone validation
    phone = (data.get("phone") or "").strip()
    if not phone:
        fields_errors["phone"] = "Phone number is required."
    elif not validate_phone(phone):
        fields_errors["phone"] = "Please enter a valid contact number."

    # 3. Email validation
    email = (data.get("email") or "").strip()
    if not email:
        fields_errors["email"] = "Email address is required."
    elif len(email) > 120 or not EMAIL_REGEX.match(email):
        fields_errors["email"] = "Please enter a valid email address."

    # 4. Service validation (must be one of the 9 verified services)
    service = (data.get("service") or "").strip()
    if not service:
        fields_errors["service"] = "Service of interest is required."
    elif service not in VERIFIED_SERVICES:
        fields_errors["service"] = (
            f"Invalid service selected. Must be one of the 9 verified services."
        )

    # 5. Project Type validation
    project_type = (data.get("project_type") or "").strip()
    if not project_type:
        fields_errors["project_type"] = "Project classification is required."
    elif project_type not in VALID_PROJECT_TYPES:
        fields_errors["project_type"] = (
            f"Invalid project type. Options: {', '.join(sorted(VALID_PROJECT_TYPES))}."
        )

    # 6. Project Location validation
    project_location = (data.get("project_location") or "").strip()
    if not project_location:
        fields_errors["project_location"] = "Project location is required."
    elif len(project_location) < 2 or len(project_location) > 150:
        fields_errors["project_location"] = "Location must be between 2 and 150 characters."

    # 7. Message validation
    message = (data.get("message") or "").strip()
    if not message:
        fields_errors["message"] = "Requirements message is required."
    elif len(message) < 5 or len(message) > 3000:
        fields_errors["message"] = (
            "Requirements message must be between 5 and 3000 characters."
        )

    # 8. Budget (optional)
    budget = data.get("budget")
    if budget is not None:
        budget = str(budget).strip()
        if len(budget) > 80:
            budget = budget[:80]
    else:
        budget = None

    if fields_errors:
        return (
            jsonify(
                {
                    "error": "Validation failed",
                    "fields": fields_errors,
                }
            ),
            422,
        )

    # Duplicate submission protection:
    # Check if identical enquiry (same email, service, message) was received in the last 15 seconds
    cutoff_time = datetime.now(timezone.utc) - timedelta(seconds=15)
    recent_duplicate = (
        Enquiry.query.filter(
            Enquiry.email == email,
            Enquiry.service == service,
            Enquiry.message == message,
            Enquiry.created_at >= cutoff_time,
        ).first()
    )

    if recent_duplicate:
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Your enquiry has been received.",
                    "enquiry": {
                        "id": recent_duplicate.id,
                        "status": recent_duplicate.status,
                    },
                }
            ),
            201,
        )

    try:
        new_enquiry = Enquiry(
            name=name,
            phone=phone,
            email=email,
            service=service,
            project_type=project_type,
            project_location=project_location,
            budget=budget,
            message=message,
            status="new",
        )
        db.session.add(new_enquiry)
        db.session.commit()

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Your enquiry has been received.",
                    "enquiry": {
                        "id": new_enquiry.id,
                        "status": new_enquiry.status,
                    },
                }
            ),
            201,
        )
    except Exception:
        db.session.rollback()
        return (
            jsonify({"error": "Unable to process the enquiry."}),
            500,
        )
