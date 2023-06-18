from typing import Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from typing import List
from ..database.db import get_database
from ..models.user import User, UserIn, UserUpdate
from app.utils import passwd_utils
import hashlib

router = APIRouter()


@router.post("/", response_model=Dict[str, Any])
def create_new_user(user: UserIn, db=Depends(get_database)):
    collection = db.get_collection("users")
    hashed_pwd = passwd_utils.hash_pwd(user.password)
    user.password = hashed_pwd
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
        hashed_pwd = passwd_utils.hash_pwd(user_data["password"])
        user_data["password"] = hashed_pwd
        user_data["hashed_password"] = hashlib.sha256(
            user_data["password"].encode()).hexdigest()

    result = collection.update_one(
        {"_id": ObjectId(user_id)}, {"$set": user_data})

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


@router.post("/admin", response_model=User)
def create_new_admin(user: UserIn, db=Depends(get_database)):
    collection = db.get_collection("users")
    hashed_pwd = passwd_utils.hash_pwd(user.password)
    user.password = hashed_pwd
    user.is_admin = True  # Définir le statut d'administrateur
    result = collection.insert_one(user.dict())
    user_id = result.inserted_id
    return {**user.dict(), "_id": str(user_id)}


@router.put("/{user_id}", response_model=User)
def update_user_by_id(user_id: str, user_update: UserUpdate, db=Depends(get_database)):
    collection = db.get_collection("users")
    user_data = user_update.dict(exclude_unset=True)

    if "password" in user_data:
        user_data["hashed_password"] = hashlib.sha256(
            user_data["password"].encode()).hexdigest()
        del user_data["password"]

    result = collection.update_one(
        {"_id": ObjectId(user_id)}, {"$set": user_data})

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = collection.find_one({"_id": ObjectId(user_id)})
    return User(**updated_user)


@router.post("/", response_model=User)
def create_new_user(user: UserIn, db=Depends(get_database)):
    collection = db.get_collection("users")
    hashed_pwd = passwd_utils.hash_pwd(user.password)
    user.password = hashed_pwd
    result = collection.insert_one(user.dict())
    user_id = result.inserted_id
    user._id = str(user_id)
    return user


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
        user_data["hashed_password"] = hashlib.sha256(
            user_data["password"].encode()).hexdigest()
        del user_data["password"]

    result = collection.update_one(
        {"_id": ObjectId(user_id)}, {"$set": user_data})

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


@router.post("/admin", response_model=User)
def create_new_admin(user: UserIn, db=Depends(get_database)):
    collection = db.get_collection("users")
    hashed_pwd = passwd_utils.hash_pwd(user.password)
    user.password = hashed_pwd
    user.is_admin = True
    result = collection.insert_one(user.dict())
    user_id = result.inserted_id
    user._id = str(user_id)
    return user


@router.get("/admin", response_model=List[User])
def get_all_admins(db=Depends(get_database)):
    admins_cursor = db.get_collection("users").find({"is_admin": True})
    admins_list = [User(**admin) for admin in admins_cursor]
    return admins_list


@router.put("/{user_id}/admin", response_model=User)
def update_user_admin_status(user_id: str, is_admin: bool, db=Depends(get_database)):
    collection = db.get_collection("users")
    result = collection.update_one({"_id": ObjectId(user_id)}, {
                                   "$set": {"is_admin": is_admin}})

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = collection.find_one({"_id": ObjectId(user_id)})
    return User(**updated_user)
