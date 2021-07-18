# import pandas as pd
# from scipy import sparse
# from sklearn.metrics.pairwise import cosine_similarity
# from api.train.ubr_rec.utils import get_similarity_products, standardize

# class UBRRecommender:
#     def __init__(self):
#         self.__use_cols = ['movie_id', 'user_id', 'rating']
#         self.__data_cleaned = None
#         self.__sim_mat = None
#         self.__fitted = False

#     def prepare_trainset(self, raw_data):
#         print('Preparing UBR Text trainerset...')

#         df = pd.DataFrame(raw_data)
#         df['rating'] = df['rating'].astype(int)

#         df = df.groupby(
#             by=['user_id', 'product_id']).rating.sum().reset_index()

#         df = df.pivot(
#             index="user_id", columns="product_id", values="rating")
#         df = df.fillna(0)

#         self.__data_cleaned = df
#         print(df)
#         print('Preparing UBR successful...')
#         return df

#     def fit(self, cleaned_data):
#         print('data_items shape: ', cleaned_data.shape)
#         print('Begin training model UBR Text...')

#         std_df = cleaned_data.apply(standardize)

#         # product_similarity = cosine_similarity(std_df, std_df)
#         # self.__sim_mat = product_similarity
#         # print(product_similarity)
#         print('Training model UBR Text successful...')

#     def get_similarity_products(self, product_id, user_rating):
#         similarity_score = self.__sim_mat[product_id]*user_rating
#         similarity_score = similarity_score.sort_values(ascending=False)
#         return similarity_score

#     def recommend(self, user_id, limit=10):
#         similar_products = pd.DataFrame()
#         df = self.__data_cleaned
#         print(df)
#         print(self.__sim_mat)
#         idx = df.index[df['product_id'] == user_id]
#         print(idx)
#         # similar_indices = sim[idx[0]].argsort()[:-n_items:-1]

#         pids = []
#         # for i in similar_indices:
#         #     pids.append(df['product_id'].values[i])
#         return pids
