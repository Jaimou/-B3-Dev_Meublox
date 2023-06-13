from bson import ObjectId
from pydantic import BaseModel, Field
from app.utils.pyobjectid import PyObjectId

class VoteBase(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId = Field(...)
    product_id: PyObjectId = Field(...)
    rating: int = Field(..., gt=0, lt=6)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        fields = {'id': '_id'}

class VoteCreate(VoteBase):
    pass

class Vote(VoteBase):
    pass
