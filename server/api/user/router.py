from flask import Blueprint
from flask.globals import request
from mongo import db
from bson.json_util import loads, dumps
from utils import to_dict, decode_jwt, encode_jwt
from api.auth import authenticate

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/login', methods=['POST'])
def login():
    try:
        body = request.get_json()
        username = body['username']
        password = request.json['password']
        if username != password:
            return {'error': 'tài khoản hoặc mật khẩu không đúng.'}

        collection = db.user
        user = collection.find_one({'username': username})
        if user == None:
            return {'error': 'tài khoản hoặc mật khẩu không đúng'}
    
        # json_str = dumps(user)
        token = encode_jwt({'id': str(user['_id']), 'username': user['username']})
        print(token)
        return {'data': token}
    except:
        return {'error': 'tài khoản hoặc mật khẩu không đúng'}

@user_blueprint.route('/events', methods=['GET'])
@authenticate
def getReviews():
    try:
        user_id = request.user['_id']
        page = int(request.args.get('page'))
        limit = int(request.args.get('limit'))

        events_colelection = db.events
        cursor = events_colelection.find({'user_id': user_id}, {'user_session': 0}).skip(page*limit).limit(limit)
        products_collection = db.products
        for doc in cursor:
            doc['product_info'] = products_collection.find_one({'_id': doc['product_id']})
        # [ids.append(doc['product_id']) for doc in cursor]
        # products_collection = db.products
        # cursor = products_collection.find({'_id': {'$in': ids}})
        # product = [to_dict(doc) for doc in cursor]
        return {'data': doc}
    except:
        return {'error': 'lấy thông tin thất bại'}