from json import JSONEncoder
from uuid import UUID


def recipeEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "tittle": item["tittle"],
        "link": item["link"],
        "description": item["description"],
        "ingredients": item["ingredients"],
    }


def recipeListEntity(entity) -> list:
    return [recipeEntity(item) for item in entity]
