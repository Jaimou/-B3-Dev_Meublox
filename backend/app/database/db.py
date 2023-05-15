from pymongo import MongoClient
from fastapi.logger import logger
from ..config import settings
from fastapi import Depends
from typing import Dict, Any
from ..models.vote import VoteInDB

DATABASE_URL = f"mongodb://{settings.db_hostname}:{settings.db_port}"

class Database:
    def __init__(self, uri):
        self.client = MongoClient(uri)
        self.db = self.client[settings.db_name]

    def get_collection(self, collection_name):
        return self.db[collection_name]

db = Database(DATABASE_URL)

def get_database():
    yield db

def get_vote(user_id: int, product_id: int) -> Dict[str, Any]:
    vote = db.get_collection("votes").find_one({"user_id": user_id, "product_id": product_id})
    return vote

def add_vote(vote: VoteInDB) -> Dict[str, Any]:
    result = db.get_collection("votes").insert_one(vote.dict())
    vote.id = result.inserted_id
    return vote

def update_vote(vote_id: str, vote: VoteInDB) -> Dict[str, Any]:
    result = db.get_collection("votes").update_one(
        {"_id": vote_id},
        {"$set": vote.dict()}
    )
    if result.modified_count:
        return vote
    return None

def delete_vote(vote_id: str) -> Dict[str, Any]:
    result = db.get_collection("votes").delete_one({"_id": vote_id})
    if result.deleted_count:
        return {"deleted": True}
    return None

def get_average_rating(product_id: int) -> float:
    pipeline = [
        {"$match": {"product_id": product_id}},
        {"$group": {"_id": None, "average": {"$avg": "$rating"}}}
    ]
    result = db.get_collection("votes").aggregate(pipeline).to_list(None)
    if result:
        return result[0]["average"]
    return None
