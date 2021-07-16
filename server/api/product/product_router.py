from flask import Blueprint
from flask import request as req
from flask import Response as res
from bson.json_util import dumps
from constands import HTTP_Status
from response import response_to_client
from api.product import product_controller
from mongo import db

product_blueprint = Blueprint('products', __name__)

@product_blueprint.route("/", methods=['GET'])
def getProducts():
    try:
        product_id = req.args.get('product_id', None, type=str)
        products_collection = db.products
        if product_id is None:
            page = req.args.get('page', 0, type=int)
            limit = req.args.get('limit', 10, type=int)
            products = products_collection.find({}).skip(page*limit).limit(limit)
            return response_to_client(status= HTTP_Status.SUCCESS, data= dumps(products))
        else:
            product = products_collection.find_one({"_id": product_id})
            return response_to_client(status= HTTP_Status.SUCCESS, data= dumps(product))
    except:
        return {'error': 'Lấy sản phẩm thất bại'}
