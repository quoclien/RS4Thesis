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
        user_id = request.user['username']
        page = int(request.args.get('page'))
        limit = int(request.args.get('limit'))
        print(user_id)
        events_colelection = db.events
        cursor = events_colelection.find({'uid': user_id}, {'user_session': 0}).skip(page*limit).limit(limit)
        products_collection = db.products
        products = []
        for doc in cursor:
            products.append(products_collection.find_one({'_id': doc['product_id']}))
        # return response_to_client(status= HTTP_Status.SUCCESS, data= products)
        # print(products)
        
        return {'data': products}
    except:
        return {'error': 'lấy thông tin thất bại'}