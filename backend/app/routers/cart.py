from fastapi import APIRouter, Depends, HTTPException
from app.database.db import db
from bson import ObjectId
from app.models.cart import Cart, CartItem
from ..models.cart import Cart, CartItem, UpdateCartItem
from ..database.db import Database, get_database
from ..schemas.cart import CartCreate


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
        raise HTTPException(
            status_code=500, detail="Product price not available")

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

    product_collection.update_one(
        {"_id": ObjectId(str(product_id))},
        {"$inc": {"stock": -quantity}}
    )

    return cart


@router.get("/cart/{user_id}")
async def get_cart(user_id: str):
    cart_collection = db.get_carts_collection()

    cart = cart_collection.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    return cart


@router.delete("/cart/{user_id}")
async def delete_cart(user_id: str):
    cart_collection = db.get_carts_collection()

    cart = cart_collection.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    items = cart.get("items", [])

    for item in items:
        product_id = item.get("product_id")
        quantity = item.get("quantity")
        product = db.get_products_collection().find_one(
            {"_id": ObjectId(product_id)})

        if product:
            current_stock = product.get("stock", 0)
            new_stock = current_stock + quantity

            db.get_products_collection().update_one(
                {"_id": ObjectId(product_id)},
                {"$set": {"stock": new_stock}}
            )

    cart_collection.delete_one({"user_id": user_id})

    return {"message": "Cart deleted"}


@router.delete("/cart/{user_id}/{product_id}")
async def delete_cart_item(user_id: str, product_id: str):
    cart_collection = db.get_carts_collection()

    cart = cart_collection.find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_collection.update_one({"_id": cart["_id"]}, {
                               "$pull": {"items": {"product_id": product_id}}})

    return cart


@router.put("/cart/{user_id}/{product_id}")
async def update_cart_item(user_id: str, product_id: str, update_item: UpdateCartItem, db: Database = Depends(get_database)):
    cart = db.get_carts_collection().find_one({"user_id": user_id})

    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")

    cart_item = db.get_carts_collection().find_one(
        {"user_id": user_id, "items.product_id": product_id})

    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    product = db.get_products_collection().find_one(
        {"_id": ObjectId(product_id)})

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    updated_item = CartItem(product_id=product_id, quantity=update_item.quantity,
                            total_price=product["prix"] * update_item.quantity)

    db.get_carts_collection().update_one(
        {"_id": cart["_id"], "items.product_id": product_id},
        {"$set": {"items.$.quantity": updated_item.quantity,
                  "items.$.total_price": updated_item.total_price}}
    )

    return cart
