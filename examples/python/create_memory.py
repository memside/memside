import json

from memside_http import api_request


created = api_request(
    "POST",
    "/memories",
    body={
        "text": (
            "Packing checklist\n"
            "Bring a charger and a reusable bottle."
        ),
        "type": "note",
        "sensitivity": "private",
        "tags": ["travel", "checklist"],
    },
)

print(json.dumps(created, indent=2))
