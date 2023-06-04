from typing import List
from pydantic import BaseModel

class CartItem(BaseModel):
    product_id: str
    quantity: int
    total_price: float

class UpdateCartItem(BaseModel):
    quantity: int

class Cart(BaseModel):
    user_id: str
    items: List[CartItem] = []

