from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from ..extension import db, socketio
from flask_socketio import emit, join_room
from ..model import User, Conversation, Message
import os
import google.generativeai as genai
from datetime import datetime

# Cấu hình model Gemini
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Khởi tạo Blueprint cho chatbot API
chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat/start', methods=['POST'])
@jwt_required()
def start_chat():
    user_id = get_jwt_identity()
    data = request.json
    user_input = data.get("message", "Không có tiêu đề")  # Sử dụng mặc định nếu không có tin nhắn

    try:
        chat_session = model.start_chat(history=[])

        # Gửi tin nhắn tạo tên hội thoại
        response = chat_session.send_message(
            f"Hãy chỉ trả với 5-6 chữ. hãy đặt tên cho cuộc hội thoại bắt đầu bằng câu sau: '{user_input}'"
        )

        # Lấy tên cuộc hội thoại
        conv_name = response.text if response and hasattr(response, 'text') else "Cuộc hội thoại không tên"

        # Tạo một cuộc hội thoại mới trong cơ sở dữ liệu
        new_conversation = Conversation(user_id=user_id, name=conv_name, started_at=datetime.now())
        db.session.add(new_conversation)
        db.session.commit()

        return jsonify({
            "message": user_input,
            "conversation_id": new_conversation.id,
            "conversation_name": new_conversation.name
        }), 200

    except Exception as e:
        return jsonify({"error": f"Đã xảy ra lỗi: {str(e)}"}), 500

@chat_bp.route('/chat/message/<int:conv_id>', methods=['POST']) 
@jwt_required()
def chat(conv_id):
    data = request.json
    user_input = data.get("message")
    
    if not user_input:
        return jsonify({"error": "Vui lòng nhập tin nhắn"}), 400
    
    conv = Conversation.query.get(conv_id)
    if conv and conv.user_id != get_jwt_identity():
        return jsonify({"error": "Bạn không có quyền ở tin nhắn này"}), 401

    # Lấy lịch sử hội thoại từ bảng messages
    history = Message.query.filter_by(conversation_id=conv_id).order_by(Message.timestamp).all()
    history_text = [{"role": msg.sender, "parts": [{"text": msg.message}]} for msg in history]
    chat_session = model.start_chat(history=history_text)
    
    # Gửi tin nhắn từ người dùng tới chatbot
    response = chat_session.send_message(user_input)
    
    # Lưu tin nhắn người dùng vào bảng messages
    user_message = Message(conversation_id=conv_id, sender="user", message=user_input, timestamp=datetime.now())
    db.session.add(user_message)
    
    # Lưu phản hồi chatbot vào bảng messages
    bot_message = Message(conversation_id=conv_id, sender="model", message=response.text, timestamp=datetime.now())
    db.session.add(bot_message)

    # Sửa ended_at của bảng conversations
    conv.ended_at = datetime.now()
    
    # Lưu thay đổi vào cơ sở dữ liệu
    db.session.commit()

# Phát tin nhắn mới tới phòng WebSocket của cuộc hội thoại
    # print(f"Emitting user message to room conversation_{conv_id} with content: {user_message.message}")
    socketio.emit('new_message', {
        "message_id": user_message.id,
        "message": user_message.message,
        "sender": user_message.sender,
        "timestamp": user_message.timestamp.isoformat()
    }, room=f"conversation_{conv_id}")
    
    # print(f"Emitting bot message to room conversation_{conv_id} with content: {bot_message.message}")
    socketio.emit('new_message', {
        "message_id": bot_message.id,
        "message": bot_message.message,
        "sender": bot_message.sender,
        "timestamp": bot_message.timestamp.isoformat()
    }, room=f"conversation_{conv_id}")


    return jsonify({"response": response.text}), 200

@socketio.on("join")
# @jwt_required()
def on_join(data):
    room = data.get("room")
    if room:
        join_room(room)
        emit("status", {"msg": f"Joined room {room}"}, room=room)

# Phát thử nghiệm
@socketio.on("test_message")
def test_message():
    emit("new_message", {"message": "Test message from server"}, broadcast=True)

