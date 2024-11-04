from library.extension import db
from library.library_ma import ConversationSchema
from library.model import Conversation
from flask import request, jsonify
from sqlalchemy.sql import func
import json

conversation_schema = ConversationSchema()
conversations_schema = ConversationSchema(many=True)

def get_convs_by_user_id_service(user_id):
    # Lấy tất cả các hội thoại có cùng user_id
    conversations = Conversation.query.filter_by(user_id=user_id).all()
    
    if conversations:
        return conversations_schema.jsonify(conversations), 200
    else:
        return jsonify({"message": "Không tìm thấy hội thoại nào cho người dùng này"}), 404