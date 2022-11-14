from http.client import HTTPException
from typing import List
from uuid import UUID, uuid4
from fastapi import APIRouter

from models.food import Food
from schemas.food import foodEntity, foodListEntity
from config.db import conn
from bson import ObjectId

food = APIRouter()


@food.get("/food", tags=["Food"])
async def find_all_food():
    print(conn.myfood.food.find())
    print(foodListEntity(conn.myfood.food.find()))
    return foodListEntity(conn.myfood.food.find())


@food.get("/food/{id}", tags=["Food"])
async def get_food(id):
    return foodEntity(conn.myfood.food.find_one({"_id": ObjectId(id)}))


@food.post("/food", tags=["Food"])
async def add_food(food: Food):
    conn.myfood.food.insert_one(dict(food))
    return "Added food: " + food.name


@food.delete("/food/{id}", tags=["Food"])
async def delete_food(id):
    conn.myfood.food.find_one_and_delete({"_id": ObjectId(id)})
    return "Deleted food with id: " + id

    # raise HTTPException(
    #     status_code=406,
    #     detail=f"food with id:{id} does not exists"
    # )
