from .extension import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    def __init__(self, username, email, password_hash):
        self.username = username
        self.email = email
        self.password_hash = password_hash


class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    started_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    ended_at = db.Column(db.TIMESTAMP, nullable=True)

    # Mỗi quan hệ với User
    user = db.relationship('User', backref=db.backref('conversations', lazy=True))

    def __init__(self, user_id, ended_at=None):
        self.user_id = user_id
        self.ended_at = ended_at


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'), nullable=False)
    sender = db.Column(db.Enum('user', 'chatbot'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    # Mỗi quan hệ với Conversation
    conversation = db.relationship('Conversation', backref=db.backref('messages', lazy=True))

    def __init__(self, conversation_id, sender, message):
        self.conversation_id = conversation_id
        self.sender = sender
        self.message = message


class Feedback(db.Model):
    __tablename__ = 'feedback'
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # Rating scale: 1 to 5
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    # Relationships
    message = db.relationship('Message', backref=db.backref('feedbacks', lazy=True))
    user = db.relationship('User', backref=db.backref('feedbacks', lazy=True))

    def __init__(self, message_id, user_id, rating, comment=None):
        self.message_id = message_id
        self.user_id = user_id
        self.rating = rating
        self.comment = comment
