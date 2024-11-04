from flask import Blueprint
from .services import (add_user_service, get_user_by_id_services, 
                       get_all_user_services, update_user_by_id_services,
                       delete_user_by_id_services)

user = Blueprint("user", __name__)

@user.route("/user", methods = ['GET'])
def get_all_user():
    return get_all_user_services()

@user.route("/user", methods = ['POST'])
def add_user():
    return add_user_service()

@user.route("/user/<int:id>", methods = ['GET'])
def get_user_by_id(id):
    return get_user_by_id_services(id)

@user.route("/user/<int:id>", methods = ['PUT'])
def update_user_by_id(id):
    return update_user_by_id_services(id)

@user.route("/user/<int:id>", methods = ['DELETE'])
def delete_user_by_id(id):
    return delete_user_by_id_services(id)