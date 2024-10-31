from flask import Blueprint, request, jsonify
from ..extension import db
from ..model import User, Conversation, Message
import google.generativeai as genai
from datetime import datetime

# Cấu hình API Key cho Gemini
genai.configure(api_key="Thay bằng API Key")  

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

# Tạo phiên trò chuyện (session)
chat_session = model.start_chat(history=[])

# Khởi tạo Blueprint cho chatbot API
chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat/start', methods=['POST'])
def start_chat():
    data = request.json
    user_id = data.get("user_id")

    # Tạo một cuộc hội thoại mới
    new_conversation = Conversation(user_id=user_id, started_at=datetime.now())
    db.session.add(new_conversation)
    db.session.commit()

    return jsonify({
        "message": "Đã bắt đầu thêm hội thoại mới",
        "conversation_id": new_conversation.id
    }), 200

@chat_bp.route('/chat/message', methods=['POST'])
def chat():
    data = request.json
    conversation_id = data.get("conversation_id")
    user_input = data.get("message")
    
    if not user_input:
        return jsonify({"error": "Please provide a message."}), 400

    # Gửi tin nhắn từ người dùng tới chatbot
    response = chat_session.send_message(user_input)

    # Lưu tin nhắn người dùng vào bảng messages
    user_message = Message(
        conversation_id=conversation_id,
        sender="user",
        message=user_input,
        timestamp=datetime.now()
    )
    db.session.add(user_message)

    # Lưu phản hồi chatbot vào bảng messages
    bot_message = Message(
        conversation_id=conversation_id,
        sender="chatbot",
        message=response.text,
        timestamp=datetime.now()
    )
    db.session.add(bot_message)

    # Lưu thay đổi vào cơ sở dữ liệu
    db.session.commit()

    return jsonify({"response": response.text}), 200

@chat_bp.route('/chat/end', methods=['POST'])
def end_chat():
    data = request.json
    conversation_id = data.get("conversation_id")

    # Cập nhật thời gian kết thúc cuộc trò chuyện
    conversation = Conversation.query.get(conversation_id)
    if conversation:
        conversation.ended_at = datetime.now()
        db.session.commit()
        return jsonify({"message": "Conversation ended."}), 200
    else:
        return jsonify({"error": "Conversation not found."}), 404
