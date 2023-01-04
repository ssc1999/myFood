from enum import Enum
from typing import Optional
from uuid import UUID, uuid4

from pydantic import BaseModel


class Gender(str, Enum):
    male = "male"
    female = "female"


class Calories(BaseModel):
    age: int
    weight: float
    height: float
    gender: Gender
