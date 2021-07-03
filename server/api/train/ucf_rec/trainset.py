import pandas as pd
import numpy as np
import time


def prepare_trainset(raw_data):
    print('Preparing UCF trainset...')
    start = time.time()

    df = pd.DataFrame(raw_data)
    print(df.head())

    # Score map for event_type
    score_map = {'view': 1, 'cart': 5, 'purchase': 20}
    max_score = np.sum(list(score_map.values()))

    # Add column `user_score`
    df['user_score'] = df.event_type.map(score_map)

    # Fotmat the df
    df = df[['user_id', 'product_id', 'user_score']]
    df['user_id'] = df['user_id'].astype(str)
    df['product_id'] = df['product_id'].astype(str)
    df = df.groupby(by=['user_id', 'product_id']).sum()
    df = df['user_score'].unstack(level=0).fillna(value=0)

    # Create matrix user(column) x item(row)
    user_item = pd.DataFrame(df.values, index=df.index.values.astype(
        str), columns=df.columns.astype(str))

    # Drop uninteraction users/items
    for col in user_item.columns.values:
        sum = user_item[col].sum()
        if sum == 0:
            user_item = user_item.drop(col, axis=1)
        elif sum > max_score:
            user_item[col] = user_item[col].apply(
                lambda x: max_score if x > max_score else x)

    # Drop items which has been not reacted by any user
    for row in user_item.index.values:
        sum = user_item.loc[row, :].sum()
        if sum == 0:
            user_item = user_item.drop(row, axis=0)

    end = time.time()
    extime = round(end - start, 2)
    if extime <= 60:
        print(f'Preparing done in: {extime}s')
    elif extime > 60 and extime < 60 * 60:
        extime /= 60
        print(f'Preparing done in: {extime}m')
    else:
        extime /= (60 * 60)
        print(f'Preparing done in: {extime}h')

    print(f'user_item shape: {user_item.shape}')

    print(len(user_item))
    return user_item