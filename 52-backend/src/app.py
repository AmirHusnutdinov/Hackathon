from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

PASSWORD_FILE = "passwords.txt"

def store_credentials(email: str, password: str):
    """Stores the email and password in a plain text file."""
    with open(PASSWORD_FILE, "a") as file:
        file.write(f"{email},{password}\n")

@app.route("/store_password", methods=["POST"])
def store_credentials_api():
    """API to store email and password via POST request."""
    data = request.json
    print("Received data:", data)
    if "email" not in data or "password" not in data:
        return jsonify({"error": "Email and password are required"}), 400

    store_credentials(data["email"], data["password"])
    return jsonify({"message": "Credentials stored successfully"})

@app.route("/get_passwords", methods=["GET"])
def get_credentials_api():
    """API to retrieve stored credentials."""
    if not os.path.exists(PASSWORD_FILE):
        return jsonify({"error": "No credentials found"}), 404

    with open(PASSWORD_FILE, "r") as file:
        credentials = file.readlines()

    return jsonify({"credentials": [cred.strip() for cred in credentials]})

if __name__ == "__main__":
    app.run(debug=True)
