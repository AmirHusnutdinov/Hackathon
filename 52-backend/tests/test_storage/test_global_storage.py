import pytest

from src.storage.global_storage import (
    add_user_to_library,
    user_exists,
    read_all_books,
    add_book_to_library,
    retrieve_password,
    read_all_users,
    read_book,
    reset_global_storage,
)


@pytest.fixture
def client():
    reset_global_storage()


def test_add_user_to_library(client):
    # Test adding a user to the library
    user_dict = {
        "name": "Alice",
        "email": "alice@example.com",
        "password": "password123",
    }
    add_user_to_library(user_dict)

    # Check that the user exists in the library
    assert user_exists("Alice")


def test_add_book_to_library(client):
    # Test adding a book to the library
    book_dict = {
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J.K. Rowling",
        "year": 1997,
    }
    add_book_to_library(book_dict)

    # Check that the book exists in the library
    all_books = read_all_books()
    assert len(all_books) == 1
    assert all_books[0]["title"] == "Harry Potter and the Philosopher's Stone"


def test_retrieve_password(client):
    # Test retrieving a user's password
    user_dict = {
        "name": "Alice",
        "email": "alice@example.com",
        "password": "password123",
    }
    add_user_to_library(user_dict)

    # Check that the correct password is retrieved
    password = retrieve_password("Alice")
    assert password == "password123"


def test_read_all_users(client):
    # Test reading all users in the library
    user_dict_1 = {
        "name": "Alice",
        "email": "alice@example.com",
        "password": "password123",
    }
    user_dict_2 = {"name": "Bob", "email": "bob@example.com", "password": "password456"}
    add_user_to_library(user_dict_1)
    add_user_to_library(user_dict_2)

    # Check that all users are retrieved
    all_users = read_all_users()
    assert len(all_users) == 2
    assert all_users[0]["name"] == "Alice"
    assert all_users[1]["name"] == "Bob"


def test_read_all_books(client):
    # Test reading all books in the library
    book_dict_1 = {
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J.K. Rowling",
        "year": 1997,
    }
    book_dict_2 = {
        "title": "The Hitchhiker's Guide to the Galaxy",
        "author": "Douglas Adams",
        "year": 1979,
    }
    add_book_to_library(book_dict_1)
    add_book_to_library(book_dict_2)

    # Check that all books are retrieved
    all_books = read_all_books()
    assert len(all_books) == 2
    assert all_books[0]["title"] == "Harry Potter and the Philosopher's Stone"
    assert all_books[1]["title"] == "The Hitchhiker's Guide to the Galaxy"


def test_read_book(client):
    # Test reading a specific book by ID
    book_dict_1 = {
        "title": "Harry Potter and the Philosopher's Stone",
        "author": "J.K. Rowling",
        "year": 1997,
    }
    book_dict_2 = {
        "title": "The Hitchhiker's Guide to the Galaxy",
        "author": "Douglas Adams",
        "year": 1979,
    }
    add_book_to_library(book_dict_1)
    add_book_to_library(book_dict_2)

    # Check that the correct book is retrieved
    book = read_book(1)
    assert book.title == "The Hitchhiker's Guide to the Galaxy"
