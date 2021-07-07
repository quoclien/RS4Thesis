import os
import jwt
from bson.objectid import ObjectId


def to_dict(doc):
    obj = {}
    for [key, val] in doc.items():
        if isinstance(val, ObjectId):
            obj[key] = str(val)
        else:
            obj[key] = val
    return obj


def is_oid(s):
    return ObjectId.is_valid(s)


def to_objectid(ids):
    if type(ids) == str:
        return ObjectId(ids)
    elif type(ids) == dict:
        obj = {}
        for k, v in ids.items():
            if is_oid(v):
                obj[k] = ObjectId(v)
            else:
                obj[k] = v
        return obj
    return [ObjectId(id) for id in ids]

def decode_jwt(token):
    try:
        secret_key = os.getenv('SECRET_KEY') + ''
        payload = jwt.decode(token, secret_key, algorithms='HS256')

        return {'valid': True, 'payload': payload}
    except:
        return {'valid': False}


def encode_jwt(payload):
    try:
        secret_key = os.getenv('SECRET_KEY') + ''
        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return token
    except Exception as e:
        print(e)
        return ''