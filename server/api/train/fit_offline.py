import sys
import os
import joblib
import argparse
from dotenv import load_dotenv
from pathlib import Path
from mongo import db
from api.product import product_controller

MODELS = ['ubr', 'iir', 'ctf', 'mf', 'ucf', 'ctp', 'pf']

def fit_ctf(raw_data):
    # Initiate and train model
    ctf_text_rec = CTFTextRecommender(options={
        '__language': 'english',
        '__use_cols': ['name', 'category_code']
    })
    data_items = ctf_text_rec.prepare_trainset(raw_data)
    ctf_text_rec.fit(data_items)

    # # Save trained model
    p = Path(__file__).parent / 'ctf_rec/ctf_rec.joblib'
    joblib.dump(ctf_text_rec, p)
    # Compress model
    os.system(f'gzip -kf {str(p)}')


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
    urb_rec = UBRRecommender()
    clean_data = urb_rec.prepare_trainset(raw_data)
    urb_rec.fit(clean_data)

    # Save trained model
    p = Path(__file__).parent / 'ubr_rec/ubr_rec.joblib'
    joblib.dump(urb_rec, p)
    # Compress model
    os.system(f'gzip -kf {str(p)}')


def fit_mf(raw_data):
    clean_data = prepare_trainser(raw_data)
    mf_rec = MFRecommend(clean_data, K=2, lam=0.1, print_every=2,
                         learning_rate=2, max_iter=2, user_based=0)
    mf_rec.fit()

    # Save trained model
    p = Path(__file__).parent / 'mf_rec/mf_rec.joblib'
    joblib.dump(mf_rec, p)
    # Compress model
    os.system(f'gzip -kf {str(p)}')


def fit_ucf(raw_data, method='pearson'):
    # prepare user_item matrix
    user_item = prepare_trainset(raw_data)

    # initiate and train model
    ucf_rec = UCFRecommender()
    ucf_rec.fit(user_item=user_item, method=method)

    # Save trained model
    p = Path(__file__).parent / 'ucf_rec/ucf_rec.joblib'
    joblib.dump(ucf_rec, p)

    # Compress model
    os.system(f'gzip -kf {str(p)}')


def fit_ctp(raw_data):
    ctp_rec = CTPRecommend()
    item_data = ctp_rec.prepare_trainset(raw_data)
    ctp_rec.fit(item_data)

    # Save trained model
    p = Path(__file__).parent / 'ctp_rec/ctp_rec.joblib'
    joblib.dump(ctp_rec, p)

    # Compress model
    os.system(f'gzip -kf {str(p)}')


def fit_pf(products_data, raw_data):
    pf_rec = PFRecommend()
    profile_data = pf_rec.prepare_trainset(raw_data)
    pf_rec.fit(products_data, profile_data)

    # Save trained model
    p = Path(__file__).parent / 'pf_rec/pf_rec.joblib'
    joblib.dump(pf_rec, p)

    # Compress model
    os.system(f'gzip -kf {str(p)}')

if __name__ == '__main__':
    load_dotenv(verbose=True)
    sys.path.append(str(Path(__file__).parent.parent))
    from api.train.ctf_rec.model import CTFTextRecommender
    from api.train.iir_rec.model import IIRatingRecommender
    from api.train.ubr_rec.model import UBRRecommender
    from api.train.mf_rec.model import MFRecommend
    from api.train.mf_rec.utils import prepare_trainser
    from api.train.ucf_rec.model import UCFRecommender
    from api.train.ucf_rec.trainset import prepare_trainset
    from api.train.ctp_rec.model import CTPRecommend
    from api.train.pf_rec.model import PFRecommend

    parser = argparse.ArgumentParser(description='Train/Fit rs model')
    parser.add_argument('model', metavar='model', type=str, choices=MODELS,
                        help='model to fit/train')

    args = parser.parse_args()
    model = args.model

    if model == 'ctf':
        # raw_data = product_controller.find_product(
        #     {}, {'_id': 1, 'product': 1, 'product_description': 1})
        products_collection = db.products
        products_data = products_collection.find({}, {
            'name': 1,
            'category_code': 1,
        })
        fit_ctf(products_data)
    elif model == 'iir':
        reviews_collection = db.reviews
        raw_data = reviews_collection.find({}, {'app_id': 1, 'rating': 1})
        fit_iir(raw_data)
    elif model == 'ucf':
        events_collection = db.events
        raw_data = events_collection.find({})
        fit_ucf(raw_data)
    # elif model == 'mf':
    #     reviews_collection = db.reviews
    #     raw_data = reviews_collection.find({}, {'user_id': 1, 'movie_id': 1, 'rating': 1, 'unix_timestamp': 1})
    #     fit_mf(raw_data)
    elif model == 'ubr':
        reviews_collection = db.ratings
        raw_data = reviews_collection.find(
            {}, {'user_id': 1, 'movie_id': 1, 'rating': 1, 'unix_timestamp': 1})
        fit_ubr(raw_data)
    elif model == 'ctp':
        product_collection = db.product
        raw_data = product_collection.find({},{
            'product_group': 1,
            'product_category': 1,
            'product_type': 1,
            # 'unit_of_measure': 1,
            # 'tax_exempt_yn': 1,
            # 'promo_yn': 1,
            'new_product_yn': 1,
        })
        fit_ctp(raw_data)
    elif model == 'pf':
        event_collection = db.events
        raw_data = event_collection.find({}, {
            'brand': 1,
            'event_type': 1,
            'category_code': 1,
            # 'dayofweek': 1,
            # 'is_day': 1,
            # 'uid': 1
        })
        products_collection = db.products
        products_data = products_collection.find({}, {
            'brand': 1,
            'category_code': 1,
        })
        fit_pf(products_data, raw_data)