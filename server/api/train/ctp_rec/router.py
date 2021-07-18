import joblib
from pathlib import Path
from flask import Blueprint
from flask.globals import request
from utils import to_dict, to_objectid
from mongo import db
from api.train.ctp_rec.model import CTPRecommend
from response import response_to_client
from flask_cors import CORS
from response import response_to_client

ctp_rec_blueprint = Blueprint('ctp_rec', __name__)
ctp_rec_path = Path(__file__).parent / 'ctp_rec.joblib'
ctp_rec = CTPRecommend()
if ctp_rec_path.is_file():
    ctp_rec = joblib.load(ctp_rec_path)


# CORS(ctp_rec_blueprint)

@ctp_rec_blueprint.route('/', methods=['POST'])
def recommend():
  try:
    limit = request.args.get('limit', 10, type=int)

    body = request.get_json()
    ids = ctp_rec.recommend(body, limit=limit)
    print(ids)
    cursor = db.product.find({'_id': {'$in': ids}})
    products = [to_dict(doc) for doc in cursor]
    # return response_to_client(status= HTTP_Status.SUCCESS, data= dumps(products))
    return {'data': products}
  except:
    return {'error': 'Lấy gợi ý thất bại'}