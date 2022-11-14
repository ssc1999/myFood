from fastapi import FastAPI
from http.client import HTTPException
from routes.food import food

app = FastAPI()

app.include_router(food)


@app.get("/")
async def root():
    return {"Hello": "world"}
