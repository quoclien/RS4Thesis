import pandas as pd
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity
from api.train.ubr_rec.utils import get_similarity_products, standardize


class UBRRecommender:
    def __init__(self, options):
        self.__use_cols = options['__use_cols']
        self.__sim_mat = None
        self.__fitted = False

    def prepare_trainset(self, raw_data):
        print('Preparing UBR Text trainerset...')

        df = pd.DataFrame(raw_data)

        df = df.groupby(
            by=['author', 'app_id']).rating.sum().reset_index()

        pivot_df = df.pivot(
            index="author", columns="app_id", values="rating")
        pivot_df = df.fillna(0)

        self.__clean_mat = pivot_df
        print(pivot_df.head())
        print('Preparing UBR Text successful...')
        return pivot_df

    def fit(self, cleaned_data):
        print('data_items shape: ', cleaned_data.shape)
        print('Begin training model UBR Text...')

        std_df = cleaned_data.apply(standardize)
        product_similarity = cosine_similarity(std_df.T)
        self.__sim_mat = product_similarity
        print("Fit model successful !")

    def get_similarity_products(self, product_id, user_rating):
        similarity_score = self.__sim_mat[product_id]*user_rating
        similarity_score = similarity_score.sort_values(ascending=False)
        self.__fitted = True
        return similarity_score

    def recommend(user_action, n_items=10):
        pids = []

        similar_products = pd.DataFrame()
        for item_id, user_rating in user_action:
            similar_products = similar_products.append(
                get_similarity_products(item_id, user_rating), ignore_index=True)

        similar_products.sum().sort_values(ascending=False)
        print(similar_products.head())
