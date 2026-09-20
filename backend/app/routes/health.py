from flask import Blueprint, jsonify
from sqlalchemy import text
from ..extensions import db

health_bp = Blueprint("health", __name__)


@health_bp.route("/", methods=["GET"])
def root_index():
    """Root index route confirming API availability."""
    return (
        jsonify(
            {
                "service": "Infinity Space Group API",
                "status": "online",
                "endpoints": {
                    "health": "/api/health",
                    "ready": "/api/ready",
                },
            }
        ),
        200,
    )


@health_bp.route("/api/health", methods=["GET"])
def health_check():
    """Liveness probe confirming Flask is running."""
    return jsonify({"status": "ok"}), 200


@health_bp.route("/api/ready", methods=["GET"])
def readiness_check():
    """Readiness probe checking Flask application and PostgreSQL database connectivity."""
    try:
        # Verify database connection without exposing internal details
        db.session.execute(text("SELECT 1"))
        return jsonify({"status": "ready", "database": "connected"}), 200
    except Exception:
        return (
            jsonify(
                {
                    "status": "unavailable",
                    "database": "disconnected",
                    "error": "Database connection failed",
                }
            ),
            503,
        )
