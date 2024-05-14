import os
from dotenv import find_dotenv, load_dotenv
from flask_login import LoginManager
from flask import Flask, jsonify
from flask_cors import CORS

load_dotenv(find_dotenv())


login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("SECRET_KEY")

    app.config["CORS_HEADERS"] = "Content-Type"
    CORS(app, supports_credentials=True, origins="*")

    with app.app_context():
        login_manager.init_app(app)

        from endpoints.auth import auth
        from endpoints.scheduler import scheduler

        app.register_blueprint(auth, url_prefix="/auth")
        app.register_blueprint(scheduler, url_prefix="/scheduler")

    return app


app = create_app()


@app.route("/", methods=["GET", "POST"])
def hello_world():
    """
    Returns a simple message to indicate that the server is running.

    @return: A JSON response with a message indicating that the server is running.
    """
    return jsonify({"message": "Hello, World!"}), 200


@app.route("/health", methods=["GET"])
def health_check():
    """
    Returns a simple message to indicate that the server is running.

    @return: A JSON response with a message indicating that the server is running.
    """
    return jsonify({"message": "Server is running!"}), 200


if __name__ == "__main__":
    app.run(host="localhost", port=3001, debug=True)
