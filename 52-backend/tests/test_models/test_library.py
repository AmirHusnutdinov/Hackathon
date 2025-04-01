from typing import List
from dataclasses import asdict
from pytest import raises

from src.models.book import Book
from src.models.library import Library
from src.models.user import LibraryUser


def test_create_book():
    library = Library()
    book = Book(id=1, title="The Great Gatsby", author="F. Scott Fitzgerald", year=1925)
    library.create_book(book)
    assert book in library.books


def test_delete_book():
    library = Library()
    book1 = Book(
        id=1234, title="The Great Gatsby", author="F. Scott Fitzgerald", year=1925
    )
    book2 = Book(id=5678, title="To Kill a Mockingbird", author="Harper Lee", year=1960)
    library.create_book(book1)
    library.create_book(book2)
    library.delete_book(1234)
    assert book1 not in library.books
    with raises(ValueError):
        library.delete_book(0000)


def test_create_user():
    library = Library()
    user = LibraryUser(
        id=123, name="Alice", email="alice@example.com", password="password123"
    )
    library.create_user(user)
    assert user in library.users


def test_delete_user():
    library = Library()
    user1 = LibraryUser(
        id=123, name="Alice", email="alice@example.com", password="password123"
    )
    user2 = LibraryUser(
        id=456, name="Bob", email="bob@example.com", password="password456"
    )
    library.create_user(user1)
    library.create_user(user2)
    library.delete_user(123)
    assert user1 not in library.users
    with raises(ValueError):
        library.delete_user(000)
