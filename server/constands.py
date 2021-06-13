from enum import Enum

class HTTP_Status(Enum):
    SUCCESS = 200
    CREATED = 201
    BAC_REQUEST = 400
    UNAUTHORIZED = 401
    NOT_ACCEPT = 406
    SERVER_ERROR = 500