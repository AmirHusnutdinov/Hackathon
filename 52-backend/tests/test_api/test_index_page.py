from .util import client


def test_index_page(client):
    response = client.get("/")
    assert response.status_code == 200
    assert b"<title>Welcome to Library</title>" in response.data
