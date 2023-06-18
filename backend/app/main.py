from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from email.message import EmailMessage
import smtplib
import secrets
from app.database.db import db
from fastapi.logger import logger
from app.routers import auth, product, user
from app.routers import cart, vote, favorite, order



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

#reset password

class ResetPasswordRequest(BaseModel):
    email: str

class ResetPasswordForm(BaseModel):
    password: str

@app.post("/reset-password", tags=['Auth'])
async def reset_password(request: ResetPasswordRequest):
    user = db.get_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    token = generate_reset_token() 

    reset_link = generate_reset_link(user["_id"], token) 
    
    send_reset_email(request.email, reset_link)
    
    return {"message": "Email de réinitialisation envoyé avec succès"}

def generate_reset_token() -> str:
    token = secrets.token_urlsafe(32) 
    return token

def generate_reset_link(user_id: int, token: str) -> str:
    reset_link = f"http://localhost:3000/forgot/{user_id}/{token}"
    return reset_link

def send_reset_email(email: str, reset_link: str):
    subject = "Réinitialisation de mot de passe"
    message = f"""<html>
    <head>
        <style>
            body {{
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                color: #333333;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }}
            .logo-container {{
                text-align: center;
            }}
            .logo {{
                display: inline-block;
                width: 100px;
                height: 100px;
                object-fit: cover;
            }}
            h2 {{
                font-size: 28px;
                margin-bottom: 20px;
                text-align: center;
            }}
            .word1 {{
                color: #0077B6;
                font-weight: black;
            }}
            .word2 {{
                color: #0077B6;
                font-weight: black;
            }}
            .word3 {{
                color: #0077B6;
                font-weight: black;
            }}
            .word4 {{
                color: #0077B6;
                font-weight: black;
            }}
            p {{
                font-size: 16px;
                margin-bottom: 10px;
            }}
            .button {{
                display: inline-block;
                background: linear-gradient(to right, #FF512F, #F09819, #FF512F, #F09819);
                color: #ffffff;
                padding: 12px 20px;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }}
            .button:hover {{
                background: linear-gradient(to right, #FF512F, #F09819, #FF512F, #F09819);
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo-container">
                <img src="https://cdn.discordapp.com/attachments/1039460903067856908/1113744278888403026/meubloxLogo.png" alt="Logo Meublox" class="logo">
            </div>
            <h2><span class="word1">Réinitialisation</span> <span class="word2">de</span> <span class="word3">mot</span> <span class="word4">de passe</span></h2>
            <p>Cher Membre,</p>
            <p>Vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur le bouton ci-dessous pour procéder à la réinitialisation :</p>
            <p><a href="{reset_link}" class="button">Réinitialiser mon mot de passe</a></p>
            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.</p>
            <p>Cordialement,</p>
            <p>L'équipe de Meublox  <a href="https://meublox.com" class="button1">Visiter notre site</a></p>
            <p></p>
            <p>Merci de ne pas répondre sur cette adresse mail car nous serons dans l'impossibilité de lire votre message.</p>
        </div>
    </body>
    </html>"""

    msg = EmailMessage()
    msg.add_alternative(message, subtype='html')
    msg['Subject'] = subject
    msg['From'] = "Meublox@noreply.com"
    msg['To'] = email

    with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
        smtp.starttls()
        smtp.login("meublox.contact@gmail.com", "dpjuugnlroqzgxvr")
        smtp.send_message(msg)


@app.get("/reset-password", tags=['Auth'])
async def reset_password_get(user_id: str, token: str):
    if validate_reset_token(user_id, token):
        return {"message": "Page de réinitialisation du mot de passe"}

    raise HTTPException(status_code=400, detail="Demande de réinitialisation invalide")

def validate_reset_token(user_id: str, token: str) -> bool:

    return True  

app.include_router(auth.router)
app.include_router(product.router, prefix="/products", tags=['Products'])
app.include_router(user.router, prefix="/users", tags=['Users'])
app.include_router(cart.router, prefix="", tags=['Cart'])
app.include_router(vote.router, prefix="/votes", tags=['Votes'])
app.include_router(favorite.router, prefix="", tags=['Favorites'])
app.include_router(order.router, prefix="/orders", tags=['Orders'])