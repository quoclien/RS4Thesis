import os
from utils import decode_jwt
from functools import wraps
from flask import current_app as app, request as req

def authenticate(done):
    @wraps(done)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in req.headers:
            token = req.headers['Authorization']
        if 'authorization' in req.headers:
            token = req.headers['authorization']
        (prefix, token) = token.split(
            ' ') if token and ' ' in token else (None, token)
        if not token:
            return {'error': 'Authorization token is missing'}, 401
        try:
            unauth_response = {'message': 'User is unauthorized'}
            decoded = decode_jwt(token)
            
            if not decoded['valid']:
                return unauth_response, 401
            uid = decoded['payload']['username']
            user = app.db['user'].find_one(
                {'username': uid}, projection=['name', 'avatar', 'username', '_id'])
            if user:
                req.user = user
                # return done(uid, *args, **kwargs)
                return done(*args, **kwargs)
            return unauth_response, 401
        except Exception as exp:
            if app.get('DEBUG'):
                print(exp)
            return {'message': 'Authentication failed'}, 500
    return decorated
    