from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_socketio import emit
from library.model import Message, Conversation
from library.library_ma import MessageSchema
from ..extension import db, socketio
from datetime import datetime

message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)
message_bp = Blueprint("message_bp", __name__)

@message_bp.route('/message/<int:conv_id>', methods=['GET'])
@jwt_required()
def get_message_by_conv_id(conv_id):
    # Lấy tin nhắn theo conv_id và kiểm tra quyền truy cập
    messages = (
        Message.query
        .join(Conversation, Message.conversation_id == Conversation.id)
        .filter(Message.conversation_id == conv_id)
        .order_by(Message.timestamp)
        .add_columns(Conversation.user_id)
        .all()
    )

    if not messages:
        return jsonify({"error": "Không tìm thấy tin nhắn trong cuộc hội thoại này"}), 404

    first_message_user_id = messages[0][1]

    if first_message_user_id != get_jwt_identity():
        return jsonify({"error": "Bạn không thể truy cập tin nhắn"}), 401

    results = [
        {
            "message_id": message.id,
            "message": message.message,
            "sender": message.sender,
            "timestamp": message.timestamp.isoformat(),
            "user_id": user_id
        }
        for message, user_id in messages
    ]

    return jsonify(results), 200

@socketio.on('send_message')
def handle_send_message(data):
    conv_id = data.get('conv_id')
    message_text = data.get('message')
    user_id = get_jwt_identity()

    if conv_id and message_text:
        new_message = Message(
            conversation_id=conv_id,
            sender="user",
            message=message_text,
            timestamp=datetime.now()
        )
        db.session.add(new_message)
        db.session.commit()

        emit('new_message', {
            # "message_id": new_message.id,
            "message": new_message.message,
            "sender": new_message.sender,
            "timestamp": new_message.timestamp.isoformat()
        }, room=f"conversation_{conv_id}")
