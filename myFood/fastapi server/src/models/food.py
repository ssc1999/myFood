from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel


class Food(BaseModel):
    name: str
    calories: int
