from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from app.utils import oauth2

from app.database.db import db
from app.schemas.user import Token
from app.utils import oauth2, passwd_utils


router = APIRouter(tags=['Authentication'])

@router.post('/login', response_model=Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends()):

    user = db.get_collection("users").find_one({"email": {"$eq":user_credentials.username}}) # email $eq 
    print(user)

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    if not passwd_utils.verify_pwd(user_credentials.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    # create a token
    access_token = oauth2.create_access_token(data={"user_id": str(user["_id"]), "role":user["role"]})

    # return token
    return {"access_token": access_token, "token_type": "bearer"}
    

