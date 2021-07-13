import pandas as pd
from utils import to_dict, to_objectid

class CTPRecommend:
  def __init__(self):
    self.__mat = None

  def prepare_trainset(self, raw_data):
    print('Begin prepare data CTP recommend')
    df = pd.DataFrame(raw_data)
    df = df.dropna()
    print('End prepare data CTP recommend')
    return df


  def fit(self, raw_data):
    print('Begin train prepare data CTP recommend')

    merge_dfs = []

    for col in raw_data.columns[1:]:
      col_score = col + '_score'
      raw_data[col_score] = 1
      raw_data[col] = col + raw_data[col]

      pivot_table = pd.pivot_table(raw_data, 
        index=['_id'], 
        columns=[col],
        values= col_score
      )
      merge_dfs.append(pivot_table)

    pivot_df = pd.concat(merge_dfs, axis=1)
    pivot_df = pivot_df.fillna(0)
    print('End train prepare data CTP recommend')
    self.__mat = pivot_df

  def recommend(self, properties_data, limit=10):
    df = self.__mat
    for p in properties_data:
      key = p+properties_data[p]['value']
      df[key] *= properties_data[p]['score']

    df['total_score'] = df.sum(axis=1)
    df = df.sort_values(by=['total_score'], ascending=False).head(limit)
    ids = df.index.tolist()
    return ids