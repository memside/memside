import json
import sys

from memside_http import api_request


scope_ref = sys.argv[1] if len(sys.argv) > 1 else "personal-planning"
checkpoint_id = sys.argv[2] if len(sys.argv) > 2 else None
query = {
    "scope_level": "project",
    "scope_ref": scope_ref,
    "budget_mode": "light",
}
result = {
    "startup": api_request("GET", "/context/startup", query=query),
    "workspace_profile": api_request(
        "GET",
        "/context/workspace-profile",
        query=query,
    ),
}
if checkpoint_id:
    result["resume"] = api_request(
        "GET",
        "/context/resume",
        query={**query, "checkpoint_id": checkpoint_id},
    )

print(json.dumps(result, indent=2))
