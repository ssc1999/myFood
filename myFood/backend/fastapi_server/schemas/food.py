from json import JSONEncoder
from uuid import UUID


def foodEntity(item) -> dict:
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "calories": float(item["calories"]),
        "carbs": float(item["carbs"]),
        "fats": float(item["fats"]),
        "proteins": float(item["proteins"])
    }


def foodListEntity(entity) -> list:
    return [foodEntity(item) for item in entity]
