from flask import Blueprint, render_template

index_page = Blueprint("index", __name__)


@index_page.route("/")
def index() -> str:
    """
    Render the index page.
    """
    return render_template("home.html")
