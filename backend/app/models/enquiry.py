from datetime import datetime, timezone
from sqlalchemy import CheckConstraint
from ..extensions import db


class Enquiry(db.Model):
    """Enquiry model for client consultations."""

    __tablename__ = "enquiries"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    service = db.Column(db.String(80), nullable=False)
    project_type = db.Column(db.String(50), nullable=False)
    project_location = db.Column(db.String(150), nullable=False)
    budget = db.Column(db.String(80), nullable=True)
    message = db.Column(db.Text, nullable=False)

    status = db.Column(
        db.String(20),
        nullable=False,
        default="new",
        index=True,
    )

    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        index=True,
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    __table_args__ = (
        CheckConstraint(
            "status IN ('new', 'contacted', 'in_progress', 'closed')",
            name="valid_enquiry_status_check",
        ),
    )

    def __init__(
        self,
        name: str | None = None,
        phone: str | None = None,
        email: str | None = None,
        service: str | None = None,
        project_type: str | None = None,
        project_location: str | None = None,
        budget: str | None = None,
        message: str | None = None,
        status: str = "new",
        **kwargs,
    ):
        super().__init__()
        self.name = name
        self.phone = phone
        self.email = email
        self.service = service
        self.project_type = project_type
        self.project_location = project_location
        self.budget = budget
        self.message = message
        self.status = status
        for key, value in kwargs.items():
            setattr(self, key, value)

    def to_dict(self):
        return {
            "id": self.id,
            "reference": f"ISG-{self.id}",
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "service": self.service,
            "project_type": self.project_type,
            "project_location": self.project_location,
            "budget": self.budget,
            "message": self.message,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

    def __repr__(self):
        return f"<Enquiry {self.id}: {self.name} - {self.service} ({self.status})>"
