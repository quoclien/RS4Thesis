import joblib
from pathlib import Path
from flask import Blueprint
from flask import request as req
from api.product import product_controller
from mongo import db

ctf_rec_blueprint = Blueprint('ctf_rec', __name__)
ctf_rec = joblib.load(Path(__file__).parent / 'ctf_rec.joblib')

@ctf_rec_blueprint.route('/<string:item_id>', methods=['GET'])
def recommend(item_id):
    pids = ctf_rec.recommend(item_id)
    products_collection = db.products
    products_corsor = products_collection.find({'_id': {'$in': pids}})

    products = []
    for doc in products_corsor:
        products.append(doc)        

    return {'data': products}

    