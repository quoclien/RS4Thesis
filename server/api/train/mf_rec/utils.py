import pandas as pd
from sklearn.model_selection import train_test_split

def prepare_trainser(raw_data):
  ratings_base = pd.DataFrame(raw_data)
  ratings = ratings_base.values

  # indices in Python start from 0
  ratings[:, :2] -= 1

  rate_train, rate_test = train_test_split(ratings, test_size=0, random_state=42)
  return rate_train