import json
import sys
from urllib.parse import quote

from memside_http import api_request


subject_id = sys.argv[1] if len(sys.argv) > 1 else None
if not subject_id:
    subjects = api_request("GET", "/subjects", query={"limit": 1})
    subject_id = subjects[0]["id"] if subjects else None

if not subject_id:
    print("No accessible Subjects found.")
    raise SystemExit(0)

encoded_id = quote(subject_id, safe="")
result = {
    "subject": api_request("GET", f"/subjects/{encoded_id}"),
    "memories": api_request(
        "GET",
        f"/subjects/{encoded_id}/memories",
        query={"limit": 10},
    ),
    "context": api_request("GET", f"/subjects/{encoded_id}/context"),
    "facts": api_request(
        "GET",
        f"/subjects/{encoded_id}/facts",
        query={"limit": 10},
    ),
    "insights": api_request(
        "GET",
        f"/subjects/{encoded_id}/memory-insights",
        query={"limit": 10},
    ),
}

print(json.dumps(result, indent=2))
