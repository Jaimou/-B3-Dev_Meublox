from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from bson import ObjectId
from app.database.db import add_order,delete_order,retrieve_order,\
    retrieve_orders,update_order
    
from app.models.order import ErrorResponseModel,OrderBaseModel,OrderInDBModel,\
    OrderUpdateModel,MultipleOrderResponseModel,SingleOrderResponseModel


router = APIRouter()


@router.post("/", response_description="Order data added into the database")
async def add_order_data(order: OrderBaseModel = Body(...)):
    order = jsonable_encoder(order)
    new_order = await add_order(order)
    return SingleOrderResponseModel(new_order, "Order added successfully.")


@router.get("/{id}", response_description="Order data retrieved")
async def get_order_data(id):
    if (order := await retrieve_order(id)) :
        return SingleOrderResponseModel(order, "Order retrieved successfully.")
    raise HTTPException(status_code=404, detail="Order not found")


@router.get("/", response_description="Orders data retrieved")
async def get_orders_data():
    orders = await retrieve_orders()
    if orders:
        return MultipleOrderResponseModel(orders, "Orders data retrieved successfully.")
    return MultipleOrderResponseModel([], "No orders available to retrieve.")


@router.put("/{id}")
async def update_order_data(id: str, req: OrderUpdateModel = Body(...)):
    req = {k: v for k, v in req.dict().items() if v is not None}
    if len(req) >= 1:
        order = await retrieve_order(id)
        if order:
            updated_order = await update_order(id, req)
            return SingleOrderResponseModel(
                updated_order, "Order updated successfully."
            )
        raise HTTPException(status_code=404, detail="Order not found")
    raise HTTPException(status_code=400, detail="Invalid request body")


@router.delete("/{id}", response_description="Order data deleted from the database")
async def delete_order_data(id: str):
    deleted_order = await delete_order(id)
    if deleted_order:
        return SingleOrderResponseModel(
            deleted_order, "Order deleted successfully."
        )
    raise HTTPException(status_code=404, detail="Order not found")


@router.put("/{id}/delivery")
async def update_delivery_data(
    id: str,
    delivery_address: str = Body(...),
    delivery_mode: str = Body(...),
    delivery_fees: float = Body(...),
):
    order = await retrieve_order(id)
    if order:
        order_id = {"_id": ObjectId(id)}
        delivery_info = {
            "delivery_address": delivery_address,
            "delivery_mode": delivery_mode,
            "delivery_fees": delivery_fees,
        }
        updated_order = await update_order(id, delivery_info)
        return SingleOrderResponseModel(
            updated_order, "Delivery information updated successfully."
        )
    raise HTTPException(status_code=404, detail="Order not found")
@router.put("/{id}/payment")
async def update_payment_data(
    id: str,
    payment_method: str = Body(...),
    payment_status: str = Body(...),
    payment_amount: float = Body(...),
    card_number: str = Body(...),
    card_expiry_date: str = Body(...),
    card_security_code: str = Body(...),
):
    order = await retrieve_order(id)
    if order:
        order_id = {"_id": ObjectId(id)}
        payment_info = {
            "payment_method": payment_method,
            "payment_status": payment_status,
            "payment_amount": payment_amount,
            "card_number": card_number,
            "card_expiry_date": card_expiry_date,
            "card_security_code": card_security_code,
        }
        updated_order = await update_order(id, payment_info)
        return SingleOrderResponseModel(
            updated_order, "Payment information updated successfully."
        )
    raise HTTPException(status_code=404, detail="Order not found")
