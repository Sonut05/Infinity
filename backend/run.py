import os
from app import create_app, db

app = create_app(os.getenv("FLASK_ENV", "development"))

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = app.config.get("DEBUG", False)
    with app.app_context():
        try:
            db.create_all()
        except Exception as exc:
            app.logger.warning(f"Database auto-creation skipped: {exc}")
    app.run(host="0.0.0.0", port=port, debug=debug)
