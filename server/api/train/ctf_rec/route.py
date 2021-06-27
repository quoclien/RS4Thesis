import joblib
from pathlib import Path
from flask import Blueprint
from flask import request as req
from api.product import product_controller

ctf_rec_blueprint = Blueprint('ctf_rec', __name__)
ctf_rec = joblib.load(Path(__file__).parent / 'ctf_rec.joblib')

@ctf_rec_blueprint.route('/<string:item_id>', methods=['GET'])
def recommend(item_id):
    print(item_id)
    pids = ctf_rec.recommend(item_id)
    print(pids)
    products = product_controller.get_products({'_id': {'$in': pids}})
    return {'data': products}