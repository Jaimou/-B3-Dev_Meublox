from fastapi import APIRouter, HTTPException
from ..schemas.favorite import FavoriteBase
from ..database.db import get_favorite, add_favorite, delete_favorite, get_favorites_by_user
import logging


router = APIRouter()

@router.post("/favorites/")
async def create_favorite(favorite: FavoriteBase):
    logging.info(f"Creating favorite: {favorite}")
    existing_favorite = get_favorite(favorite.user_id, favorite.product_id)
    if existing_favorite:
        logging.warning(f"Product {favorite.product_id} already in favorites for user {favorite.user_id}")
        raise HTTPException(status_code=400, detail="Product already in favorites")
    result = add_favorite(favorite)
    logging.info(f"Favorite created: {result}")
    return result

@router.delete("/favorites/{user_id}/{product_id}")
async def remove_favorite(user_id: str, product_id: str):  
    existing_favorite = get_favorite(user_id, product_id)
    if not existing_favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return delete_favorite(user_id, product_id) 

@router.get("/favorites/{user_id}")
async def get_favorites(user_id: str):
    return get_favorites_by_user(user_id)