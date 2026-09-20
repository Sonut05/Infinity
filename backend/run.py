import os
from app import create_app, db
from flask_migrate import upgrade

app = create_app(os.getenv("FLASK_ENV", "development"))

# Auto-apply database migrations and provision initial admin user on startup
with app.app_context():
    try:
        upgrade()
        app.logger.info("Database migrations applied successfully.")
    except Exception as exc:
        app.logger.warning(f"Database migration note: {exc}")

    try:
        from app.models.admin_user import AdminUser
        admin = AdminUser.query.filter_by(email="admin@infinityspacegroup.in").first()
        if not admin:
            admin = AdminUser(
                username="admin",
                email="admin@infinityspacegroup.in",
                is_active=True,
            )
            admin_pass = os.getenv("ADMIN_INIT_PASSWORD", "AdminSecure2026!")
            admin.set_password(admin_pass)
            db.session.add(admin)
            db.session.commit()
            app.logger.info("Initial admin user verified/created successfully.")
    except Exception as exc:
        app.logger.warning(f"Initial admin verification note: {exc}")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = app.config.get("DEBUG", False)
    app.run(host="0.0.0.0", port=port, debug=debug)
