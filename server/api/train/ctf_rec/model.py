import pandas as pd
from bson.objectid import ObjectId
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from api.train.ctf_rec.text_utils import remove_html, remove_non_ascii, remove_punctuation

class CTFTextRecommender:
    """
    Content-based filtering with text
    """
    def __init__(self, options):
        """
            Initiate an instance of CTFTextRecommender
        """
        # get config
        __language = options['__language']
        __use_cols = options['__use_cols']

        self.__language = __language if __language is not None else 'english'
        self.__use_cols = __use_cols if __use_cols is not None else []
        self.__col_combined = 'd_col_combined'
        self.__col_cleaned = 'd_col_cleaned'
        self.__fitted = False
        self.__data_cleaned = None
        self.__sim_mat = None

    def prepare_trainset(self, raw_data):

        print('Preparing CTF Text trainerset...')
        df = pd.DataFrame(raw_data)

        # init option
        use_cols = self.__use_cols
        col_combined = self.__col_combined
        col_cleaned = self.__col_cleaned

        # clean column
        df[col_combined] = df[use_cols].astype(str).apply(lambda x: ' '.join(x), axis=1)
        df[col_cleaned] = df[col_combined].apply(func=remove_non_ascii)
        # df[col_cleaned] = df[col_cleaned].apply(func=remove_stop_words)
        df[col_cleaned] = df[col_cleaned].apply(func=remove_punctuation)
        df[col_cleaned] = df[col_cleaned].apply(func=remove_html)

        self.__data_cleaned = df
        print('Preparing CTF Text successful...')
        return df

    def fit(self, cleaned_data):
        df = cleaned_data
        col_cleaned = self.__col_cleaned
        language = self.__language

        print('data_items shape: ', df.shape)
        print('Begin training model CTF Text...')

        tfidf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=5, stop_words= language)
        tfidf_matrix = tfidf.fit_transform(df[col_cleaned])

        sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        self.__sim_mat = sim

        print('Finish training model CTF Text...')
        self.__fitted = True
        return sim

    def recommend(self, iid, n_items = 12):
        if not self.__fitted:
            raise Exception('model is not fit yet')

        df = self.__data_cleaned
        sim = self.__sim_mat
        idx = df.index[df['_id'] == iid]
        print(idx)
        similar_indices = sim[idx[0]].argsort()[:-n_items:-1]

        pids = []
        for i in similar_indices:
            pids.append(df['_id'].values[i])
        return pids