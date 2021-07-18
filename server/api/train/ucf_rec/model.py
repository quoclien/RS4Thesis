from scipy import spatial
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np
import time


class UCFRecommender:
    '''
    User-Based collaborative filtering recommender
    '''

    def __init__(self):
        '''
        Initiate an instance of UCF recommender instance
        '''
        self.__user_item = None
        self.__sim_mat = None
        self.__n_user = 0
        self.__n_item = 0
        self.__fitted = False
        self.pub = None

    # PEARSON
    def __cal_sim_pc(self, user_item):
        sim = user_item.corr(method='pearson')
        return sim

    # COSINE
    # Calculate similarity score for 1 column
    def __cal_1col_sims(self, this_col, user_item):
        return list(
            map(lambda col: 1 - spatial.distance.cosine(user_item[this_col],
                                                        user_item[col]), user_item.columns.values)
        )

    # Calculate similarity score for many columns
    def __cal_sim_cos(self, user_item):
        columns = user_item.columns.values
        res = pd.DataFrame(0, index=columns, columns=columns)
        for i in range(len(columns)):
            sims = self.__cal_1col_sims(columns[i], user_item)
            res.iloc[:, i] = sims
            res.iloc[i, :] = sims
        return res

    def fit(self, user_item=None, method='pearson'):
        '''
        Train the recommender

        Params:
          user_item(pandas DataFrame): 
            m x n shape DataFrame of user, item interaction. Example:
                     index  user_1  user_2  user_3  ...  user_n
                     item_1   1       3       0             1
                     item_2   6       10      1             5
                     ...
                     item_m   5       0       2             0

          method(string): 
            Method to calculate similarity scores of users. Available methods: 'pearson', 'cosine'

        '''
        self.__user_item = user_item
        self.__n_user = user_item.columns.size
        self.__n_item = user_item.index.size

        # measure training time
        start = time.time()

        if method == 'pearson':
            self.__sim_mat = self.__cal_sim_pc(self.__user_item)
            self.__fitted = True

        elif method == 'cosine':
            self.__sim_mat = self.__cal_sim_cos(self.__user_item)
            self.__fitted = True
        else:
            raise Exception('Available methods: "pearson", "cosine"')
        end = time.time()

        print(f'Fitting time: {round(end - start, 2)} seconds')
        print(f'Method: {method}')

    def get_top_prod(self, n=10, uid=None, return_df=False):
        '''
        Get top n items(with the highest reaction scores) of users

        Params:
          n(int, default: 10): Number of items of each user

          uid(str | list, tuple): Id(s) of user(s)

          return_df(Boolean, default: False): Return result as DataFrame

        Return:
          Array of item's ids. Example: [['i1', 'i2', 'i3', ,..., 'i10']] or a DataFrame
        '''
        if not self.__fitted:
            raise Exception('model is not fit yet')

        columns = [uid] if type(uid) == str else uid
        n_item = n if n <= self.__n_item else self.__n_item
        top_n_item = list(
            map(lambda col: self.__user_item[col].sort_values(
                ascending=False)[:n_item].index.values, columns)
        )

        if return_df:
            top_n_item_df = pd.DataFrame(
                top_n_item, index=columns, columns=np.arange(n_item))
            return top_n_item_df
        return top_n_item

    def get_top_user(self, uid, n=10, return_df=False):
        '''
        Get the top n users most similar to 'uid' 
        Params:
          n(int, default: 10): Number of similar users of each user

          uid(str | list, tuple): User's id(s) of user(s)

          return_df(Boolean, default: False): Return result as DataFrame

        Return:
          Array of user's ids. Example: [['u1', 'u1', 'u3', ,..., 'u10']] or a DataFrame
        '''

        if not self.__fitted:
            raise Exception('model is not fit yet')

        columns = [uid] if type(uid) == str else uid
        n_user = n if n <= self.__n_user else self.__n_user
        top_n_sim = list(
            map(lambda col: self.__sim_mat[col].sort_values(
                ascending=False)[1:n_user + 1].index.values, columns)
        )

        if return_df:
            top_n_sim_df = pd.DataFrame(
                top_n_sim, index=columns, columns=np.arange(n_user))
            return top_n_sim_df
        return top_n_sim

    def recommend(self, uid, n_user=10, n_item=10, limit=10, offset=0):
        '''
        Get recommended item's ids for 'uid' 

        Params:
          uid(str): User to recommend for

          n_user(int, default: 10): Number of similar users to get items from

          n_item(int, default: 10): Number of items gotten from the similar users

          limit(int, default: 10): Max number of recommended items

        Return:
          Array of item's ids. Example: ['i1', 'i2', 'i3', , ..., 'i9', 'i10']
        '''

        if not self.__fitted:
            return []

        _n_item = n_item if n_item > 0 and n_item < 21 else 10
        _n_user = n_user if n_user > 0 and n_user < 21 else 10

        # Get the top 'n_user' most similar to uid(s)
        if uid not in self.__sim_mat.columns.values:
            return []
        [top_n_sim] = self.get_top_user(n=_n_user, uid=[uid])
        top_prods = np.array(
            list(map(lambda uids: self.get_top_prod(n=_n_item, uid=uids), top_n_sim)))
        print(self.__sim_mat)
        print(self.get_top_user(n=_n_user, uid=[uid]))
        return np.unique(top_prods.flatten()).tolist()[offset:offset + limit]