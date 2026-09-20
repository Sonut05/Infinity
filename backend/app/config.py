import os
from datetime import timedelta
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Base application configuration."""

    # Database configuration
    raw_db_url = os.getenv(
        "DATABASE_URL",
        "sqlite:///infinity_space_group.db",
    )
    if raw_db_url and raw_db_url.startswith("postgres://"):
        raw_db_url = raw_db_url.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = raw_db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }

    # Session & Cookie Security
    SESSION_COOKIE_NAME = "isg_admin_session"
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = (
        os.getenv("SESSION_COOKIE_SECURE", "false").lower() == "true"
    )
    PERMANENT_SESSION_LIFETIME = timedelta(hours=8)

    # CORS configuration
    FRONTEND_ORIGIN = [
        origin.strip()
        for origin in os.getenv("FRONTEND_ORIGIN", "http://localhost:5173").split(",")
        if origin.strip()
    ]

    # Payload size limit: 1MB
    MAX_CONTENT_LENGTH = 1024 * 1024


class DevelopmentConfig(Config):
    """Development configuration with localized fallback secret."""

    DEBUG = True
    SESSION_COOKIE_SECURE = False
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-insecure-secret-key-change-in-production")


class TestingConfig(Config):
    """Testing configuration with isolated test credentials."""

    TESTING = True
    DEBUG = False
    SESSION_COOKIE_SECURE = False
    SECRET_KEY = os.getenv("SECRET_KEY", "test-secret-key-for-testing-only")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "TEST_DATABASE_URL",
        "postgresql://postgres:postgres@localhost:5433/infinity_space_group_test",
    )


class ProductionConfig(Config):
    """Production configuration requiring environment SECRET_KEY."""

    DEBUG = False
    SESSION_COOKIE_SECURE = True
    SECRET_KEY = os.getenv("SECRET_KEY")


CONFIG_MAP = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
