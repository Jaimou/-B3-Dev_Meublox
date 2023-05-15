from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..schemas.vote import Vote
from ..models.vote import VoteInDB
from ..database.db import get_vote, add_vote, update_vote, delete_vote, get_average_rating

router = APIRouter()

@router.post("/")
async def create_vote(vote: Vote):
    existing_vote = get_vote(vote.user_id, vote.product_id)
    if existing_vote:
        return update_vote(existing_vote["id"], vote)
    return add_vote(vote)

@router.get("/{product_id}/average_rating")
async def get_product_average_rating(product_id: int):
    average_rating = get_average_rating(product_id)
    return {"average_rating": average_rating}
