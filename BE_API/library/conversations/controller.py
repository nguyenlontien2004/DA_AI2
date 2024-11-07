from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from library.extension import db
from library.model import Conversation, Message
from library.library_ma import ConversationSchema 

conversation_schema = ConversationSchema()
conversations_schema = ConversationSchema(many=True)

conv_bp = Blueprint("conv_bp", __name__)

@conv_bp.route('/conversations', methods=['GET'])
@jwt_required()
def get_conversations_by_user():
    user_id = get_jwt_identity()  # Lấy user_id từ token JWT

    conversations = Conversation.query.filter_by(user_id=user_id).order_by(Conversation.ended_at.desc()).all()

    if not conversations:
        return jsonify({"error": "Không tìm thấy hội thoại cho người dùng này"}), 404

    return jsonify(conversations_schema.dump(conversations)), 200

@conv_bp.route('/conversation/<int:id>', methods=['PUT'])
@jwt_required()
def update_conversation(id):
    conv = Conversation.query.get(id)

    if conv.user_id != get_jwt_identity():
        return jsonify({"error": "Bạn không có quyền với cuộc trò chuyện này"}), 401
    
    data = request.json
    if conv:
        if data and "name" in data:
            try:
                conv.name = data["name"]
                db.session.commit()
                return conversation_schema.jsonify(conv)
            except IndentationError:
                db.session.rollback()
                return jsonify({"error": "Sửa thất bại"}), 400
    else:
        return jsonify({"error": "Không tìm thấy cuộc hội thoại"}), 404
    
@conv_bp.route('/conversation/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_conversation(id):
    conv = Conversation.query.get(id)
    
    if not conv:
        return jsonify({"error": "Không tìm thấy cuộc hội thoại"}), 404

    if conv.user_id != get_jwt_identity():
        return jsonify({"error": "Bạn không có quyền với cuộc trò chuyện này"}), 401

    try:
        # Xóa các message liên quan trước
        Message.query.filter_by(conversation_id=id).delete()
        
        # Xóa conversation
        db.session.delete(conv)
        db.session.commit()
        return jsonify({"message": "Xóa thành công!"}), 204
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Xóa thất bại", "error": str(e)}), 400
    