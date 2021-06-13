def standardize(row):
    new_row = (row - row.mean()) / (row.max()-row.min())
    return new_row

def get_similarity_products(sim_mat, product_id, user_rating):
    similarity_score = sim_mat[product_id]*user_rating
    similarity_score = similarity_score.sort_values(ascending=False)
    return similarity_score