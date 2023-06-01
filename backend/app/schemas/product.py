from pydantic import BaseModel,Field
from typing import List, Optional

from app.utils.pyobjectid import PyObjectId

class Product(BaseModel):
    nom: str #
    description: str
    short_description: str #
    prix: float #
    images: Optional[List[str]]
    couleurs: Optional[List[str]] #
    stock: int
    categorie: Optional[List[str]]
    note: Optional[int] #

class ProductResponse(Product):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class ProductFilter(BaseModel):
    pass