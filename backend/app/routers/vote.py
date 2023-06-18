from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..schemas.vote import Vote
from ..database.db import get_vote, add_vote, update_vote, delete_vote, get_average_rating, get_all_vote

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

@router.get("/{user_id}/{product_id}")
async def get_vote_by_user_and_product(user_id: int, product_id: int):
    vote = get_vote(user_id, product_id)
    if not vote:
        raise HTTPException(status_code=404, detail="Vote not found")
    return vote

@router.get("/{user_id}")
async def get_votes_by_user(user_id: int):
    votes = get_vote(user_id)
    if not votes:
        raise HTTPException(status_code=404, detail="Votes not found")
    return votes

@router.get("")
async def get_all_votes():
    votes = get_all_vote()
    print(votes)
    return votes

@router.put("/{id}")
async def update_vote_by_id(id: str, vote: Vote):
    existing_vote = get_vote(id=id)
    if not existing_vote:
        raise HTTPException(status_code=404, detail="Vote not found")
    return update_vote(id, vote)

@router.delete("/{id}")
async def delete_vote_by_id(id: str):
    existing_vote = get_vote(id=id)
    if not existing_vote:
        raise HTTPException(status_code=404, detail="Vote not found")
    return delete_vote(id)

@router.delete("/")
async def delete_votes():
    return delete_vote()

