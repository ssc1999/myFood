from enum import Enum
from typing import Optional
from uuid import UUID, uuid4
from pydantic import BaseModel


class Recipe(BaseModel):
    tittle: str
    link: str
    description: str
