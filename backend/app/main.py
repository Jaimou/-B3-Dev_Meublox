from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from email.message import EmailMessage
import smtplib
from typing import Optional

from app.database.db import db
from app.config import settings
from fastapi.logger import logger
from app.models.cart import Cart, CartItem
from app.routers import auth, product, user
from app.routers import cart, vote, favorite


app = FastAPI(title="e-commerce", version="1.0.0")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = db.client
    app.database = db.db
    logger.warning("Connected to the MongoDB database!")

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()
    logger.warning("Disconnected from the MongoDB database!")

@app.get("/healthchecker", tags=['Health check'])
def root():
    return {"app": f"{app.title}", "version": f"{app.version}"}

class ResetPasswordRequest(BaseModel):
    email: str

class ResetPasswordForm(BaseModel):
    password: str

@app.post("/reset-password", tags=['Auth'])
async def reset_password(request: ResetPasswordRequest):
    # Vérifier si l'utilisateur existe avec l'email donné dans la base de données
    user = db.get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    # Générer un lien de réinitialisation unique
    reset_link = generate_reset_link(user["_id"])  # Utiliser user["_id"] au lieu de user["id"]

    # Envoyer un e-mail de réinitialisation contenant le lien
    send_reset_email(request.email, reset_link)

    # Répondre avec un message de succès
    return {"message": "Email de réinitialisation envoyé"}


def generate_reset_link(user_id: int) -> str:
    reset_link = f"http://localhost:8000/reset-password?user_id={user_id}"
    return reset_link

def send_reset_email(email: str, reset_link: str):
    # Configurer les informations de l'e-mail (expéditeur, destinataire, sujet, contenu)
    msg = EmailMessage()
    msg.set_content(f"Cliquez sur le lien suivant pour réinitialiser votre mot de passe : {reset_link}")
    msg['Subject'] = "Réinitialisation de mot de passe"
    msg['From'] = "Meublox@noreply.com"
    msg['To'] = email

    with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
        smtp.starttls()
        smtp.login("soso8amine@gmail.com", "zogkisyuvbwuhsjq")
        smtp.send_message(msg)

app.include_router(auth.router)
app.include_router(product.router, prefix="/products", tags=['Products'])
app.include_router(user.router, prefix="/users", tags=['Users'])
app.include_router(cart.router, prefix="/cart", tags=['Cart'])
app.include_router(vote.router, prefix="/votes", tags=['Votes'])
app.include_router(favorite.router, prefix="/favorites", tags=['Favorites'])

