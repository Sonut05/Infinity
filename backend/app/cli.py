import click
from .extensions import db
from .models.admin_user import AdminUser


def register_cli_commands(app):
    """Register custom CLI commands with the Flask application."""

    @app.cli.command("create-admin")
    @click.option("--username", prompt="Admin username", help="The username for the admin user.")
    @click.option("--email", prompt="Admin email", help="The email for the admin user.")
    @click.option(
        "--password",
        prompt=True,
        hide_input=True,
        confirmation_prompt=True,
        help="The password for the admin user (min 8 chars).",
    )
    def create_admin_cmd(username, email, password):
        """Create a new administrator account securely."""
        username = username.strip()
        email = email.strip().lower()

        if len(password) < 8:
            click.secho("Error: Password must be at least 8 characters long.", fg="red")
            return

        existing = AdminUser.query.filter(
            (AdminUser.email == email) | (AdminUser.username == username)
        ).first()

        if existing:
            click.secho(
                f"Error: An admin user with username '{username}' or email '{email}' already exists.",
                fg="red",
            )
            return

        try:
            admin = AdminUser(username=username, email=email, is_active=True)
            admin.set_password(password)
            db.session.add(admin)
            db.session.commit()
            click.secho(
                f"Success: Admin user '{username}' ({email}) created successfully (ID: {admin.id}).",
                fg="green",
            )
        except Exception as exc:
            db.session.rollback()
            click.secho(f"Error creating admin user: {exc}", fg="red")
