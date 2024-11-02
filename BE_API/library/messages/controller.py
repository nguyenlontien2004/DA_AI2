from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from library.model import Message, Conversation
from library.library_ma import MessageSchema

message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)

message_bp = Blueprint("message_bp", __name__)

@message_bp.route('message/<int:conv_id>', methods = ['GET'])
@jwt_required()
def get_message_by_conv_id(conv_id):
    messages = (
        Message.query
        .join(Conversation, Message.conversation_id == Conversation.id)
        .filter(Message.conversation_id == conv_id)
        .order_by(Message.timestamp)
        .add_columns(Conversation.user_id)  # Lấy cả user_id từ bảng conversations
        .all()
    )

    if not messages:
        return jsonify({"error": "Không tìm thấy tin nhắn trong cuộc hội thoại này"}), 404
    
    first_message_user_id = messages[0][1]  # messages[0][1] là user_id từ tuple đầu tiên

    # Kiểm tra quyền truy cập
    if first_message_user_id != get_jwt_identity():
        return jsonify({"error": "Bạn không thể truy cập tin nhắn"}), 401
    
    # Chuyển đổi messages thành danh sách dict để trả về JSON
    results = []
    for message, user_id in messages:
        results.append({
            "message_id": message.id,
            "message": message.message,
            "sender": message.sender,
            "timestamp": message.timestamp.isoformat(),
            "user_id": user_id
            # Thêm các trường khác từ message nếu cần
        })
    
    return jsonify(results), 200
