from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from library.extension import db
from library.model import Conversation
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
