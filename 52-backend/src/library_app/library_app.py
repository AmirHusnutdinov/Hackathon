"""
This module contains a custom Flask application for a library management
system.
"""
from flask import Flask

from src.api.auth_controllers import handle_login
from src.api.books_crud import books_api
from src.api.index_page import index_page
from src.api.users_table_page import users_page


class LibraryApp(Flask):
    """
    Custom Flask application for library management system.

    This class extends the Flask class to create a custom application for
    managing a library. It registers all the necessary blueprints to handle
    user authentication, user api, and a REST API for managing books.
    """

    def __init__(self) -> None:
        super().__init__(__name__, template_folder="../templates")

        # create all the api
        pages = [index_page, users_page, handle_login, books_api]

        for page in pages:
            self.register_blueprint(page)
