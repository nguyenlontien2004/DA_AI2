from flask import Flask, request, Blueprint
from flask_cors import CORS
from .users.controller import user
from flask_jwt_extended import JWTManager
from .auth.controller import auth
from .chatbot.controller import chat_bp
from .extension import db, ma, jwt
import os

def create_db(app):
    if not os.path.exists("library/py_chatbot.db"):
        with app.app_context():
            db.create_all()
            print("Created Database")

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config.py")
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    create_db(app)

    # Di chuyển CORS vào đây
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    app.register_blueprint(user)
    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(chat_bp, url_prefix="/api")

    return app
