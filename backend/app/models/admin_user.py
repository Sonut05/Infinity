from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash
from ..extensions import db


class AdminUser(db.Model):
    """Admin user model for Infinity Space Group administrative management."""

    __tablename__ = "admin_users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    created_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    last_login_at = db.Column(db.DateTime(timezone=True), nullable=True)

    def __init__(
        self,
        username: str | None = None,
        email: str | None = None,
        password_hash: str | None = None,
        is_active: bool = True,
        **kwargs,
    ):
        super().__init__()
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.is_active = is_active
        for key, value in kwargs.items():
            setattr(self, key, value)

    def set_password(self, password: str) -> None:
        """Securely hash and store password using Werkzeug."""
        if not password or len(password) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """Verify candidate password against securely stored hash."""
        if not self.password_hash or not password:
            return False
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        """Safe dictionary representation omitting password hash."""
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "last_login_at": (
                self.last_login_at.isoformat() if self.last_login_at else None
            ),
        }

    def __repr__(self):
        return f"<AdminUser {self.id}: {self.username} ({self.email})>"
