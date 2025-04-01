from flask import Blueprint, abort, render_template, request

import src.storage.global_storage as storage

handle_login = Blueprint("handle_login", __name__)


@handle_login.route("/login", methods=["POST"])
def handle_login_post() -> str:
    """
    Handle a login request.
    :return: String with the result of the login.
    """
    try:
        username = request.form.get("username")
        password = request.form.get("password")
        if storage.retrieve_password(username) == password:
            return render_template("home.html", user=username)
        else:
            error = "Invalid credentials"
            return render_template("home.html", error=error)
    except Exception as e:
        abort(400, f"Error processing login request: {e}")
