from json import JSONEncoder
from uuid import UUID
from datetime import datetime

now = datetime.now()


def recipeEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "title": str(item["title"]),
        "date": str(now.year) + "/" + str(now.month) + "/" + str(now.day),
        "description": str(item["description"]),
        "ingredients": item["ingredients"],
    }


def recipeListEntity(entity) -> list:
    return [recipeEntity(item) for item in entity]
