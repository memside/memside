import json
import sys
from urllib.parse import quote

from memside_http import api_request


if len(sys.argv) < 4:
    raise RuntimeError(
        "Usage: python update_memory.py "
        "<memory-id> <expected-version> <new-text>"
    )

memory_id = sys.argv[1]
expected_version = int(sys.argv[2])
text = " ".join(sys.argv[3:]).strip()
updated = api_request(
    "PATCH",
    f"/memories/{quote(memory_id, safe='')}",
    body={"text": text, "expected_version": expected_version},
)

print(json.dumps(updated, indent=2))
