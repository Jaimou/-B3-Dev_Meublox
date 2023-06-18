from app.database.db import db
from app.models import user
from app.utils import oauth2
from app.schemas.product import Product, ProductResponse
from fastapi import APIRouter, Body, Depends, Query, Request, Response, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List, Optional
from bson import ObjectId
import pymongo
import pydantic
pydantic.json.ENCODERS_BY_TYPE[ObjectId] = str


router = APIRouter()


@router.post("", status_code=status.HTTP_201_CREATED, response_description="Create a product")
def create_product(request: Request, product: Product):
    product = jsonable_encoder(product)
    new_product = request.app.database["products"].insert_one(product)
    created_product = request.app.database["products"].find_one(
        {"_id": new_product.inserted_id}
    )
    return created_product


@router.get("", response_description="Fetch all product")
def fetch_products(nom: Optional[str] = Query(None, alias="nom"),
                   prix_min: Optional[float] = Query(None, alias="prix_min"),
                   prix_max: Optional[float] = Query(None, alias="prix_max"),
                   couleurs: Optional[List[str]] = Query(
                       None, alias="couleurs"),
                   note: Optional[int] = Query(None, alias="note"),
                   sort: Optional[str] = Query(
                       None, alias="sort", regex="^[a-z_-]+:(desc|asc)$"),
                   ):
    sorting_keys = ["nom", "note", "prix"]

    query: dict = {}

    if prix_min is not None or prix_max is not None:
        query["prix"] = {}
        if prix_min is not None:
            query["prix"]["$gte"] = prix_min
        if prix_max is not None:
            query["prix"]["$lte"] = prix_max
    if couleurs is not None:
        query["couleurs"] = {"$in": couleurs}
    # Tri
    if sort is not None:
        array = sort.split(':')

        if array[0] in sorting_keys:
            if array[1] == 'asc':
                products = list(db.get_collection("products").find(
                    query).sort(array[0], pymongo.ASCENDING))
                return products

            else:
                products = list(db.get_collection("products").find(
                    query).sort(array[0], pymongo.DESCENDING))
                return products
    products = list(db.get_collection("products").find(query))

    return products


@router.get("/{id_prod}", response_model=ProductResponse, response_description="Fetch product by Id")
def fetch_products_by_id(id_prod: str, request: Request):
    if (product := db.get_collection("products").find_one({"_id": ObjectId(id_prod)})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with ID {id_prod} not found")


@router.put("/{id}", response_description="Update a Product", response_model=Product)
def update_book(id: str, request: Request, product: Product = Body(...)):
    product = {k: v for k, v in product.dict().items() if v is not None}
    if len(product) >= 1:
        update_result = request.app.database["products"].update_one(
            {"_id":  ObjectId(id)}, {"$set": product}
        )

        if update_result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"Product with ID {id} not found")

    if (
        existing_product := request.app.database["products"].find_one({"_id": ObjectId(id)})
    ) is not None:
        return existing_product

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Product with ID {id} not found")


@router.delete("/{id}", response_description="Delete a product")
def delete_product(id: str, request: Request, response: Response):
    delete_result = request.app.database["products"].delete_one(
        {"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        response.status_code = status.HTTP_204_NO_CONTENT
        return response

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"Product with ID {id} not found")


@router.get("/search", response_model=List[ProductResponse], response_description="Search product by name")
def search_product_by_name(nom: str, request: Request):
    if (product := db.get_collection("products").find_one({"nom": nom})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with name {nom} not found")


@router.get("/search", response_model=List[ProductResponse], response_description="Search product by price")
def search_product_by_price(prix: float, request: Request):
    if (product := db.get_collection("products").find_one({"prix": prix})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with price {prix} not found")


@router.get("/search", response_model=List[ProductResponse], response_description="Search product by color")
def search_product_by_color(couleur: str, request: Request):
    if (product := db.get_collection("products").find_one({"couleur": couleur})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with color {couleur} not found")


@router.get("/search", response_model=List[ProductResponse], response_description="Search product by note")
def search_product_by_note(note: int, request: Request):
    if (product := db.get_collection("products").find_one({"note": note})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with note {note} not found")


@router.get("/search", response_model=List[ProductResponse], response_description="Search product by category")
def search_product_by_category(categorie: str, request: Request):
    if (product := db.get_collection("products").find_one({"categorie": categorie})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with category {categorie} not found")


@router.get("/search", response_model=List[ProductResponse], response_description="Search product by description")
def search_product_by_description(description: str, request: Request):
    if (product := db.get_collection("products").find_one({"description": description})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with description {description} not found")


@router.get("/search", response_model=List[ProductResponse], response_description="Search product by image")
def search_product_by_image(image: str, request: Request):
    if (product := db.get_collection("products").find_one({"image": image})) is not None:
        return product
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                        detail=f"product with image {image} not found")
