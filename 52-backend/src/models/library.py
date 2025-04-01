"""
This module defines the Library data class which represents a collection of
users and books.
"""
from dataclasses import dataclass, field
from typing import List

from .book import Book
from .user import LibraryUser


@dataclass
class Library:
    """
    A dataclass representing a library with books and users.

    :ivar books: A list of Book objects that are present in the library.
    :ivar users: A list of LibraryUser objects representing the users of the
    library.
    """

    books: List[Book] = field(default_factory=list)
    users: List[LibraryUser] = field(default_factory=list)

    # CRUD operations for books
    def create_book(self, book: Book) -> None:
        """
        Adds a new book to the library.

        :param book: The Book object to be added to the library.
        """
        self.books.append(book)

    def delete_book(self, id: int) -> None:
        """
        Deletes a book from the library.

        :param id: The ID of the book to be deleted.
        """
        for i, book in enumerate(self.books):
            if book.id == id:
                del self.books[i]
                return
        raise ValueError(f"Book with ID {id} not found")

    def create_user(self, user: LibraryUser) -> None:
        """
        Adds a new user to the library.

        :param user: The LibraryUser object to be added to the library.
        """
        self.users.append(user)

    def delete_user(self, user_id: int) -> None:
        """
        Deletes a user from the library.

        :param user_id: The ID of the user to be deleted.
        """
        for i, user in enumerate(self.users):
            if user.id == user_id:
                del self.users[i]
                return
        raise ValueError(f"User with ID {user_id} not found")
