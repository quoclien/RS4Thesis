from flask import Response as res
from constands import HTTP_Status

def response_to_client(status=HTTP_Status.SUCCESS ,data = {}):
    return res(data, status.value, mimetype='application/json')

