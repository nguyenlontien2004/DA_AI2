from flask import Flask, request, Blueprint
from .users.controller import user
from .messages.controller import message_bp
from .conversations.controller import conv_bp
from flask_jwt_extended import JWTManager
from .auth.controller import auth
from .chatbot.controller import chat_bp
from .chatgpt.controller import chatgpt_bp
from .extension import db, ma, jwt
from .model import User, Message, Conversation, Feedback
import os
import google.generativeai as genai

def create_db(app):
    if not os.path.exists("library/py_chatbot.db"):
        with app.app_context():
            db.create_all()
            print("Created Database")

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile("config.py")
    api_key = app.config.get("GEMINI_API_KEY")
    if api_key:
        genai.configure(api_key=api_key)
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    create_db(app)
    app.register_blueprint(user)
    # app.register_blueprint(messages)
    app.register_blueprint(conv_bp, url_prefix="/api") 
    app.register_blueprint(auth, url_prefix="/api/auth")
    app.register_blueprint(chat_bp, url_prefix="/api")
    app.register_blueprint(chatgpt_bp, url_prefix="/api")
    app.register_blueprint(message_bp, url_prefix="/api")

    return app
