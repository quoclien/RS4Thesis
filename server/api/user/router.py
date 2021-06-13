from flask import Blueprint
from flask.globals import request
from mongo import db
from bson.json_util import loads, dumps
from utils import to_dict

user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    collection = db.users
    user = collection.find_one({'user_id': username})
    json_str = dumps(user)
    return {'data': json_str}

@user_blueprint.route('/ratings', methods=['GET'])
def getReviews():
    username = request.form['username']
    page = int(request.args.get('page'))
    limit = int(request.args.get('limit'))
    
    ratings_colelection = db.ratings
    cursor = ratings_colelection.find({'user_id': username}, {'movie_id': 1}).skip(page*limit).limit(limit)
    ids = []
    [ids.append(doc['movie_id']) for doc in cursor]

    movies_collection = db.movies
    cursor = movies_collection.find({'movie_id': {'$in': ids}})
    movie = [to_dict(doc) for doc in cursor]
    return {'data': movie}