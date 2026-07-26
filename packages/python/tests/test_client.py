import unittest

from memside import MemsideClient, MemsideError


class MemsideClientTests(unittest.TestCase):
    def test_startup_sends_bearer_auth(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, headers, body, timeout))
            return 200, {}, b'{"ok": true}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        self.assertEqual(client.context_startup(), {"ok": True})
        self.assertEqual(calls[0][0], "GET")
        self.assertEqual(calls[0][1], "https://api.memside.com/context/startup")
        self.assertEqual(calls[0][2]["Authorization"], "Bearer mem_sk_test_key")

    def test_search_serializes_query_params(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, headers, body, timeout))
            return 200, {}, b'{"matches": []}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        self.assertEqual(client.memories_search(q="launch", limit=5), {"matches": []})
        self.assertEqual(
            calls[0][1],
            "https://api.memside.com/memories/search?q=launch&limit=5",
        )

    def test_batch_get_repeats_exact_memory_ids(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, headers, body, timeout))
            return 200, {}, b'{"ok": true, "items": []}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        client.memories_get_batch(
            ["id-1", "id-2"],
            include_attachments=True,
        )
        self.assertEqual(
            calls[0][1],
            "https://api.memside.com/memories/batch?memory_ids=id-1&memory_ids=id-2&include_attachments=True",
        )

    def test_create_sends_json_body(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, headers, body, timeout))
            return 201, {}, b'{"id": "mem_123"}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        memory = {
            "type": "note",
            "text": "Packing checklist\nBring a charger and a reusable bottle.",
        }
        self.assertEqual(client.memories_create(memory), {"id": "mem_123"})
        self.assertEqual(calls[0][0], "POST")
        self.assertEqual(calls[0][2]["Content-Type"], "application/json")
        self.assertEqual(
            calls[0][3],
            b'{"type": "note", "text": "Packing checklist\\nBring a charger and a reusable bottle."}',
        )

    def test_delete_sends_resource_specific_confirmation(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, headers, body, timeout))
            return 200, {}, b'{"deleted": true, "id": "memory-id"}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        client.memories_delete("memory-id", "CONFIRM_DELETE_memory-id")

        self.assertEqual(calls[0][0], "DELETE")
        self.assertEqual(
            calls[0][3],
            b'{"delete_confirmation": "CONFIRM_DELETE_memory-id"}',
        )

    def test_failed_requests_raise_memside_error(self):
        def transport(method, url, headers, body, timeout):
            return (
                401,
                {},
                b'{"ok": false, "request_id": "req_test", "error": {"code": "unauthorized", "message": "Invalid API key", "status": 401, "retryable": false}}',
            )

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        with self.assertRaises(MemsideError) as raised:
            client.context_startup()

        self.assertEqual(raised.exception.status, 401)
        self.assertEqual(raised.exception.code, "unauthorized")
        self.assertEqual(raised.exception.request_id, "req_test")
        self.assertIsNone(raised.exception.details)

    def test_legacy_string_detail_and_retry_after_are_preserved(self):
        def transport(method, url, headers, body, timeout):
            return 404, {"Retry-After": "12"}, b'{"detail": "Resource is unavailable"}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        with self.assertRaises(MemsideError) as raised:
            client.memories_get("missing")

        self.assertEqual(raised.exception.status, 404)
        self.assertEqual(raised.exception.code, "request_failed")
        self.assertEqual(str(raised.exception), "Resource is unavailable")
        self.assertEqual(raised.exception.retry_after, "12")
        self.assertEqual(raised.exception.details, "Resource is unavailable")

    def test_legacy_structured_detail_exposes_code_and_message(self):
        def transport(method, url, headers, body, timeout):
            return (
                409,
                {},
                b'{"detail": {"code": "version_conflict", "message": "Fetch the latest version and retry", "current_version": 4}}',
            )

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        with self.assertRaises(MemsideError) as raised:
            client.memories_update("memory-id", {})

        self.assertEqual(raised.exception.code, "version_conflict")
        self.assertEqual(
            str(raised.exception),
            "Fetch the latest version and retry",
        )
        self.assertEqual(raised.exception.details["current_version"], 4)

    def test_empty_error_response_still_raises_memside_error(self):
        def transport(method, url, headers, body, timeout):
            return 503, {}, b""

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        with self.assertRaises(MemsideError) as raised:
            client.context_startup()

        self.assertEqual(raised.exception.status, 503)
        self.assertEqual(raised.exception.code, "request_failed")

    def test_non_json_error_response_remains_safe(self):
        def transport(method, url, headers, body, timeout):
            return 503, {}, b"Temporary upstream failure"

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        with self.assertRaises(MemsideError) as raised:
            client.context_startup()

        self.assertEqual(raised.exception.status, 503)
        self.assertEqual(raised.exception.code, "request_failed")
        self.assertEqual(
            raised.exception.details,
            "Temporary upstream failure",
        )


if __name__ == "__main__":
    unittest.main()
