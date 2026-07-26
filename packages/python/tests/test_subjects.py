import unittest

from memside import MemsideClient


class SubjectClientTests(unittest.TestCase):
    def setUp(self):
        self.calls = []

        def transport(method, url, headers, body, timeout):
            self.calls.append((method, url, headers, body, timeout))
            return 200, {}, b"{}"

        self.client = MemsideClient(
            api_key="mem_sk_test_key",
            transport=transport,
        )

    def test_subject_list_serializes_public_filters(self):
        self.client.subjects_list(
            q="reading",
            subject_type="topic",
            status="active",
            limit=10,
        )

        self.assertEqual(
            self.calls[0][1],
            "https://api.memside.com/subjects?q=reading&subject_type=topic&status=active&limit=10",
        )

    def test_subject_create_get_and_update_use_stable_routes(self):
        subject = {
            "name": "Weekend reading",
            "subject_type": "topic",
            "aliases": ["Reading list"],
        }

        self.client.subjects_create(subject)
        self.client.subjects_get("subject-id")
        self.client.subjects_update("subject-id", {"status": "archived"})

        self.assertEqual(self.calls[0][0], "POST")
        self.assertEqual(
            self.calls[0][3],
            b'{"name": "Weekend reading", "subject_type": "topic", "aliases": ["Reading list"]}',
        )
        self.assertEqual(
            self.calls[1][1],
            "https://api.memside.com/subjects/subject-id",
        )
        self.assertEqual(self.calls[2][0], "PATCH")
        self.assertEqual(self.calls[2][3], b'{"status": "archived"}')

    def test_subject_memory_methods_use_public_routes(self):
        self.client.subjects_list_memories(
            "subject-id",
            include_archived=True,
            limit=8,
        )
        self.client.memories_list_subjects("memory-id")
        self.client.subjects_link_memory("subject-id", "memory-id")
        self.client.subjects_unlink_memory("subject-id", "memory-id")

        self.assertEqual(
            self.calls[0][1],
            "https://api.memside.com/subjects/subject-id/memories?include_archived=True&limit=8",
        )
        self.assertEqual(
            self.calls[1][1],
            "https://api.memside.com/memories/memory-id/subjects",
        )
        self.assertEqual(self.calls[2][3], b'{"memory_id": "memory-id"}')
        self.assertEqual(self.calls[3][0], "DELETE")

    def test_subject_context_serializes_bounded_options(self):
        self.client.subjects_get_context(
            "subject-id",
            max_memories=12,
            max_facts=6,
            max_next_actions=4,
            max_links=3,
        )

        self.assertEqual(
            self.calls[0][1],
            "https://api.memside.com/subjects/subject-id/context?max_memories=12&max_facts=6&max_next_actions=4&max_links=3",
        )

    def test_subject_facts_serialize_history_and_limit(self):
        self.client.subjects_list_facts(
            "subject-id",
            include_history=True,
            limit=25,
        )

        self.assertEqual(
            self.calls[0][1],
            "https://api.memside.com/subjects/subject-id/facts?include_history=True&limit=25",
        )

    def test_fact_suggestions_preserve_caller_idempotency_input(self):
        suggestion = {
            "suggestion_type": "add_fact",
            "proposed_fact_type": "preference",
            "proposed_fact_text": (
                "Prefers printed books for long-form reading."
            ),
            "source_memory_id": "memory-id",
            "idempotency_key": "reading-preference-v1",
        }

        self.client.subjects_suggest_fact("subject-id", suggestion)
        self.client.subjects_suggest_fact("subject-id", suggestion)

        self.assertEqual(self.calls[0][0], "POST")
        self.assertEqual(self.calls[0][3], self.calls[1][3])
        self.assertFalse(
            hasattr(self.client, "subjects_list_fact_suggestions")
        )
        self.assertFalse(
            hasattr(self.client, "subjects_review_fact_suggestion")
        )

    def test_subject_delete_preparation_has_no_body(self):
        self.client.subjects_prepare_delete("subject-id")

        self.assertEqual(self.calls[0][0], "POST")
        self.assertIsNone(self.calls[0][3])
        self.assertNotIn("Content-Type", self.calls[0][2])

    def test_subject_delete_uses_only_caller_confirmation(self):
        self.client.subjects_delete("subject-id")
        self.client.subjects_delete(
            "subject-id",
            "CONFIRM_DELETE_SUBJECT_subject-id",
        )

        self.assertIsNone(self.calls[0][3])
        self.assertEqual(
            self.calls[1][3],
            b'{"delete_confirmation": "CONFIRM_DELETE_SUBJECT_subject-id"}',
        )


if __name__ == "__main__":
    unittest.main()
