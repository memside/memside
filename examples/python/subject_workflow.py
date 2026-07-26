import json
import sys
from urllib.parse import quote

from memside_http import api_request


if len(sys.argv) != 3:
    raise RuntimeError(
        "Usage: python subject_workflow.py "
        "<non-secret-memory-id> <idempotency-key>"
    )

memory_id, idempotency_key = sys.argv[1:]
subject = api_request(
    "POST",
    "/subjects",
    body={
        "name": "Weekend reading",
        "subject_type": "topic",
        "aliases": ["Reading list"],
    },
)
subject_path = f"/subjects/{quote(subject['id'], safe='')}"
link = api_request(
    "POST",
    f"{subject_path}/memories",
    body={"memory_id": memory_id},
)
suggestion = api_request(
    "POST",
    f"{subject_path}/fact-suggestions",
    body={
        "suggestion_type": "add_fact",
        "proposed_fact_type": "custom",
        "proposed_fact_text": (
            "This item belongs to the weekend reading list."
        ),
        "source_memory_id": memory_id,
        "idempotency_key": idempotency_key,
    },
)

print(
    json.dumps(
        {"subject": subject, "link": link, "suggestion": suggestion},
        indent=2,
    )
)
