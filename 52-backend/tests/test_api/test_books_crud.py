import json
from .util import client


def test_render_books_page(client):
    response = client.get("/books")
    assert response.status_code == 200


def test_get_book(client):

    response = client.get("/books/0")
    assert response.status_code == 404
    data = json.loads(response.get_data(as_text=True))
    assert "error" in data

    book = {"title": "Test Book", "author": "Test Author", "year": 2022}
    client.post("/books", json=book)

    response = client.get("/books/0")
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert "title" in data
    assert "author" in data
    assert "id" in data
    assert "year" in data


def test_create_book(client):
    book = {"title": "Test Book", "author": "Test Author", "year": 2022}
    response = client.post("/books", json=book)
    assert response.status_code == 201
    data = json.loads(response.get_data(as_text=True))
    assert "message" in data


def test_delete_book(client):

    response = client.delete("/books/0")
    assert response.status_code == 404
    data = json.loads(response.get_data(as_text=True))
    assert "error" in data

    book = {"title": "Test Book", "author": "Test Author", "year": 2022}
    client.post("/books", json=book)

    response = client.delete("/books/0")
    assert response.status_code == 200
    data = json.loads(response.get_data(as_text=True))
    assert "message" in data
