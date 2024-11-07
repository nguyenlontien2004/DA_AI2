from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from library.extension import db, jwt, blacklist
from library.model import User
from sqlalchemy import or_

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Tên người dùng đã tồn tại"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email đã tồn tại"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Đăng kí thành công"}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username_or_email = data.get("username_or_email")
    password = data.get("password")

    user = User.query.filter(or_(User.username == username_or_email, User.email == username_or_email)).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Sai tài khoản hoặc mật khẩu"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200

@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  # Lấy JWT ID của token hiện tại
    blacklist.add(jti)  # Thêm token vào danh sách đen
    return jsonify({"message": "Đăng xuất thành công"}), 200
