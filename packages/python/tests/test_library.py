import unittest

from memside import MemsideClient


class LibraryClientTests(unittest.TestCase):
    def test_library_methods_use_the_approved_public_routes(self):
        calls = []

        def transport(method, url, headers, body, timeout):
            calls.append((method, url, body))
            return 200, {}, b'{"ok": true}'

        client = MemsideClient(api_key="mem_sk_test_key", transport=transport)

        client.library_search_templates(query="project planning", limit=5)
        client.library_get_creator_status("template-id")
        client.library_read_template(
            "template-id",
            {"file_paths": ["README.md"]},
        )
        client.library_write_draft(
            "template-id",
            {
                "expected_fingerprint": "a" * 64,
                "idempotency_key": "planning-template-v1",
                "files": [
                    {
                        "path": "README.md",
                        "content": "# Project planning\n\nA simple planning checklist.",
                        "target": "reusable_template",
                    }
                ],
            },
        )
        client.library_run_template_workflow(
            {
                "action": "unpublish",
                "idempotency_key": "planning-template-v2",
                "template_id": "template-id",
            }
        )

        self.assertEqual(
            [(method, url) for method, url, _body in calls],
            [
                ("GET", "https://api.memside.com/library/templates?query=project+planning&limit=5"),
                ("GET", "https://api.memside.com/library/creator/status?template_id=template-id"),
                ("POST", "https://api.memside.com/library/templates/template-id/read"),
                ("PUT", "https://api.memside.com/library/templates/template-id/draft"),
                ("POST", "https://api.memside.com/library/templates/workflow"),
            ],
        )
        self.assertEqual(calls[2][2], b'{"file_paths": ["README.md"]}')
        self.assertIn(b'"expected_fingerprint": "aaaaaaaa', calls[3][2])
        self.assertEqual(
            calls[4][2],
            b'{"action": "unpublish", "idempotency_key": '
            b'"planning-template-v2", "template_id": "template-id"}',
        )


if __name__ == "__main__":
    unittest.main()
