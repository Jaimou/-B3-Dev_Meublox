from pydantic import BaseModel, Field
from typing import List, Optional

from app.utils.pyobjectid import PyObjectId


class Product(BaseModel):
    nom: Optional[str]
    description: Optional[str]
    short_description: Optional[str]
    prix: Optional[float]
    images: Optional[List[str]]
    couleurs: Optional[List[str]]
    stock: Optional[int]
    categorie: Optional[List[str]]
    note: Optional[int]
    users_id: Optional[List[str]]
    users_notes: Optional[List[int]]


class ProductResponse(Product):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")


class ProductFilter(BaseModel):
    pass
