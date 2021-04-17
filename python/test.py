import pandas as pd

# declare variables
path_data_csv = 'ProductReview.csv'
name_header_data = ['id', 'reviews.rating', 'reviews.username']

# read data
original_data_df = pd.read_csv(path_data_csv, usecols=["id", "reviews.rating", "reviews.username"], low_memory=False)
pivot_data = original_data_df.pivot_table(index="reviews.username", columns="id", values="reviews.rating")
pivot_data.head(5)
# collect and organize information on users and products

# compare User A to all other users

# create a function that finds products that User A has not used but which similar users have

# rank and recommend

# evaluate and test