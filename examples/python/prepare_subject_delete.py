import json
import sys
from urllib.parse import quote

from memside_http import api_request


if len(sys.argv) != 2:
    raise RuntimeError(
        "Usage: python prepare_subject_delete.py <subject-id>"
    )

preview = api_request(
    "POST",
    f"/subjects/{quote(sys.argv[1], safe='')}/deletion/prepare",
)

print(json.dumps(preview, indent=2))
