from pymongo import MongoClient
from fastapi.logger import logger
from ..config import settings
from fastapi import Depends
from typing import Dict, Any
from ..models.vote import VoteInDB
from ..models.favorite import FavoriteInDB
from typing import Dict, Any, List
from typing import Optional
from bson import ObjectId
# from ..models.order import OrderInDB, OrderCreate, OrderUpdate


DATABASE_URL = f"mongodb://{settings.db_hostname}:{settings.db_port}"

class Database:
    def __init__(self, uri):
        self.client = MongoClient(uri)
        self.db = self.client[settings.db_name]

    def get_collection(self, collection_name):
        return self.db[collection_name]

    def get_user_by_email(self, email: str) -> Dict[str, Any]:
        user = self.db.get_collection("users").find_one({"email": email})
        return user

    def get_carts_collection(self):
        return self.db["carts"]

    def get_products_collection(self):
        return self.db["products"]
    

db = Database(DATABASE_URL)

def get_database():
    yield db

# Functions for votes

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

# Functions for favorites

def get_favorite(user_id: str, product_id: str) -> Dict[str, Any]:
    favorite = db.get_collection("favorites").find_one({"user_id": user_id, "product_id": product_id})
    if favorite:
        favorite["id"] = str(favorite["_id"])
    return favorite

def add_favorite(favorite: FavoriteInDB) -> Dict[str, Any]:
    result = db.get_collection("favorites").insert_one(favorite.dict(by_alias=True))
    favorite.id = str(result.inserted_id)
    return favorite

def delete_favorite(user_id: str, product_id: str) -> Dict[str, Any]:
    result = db.get_collection("favorites").delete_one({"user_id": user_id, "product_id": product_id})
    if result.deleted_count:
        return {"deleted": True}
    return None

def get_favorites_by_user(user_id: str) -> List[Dict[str, Any]]:
    favorites = list(db.get_collection("favorites").find({"user_id": user_id}))
    for favorite in favorites:
        favorite["id"] = str(favorite["_id"])
    return favorites

def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    user = db.get_collection("users").find_one({"email": email})
    return user

# # Functions for orders

# def add_order(order: OrderCreate) -> OrderInDB:
#     collection = db.get_collection("orders")
#     result = collection.insert_one(order.dict(by_alias=True))
#     order.id = str(result.inserted_id)
#     return order


# def retrieve_order(order_id: str) -> Optional[OrderInDB]:
#     collection = db.get_collection("orders")
#     order = collection.find_one({"_id": ObjectId(order_id)})
#     if order:
#         order["id"] = str(order["_id"])
#         return OrderInDB(**order)
#     return None


# def retrieve_orders() -> List[OrderInDB]:
#     collection = db.get_collection("orders")
#     orders = collection.find()
#     result = []
#     for order in orders:
#         order["id"] = str(order["_id"])
#         result.append(OrderInDB(**order))
#     return result


# def update_order(order_id: str, order_update: OrderUpdate) -> Optional[OrderInDB]:
#     collection = db.get_collection("orders")
#     updated_order = collection.find_one_and_update(
#         {"_id": ObjectId(order_id)},
#         {"$set": order_update.dict(exclude_unset=True)},
#         return_document=True
#     )
#     if updated_order:
#         updated_order["id"] = str(updated_order["_id"])
#         return OrderInDB(**updated_order)
#     return None


# def delete_order(order_id: str) -> Optional[OrderInDB]:
#     collection = db.get_collection("orders")
#     deleted_order = collection.find_one_and_delete({"_id": ObjectId(order_id)})
#     if deleted_order:
#         deleted_order["id"] = str(deleted_order["_id"])
#         return OrderInDB(**deleted_order)
#     return None


# def retrieve_orders_by_user_id(user_id: str) -> List[OrderInDB]:
#     collection = db.get_collection("orders")
#     orders = collection.find({"user_id": user_id})
#     result = []
#     for order in orders:
#         order["id"] = str(order["_id"])
#         result.append(OrderInDB(**order))
#     return result