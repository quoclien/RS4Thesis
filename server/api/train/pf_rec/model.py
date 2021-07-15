import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

class PFRecommend:
  def __init__(self):
    self.__sim_mat = None

  def prepare_trainset(self, raw_data):
    print('Preparing PF trainerset...')

    df = pd.DataFrame(raw_data)
    df = df.dropna()
    df['user_score'] = df.event_type.map({'view': 1, 'cart': 2, 'purchase': 3})
    df = df.drop(columns=['_id', 'event_type'])
    print('Preparing PF  trainerset...')
    return df

  def fit(self, products_data, profile_data):
    print('Preparing train PF model...')
    model = KNeighborsClassifier(n_neighbors=5)
    products_df = pd.DataFrame(products_data)

    profile_data = profile_data.loc[:, profile_data.columns != 'uid']
    features = profile_data.loc[:, profile_data.columns != 'user_score']
    target = profile_data['user_score'].tolist()
    properties = features.columns.tolist()

    data_encoded = {}
    for p in properties:
      data_encoded[p] = {}
      keys = profile_data[p].unique().tolist()
      for i, k in enumerate(keys):
        data_encoded[p][k] = i+1
      features[p] = features[p].map(data_encoded[p])
    model.fit(features,target)

    for p in properties:
      products_df[p] = products_df[p].map(data_encoded[p])

    rows = products_df.values.tolist()
    scores = []
    for i, row in enumerate(rows):
      scores.append(model.predict([row[1:]])[0])
    products_df['score'] = scores
 
    self.__sim_mat = pd.DataFrame(products_df)
    print('End train PF model...')

  def recommend(self, limit):
    df = self.__sim_mat
    df = df.sort_values(by=['score'], ascending=False).head(limit)
    ids = df["_id"].tolist()
    return ids