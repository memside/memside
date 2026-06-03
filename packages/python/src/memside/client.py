import json
import os
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


DEFAULT_BASE_URL = "https://api.memside.com"


class MemsideError(Exception):
    def __init__(
        self,
        message,
        *,
        status=None,
        code=None,
        retryable=None,
        request_id=None,
        details=None,
    ):
        super().__init__(message)
        self.status = status
        self.code = code
        self.retryable = retryable
        self.request_id = request_id
        self.details = details


class MemsideClient:
    def __init__(self, api_key=None, base_url=DEFAULT_BASE_URL, timeout=30, transport=None):
        self.api_key = api_key or os.getenv("MEMSIDE_API_KEY")
        if not self.api_key:
            raise MemsideError(
                "Missing Memside API key",
                status=401,
                code="missing_api_key",
                retryable=False,
            )

        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self.transport = transport

    def context_startup(self, **params):
        return self.request("GET", "/context/startup", params=params)

    def context_resume(self, **params):
        return self.request("GET", "/context/resume", params=params)

    def context_workspace_profile(self, **params):
        return self.request("GET", "/context/workspace-profile", params=params)

    def memories_list(self, **params):
        return self.request("GET", "/memories", params=params)

    def memories_search(self, **params):
        return self.request("GET", "/memories/search", params=params)

    def memories_get(self, memory_id):
        return self.request("GET", f"/memories/{memory_id}")

    def memories_create(self, memory):
        return self.request("POST", "/memories", json_body=memory)

    def memories_update(self, memory_id, patch):
        return self.request("PATCH", f"/memories/{memory_id}", json_body=patch)

    def memories_delete(self, memory_id):
        return self.request("DELETE", f"/memories/{memory_id}")

    def request(self, method, path, *, params=None, json_body=None, headers=None):
        url = self._build_url(path, params)
        request_headers = {
            "Accept": "application/json",
            "Authorization": f"Bearer {self.api_key}",
            **(headers or {}),
        }
        body = None

        if json_body is not None:
            body = json.dumps(json_body).encode("utf-8")
            request_headers["Content-Type"] = "application/json"

        if self.transport:
            status, response_headers, response_body = self.transport(
                method,
                url,
                request_headers,
                body,
                self.timeout,
            )
            payload = _read_payload(response_body)
            if status >= 400:
                raise _to_memside_error(status, payload)
            return payload

        request = Request(url, data=body, headers=request_headers, method=method)

        try:
            with urlopen(request, timeout=self.timeout) as response:
                payload = _read_payload(response.read())
                return payload
        except HTTPError as error:
            payload = _read_payload(error.read())
            raise _to_memside_error(error.code, payload) from error

    def _build_url(self, path, params=None):
        clean_params = {
            key: value
            for key, value in (params or {}).items()
            if value is not None
        }

        query = urlencode(clean_params, doseq=True)
        url = f"{self.base_url}{path}"
        return f"{url}?{query}" if query else url


def _read_payload(body):
    if body is None or body == b"":
        return None

    if isinstance(body, bytes):
        body = body.decode("utf-8")

    if body == "":
        return None

    try:
        return json.loads(body)
    except json.JSONDecodeError:
        return body


def _to_memside_error(status, payload):
    error = payload.get("error") if isinstance(payload, dict) else None
    message = None
    code = "request_failed"
    retryable = False

    if isinstance(error, dict):
        message = error.get("message")
        code = error.get("code") or code
        status = error.get("status") or status
        retryable = bool(error.get("retryable"))

    return MemsideError(
        message or "Memside API request failed",
        status=status,
        code=code,
        retryable=retryable,
        request_id=payload.get("request_id") if isinstance(payload, dict) else None,
        details=payload,
    )
