# Makefile for Flask project

# Set the Python interpreter and package name
VENV_NAME = venv
PYTHON = $(VENV_NAME)/bin/python
PACKAGE = src

# Define the default target to build and run the Flask app
all: build run

# Build the Docker image for the Flask app
build:
	docker build -t flask-project .

# Run the Docker container for the Flask app
run:
	docker run --network=host flask-project

# Remove the Docker container for the Flask app
clean:
	docker ps -aq --filter ancestor=flask-project | xargs docker rm -f

# Remove the Docker image for the Flask app
clean-image:
	docker images -q --filter reference=flask-project | xargs docker rmi -f

# Install the Python dependencies
install:
	virtualenv $(VENV_NAME)
	$(PYTHON) -m pip install -r requirements.txt

# Run linting and static analysis tools
lint:
	$(PYTHON) -m flake8 $(PACKAGE)
	$(PYTHON) -m pylint --exit-zero $(PACKAGE)
	$(PYTHON) -m black -c $(PACKAGE)

# Run tests for the Flask app
test:
	$(PYTHON) -m pytest tests/

# Build the documentation
docs:
	cd docs && make html
