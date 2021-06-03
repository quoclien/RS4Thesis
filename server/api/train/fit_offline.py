import sys
import os
import joblib
import argparse
from dotenv import load_dotenv
from pathlib import Path
from mongo import db
from api.product import product_controller

MODELS = ['ubr', 'iir', 'ctf']


def fit_ctf(raw_data):
    # Initiate and train model
    ctf_text_rec = CTFTextRecommender(options={
        '__language': 'english',
        '__use_cols': ['title', 'title_orig']
    })
    data_items = ctf_text_rec.prepare_trainset(raw_data)
    ctf_text_rec.fit(data_items)

    # # Save trained model
    p = Path(__file__).parent / 'ctf_rec/ctf_rec.joblib'
    joblib.dump(ctf_text_rec, p)
    # Compress model
    # os.system(f'gzip -kf {str(p)}')


def fit_iir(raw_data):
    iir_rec = IIRatingRecommender(options={
        '__pos_rating': 3
    })
    merge_data = iir_rec.prepare_trainset(raw_data)
    iir_rec.fit(merge_data)

    # # Save trained model
    p = Path(__file__).parent / 'iir_rec/iir_rec.joblib'
    joblib.dump(iir_rec, p)
    # Compress model
    os.system(f'gzip -kf {str(p)}')

def fit_ubr(raw_data):
    urb_rec = UBRRecommender(options={
        '__use_cols': ['app_id', 'author', 'rating']
    })
    clean_data = urb_rec.prepare_trainset(raw_data)
    # urb_rec.fit(clean_data)

    # # Save trained model
    # p = Path(__file__).parent / 'urb_rec/urb_rec.joblib'
    # joblib.dump(urb_rec, p)
    # # Compress model
    # os.system(f'gzip -kf {str(p)}')

if __name__ == '__main__':
    load_dotenv(verbose=True)
    sys.path.append(str(Path(__file__).parent.parent))
    from api.train.ctf_rec.model import CTFTextRecommender
    from api.train.iir_rec.model import IIRatingRecommender
    from api.train.ubr_rec.model import UBRRecommender

    parser = argparse.ArgumentParser(description='Train/Fit rs model')
    parser.add_argument('model', metavar='model', type=str, choices=MODELS,
                        help='model to fit/train')

    args = parser.parse_args()
    model = args.model

    if model == 'ctf':
        raw_data = product_controller.find_product(
            {}, {'_id': 1, 'title': 1, 'title_orig': 1})
        fit_ctf(raw_data)
    elif model == 'iir':
        reviews_collection = db.reviews
        raw_data = reviews_collection.find({}, {'app_id': 1, 'rating': 1})
        fit_iir(raw_data)
    elif model == 'ubr':
        reviews_collection = db.reviews
        raw_data = reviews_collection.find({}, {'app_id': 1, 'rating': 1, 'author' : 1})
        fit_ubr(raw_data)
