import json
from pathlib import Path
import unittest

from memside import MemsideClient


FIXTURE = json.loads(
    (
        Path(__file__).resolve().parents[2]
        / "fixtures"
        / "sdk-parity.json"
    ).read_text(encoding="utf-8")
)


class MemoryRevisionClientTests(unittest.TestCase):
    def test_memory_revisions_use_public_read_route(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, headers, body, timeout))
            return (
                200,
                {},
                json.dumps(FIXTURE["memory_revision_list"]).encode("utf-8"),
            )

        client = MemsideClient(
            api_key="mem_sk_test_key",
            transport=transport,
        )

        result = client.memories_get_revisions("memory-id")

        self.assertEqual(result, FIXTURE["memory_revision_list"])
        self.assertEqual(calls[0][0], "GET")
        self.assertEqual(
            calls[0][1],
            "https://api.memside.com/memories/memory-id/revisions",
        )
