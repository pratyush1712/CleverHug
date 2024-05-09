import datetime
import os
from datetime import datetime, timedelta

import jwt
from flask import Blueprint
from flask import current_app as app
from flask import jsonify, request
from flask_login import UserMixin, current_user, login_required, login_user

auth = Blueprint("auth", __name__)

users = {
    "pratyush": {
        "username": "Pratyush",
        "full_name": "Pratyush Sudhakar",
        "email": "pratyushsudhakar03@gmail.com",
        "hashed_password": os.getenv("USER_PASSWORD"),
        "disabled": False,
    }
}


class User(UserMixin):
    """Represents a user with login capabilities.

    Attributes:
        username (str): Unique identifier for the user.
        password (str): User's password (stored in hashed form for security).
    """

    def __init__(self, username, password=None):
        """Initializes a User object with a username and password.

        @param username: Unique identifier for the user.
        @param password: User's password (stored in hashed form for security).
        """
        self.username = username
        self.password = password

    def __str__(self):
        return f"User: {self.username}"

    def __repr__(self):
        return f"User: {self.username}"

    def get_id(self):
        """Returns the username as the user ID.

        @return: The username of the user.
        """
        return self.username

    def get_username(self):
        """Returns the username of the user.

        @return: The username of the user.
        """
        return self.username


@app.login_manager.request_loader
def request_loader(request):
    """Loads a user from the request headers.

    @param request: The request object.
    @return: The User object if the user exists, None otherwise.
    """
    auth_headers = request.headers.get("Authorization", "").split()
    if len(auth_headers) < 2:
        return None
    try:
        token = auth_headers[1]
        data = jwt.decode(token, app.config["SECRET_KEY"], algorithms="HS256")
        user = users.get(data["sub"])
        return User(user) if user else None
    except jwt.ExpiredSignatureError:
        print("expired")
        return None
    except (jwt.InvalidTokenError, Exception) as e:
        print("error: ", e)
        return None


@app.login_manager.user_loader
def load_user(username):
    """Loads a user from the users dictionary.

    @param username: The username of the user to load.
    @return: The User object if the user exists, None otherwise.
    """
    user = users.get(username)
    if user:
        return User(username, user["hashed_password"])
    return None


@auth.route("/login", methods=["POST"])
def login():
    """
    Logs a user in by validating their credentials.

    @param username: The username of the user.
    @param password: The password of the user.

    @return: A JSON response with a message indicating whether the login was successful.
    """
    username = request.json["username"]
    password = request.json["password"]
    remember = request.json["remember"]
    user = users.get(username)
    if user and user["hashed_password"] == password:
        login_user(
            User(username, password),
            remember=remember,
            force=True,
            duration=timedelta(days=365),
        )
        expiry = datetime.utcnow() + timedelta(days=360)
        payload = {"sub": username, "exp": expiry}
        token = jwt.encode(payload, app.config["SECRET_KEY"], "HS256")
        return jsonify({"message": "Login successful", "token": token}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 400


@auth.route("/check", methods=["GET"])
@login_required
def auth_check():
    """
    Checks if the user is authenticated.

    @return: A JSON response with a boolean indicating whether the user is authenticated.
    """
    authenticated = current_user.is_authenticated
    username = current_user.get_username()
    return jsonify({"authenticated": authenticated, "userDetails": username}), 200
