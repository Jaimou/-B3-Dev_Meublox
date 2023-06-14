from typing import List
from pydantic import BaseModel

class CartItem(BaseModel):
    product_id: int
    quantity: int
    total_price: float

class Cart(BaseModel):
    user_id: int
    items: List[CartItem]


