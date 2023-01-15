from enum import Enum
from typing import NamedTuple, TypedDict
from uuid import UUID, uuid4
from pydantic import BaseModel


class Ingredients(NamedTuple):
    ingredient: str
    quantity: float


class Recipe(BaseModel):
    user: str
    title: str
    date: str
    description: str
    ingredients: list[Ingredients]
