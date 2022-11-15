from fastapi import FastAPI
from http.client import HTTPException
from routes.food import food
from routes.calories import calories
from routes.recipe import recipe
from docs import tags_metadata

app = FastAPI(
    title="myFood ",
    description="REST API with FastAPI and MongoDB",
    version="0.0.1",
    openapi_tags=tags_metadata
)

app.include_router(food)
app.include_router(calories)
app.include_router(recipe)


@app.get("/")
async def root():
    return "Welcome to myFood"
