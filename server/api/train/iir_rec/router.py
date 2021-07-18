import joblib
from pathlib import Path
from flask import Blueprint
from flask import request as req
from mongo import db
from utils import to_dict

iir_rec_blueprint = Blueprint('iir_rec', __name__)
iir_rec = joblib.load(Path(__file__).parent / 'iir_rec.joblib')

@iir_rec_blueprint.route('/<string:method>', methods=['GET'])
def recommend(method):
    try:
        pids = iir_rec.recommend(method)
        products_collection = db.products
        cursor = products_collection.find({'product_id': {'$in': pids}})
        products = [to_dict(doc) for doc in cursor]
        return {'data': products}
    except:
        return {'error': 'Lấy gợi ý sản phẩm thất bại'}