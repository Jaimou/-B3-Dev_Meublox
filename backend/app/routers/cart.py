from fastapi import APIRouter, Depends, HTTPException
from app.database.db import db
from bson import ObjectId
from app.models.cart import Cart, CartItem
from ..models.cart import Cart, CartItem
from ..database.db import Database, get_database
from ..schemas.cart import CartCreate, CartItemCreate, CartUpdate
import asyncio


router = APIRouter() 


@router.post("/cart")
async def add_to_cart(cart_create: CartCreate):
    user_id = cart_create.user_id
    product_id = cart_create.items[0].product_id
    quantity = cart_create.items[0].quantity

    product_collection = db.get_collection("products")
    cart_collection = db.get_collection("carts")

    product = product_collection.find_one({"_id": ObjectId(str(product_id))})

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if "prix" not in product:
        raise HTTPException(status_code=500, detail="Product price not available")

    cart = cart_collection.find_one({"user_id": user_id})

    if not cart:
        new_cart = Cart(user_id=user_id, items=[])
        result = cart_collection.insert_one(new_cart.dict())
        cart = cart_collection.find_one({"_id": result.inserted_id})

    cart_item = CartItem(
        id=str(ObjectId()),
        product_id=str(product_id),
        quantity=quantity,
        total_price=product["prix"] * quantity
    )

    cart_collection.update_one(
        {"_id": cart["_id"]},
        {"$push": {"items": cart_item.dict()}}
    )

    # Décrémente le stock du produit
    product_collection.update_one(
        {"_id": ObjectId(str(product_id))},
        {"$inc": {"stock": -quantity}}
    )

    return cart

@router.get("/cart/{user_id}")
async def get_cart(user_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    return cart

@router.delete("/cart/{user_id}")
async def delete_cart(user_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    # Récupérer les articles du panier
    items = cart.get("items", [])

    # Rétablir les quantités des articles supprimés dans le stock
    for item in items:
        product_id = item.get("product_id")
        quantity = item.get("quantity")
        product = await db.products.find_one({"_id": ObjectId(product_id)})

        if product:
            current_stock = product.get("stock", 0)
            new_stock = current_stock + quantity

            # Mettre à jour le stock du produit
            await db.products.update_one(
                {"_id": ObjectId(product_id)},
                {"$set": {"stock": new_stock}}
            )

    # Supprimer le panier
    await db.carts.delete_one({"user_id": user_id})

    return {"message": "Cart deleted"}


@router.put("/cart/{user_id}/{product_id}")
async def update_cart_item(user_id: int, product_id: int, quantity: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = await db.carts.find_one({"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    product = await db.products.find_one({"_id": ObjectId(product_id)})

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    await db.carts.update_one({"_id": cart["_id"], "items.product_id": product_id}, {"$set": {"items.$.quantity": quantity, "items.$.total_price": product["price"] * quantity}})

    return cart

@router.get("/cart/{user_id}/total")
async def get_cart_total(user_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    total = 0

    for item in cart["items"]:
        total += item["total_price"]

    return {"total": total}

@router.get("/cart/{user_id}/items")
async def get_cart_items(user_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    return cart["items"]

@router.get("/cart/{user_id}/items/{product_id}")
async def get_cart_item(user_id: int, product_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = await db.carts.find_one({"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return cart_item

@router.get("/cart/{user_id}/items/{product_id}/quantity")
async def get_cart_item_quantity(user_id: int, product_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = await db.carts.find_one({"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return cart_item["items"][0]["quantity"]

@router.get("/cart/{user_id}/items/{product_id}/total_price")
async def get_cart_item_total_price(user_id: int, product_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = await db.carts.find_one({"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    return cart_item["items"][0]["total_price"]

@router.get("/cart/{user_id}/items/{product_id}/product")
async def get_cart_item_product(user_id: int, product_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = await db.carts.find_one({"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    product = await db.products.find_one({"_id": ObjectId(product_id)})

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product

@router.delete("/cart/{user_id}")
async def delete_cart(user_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    await db.carts.delete_one({"user_id": user_id})

    return {"message": "Cart deleted"}

@router.delete("/cart/{user_id}/items")
async def delete_cart_items(user_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    await db.carts.update_one({"user_id": user_id}, {"$set": {"items": []}})

    return {"message": "Cart items deleted"}


