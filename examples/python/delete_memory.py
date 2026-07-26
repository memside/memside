import json
import sys
from urllib.parse import quote

from memside_http import api_request


if len(sys.argv) != 3:
    raise RuntimeError(
        "Usage: python delete_memory.py "
        "<memory-id> <exact-confirmation>"
    )

memory_id, confirmation = sys.argv[1:]
result = api_request(
    "DELETE",
    f"/memories/{quote(memory_id, safe='')}",
    body={"delete_confirmation": confirmation},
)

print(json.dumps(result, indent=2))
