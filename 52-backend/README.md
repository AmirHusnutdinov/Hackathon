# Flask-Minimal

The purpose of this template is to provide a starting point for creating new Flask apps that require more than the bare minimum. The README provides instructions for installation on Unix/MacOS as well as using Docker. Additionally, it explains how to generate documentation using Sphinx. 

## Problem description

When creating a new Flask app, it is often useful to have a template that can be used to start from. 

The bare minmal Flask app consits of only a few lines of code:

 ```Python
from flask import Flask
app = Flask(name)
@app.route("/")
def main():
    return "Hello World"
```  

We usually want a bit more than that. That's why I decided to create this template.

# Installation

## Setup for Unix, MacOS

1. Download the code repository from GitHub:
    
```Bash
git clone https://github.com/djeada/Flask-Minimal.git
cd Flask-Minimal
```

2. Install dependencies in a virtual environment:

```Bash
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

3. Start the app:

```Bash
python src/app.py
```

To make the server available on the LAN, modify the code where the run method is called on the Flask instance (here named app):

```Python
app.run(host='0.0.0.0')
```

##  Start the app in Docker

1. Download the code from the repository:
    
```Bash
git clone https://github.com/djeada/Flask-Minimal.git
cd Flask-Minimal
```

2. Build the Docker image:
    
```Bash
docker build -t minimal-flask-app .
```

3. Start a Docker container:

```Bash
sudo docker run --network=host minimal-flask-app
```

4. In your browser, go to `http://localhost:5000`. The app should now be working.

# API

## Endpoints

### GET /books
This endpoint returns a list of all books in the library.

To get a list of all books in the library, you can use the following curl command:

```Bash
curl http://localhost:5000/books
```

To get a list of all books in the library using JavaScript, you can use the fetch function as follows:

```javascript
fetch('http://localhost:5000/books')
  .then(response => response.json())
  .then(data => console.log(data));
```

### GET /books/<int:book_id>
This endpoint returns information about a specific book, specified by its ID.

To get information about a specific book, you can use the following curl command:

```Bash
curl http://localhost:5000/books/1
```

To get information about a specific book using JavaScript, you can use the fetch function as follows:

```javascript
fetch('http://localhost:5000/books/1')
  .then(response => response.json())
  .then(data => console.log(data));
```

### POST /books
This endpoint allows users to add a new book to the library. Users should submit a JSON object containing the book's title, author, and description.

To add a new book to the library, you can use the following curl command:

```Bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"New Book", "author":"Author Name", "description":"Book Description"}' http://localhost:5000/books
```

To add a new book to the library using JavaScript, you can use the fetch function with the POST method as follows:

```javascript
fetch('http://127.0.0.1:5000/books', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( {
            "id": 7,
            "title": "The Return of the King",
            "author": "J.R.R. Tolkien",
            "year": 1955,
        })
})
.then(response => response.json())
.then(data => console.log(data))
```

### DELETE /books/<int:book_id>
This endpoint allows users to delete a book from the library, specified by its ID.

To delete a book from the library, you can use the following curl command:

```Bash
curl -X DELETE http://localhost:5000/books/1
```

To delete a book from the library using JavaScript, you can use the fetch function with the DELETE method as follows:

```javascript
fetch('http://localhost:5000/books/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data));
```

# Documentation

Sphinx is a tool that can be used to automatically generate documentation from your project's docstrings. This template includes a basic documentation setup using Sphinx.

## Creating documentation

If documentation has not yet been created for your project, you can create a basic Sphinx documentation setup using the following steps:

```Bash
mkdir -p docs && cd docs
sphinx-quickstart
sphinx-apidoc -o . ..
make html
```

## Modifying documentation

To modify the documentation for this template, you can make changes to the existing `docs/source` directory.

* Configuration

The Sphinx configuration file is located at `docs/source/conf.py`. You can modify this file to change various settings such as the project name, author, and more.

* Content

The main content for the documentation is located in `docs/source/index.rst`. You can modify this file to add or remove sections and pages as needed.

* Updating and viewing documentation

To update the documentation after making changes, run the following command from the `docs` directory:

```Bash
make html
```

To view the generated HTML documentation, open `docs/build/html/index.html` in a web browser.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is licensed under the terms of the MIT license. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
