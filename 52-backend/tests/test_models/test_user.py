from src.models.user import LibraryUser


def test_user_from_dict():
    user_dict = {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com",
        "password": "password123",
    }
    user = LibraryUser.from_dict(user_dict)
    assert user.id == 1
    assert user.name == "Alice"
    assert user.email == "alice@example.com"
    assert user.password == "password123"


def test_user_equality():
    user1 = LibraryUser(1, "Alice", "alice@example.com", "password123")
    user2 = LibraryUser(1, "Alice", "alice@example.com", "password123")
    user3 = LibraryUser(2, "Bob", "bob@example.com", "password456")
    assert user1 == user2
    assert user1 != user3
    assert user2 != user3
