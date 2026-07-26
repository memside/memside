import os
import unittest

from memside import MemsideClient


@unittest.skipUnless(
    os.getenv("MEMSIDE_API_KEY"),
    "MEMSIDE_API_KEY is required for the deployed contract test",
)
class MemsideLiveContractTests(unittest.TestCase):
    def test_deployed_read_methods_match_the_public_sdk_contract(self):
        client = MemsideClient()
        startup = client.context_startup(
            scope_level="project",
            scope_ref="sdk-live-test",
            budget_mode="light",
        )
        self.assertIn("meta", startup)

        memories = client.memories_list(limit=1)
        self.assertIsInstance(memories, list)

        search = client.memories_search(
            q="sdk-live-test-no-match",
            limit=1,
        )
        self.assertIsInstance(search, list)

        if memories:
            memory = client.memories_get(memories[0]["id"])
            self.assertEqual(memory["id"], memories[0]["id"])

            batch = client.memories_get_batch([memory["id"]])
            self.assertTrue(batch["ok"])
            self.assertEqual(batch["success_count"], 1)


if __name__ == "__main__":
    unittest.main()
