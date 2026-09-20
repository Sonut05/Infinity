import os
import pytest
from app import create_app
from app.extensions import db


@pytest.fixture(scope="session")
def app():
    """Create test application configured with the database."""
    os.environ["FLASK_ENV"] = "development"
    app = create_app("development")
    app.config["TESTING"] = True

    with app.app_context():
        yield app


@pytest.fixture(scope="function")
def client(app):
    """Test client fixture."""
    return app.test_client()


@pytest.fixture(scope="function")
def db_session(app):
    """Clean database session fixture for isolated testing."""
    with app.app_context():
        yield db.session
