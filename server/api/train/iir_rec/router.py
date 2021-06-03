import joblib
from pathlib import Path
from flask import Blueprint
from flask import request as req
from api.product import product_controller
from mongo import db
from utils import to_dict

iir_rec_blueprint = Blueprint('iir_rec', __name__)
iir_rec = joblib.load(Path(__file__).parent / 'iir_rec.joblib')

@iir_rec_blueprint.route('/<string:method>', methods=['GET'])
def recommend(method):
    pids = iir_rec.recommend(method)
    reviews_collection = db.apps
    cursor = reviews_collection.find({'id': {'$in': pids}})
    print(cursor)
    products = [to_dict(doc) for doc in cursor]
    return {'data': products}