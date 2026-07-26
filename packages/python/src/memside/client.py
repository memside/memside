import json
import os
from typing import Iterable, List, Optional
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from .types import (
    Memory,
    MemoryBatchResult,
    MemoryCreate,
    MemoryDeleteResult,
    MemoryUpdate,
    ResumeContext,
    StartupContext,
    WorkspaceProfile,
)

DEFAULT_BASE_URL = "https://api.memside.com"


class MemsideError(Exception):
    def __init__(
        self,
        message,
        *,
        status=None,
        code=None,
        retryable=None,
        retry_after=None,
        request_id=None,
        details=None,
    ):
        super().__init__(message)
        self.status = status
        self.code = code
        self.retryable = retryable
        self.retry_after = retry_after
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

    def context_startup(self, **params) -> StartupContext:
        return self.request("GET", "/context/startup", params=params)

    def context_resume(self, **params) -> ResumeContext:
        return self.request("GET", "/context/resume", params=params)

    def context_workspace_profile(self, **params) -> WorkspaceProfile:
        return self.request("GET", "/context/workspace-profile", params=params)

    def memories_list(self, **params) -> List[Memory]:
        return self.request("GET", "/memories", params=params)

    def memories_search(self, **params) -> List[Memory]:
        return self.request("GET", "/memories/search", params=params)

    def memories_get(self, memory_id: str) -> Memory:
        return self.request("GET", f"/memories/{memory_id}")

    def memories_get_batch(
        self,
        memory_ids: Iterable[str],
        include_attachments: bool = False,
    ) -> MemoryBatchResult:
        return self.request(
            "GET",
            "/memories/batch",
            params={
                "memory_ids": list(memory_ids),
                "include_attachments": include_attachments,
            },
        )

    def memories_create(self, memory: MemoryCreate) -> Memory:
        return self.request("POST", "/memories", json_body=memory)

    def memories_update(self, memory_id: str, patch: MemoryUpdate) -> Memory:
        return self.request("PATCH", f"/memories/{memory_id}", json_body=patch)

    def memories_delete(
        self,
        memory_id: str,
        delete_confirmation: Optional[str] = None,
    ) -> MemoryDeleteResult:
        body = (
            {"delete_confirmation": delete_confirmation}
            if delete_confirmation is not None
            else None
        )
        return self.request(
            "DELETE",
            f"/memories/{memory_id}",
            json_body=body,
        )

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
                raise _to_memside_error(status, payload, response_headers)
            return payload

        request = Request(url, data=body, headers=request_headers, method=method)

        try:
            with urlopen(request, timeout=self.timeout) as response:
                payload = _read_payload(response.read())
                return payload
        except HTTPError as error:
            payload = _read_payload(error.read())
            raise _to_memside_error(error.code, payload, error.headers) from error

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


def _to_memside_error(status, payload, headers=None):
    error = payload.get("error") if isinstance(payload, dict) else None
    detail = payload.get("detail") if isinstance(payload, dict) else None
    structured_detail = detail if isinstance(detail, dict) else None
    message = None
    code = "request_failed"
    retryable = False
    details = payload

    if isinstance(error, dict):
        message = error.get("message")
        code = error.get("code") or code
        status = error.get("status") or status
        retryable = bool(error.get("retryable"))
        details = error.get("details")
    elif structured_detail is not None:
        message = structured_detail.get("message")
        code = structured_detail.get("code") or code
        details = structured_detail
    elif isinstance(detail, str):
        message = detail
        details = detail
    elif detail is not None:
        details = detail

    return MemsideError(
        message or "Memside API request failed",
        status=status,
        code=code,
        retryable=retryable,
        retry_after=_header_value(headers, "Retry-After"),
        request_id=payload.get("request_id") if isinstance(payload, dict) else None,
        details=details,
    )


def _header_value(headers, name):
    if not headers:
        return None
    lowered = name.lower()
    for key, value in headers.items():
        if str(key).lower() == lowered:
            return str(value)
    return None
