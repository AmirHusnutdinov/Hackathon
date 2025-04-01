"""
This module provides functions for managing a library system.

The functions in this module allow users to add new users and books to a global
library storage, check if a user with a given username exists in the storage,
retrieve the password for a user, and retrieve a list of dictionaries
representing all the users and books in the storage.

Example usage:

    add_user_to_library({"name": "Alice", "email": "alice@example.com",
    "password": "password123"})
    add_book_to_library({"title": "Harry Potter and the Philosopher's Stone",
    "author": "J.K. Rowling", "year": 1997})

    if user_exists("Alice"):
        password = retrieve_password("Alice")

    all_users = read_all_users()
    all_books = read_all_books()
"""
from dataclasses import asdict
from typing import Dict, List, Optional

from src.models.book import Book
from src.models.library import Library
from src.models.user import LibraryUser

GLOBAL_STORAGE: Library = Library()


def add_user_to_library(user_dict: Dict[str, str]) -> None:
    """Adds a new user to the global library storage."""
    user_dict["id"] = len(GLOBAL_STORAGE.users)

    user = LibraryUser.from_dict(user_dict)
    GLOBAL_STORAGE.create_user(user)


def add_book_to_library(book_dict: Dict[str, str]) -> None:
    """Adds a new book to the global library storage."""
    book_dict["id"] = len(GLOBAL_STORAGE.books)
    book = Book.from_dict(book_dict)
    GLOBAL_STORAGE.create_book(book)


def user_exists(username: str) -> bool:
    """Checks if a user with the given username exists in the global library
    storage."""
    for user in GLOBAL_STORAGE.users:
        if user.name == username:
            return True
    return False


def retrieve_password(username: str) -> Optional[str]:
    """Retrieves the password for the user with the given username, if it
    exists."""
    for user in GLOBAL_STORAGE.users:
        if user.name == username:
            return user.password
    return None


def read_all_users() -> List[Dict[str, str]]:
    """Returns a list of dictionaries representing all the users in the global
    library storage."""
    return [asdict(user) for user in GLOBAL_STORAGE.users]


def read_all_books() -> List[Dict[str, str]]:
    """Returns a list of dictionaries representing all the books in the global
    library storage."""
    return [asdict(book) for book in GLOBAL_STORAGE.books]


def read_book(book_id: int) -> Optional[Book]:
    """Retrieves the book with the given ID, if it exists."""
    for book in GLOBAL_STORAGE.books:
        if book.id == book_id:
            return book
    return None


def delete_book(book_id: int) -> bool:
    """Deletes the book with the given ID, if it exists."""
    for i, book in enumerate(GLOBAL_STORAGE.books):
        if book.id == book_id:
            del GLOBAL_STORAGE.books[i]
            return True
    return False


def reset_global_storage() -> None:
    """Resets the storage."""
    global GLOBAL_STORAGE
    GLOBAL_STORAGE = Library()
