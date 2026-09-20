import os
from flask import Flask, jsonify, request
from .config import CONFIG_MAP
from .extensions import db, migrate, cors
from .routes.health import health_bp
from .routes.enquiries import enquiries_bp
from .routes.admin import admin_bp
from .cli import register_cli_commands
from .models import Enquiry, AdminUser  # Ensure models are imported for migrations


def create_app(config_name=None):
    """Application factory for Infinity Space Group backend."""
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

    app = Flask(__name__)
    config_class = CONFIG_MAP.get(config_name, CONFIG_MAP["default"])

    # Enforce mandatory SECRET_KEY in production without insecure fallback
    if config_name == "production" or config_class == CONFIG_MAP.get("production"):
        prod_secret = os.getenv("SECRET_KEY")
        if not prod_secret or prod_secret == "dev-insecure-secret-key-change-in-production":
            raise RuntimeError("SECRET_KEY environment variable must be set in production.")
        config_class.SECRET_KEY = prod_secret

    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Configure CORS strictly
    frontend_origins = app.config.get("FRONTEND_ORIGIN", ["http://localhost:5173"])
    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": frontend_origins,
                "methods": ["GET", "POST", "PATCH", "OPTIONS"],
                "allow_headers": [
                    "Content-Type",
                    "Authorization",
                    "X-Requested-With",
                    "X-CSRF-Token",
                    "X-CSRFToken",
                ],
                "supports_credentials": True,
            }
        },
        supports_credentials=True,
    )

    # Register blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(enquiries_bp)
    app.register_blueprint(admin_bp)

    # Register CLI commands
    register_cli_commands(app)

    # Security headers
    @app.after_request
    def set_security_headers(response):
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), camera=(), microphone=()"

        # HSTS only on production deployments with HTTPS enabled (not in local dev or testing)
        if not app.debug and not app.testing and (request.is_secure or app.config.get("SESSION_COOKIE_SECURE")):
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"

        return response

    # Global JSON error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return (
            jsonify({"error": "Bad request", "message": str(error.description)}),
            400,
        )

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({"error": "Method not allowed"}), 405

    @app.errorhandler(413)
    def payload_too_large(error):
        return jsonify({"error": "Payload too large. Maximum size is 1MB."}), 413

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({"error": "Internal server error"}), 500

    return app
