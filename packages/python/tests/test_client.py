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

    def test_create_sends_json_body(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, headers, body, timeout))
            return 201, {}, b'{"id": "mem_123"}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        self.assertEqual(client.memories_create({"content": "Remember this"}), {"id": "mem_123"})
        self.assertEqual(calls[0][0], "POST")
        self.assertEqual(calls[0][2]["Content-Type"], "application/json")
        self.assertEqual(calls[0][3], b'{"content": "Remember this"}')

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


if __name__ == "__main__":
    unittest.main()
