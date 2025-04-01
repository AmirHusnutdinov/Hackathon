# Theory
These notes cover some fundamental concepts related to web development using Flask, a popular micro web application framework.

## The Hypertext Transfer Protocol (HTTP)

The Hypertext Transfer Protocol (HTTP) is the underlying protocol used for communication on the World Wide Web. HTTP is a client-server protocol, which means it defines how requests and responses are exchanged between clients (typically web browsers) and servers (web servers hosting web pages and other resources).

Two of the most commonly used HTTP methods are:

* GET: This method is used to request data from a server. For example, when you type a search query into a search engine, your browser sends a GET request to the search engine's server to retrieve the results.
* POST: This method is used to submit data to be processed by a server. For example, when you fill out a form on a website and click the submit button, your browser sends a POST request to the server containing the data you entered in the form.

## HyperText Markup Language (HTML)

HyperText Markup Language (HTML) is the standard markup language used for creating web pages. Every web page on the internet is written in HTML, which is interpreted by web browsers to render the page to the user.

HTML consists of a series of elements (or tags), which define the structure and content of a web page. HTML5 is the current version of HTML and includes new features for multimedia and web applications.

Here's an example of a simple HTML document:

```html
<!DOCTYPE html>
<html>

<head>
    <title>Title of your page.</title>
</head>

<body>
    <p>Hello world!</p>
</body>

</html>
```
 
## HTML Forms

HTML forms are used to collect user input on a web page. They typically include various input fields, such as text inputs, checkboxes, and radio buttons, as well as a submit button to submit the data to the server.

Here's an example of a simple HTML form:

```html
<form>
    First name: <br>
    <input type="text" name="firstname">
    <br>
    Last name:<br>
    <input type="text" name="lastname">
    <br>
    Password:<br>
    <input type="password" name="password">
</form>
```  

Another example:

```html
<form action="http://www.bing.com/search" method="GET">
    Bing search:<br>
    <input type="text" name="q" value="Search">
    <br>
    <input type="submit" value="Submit">
</form>
```
  
## Flask

Flask is a micro web application framework written in Python. It provides a lightweight foundation for building web applications and APIs, and can be easily extended with various add-ons (or extensions) for additional functionality.

Flask is popular for its simplicity and ease of use. It has a minimalistic code base and does not require any database abstraction layer or form validation.

A basic "Hello World" example in Flask would look like this:
 
```Python
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
  return "Hello World!"

if __name__ == "__main__":
  app.run()
```
  
In this example, we create a new Flask application instance and define a view function using the `@app.route()` decorator. The `@app.route()` decorator maps the URL `/` to the `hello_world()` function. When the user visits the root URL of the application, the `hello_world()` function is executed and returns the string "Hello, World!".
 
## Templates

Templates allow you to separate the logic of your project from the layout and presentation. They help you to maintain a clean code structure and facilitate the reuse of code. In Flask, you can use Jinja2 as the default templating engine.

### Creating templates

To create a template, you simply create a regular HTML file and include the dynamic parts that you want to fill in with data from your Python code inside Jinja2 tags.

For example, let's look at an example index.html file:

 ```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }} - My Flask App</title>
</head>
<body>
    <h1>Welcome to my Flask App!</h1>
    <p>Hello, {{ user.username }}!</p>
</body>
</html>
 ```
 
All templates consist of regular HTML with dynamic parts enclosed with `{{…}}` (double curly braces). Variables are passed to the template from Python code, and Jinja2 replaces them with their values.

### Rendering templates

To render a template, you can use Flask's render_template function. This function takes the name of the template and the variables you want to pass to it as arguments.

```Python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    user = {'username': 'John Doe'}
    return render_template('index.html', title='Home', user=user)
```

Here, we are rendering the index.html template and passing it two variables: title and user. Jinja2 will replace `{{ title }}` with 'Home' and `{{ user.username }}` with 'John Doe'.

### Control statements

Jinja2 supports control statements inside `{% … %}` blocks. This makes it possible to add conditional logic and loops to your templates.

For example, here's how you can use an if statement to conditionally render a title in your template:

 ```html
<!DOCTYPE html>
<html>
<head>
    {% if title %}
    <title>{{ title }} - My Flask App</title>
    {% else %}
    <title>My Flask App</title>
    {% endif %}
</head>
<body>
    <h1>Welcome to my Flask App!</h1>
    {% if user %}
    <p>Hello, {{ user.username }}!</p>
    {% endif %}
</body>
</html>
 ```
 
In this example, we use the `{% if … %}` and `{% else %}` control statements to check whether the title variable is defined. If it is, we render the title with `{{ title }};` otherwise, we use a default title. We also use a conditional statement to only display the user's username if the user variable is defined.

You can also use loops to generate dynamic content. For example, here's how you can create a loop that displays a list of items:

 ```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }} - My Flask App</title>
</head>
<body>
    <h1>Welcome to my Flask App!</h1>
    <ul>
    {% for item in items %}
        <li>{{ item }}</li>
    {% endfor %}
    </ul>
</body>
</html>
 ```
 
In this example, we use the `{% for … in … %}` and `{% endfor %}` control statements to create a loop that iterates over a list of items. For each item, we render an `<li>` element with the item's value.
