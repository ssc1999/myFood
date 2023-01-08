from json import JSONEncoder
from uuid import UUID


def recipeEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "tittle": str(item["tittle"]),
        "link": str(item["link"]),
        "description": str(item["description"]),
        "ingredients": item["ingredients"],
    }


def recipeListEntity(entity) -> list:
    return [recipeEntity(item) for item in entity]
