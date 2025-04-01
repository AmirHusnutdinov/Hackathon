# Use an official Python runtime as a parent image
FROM python:3.10-alpine

# Copy the application files into the image.
COPY src /src

# Set the working directory for the image.
WORKDIR /

# Copy the application requirements into the image.
COPY requirements.txt .

# Install the application dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port on which the application will run.
EXPOSE 5000

ENV PYTHONPATH "${PYTHONPATH}:/src"

# Start the Flask application.
CMD ["python", "/src/app.py", "--host=0.0.0.0"]
