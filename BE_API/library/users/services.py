from library.extension import db
from library.library_ma import UserSchema
from library.model import User
from flask import request, jsonify
from sqlalchemy.sql import func
import json

user_schema = UserSchema()
users_schema = UserSchema(many=True)

#thêm
def add_user_service():
    data = request.json
    if (data and ('username' in data) and ('email' in data)
        and ('password' in data)):

        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        # created_at = request.json['created_at']

        try:
            new_user = User(username, email, password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify ({"message": "Thêm người dùng thành công!"}), 201
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Thêm thất bại !"}), 400
        
    else:
        return jsonify({"message": "Không bỏ trống các trường"}), 400
#lấy user bằng id
def get_user_by_id_services(id):
    user = User.query.get(id)
    if user:
        return user_schema.jsonify(user)
    else:
        return jsonify({"message": "Không tìm thấy người dùng"}), 404
# lấy tất cả user    
def get_all_user_services():
    users = User.query.all()
    if users:
        return users_schema.jsonify(users)
    else:
        return jsonify({"message": "Không tìm thấy người dùng"}), 404
# sửa user    
def update_user_by_id_services(id):
    user = User.query.get(id)
    data = request.json
    if user:
        if data and "username" in data:
            try:
                user.username = data["username"]
                db.session.commit()
                return user_schema.jsonify(user)
            except IndentationError:
                db.session.rollback()
                return jsonify({"message": "Sửa thất bại"}), 400
    else:
        return jsonify({"message": "Không tìm thấy sách"}), 404
    
def delete_user_by_id_services(id):
    user = User.query.get(id)
    if user:
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "Xóa thành công!"}), 204
        except IndentationError:
            db.session.rollback()
            return jsonify({"message": "Xóa thất bại"}), 400
    else:
        return jsonify({"message": "Không tìm thấy người dùng cần xóa"}), 404
