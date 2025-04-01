from src.storage.global_storage import add_user_to_library
from .util import client


def test_render_users_page(client):

    users = [
        {
            "name": "Alice",
            "email": "alice@example.com",
            "password": "password123",
        },
        {"name": "Bob", "email": "bob@example.com", "password": "password456"},
    ]
    for user in users:
        add_user_to_library(user)

    response = client.get("/users")
    assert response.status_code == 200
    assert b"Alice" in response.data
    assert b"Bob" in response.data
