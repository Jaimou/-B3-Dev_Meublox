from pydantic import BaseModel, Field, validator
from bson import ObjectId
from app.utils.pyobjectid import PyObjectId

class FavoriteBase(BaseModel):
    user_id: str
    product_id: str

    @validator("user_id", "product_id", pre=True)
    def validate_ids(cls, id):
        if not ObjectId.is_valid(id):
            raise ValueError('Invalid objectid')
        return str(id)

class FavoriteCreate(FavoriteBase):
    pass

class Favorite(FavoriteBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
