# Production Dockerfile for Infinity Space Group Flask REST API
FROM python:3.13-slim as base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_ENV=production \
    PORT=5000

WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create non-root application user
RUN groupadd -g 10001 appgroup && \
    useradd -u 10001 -g appgroup -s /bin/sh -m appuser

# Copy application files
COPY app ./app
COPY migrations ./migrations
COPY run.py .

# Grant ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose service port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:${PORT:-5000}/api/health || exit 1

# Start Gunicorn WSGI server
CMD ["sh", "-c", "gunicorn -w 4 -b 0.0.0.0:${PORT:-5000} --access-logfile - --error-logfile - run:app"]
