from flask import Blueprint, jsonify
from flask.globals import request
from mongo import db
from bson.json_util import loads, dumps
from utils import to_dict, decode_jwt, encode_jwt
from api.auth import authenticate
from utils import to_dict, to_objectid

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        username = body['username']
        password = request.json['password']
        if username != password:
            return {'error': 'tài khoản hoặc mật khẩu không đúng.'}

        collection = db.users
        user = collection.find_one({'username': username})
        if user == None:
            return {'error': 'tài khoản hoặc mật khẩu không đúng'}
    
        # json_str = dumps(user)
        token = encode_jwt({'id': str(user['_id']), 'user_id': user['user_id']})
        print(token)
        data = {
            "token": token, "user_id": user['user_id']
        }
        print(data)
        return {'data': data}
    except:
        return {'error': 'tài khoản hoặc mật khẩu không đúng'}

@user_blueprint.route('/events', methods=['GET'])
@authenticate
def getReviews():
    try:
        user_id = request.user['user_id']
        page = int(request.args.get('page'))
        limit = int(request.args.get('limit'))

        events_colelection = db.events
        cursor = events_colelection.find({'user_id': user_id}).skip(page*limit).limit(limit)
        
        products = []
        products_collection = db.products
        for doc in cursor:
            products.append(products_collection.find_one({'product_id': doc['product_id']}))
        return {'data': [to_dict(doc) for doc in products]}
    except:
        return {'error': 'lấy thông tin thất bại'}

@user_blueprint.route('/<string:user_id>', methods=['GET'])
def getInfo(user_id):
    try:
        users = db.users.find_one({'user_id': user_id})
        del users['_id']
        return {'data': users}
    except:
        return {'error': 'lấy thông tin thất bại'}