import math
import scipy.stats as st

"""
:param pos: No of positive ratings
:param n: Total number of ratings
:param confidence: Confidence interval, by default is 95 %
:return: Wilson Lower bound score
"""


def wilson_lower_bound(pos, n, confidence=0.95):
    n = float(n)
    if n == 0:
        return 0
    z = st.norm.ppf(1 - (1 - confidence) / 2)
    phat = 1.0 * pos / n
    return (phat + z * z / (2 * n) - z * math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n)


"""
Function to calculate wilson score for N star rating system. 
:param n: Array having count of star ratings where ith index represent the votes for that category i.e. [3, 5, 6, 7, 10]
here, there are 3 votes for 1-star rating, similarly 5 votes for 2-star rating. 
:param confidence: Confidence interval
:return: Score
"""


def bayesian_rating_products(row, confidence=0.95):
    n = row[:-1].tolist()

    if sum(n) == 0:
        return 0
    K = len(n)
    z = st.norm.ppf(1 - (1 - confidence) / 2)
    N = sum(n)
    first_part = 0.0
    second_part = 0.0
    for k, n_k in enumerate(n):
        first_part += (k+1)*(n[k]+1)/(N+K)
        second_part += (k+1)*(k+1)*(n[k]+1)/(N+K)
    score = first_part - z * \
        math.sqrt((second_part - first_part*first_part)/(N+K+1))
    return score
