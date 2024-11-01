from flask import Flask, request, Blueprint
from .users.controller import user
# from .messages.controller import messages
# from .conversations.controller import conversations
from flask_jwt_extended import JWTManager
from .auth.controller import auth
from .chatbot.controller import chat_bp
from .extension import db, ma, jwt
from .model import User, Message, Conversation, Feedback
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
    app.register_blueprint(user)
    # app.register_blueprint(messages)
    # app.register_blueprint(conversations)
    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(chat_bp, url_prefix="/api")

    return app
