import joblib
from pathlib import Path
from flask import Blueprint
from flask import request as req
from utils import to_dict, to_objectid
from mongo import db
from api.train.ucf_rec.model import UCFRecommender
from api.product import product_controller

ucf_rec_blueprint = Blueprint('ucf_rec', __name__)
ucf_rec_path = Path(__file__).parent / 'ucf_rec.joblib'
ucf_rec = UCFRecommender()
if ucf_rec_path.is_file():
    ucf_rec = joblib.load(ucf_rec_path)


@ucf_rec_blueprint.route('/<string:uid>', methods=['GET'])
def recommend(uid):
    offset = req.args.get('offset', 0, type=int)
    limit = req.args.get('limit', 10, type=int)

    pids = ucf_rec.recommend(uid, offset=offset, limit=limit)
    cursor = db.products.find({'_id': {'$in': pids}})
    products = [to_dict(doc) for doc in cursor]
    return {'data': products}
