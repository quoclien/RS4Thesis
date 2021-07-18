import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

class PFRecommend:
  def __init__(self):
    self.__sim_mat = None

  def prepare_trainset(self, products_data, review_data):
    print('Preparing PF trainerset...')

    product_df = pd.DataFrame(products_data)
    product_df = product_df.drop(columns='_id')
    review_df = pd.DataFrame(review_data)
    review_df = review_df.drop(columns='_id')
    review_df['rating'] = review_df['rating'].astype(int)
    df = pd.merge(product_df, review_df, on='product_id')
    df = df.dropna()

    # print(df)
    # df['user_score'] = df.event_type.map({'view': 1, 'cart': 2, 'purchase': 3})
    # df = df.drop(columns=['_id', 'event_type'])
    print('Preparing PF  trainerset...')
    return df

  def fit(self, profile_data):
    print('Preparing train PF model...')
    model = KNeighborsClassifier(n_neighbors=5)
    # products_df = pd.DataFrame(products_data)

    profile_df = profile_data.loc[:, profile_data.columns != 'product_id']
    features = profile_df.loc[:, profile_df.columns != 'rating']
    target = profile_data['rating'].tolist()
    properties = features.columns.tolist()

    data_encoded = {}
    for p in properties:
      data_encoded[p] = {}
      keys = profile_df[p].unique().tolist()
      for i, k in enumerate(keys):
        data_encoded[p][k] = i+1
      features[p] = features[p].map(data_encoded[p])

    model.fit(features,target)

    for p in properties:
      profile_df[p] = profile_df[p].map(data_encoded[p])

    rows = profile_df.values.tolist()
    scores = []
    for i, row in enumerate(rows):
      scores.append(model.predict([row[:-1]])[0])
    profile_data['score'] = scores
 
    print(profile_data)
    self.__sim_mat = profile_data
    print('End train PF model...')

  def recommend(self, limit=10):
    df = self.__sim_mat
    df = df.sort_values(by=['score'], ascending=False).head(limit)
    ids = df["product_id"].tolist()
    return ids