from bson.objectid import ObjectId


def to_dict(doc):
    obj = {}
    for [key, val] in doc.items():
        if isinstance(val, ObjectId):
            obj[key] = str(val)
        else:
            obj[key] = val
    return obj


