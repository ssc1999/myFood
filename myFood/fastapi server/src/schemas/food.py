from json import JSONEncoder
from uuid import UUID


def foodEntity(item) -> dict:
    # for x in entity:
    #     if x.id == item.id:
    #         return {
    #             "id": x["id"],
    #             "name": x["name"],
    #             "calories": x["calories"]
    #         }
    return {
        "id": str(item["_id"]),
        "name": item["name"],
        "calories": int(item["calories"])
    }


def foodListEntity(entity) -> list:
    return [foodEntity(item) for item in entity]
