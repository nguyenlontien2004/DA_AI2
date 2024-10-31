# library/auth/controller.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from library.extension import db
from library.model import User

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Kiểm tra username đã tồn tại chưa
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Tên người dùng đã tồn tại"}), 400

    # Kiểm tra email đã tồn tại chưa
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email đã tồn tại"}), 400

    # Mã hóa mật khẩu
    hashed_password = generate_password_hash(password)

    # Tạo người dùng mới
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Đăng kí thành công"}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    # Kiểm tra username và mật khẩu
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Sai tài khoản hoặc mật khẩu"}), 401

    # Tạo access token
    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token}), 200
