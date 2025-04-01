"""
This module defines the Book data class which represents a book in the library.
"""

from dataclasses import dataclass


@dataclass
class Book:
    """
    A data class that represents a book in the library.

    :ivar id: The unique identifier of the book.
    :ivar title: The title of the book.
    :ivar author: The author of the book.
    :ivar year: The year the book was published.
    """

    id: int
    title: str
    author: str
    year: int

    @classmethod
    def from_dict(cls, book_dict: dict) -> "Book":
        """
        Creates a new Book instance from a dictionary.

        :param book_dict: A dictionary representing the book.
        :return: A new Book instance.
        """
        return cls(
            id=book_dict.get("id"),
            title=book_dict.get("title"),
            author=book_dict.get("author"),
            year=book_dict.get("year"),
        )
