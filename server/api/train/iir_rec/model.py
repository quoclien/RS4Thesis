import pandas as pd
from api.train.iir_rec.utils import bayesian_rating_products, wilson_lower_bound

item_id = 'app_id'
item_rating = 'rating'


class IIRatingRecommender:
    def __init__(self, options):
        self.__pos_rating = options['__pos_rating']
        self.__original_data = None
        self.__wil_sim_mat = None
        self.__bayes_sim_mat = None
        self.__fitted = False

    def prepare_trainset(self, raw_data):
        print('Preparing IIR Text trainerset...')

        df = pd.DataFrame(raw_data)
        df = df.drop('_id', 1)
        df[item_rating] = pd.to_numeric(df[item_rating])
        self.__original_data = df

        pos_mat = df[df[item_rating] >= self.__pos_rating].groupby(
            item_id).count().rename(columns={item_rating: "count_gt3"})
        amount_mat = df.groupby(item_id).agg(
            "count").rename(columns={item_rating: "count_amount"})
        merge_mat = pd.merge(pos_mat, amount_mat, on=item_id, how="inner")

        print('Preparing IIR Text successful...')
        return merge_mat

    def fit(self, merge_data):

        print('data_items shape: ', merge_data.shape)
        print('Begin training model CTF Text...')

        merge_data["wilson_score"] = merge_data.apply(
            lambda row: wilson_lower_bound(row["count_gt3"], row["count_amount"]), axis=1)
        data_result = merge_data.sort_values(
            by='wilson_score', ascending=False)
        self.__wil_sim_mat = data_result

        original_data_df = self.__original_data
        pivot_data = original_data_df.groupby([item_id, item_rating]).agg(
            {item_rating: "count"}).rename(columns={item_rating: "count"})
        pivot_data = pivot_data.pivot_table(
            index=item_id, columns=item_rating, values="count")
        pivot_data = pivot_data.fillna(0)
        pivot_data["bayesian_score"] = pivot_data.apply(
            lambda row: bayesian_rating_products(row), axis=1)
        pivot_data = pivot_data.sort_values(
            by='bayesian_score', ascending=False)
        self.__bayes_sim_mat = pivot_data

        self.__fitted = True
        print("Fit model successful !")

    def recommend(self, n_items=10, method='wilson'):
        if not self.__fitted:
            raise Exception('model is not fit yet')

        item_ids = []
        if method == 'wilson':
            df = self.__wil_sim_mat.head(10)
            item_ids = df.index.tolist()
        else:
            df = self.__bayes_sim_mat.head(10)
            item_ids = df.index.tolist()

        return item_ids
