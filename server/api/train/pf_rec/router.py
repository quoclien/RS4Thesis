import joblib
from pathlib import Path
from flask import Blueprint
from flask import request as req
from utils import to_dict, to_objectid
from mongo import db
from api.train.pf_rec.model import PFRecommend

pf_rec_blueprint = Blueprint('pf_rec', __name__)
pf_rec_path = Path(__file__).parent / 'pf_rec.joblib'
pf_rec = PFRecommend()
if pf_rec_path.is_file():
    pf_rec = joblib.load(pf_rec_path)


@pf_rec_blueprint.route('/<string:item_id>', methods=['GET'])
def recommend(item_id):
    try:
        limit = req.args.get('limit', 10, type=int)
        pids = pf_rec.recommend(limit=limit)
        if item_id in pids: pids.remove(item_id)
        cursor = db.products.find({'product_id': {'$in': pids}})
        products = [to_dict(doc) for doc in cursor]
        return {'data': products}
    except:
        return {'error': 'Lấy sản phẩm gợi ý thất bại'}        