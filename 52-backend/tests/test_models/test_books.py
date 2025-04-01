from src.models.book import Book


def test_book_from_dict():
    book_dict = {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": 1925,
    }
    book = Book.from_dict(book_dict)
    assert book.id == 1
    assert book.title == "The Great Gatsby"
    assert book.author == "F. Scott Fitzgerald"
    assert book.year == 1925


def test_book_equality():
    book1 = Book(1, "The Great Gatsby", "F. Scott Fitzgerald", 1925)
    book2 = Book(1, "The Great Gatsby", "F. Scott Fitzgerald", 1925)
    book3 = Book(2, "To Kill a Mockingbird", "Harper Lee", 1960)
    assert book1 == book2
    assert book1 != book3
    assert book2 != book3
