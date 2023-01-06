from http.client import HTTPException
from typing import List
from uuid import UUID, uuid4
from fastapi import APIRouter

from models.recipe import Recipe
from schemas.recipe import recipeEntity, recipeListEntity
from config.db import conn
from bson import ObjectId

recipe = APIRouter()


@recipe.get("/recipe", tags=["Recipe"])
async def find_all_recipe():
    print(conn.myfood.recipe.find())
    print(recipeListEntity(conn.myfood.recipe.find()))
    return recipeListEntity(conn.myfood.recipe.find())


@recipe.get("/recipe/{id}", tags=["Recipe"])
async def get_recipe(id):
    print(recipeEntity(conn.myfood.recipe.find_one({"_id": ObjectId(id)})))
    return recipeEntity(conn.myfood.recipe.find_one({"_id": ObjectId(id)}))


@recipe.post("/recipe", tags=["Recipe"])
async def add_recipe(recipe: Recipe):
    conn.myfood.recipe.insert_one(dict(recipe))
    return "Added recipe: " + recipe.tittle


@recipe.delete("/recipe/{id}", tags=["Recipe"])
async def delete_recipe(id):
    conn.myfood.recipe.find_one_and_delete({"_id": ObjectId(id)})
    return "Deleted recipe with id: " + id
    # raise HTTPException(
    #     status_code=406,
    #     detail=f"food with id:{id} does not exists"
    # )
