from pydantic import BaseModel, Field
from bson import ObjectId

class FavoriteInDB(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId())) 
    user_id: str
    product_id: str
