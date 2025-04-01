"""
A Flask API for managing a library of books.

This script defines a Flask Blueprint for managing a library of books, with
endpoints for rendering the books page, getting a book by ID, creating a new
book, and deleting a book by ID.The API reads and writes data to a global
storage module, which manages the library of books.

Endpoints:
    - GET /books: Render the books page.
    - GET /books/<int:book_id>: Get a book by ID.
    - POST /books: Create a new book.
    - DELETE /books/<int:book_id>: Delete a book by ID.

Global Storage:
    The API reads and writes data to the `src.storage.global_storage` module,
    which defines functions for reading, adding, updating, and deleting books
    in the library.

Example Usage:
    app.register_blueprint(books_api)

    The Flask application should register the books_api Blueprint to use the
    API.

Dependencies:
    This script depends on the Flask and dataclasses modules, as well as the
    `src.storage.global_storage` module for managing the library of books.
"""

from dataclasses import asdict
from typing import Any, Dict, Tuple, Union

from flask import Blueprint, jsonify, render_template, request

import src.storage.global_storage as global_storage

books_api = Blueprint("books=", __name__)


@books_api.route("/books", methods=["GET"])
def render_books_page() -> str:
    """
    Render the books page.

    Returns:
        str: The rendered books page.
    """
    books = global_storage.read_all_books()
    return render_template("books.html", books=books)


@books_api.route("/books/<int:book_id>", methods=["GET"])
def get_book(book_id: int) -> Tuple[Union[Dict[str, Any], None], int]:
    """
    Get a book by its ID.

    :param book_id (int): The ID of the book to get.

    Returns: A tuple containing the JSON representation
        of the book (if found) and the HTTP status code (200 if the book was
        found, 404 otherwise).
    """
    book = global_storage.read_book(book_id)
    if book is None:
        return jsonify({"error": "Book not found."}), 404
    return jsonify(asdict(book)), 200


@books_api.route("/books", methods=["POST"])
def create_book() -> Tuple[Dict[str, str], int]:
    """
    Create a new book.

    Returns: A tuple containing a message indicating that the book was
        created successfully and the HTTP status code (201).
    """
    book_dict: Dict[str, Any] = request.get_json()
    global_storage.add_book_to_library(book_dict)
    return jsonify({"message": "Book created successfully."}), 201


@books_api.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id: int) -> Tuple[Dict[str, str], int]:
    """
    Delete a book by its ID.

    :param book_id (int): The ID of the book to delete.

    Returns: Tuple[Dict[str, str], int]: A tuple containing a message
    indicating that the book was deleted successfully (if found) and the HTTP
    status code (200 if the book was deleted successfully, 404 if the book was
    not found).
    """
    result: bool = global_storage.delete_book(book_id)
    if result:
        return jsonify({"message": "Book deleted successfully."}), 200
    return jsonify({"error": "Book not found."}), 404
