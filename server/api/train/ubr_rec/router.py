# import joblib
# from pathlib import Path
# from flask import Blueprint
# from flask import request as req
# from utils import to_dict, to_objectid
# from mongo import db
# from api.train.ubr_rec.model import UBRRecommender

# ubr_rec_blueprint = Blueprint('ubr_rec', __name__)
# ubr_rec_path = Path(__file__).parent / 'ubr_rec.joblib'
# urb_rec = UBRRecommender()
# if ubr_rec_path.is_file():
#     ubr_rec = joblib.load(ubr_rec_path)

# @ubr_rec_blueprint.route('/<string:user_id>', methods=['GET'])
# def recommend(user_id):
#     try:
#         body = req.get_json()
#         limit = req.args.get('limit', 10, type=int)
#         pids = ubr_rec.recommend(user_id)
#         print(pids)
#         # cursor = db.products.find({'product_id': {'$in': pids}})
#         # products = [to_dict(doc) for doc in cursor]
#         return {'data': 'products'}
#     except:
#         return {'error': 'Lấy gợi ý sản phẩm thất bại'}
