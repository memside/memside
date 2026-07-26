import json
import sys
from urllib.parse import quote

from memside_http import api_request


memory_id = sys.argv[1] if len(sys.argv) > 1 else None
if not memory_id:
    memories = api_request("GET", "/memories", query={"limit": 1})
    memory_id = memories[0]["id"] if memories else None

if not memory_id:
    print("No accessible memories found.")
    raise SystemExit(0)

encoded_id = quote(memory_id, safe="")
result = {
    "memory": api_request("GET", f"/memories/{encoded_id}"),
    "batch": api_request(
        "GET",
        "/memories/batch",
        query={"memory_ids": memory_id},
    ),
    "revisions": api_request(
        "GET",
        f"/memories/{encoded_id}/revisions",
    ),
    "context_map": api_request(
        "GET",
        f"/memories/{encoded_id}/context-map",
    ),
    "subjects": api_request(
        "GET",
        f"/memories/{encoded_id}/subjects",
    ),
}

print(json.dumps(result, indent=2))
