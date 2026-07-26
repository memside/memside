import json
import os
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


BASE_URL = "https://api.memside.com"


def api_request(method, path, *, query=None, body=None):
    api_key = os.environ.get("MEMSIDE_API_KEY")
    if not api_key:
        raise RuntimeError("Set MEMSIDE_API_KEY before running this example.")

    url = f"{BASE_URL}{path}"
    if query:
        url = f"{url}?{urlencode(query, doseq=True)}"

    data = json.dumps(body).encode("utf-8") if body is not None else None
    headers = {"Authorization": f"Bearer {api_key}"}
    if data is not None:
        headers["Content-Type"] = "application/json"

    request = Request(url, data=data, headers=headers, method=method)
    try:
        with urlopen(request, timeout=30) as response:
            payload = response.read()
    except HTTPError as exc:
        payload = exc.read()
        try:
            error = json.loads(payload) if payload else {}
        except json.JSONDecodeError:
            error = {}
        message = (
            error.get("error", {}).get("message")
            or error.get("detail")
            or exc.reason
        )
        raise RuntimeError(
            f"Memside request failed: {exc.code} {message}"
        ) from None

    return json.loads(payload) if payload else None
