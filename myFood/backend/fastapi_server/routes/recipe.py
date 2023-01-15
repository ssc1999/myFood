from http.client import HTTPException
from typing import List
from uuid import UUID, uuid4
from fastapi import APIRouter

from models.recipe import Recipe
from schemas.recipe import recipeEntity, recipeListEntity
from config.db import conn
from bson import ObjectId

recipe = APIRouter()


@recipe.get("/api/allrecipes", tags=["Recipe"])
async def find_all_recipe():
    print(conn.myfood.recipe.find())
    print(recipeListEntity(conn.myfood.recipe.find()))
    return recipeListEntity(conn.myfood.recipe.find())


@recipe.get("/api/recipe/{id}", tags=["Recipe"])
async def get_recipe(id):
    return recipeEntity(conn.myfood.recipe.find_one({"_id": ObjectId(id)}))


@recipe.get("/api/recipes/", tags=["Recipe"])
async def get_recipes(user: str):
    return recipeListEntity(conn.myfood.recipe.find({"user": user}))


@recipe.post("/api/recipes", tags=["Recipe"])
async def add_recipe(recipe: Recipe):
    conn.myfood.recipe.insert_one(dict(recipe))
    return {"status": "ok"}


@recipe.delete("/api/recipe/{id}", tags=["Recipe"])
async def delete_recipe(id):
    conn.myfood.recipe.find_one_and_delete({"_id": ObjectId(id)})
    return {"status": "ok"}
