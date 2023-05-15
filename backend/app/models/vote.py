from pydantic import BaseModel
from typing import Optional

class VoteInDB(BaseModel):
    id: Optional[str] = None
    user_id: int
    product_id: int
    rating: float
