import pytest

from src.library_app.library_app import LibraryApp
from src.storage.global_storage import reset_global_storage


@pytest.fixture
def client():
    reset_global_storage()
    app = LibraryApp()
    with app.test_client() as client:
        yield client
