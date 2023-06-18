from typing import List, Optional
from bson import ObjectId
from pydantic import BaseModel, Field
from app.utils.pyobjectid import PyObjectId


class ProductBase(BaseModel):
    # "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    nom: str = Field(...)
    description: str = Field(...)
    short_description: str = Field(...)
    prix: float = Field(...)
    images: Optional[List[str]]
    couleurs: Optional[List[str]]
    stock: int
    categorie: Optional[List[str]]
    note: Optional[int]
    users_id: Optional[List[str]]
    users_notes: Optional[List[int]]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        fields = {'id': '_id'}


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    pass
