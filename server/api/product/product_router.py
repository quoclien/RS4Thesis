from flask import Blueprint
from flask import request as req
from flask import Response as res
from bson.json_util import dumps
from constands import HTTP_Status
from response import response_to_client
from api.product import product_controller

product_blueprint = Blueprint('products', __name__)

@product_blueprint.route("/", methods=['GET'])
def getProducts():
    print(req.args)
    product_id = req.args.get('product_id', None, type=str)

    if product_id is None:
        page = req.args.get('page', 0, type=int)
        limit = req.args.get('limit', 10, type=int)
        products = product_controller.get_products({}, None, page, limit)
        return response_to_client(status= HTTP_Status.SUCCESS, data= dumps(products))
    else:
        product = product_controller.get_product_by_id(product_id)
        return response_to_client(status= HTTP_Status.SUCCESS, data= dumps(product))

