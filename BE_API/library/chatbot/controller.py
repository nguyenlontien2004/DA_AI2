from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extension import db
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

    if conv:
        if conv.user_id != get_jwt_identity():
            return jsonify({"error": "Bạn không có quyền ở tin nhắn này"}), 401

    # Lấy lịch sử hội thoại từ bảng messages
    history = Message.query.filter_by(conversation_id=conv_id).order_by(Message.timestamp).all()
    
    # Chuyển đổi lịch sử hội thoại thành định dạng yêu cầu
    history_text = [
        {
            "role": msg.sender,
            "parts": [{"text": msg.message}]
        }
        for msg in history
    ]

    # Tạo phiên hội thoại với lịch sử
    chat_session = model.start_chat(history=history_text)

    # Gửi tin nhắn từ người dùng tới chatbot
    response = chat_session.send_message(user_input)
    
    # Lưu tin nhắn người dùng vào bảng messages
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
        message=response.text,  # `response.text` chứa nội dung phản hồi của chatbot
        timestamp=datetime.now()
    )
    db.session.add(bot_message)

    #Sửa ended_at của bảng convertions
    conv = Conversation.query.get(conv_id)
    if conv:
        conv.ended_at = datetime.now()
    else:
        return jsonify({"error": "Conversation not found"}), 404

    # Lưu thay đổi vào cơ sở dữ liệu
    db.session.commit()

    return jsonify({"response": response.text}), 200
