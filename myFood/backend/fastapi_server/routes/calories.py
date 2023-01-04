from http.client import HTTPException
from typing import List
from uuid import UUID, uuid4
from fastapi import APIRouter
from models.calories import Gender

from models.calories import Calories

calories = APIRouter()


@calories.post("/calories", tags=["Calories"])
async def check_calories(calories: Calories):

    if (calories.gender == Gender.female):
        total = 655 + (9.6 * calories.weight) + \
            (1.8 * calories.height) - (4.7 * calories.age)
    elif (calories.gender == Gender.male):
        total = 66 + (13.7 * calories.weight) + \
            (5 * calories.height) - (6.5 * calories.age)

    return {"total": total}
