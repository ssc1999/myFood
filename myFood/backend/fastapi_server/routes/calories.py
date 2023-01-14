from http.client import HTTPException

from typing import List
from uuid import UUID, uuid4
from fastapi import APIRouter
from models.calories import Gender

from models.calories import Calories

calories = APIRouter()


@calories.post("/api/calories", tags=["Calories"])
async def check_calories(calories: Calories):

    total = calories.weight / pow(((calories.height)/100), 2)

    return {"total": total}
