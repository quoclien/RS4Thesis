from utils import to_dict
from mongo import db
from bson.objectid import ObjectId


def get_products(filter, *args, **kwargs):
    product_collection = db.product
    cursor = product_collection.find(filter=filter, *args, **kwargs)
    return [to_dict(doc) for doc in cursor]

def find_product(query, select):
    product_collection = db.product
    products = product_collection.find(query)
    return products

# def get_product_by_id(product_id):
#     product_collection = db.product
#     product = product_collection.find_one({"_id": ObjectId(product_id)})
#     return product