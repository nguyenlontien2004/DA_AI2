from openai import OpenAI
import os
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from datetime import datetime
from dotenv import load_dotenv
from flask import Blueprint, request, jsonify
from ..extension import db, socketio
from ..model import User, Conversation, Message
from flask_socketio import emit, join_room

# Load API key từ file .env
load_dotenv()
api_key = os.getenv("GPT_API_KEY")

# Tạo Blueprint cho các API liên quan đến ChatGPT
chatgpt_bp = Blueprint("chatgpt", __name__)

@chatgpt_bp.route('/chatgpt/message/<int:conv_id>', methods=['POST'])
@jwt_required()
def chat(conv_id):
    data = request.json
    user_input = data.get("message")
    
    if not user_input:
        return jsonify({"error": "Vui lòng nhập tin nhắn"}), 400
    
    # Kiểm tra sự tồn tại của cuộc hội thoại
    conv = Conversation.query.get(conv_id)
    if conv:
        if conv.user_id != get_jwt_identity():
            return jsonify({"error": "Bạn không có quyền ở tin nhắn này"}), 401
    else:
        return jsonify({"error": "Cuộc hội thoại không tồn tại"}), 404

    # Lấy lịch sử hội thoại từ bảng messages
    history = Message.query.filter_by(conversation_id=conv_id).order_by(Message.timestamp).all()
    
    # Chuyển đổi lịch sử hội thoại thành định dạng yêu cầu cho OpenAI API
    history_text = [
        {
            "role": 'system' if msg.sender == "model" else msg.sender,
            "content": msg.message
        }  # Chuyển đổi sang định dạng yêu cầu
        for msg in history
    ]

    try:
        # Tạo client OpenAI
        client = OpenAI(api_key=api_key)

        # Gọi OpenAI API để tạo phản hồi
        completion = client.chat.completions.create(
            model="gpt-4o",  # Hoặc "gpt-3.5-turbo" nếu bạn muốn mô hình nhẹ hơn
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                *history_text,  # Lịch sử hội thoại
                {"role": "user", "content": user_input}
            ]
        )
        
        # Trả về nội dung phản hồi từ API
        response_content = completion.choices[0].message.content

        user_message = Message(
            conversation_id=conv_id,
            sender="user",
            message=user_input,
            timestamp=datetime.now()
        )
        db.session.add(user_message)

        # Lưu phản hồi chatbot vào bảng messages
        bot_message = Message(
            conversation_id=conv_id,
            sender="model",
            message=response_content,
            timestamp=datetime.now()
        )
        db.session.add(bot_message)

        # Cập nhật thời gian kết thúc cuộc hội thoại
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

        return jsonify({"response": response_content}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
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
    
#________________
# def generate_openai_response():
    data = request.json
    user_input = data.get("message")

    if not user_input:
        return jsonify({"error": "Vui lòng cung cấp tin nhắn"}), 400

    try:
        # Tạo client OpenAI
        client = OpenAI(api_key=api_key)

        # Gọi OpenAI API để tạo phản hồi
        completion = client.chat.completions.create(
            model="gpt-4o", 
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ]
        )
        
        # Trả về nội dung phản hồi từ API
        response_content = completion.choices[0].message.content
        return jsonify({"response": response_content}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
