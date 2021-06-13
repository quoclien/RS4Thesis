import os
from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient

env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path, verbose=True)

client = MongoClient(os.getenv('MONGO_URI'))
db = client[os.getenv('DB_NAME')]