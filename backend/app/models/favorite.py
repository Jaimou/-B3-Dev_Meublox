from pydantic import BaseModel, Field
from bson import ObjectId

class FavoriteInDB(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))  # Convert ObjectId to string
    user_id: str
    product_id: str
