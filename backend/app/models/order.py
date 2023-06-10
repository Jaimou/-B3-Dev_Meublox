from typing import List, Optional
from pydantic import BaseModel


class OrderItem(BaseModel):
    product_id: int
    quantity: int


class Order(BaseModel):
    id: int
    delivery_date: str
    in_delivery: bool
    total_price: float
    delivery_address: str
    payment_card: str
    details: Optional[List[OrderItem]] = None


class OrderIn(BaseModel):
    delivery_date: str
    in_delivery: bool
    total_price: float
    delivery_address: str
    payment_card: str
    details: Optional[List[OrderItem]] = None


class OrderUpdate(BaseModel):
    delivery_date: Optional[str] = None
    in_delivery: Optional[bool] = None
    total_price: Optional[float] = None
    delivery_address: Optional[str] = None
    payment_card: Optional[str] = None
    details: Optional[List[OrderItem]] = None



