import pandas as pd
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity
from api.train.ubr_rec.utils import get_similarity_products, standardize

class UBRRecommender:
    def __init__(self):
        self.__use_cols = ['movie_id', 'user_id', 'rating']
        self.__sim_mat = None
        self.__fitted = False

    def prepare_trainset(self, raw_data):
        print('Preparing UBR Text trainerset...')

        df = pd.DataFrame(raw_data)
        df['rating'] = df['rating'].astype(int)

        df = df.groupby(
            by=['user_id', 'movie_id']).rating.sum().reset_index()

        df = df.pivot(
            index="user_id", columns="movie_id", values="rating")
        df = df.fillna(0)

        self.__clean_mat = df
        print('Preparing UBR Text successful...')
        return df

    def fit(self, cleaned_data):
        print('data_items shape: ', cleaned_data.shape)
        print('Begin training model UBR Text...')

        std_df = cleaned_data.apply(standardize)

        product_similarity = cosine_similarity(std_df)
        self.__sim_mat = product_similarity
        print('Training model UBR Text successful...')

    def get_similarity_products(self, product_id, user_rating):
        similarity_score = self.__sim_mat[product_id]*user_rating
        similarity_score = similarity_score.sort_values(ascending=False)
        return similarity_score

    def recommend(user_action, limit=10):
        print(user_action)
        pids = []
        similar_products = pd.DataFrame()
        for action in user_action:
            print(action)
        #     similar_products = similar_products.append(
        #         get_similarity_products(item_id, user_rating), ignore_index=True)

        # df = similar_products.sum().sort_values(ascending=False).head(limit)
        # print(similar_products)
        return pids
