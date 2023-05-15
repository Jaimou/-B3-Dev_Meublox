from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from typing import List
from ..database.db import get_database
from ..models.user import User, UserIn, UserUpdate
import hashlib

router = APIRouter()

from typing import Dict, Any

@router.post("/", response_model=Dict[str, Any])
def create_new_user(user: UserIn, db=Depends(get_database)):
    collection = db.get_collection("users")
    result = collection.insert_one(user.dict())
    user_id = result.inserted_id
    return {**user.dict(), "_id": str(user_id)}


@router.get("/{user_id}", response_model=User)
def read_user_by_id(user_id: str, db=Depends(get_database)):
    collection = db.get_collection("users")
    user = collection.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

@router.get("/", response_model=List[User])
def get_all_users(skip: int = 0, limit: int = 10, db=Depends(get_database)):
    users_cursor = db.get_collection("users").find().skip(skip).limit(limit)
    users_list = [User(**user) for user in users_cursor]
    return users_list


@router.put("/{user_id}", response_model=User)
def update_user_by_id(user_id: str, user_update: UserUpdate, db=Depends(get_database)):
    collection = db.get_collection("users")
    user_data = user_update.dict(exclude_unset=True)

    if "password" in user_data:
        user_data["hashed_password"] = hashlib.sha256(user_data["password"].encode()).hexdigest()
        del user_data["password"]

    result = collection.update_one({"_id": ObjectId(user_id)}, {"$set": user_data})

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = collection.find_one({"_id": ObjectId(user_id)})
    return User(**updated_user)

@router.delete("/{user_id}", response_model=User)
def delete_user_by_id(user_id: str, db=Depends(get_database)):
    collection = db.get_collection("users")
    user = collection.find_one({"_id": ObjectId(user_id)})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    collection.delete_one({"_id": ObjectId(user_id)})
    return User(**user)

@router.get("/email/{email}", response_model=User)
def read_user_by_email(email: str, db=Depends(get_database)):
    collection = db.get_collection("users")
    user = collection.find_one({"email": email})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

@router.get("/username/{username}", response_model=User)
def read_user_by_username(username: str, db=Depends(get_database)):
    collection = db.get_collection("users")
    user = collection.find_one({"username": username})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

@router.get("/username/{username}/password/{password}", response_model=User)
def read_user_by_username_and_password(username: str, password: str, db=Depends(get_database)):
    collection = db.get_collection("users")
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    user = collection.find_one({"username": username, "hashed_password": hashed_password})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

@router.get("/email/{email}/password/{password}", response_model=User)
def read_user_by_email_and_password(email: str, password: str, db=Depends(get_database)):
    collection = db.get_collection("users")
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    user = collection.find_one({"email": email, "hashed_password": hashed_password})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

@router.post("/admin", response_model=User)
def create_new_admin(user: UserIn, db=Depends(get_database)):
    collection = db.get_collection("users")
    result = collection.insert_one(user.dict())
    user_id = result.inserted_id
    return {**user.dict(), "_id": str(user_id)}
