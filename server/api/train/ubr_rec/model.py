import pandas as pd
from scipy import sparse
from sklearn.metrics.pairwise import cosine_similarity
from api.train.ubr_rec.utils import get_similarity_products

def standardize(row):
    new_row = (row - row.mean()) / (row.max()-row.min())
    return new_row

class UBRRecommender:
    def __init__(self):
        self.__use_cols = ['movie_id', 'user_id', 'rating']
        self.__data_cleaned = None
        self.__sim_mat = None
        self.__fitted = False

    def prepare_trainset(self, raw_data):
        print('Preparing UBR Text trainerset...')

        df = pd.DataFrame(raw_data)
        df['rating'] = df['rating'].astype(int)

        df = df.groupby(
            by=['user_id', 'product_id']).rating.sum().reset_index()

        df = df.pivot(
            index="user_id", columns="product_id", values="rating")
        df = df.fillna(0)
        std_df = df.apply(standardize)

        self.__data_cleaned = df
        print('Preparing UBR successful...')
        return std_df

    def fit(self, cleaned_data):
        print('data_items shape: ', cleaned_data.shape)
        print('Begin training model UBR Text...')

        product_similarity = cosine_similarity(cleaned_data.T)
        product_similaritty_df = pd.DataFrame(product_similarity, index=self.__data_cleaned.columns, columns=self.__data_cleaned.columns)

        self.__sim_mat = product_similaritty_df
        print(self.__sim_mat)
        print('Training model UBR Text successful...')

    def get_similarity_products(self, product_id, user_rating):
        similarity_score = self.__sim_mat[product_id]*user_rating
        similarity_score = similarity_score.sort_values(ascending=False)
        return similarity_score

    def recommend(self, actions, limit=10):
        action_convert = []
        length = len(actions)
        for action in actions:
            action_convert.append(tuple([action['product_id'], action['rating']]))

        print(action_convert)

        pids = []
        similar_products = pd.DataFrame()
        for product_id, user_rating in action_convert:
            similar_products = similar_products.append(self.get_similarity_products(product_id, user_rating), ignore_index=True)
            
        pids = similar_products.sum().sort_values(ascending=False).index[0:length + limit].tolist()
        return pids
