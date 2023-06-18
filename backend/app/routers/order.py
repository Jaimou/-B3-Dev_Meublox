from fastapi import APIRouter, Body, HTTPException, Request, status, Response
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from app.database.db import db
from app.models.order import Order, OrderIn
from app.schemas.order import OrderUpdate, Order as OrderSchema
from typing import List

router = APIRouter()


@router.post("", response_description="Order data added into the database")
async def add_order_data(request: Request, order: OrderIn = Body(...)):
    order = jsonable_encoder(order)

    new_order = request.app.database["orders"].insert_one(order)

    created_product = request.app.database["orders"].find_one(

        {"_id": new_order.inserted_id}

    )

    return created_product


@router.get("/{id}", response_model=OrderSchema, response_description="Order data retrieved")
async def get_order_data(id):
    if (order := db.get_collection("orders").find_one({"_id": ObjectId(id)})) is not None:
        return order
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"order with ID {id} not found")


@router.get("", response_model=List[Order], response_description="Orders data retrieved")
def get_orders_data():
    orders = list(db.get_collection("orders").find())
 # if orders:
    return orders


@router.put("/{id}")
async def update_order_data(id: str, request: Request, order: OrderUpdate = Body(...)):
    order = {k: v for k, v in order.dict().items() if v is not None}
    if len(order) >= 1:
        update_result = request.app.database["orders"].update_one(
            {"_id":  ObjectId(id)}, {"$set": order}
        )

        if update_result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail=f"Order with ID {id} not found")

    if (
        existing_order := request.app.database["orders"].find_one({"_id": ObjectId(id)})
    ) is not None:
        return existing_order

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Order with ID {id} not found")


@router.delete("/{id}", response_description="Order data deleted from the database")
async def delete_order_data(id: str, request: Request, response: Response):
    delete_result = request.app.database["orders"].delete_one(
        {"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Order with ID {id} not found")
