from flask import Blueprint, render_template

from src.storage.global_storage import read_all_users

users_page = Blueprint("users_page", __name__)


@users_page.route("/users")
def render_users_page() -> str:
    """
    Render the user page.
    """
    users = read_all_users()
    return render_template("users.html", users=users)
