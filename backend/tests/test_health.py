def test_health_endpoint(client):
    """Verify liveness probe returns status ok."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data == {"status": "ok"}


def test_readiness_endpoint_with_db(client):
    """Verify readiness probe confirms database connectivity."""
    response = client.get("/api/ready")
    assert response.status_code == 200
    data = response.get_json()
    assert data.get("status") == "ready"
    assert data.get("database") == "connected"
