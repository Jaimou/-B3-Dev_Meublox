from fastapi import APIRouter, Depends, HTTPException
from app.database.db import db
from bson import ObjectId
from app.models.cart import Cart, CartItem
from ..models.cart import Cart, CartItem

router = APIRouter() 

@router.post("/cart")
async def add_to_cart(user_id: int, product_id: int, quantity: int):
    product = await db.products.find_one({"_id": ObjectId(product_id)})

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        new_cart = Cart(user_id=user_id, items=[])
        cart_id = await db.carts.insert_one(new_cart.dict())
        cart = await db.carts.find_one({"_id": cart_id.inserted_id})

    cart_item = CartItem(product_id=product_id, quantity=quantity, total_price=product["price"] * quantity)
    
    await db.carts.update_one({"_id": cart["_id"]}, {"$push": {"items": cart_item.dict()}})

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

    await db.carts.delete_one({"_id": cart["_id"]})

    return cart

@router.delete("/cart/{user_id}/{product_id}")
async def delete_cart_item(user_id: int, product_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    await db.carts.update_one({"_id": cart["_id"]}, {"$pull": {"items": {"product_id": product_id}}})

    return cart

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

@router.get("/cart/{user_id}/items/{product_id}/product/{field}")
async def get_cart_item_product_field(user_id: int, product_id: int, field: str):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = await db.carts.find_one({"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    product = await db.products.find_one({"_id": ObjectId(product_id)})

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product[field]



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

@router.delete("/cart/{user_id}/items/{product_id}")
async def delete_cart_item(user_id: int, product_id: int):
    cart = await db.carts.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = await db.carts.find_one({"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    await db.carts.update_one({"user_id": user_id}, {"$pull": {"items": {"product_id": product_id}}})

    return {"message": "Cart item deleted"}

# Ajoutez d'autres routes pour mettre à jour ou supprimer des éléments du panier si nécessaire
