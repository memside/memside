# Python Examples

These examples use `requests`.

```python
import os
import requests

API_KEY = os.environ["MEMSIDE_API_KEY"]
BASE_URL = "https://api.memside.com"


def memside(method, path, **kwargs):
    headers = kwargs.pop("headers", {})
    headers["Authorization"] = f"Bearer {API_KEY}"
    response = requests.request(method, f"{BASE_URL}{path}", headers=headers, **kwargs)
    response.raise_for_status()
    return response.json()


startup = memside("GET", "/context/startup")
print(startup)

created = memside(
    "POST",
    "/memories",
    json={
        "text": "Launch note\nMemside Python example created a memory.",
        "type": "note",
        "sensitivity": "private",
        "tags": ["example", "python"],
    },
)

print(created)
```
