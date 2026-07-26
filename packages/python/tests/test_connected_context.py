import unittest

from memside import MemsideClient


class ConnectedContextClientTests(unittest.TestCase):
    def setUp(self):
        self.calls = []

        def transport(method, url, headers, body, timeout):
            self.calls.append((method, url, headers, body, timeout))
            return 200, {}, b"{}"

        self.client = MemsideClient(
            api_key="mem_sk_test_key",
            transport=transport,
        )

    def test_memory_context_map_uses_public_read_route(self):
        self.client.memories_get_context_map("memory-id")

        self.assertEqual(self.calls[0][0], "GET")
        self.assertEqual(
            self.calls[0][1],
            "https://api.memside.com/memories/memory-id/context-map",
        )

    def test_memory_insights_are_restricted_to_pending_reads(self):
        self.client.subjects_list_memory_insights(
            "subject-id",
            limit=25,
        )

        self.assertEqual(self.calls[0][0], "GET")
        self.assertEqual(
            self.calls[0][1],
            "https://api.memside.com/subjects/subject-id/memory-insights?status=pending&limit=25",
        )
        self.assertFalse(
            hasattr(self.client, "subjects_refresh_memory_insights")
        )
        self.assertFalse(
            hasattr(self.client, "subjects_review_memory_insight")
        )
        self.assertFalse(
            hasattr(self.client, "subjects_undo_memory_insight")
        )
