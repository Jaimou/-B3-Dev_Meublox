from pydantic import BaseModel
from typing import List

class CartItemCreate(BaseModel):
    product_id: str
    quantity: int

class CartCreate(BaseModel):
    user_id: str
    items: List[CartItemCreate]

class CartItem(BaseModel):
    id: str
    product_id: str
    quantity: int
    total_price: float

class Cart(BaseModel):
    id: str
    user_id: str
    items: List[CartItem]

class CartUpdate(BaseModel):
    items: List[CartItemCreate]
