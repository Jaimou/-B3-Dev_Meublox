from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import db
from app.config import settings
from fastapi.logger import logger
from app.models.cart import Cart, CartItem
from app.routers import auth, product, user
from app.routers import cart, vote

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

app.include_router(auth.router)
app.include_router(product.router, prefix="/products", tags=['Products'])
app.include_router(user.router, prefix="/users", tags=['Users'])
app.include_router(cart.router, prefix="/cart", tags=['Cart'])
app.include_router(vote.router, prefix="/votes", tags=['Votes'])



