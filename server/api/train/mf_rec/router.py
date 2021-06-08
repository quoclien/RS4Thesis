import joblib
from pathlib import Path
from flask import Blueprint
from flask import request as req
from mongo import db
from utils import to_dict

mf_rec_blueprint = Blueprint('mf_rec', __name__)
mf_rec = joblib.load(Path(__file__).parent / 'mf_rec.joblib')

@mf_rec_blueprint.route('/<string:user_id>', methods=['GET'])
def recommend(user_id):
    pids = mf_rec.pred_for_user(user_id)
    movies_collection = db.movies
    cursor = movies_collection.find({'id': {'$in': pids}})
    products = [to_dict(doc) for doc in cursor]
    return {'data': products}