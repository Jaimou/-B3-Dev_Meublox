from typing import Optional
from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None
    role: Optional[str] = None

class UserIn(BaseModel):
    email: EmailStr
    role: str
    civilite: str
    nom: str
    prenom: str
    adresse_postale: str
    password: str
    code_postal: Optional[str] = None
    ville: Optional[str] = None
    pays: Optional[str] = None
    telephone: Optional[str] = None
    date_naissance: Optional[str] = None

class UserUpdate(BaseModel):
    password: Optional[str] = None
    role: Optional[str] = None
    civilite: Optional[str] = None
    nom: Optional[str] = None
    prenom: Optional[str] = None
    adresse_postale: Optional[str] = None
    code_postal: Optional[str] = None
    ville: Optional[str] = None
    pays: Optional[str] = None
    telephone: Optional[str] = None
    email: Optional[str] = None
    date_naissance: Optional[str] = None