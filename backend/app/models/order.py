from typing import List, Optional
from pydantic import BaseModel, Field
from app.utils.pyobjectid import PyObjectId


class OrderItem(BaseModel):
    product_id: PyObjectId 
    quantity: int


class Order(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    delivery_date: str
    in_delivery: bool
    total_price: float
    delivery_address: str
    payment_card: str
    details: Optional[List[OrderItem]] = None
    cart_id: PyObjectId 
    user_id: PyObjectId


class OrderIn(BaseModel):
    delivery_date: str
    in_delivery: bool
    total_price: float
    delivery_address: str
    payment_card: str
    details: Optional[List[OrderItem]] = None
    cart_id: PyObjectId 
    user_id: PyObjectId


class OrderUpdate(BaseModel):
    delivery_date: Optional[str] = None
    in_delivery: Optional[bool] = None
    total_price: Optional[float] = None
    delivery_address: Optional[str] = None
    payment_card: Optional[str] = None
    details: Optional[List[OrderItem]] = None



