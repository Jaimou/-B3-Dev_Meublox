from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from app.utils.pyobjectid import PyObjectId


class UserBase(BaseModel):
    email: EmailStr = Field(...)
    role: str = Field(...)
    civilite: str = Field(...)
    nom: str = Field(...)
    prenom: str = Field(...)
    adresse_postale: str = Field(...)
    code_postal: str = Field(...)
    ville: str = Field(...)
    pays: str = Field(...)
    telephone: str = Field(...)
    date_naissance: str = Field(...)


class UserIn(UserBase):
    password: Optional[str]


class User(UserIn):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    hashed_password: Optional[str] = None


class UserUpdate(UserBase):
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
    hashed_password: Optional[str] = None


class UserIn(UserBase):
    password: Optional[str]
    is_admin: bool  # Champ supplémentaire pour l'admin


class Card(BaseModel):
    card_number: str = Field(...)
    card_holder: str = Field(...)
    expiration_date: str = Field(...)
    cvv: str = Field(...)
