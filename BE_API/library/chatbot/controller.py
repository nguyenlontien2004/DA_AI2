from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extension import db
from ..model import User, Conversation, Message
import google.generativeai as genai
from datetime import datetime

# Cấu hình API Key cho Gemini
genai.configure(api_key="Thay bằng Api Key")  

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
# chat_session = model.start_chat(history=[])

# Khởi tạo Blueprint cho chatbot API
chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/chat/start', methods=['POST'])
@jwt_required()
def start_chat():
    user_id = get_jwt_identity()

    # Tạo một cuộc hội thoại mới
    new_conversation = Conversation(user_id=user_id, started_at=datetime.now())
    db.session.add(new_conversation)
    db.session.commit()

    return jsonify({
        "message": "Đã bắt đầu thêm hội thoại mới",
        "conversation_id": new_conversation.id
    }), 200

@chat_bp.route('/chat/message/<int:conv_id>', methods=['POST']) 
@jwt_required()
def chat(conv_id):
    data = request.json
    user_input = data.get("message")
    
    if not user_input:
        return jsonify({"error": "Please provide a message."}), 400

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
