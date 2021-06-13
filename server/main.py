import os
import json
from pathlib import Path
from dotenv import load_dotenv
from flask import Flask
from flask import request as req
from flask import Response as res
from mongo import client, db
from bson.json_util import dumps, loads
from api import routes

# init app
app = Flask(__name__)

# load envs
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path, verbose=True)

app.config['MONGO_URI'] = os.getenv('MONGO_URI')
app.config['DB_NAME'] = os.getenv('DB_NAME')

# connect database

app.client = client
app.db = db

# init routers
routes.init(app)

# default router
@app.route('/')
def default_route():
    product_collection = db.product
    data = product_collection.find_one({"price": "12"})
    return dumps(data)


# # get products
# @app.route('/products')
# def get_products():
#     page = req.args.get('page', 0, type=int)
#     limit = req.args.get('limit', 10, type=int)
#     product_collection = db.product
#     data = product_collection.find().skip(page*limit).limit(limit)
#     resp = res(dumps(data), status=200, mimetype='application/json')
#     return resp



if __name__ == '__main__':
    load_dotenv(verbose=True)

    FLASK_ENV = os.getenv('FLASK_ENV')
    # FLASK_HOST = os.getenv('FLASK_HOST')
    FLASK_PORT = os.getenv('FLASK_PORT')

    app.env = FLASK_ENV
    app.run(port=FLASK_PORT)
