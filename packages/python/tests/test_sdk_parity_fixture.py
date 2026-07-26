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


class SdkParityFixtureTests(unittest.TestCase):
    def test_every_approved_operation_maps_to_a_python_method(self):
        client = MemsideClient(
            api_key="mem_sk_test_key",
            transport=lambda *_args: (200, {}, b"{}"),
        )
        route_keys = set()

        self.assertEqual(len(FIXTURE["approved_operations"]), 26)
        for operation in FIXTURE["approved_operations"]:
            route_key = (operation["method"], operation["path"])
            self.assertNotIn(route_key, route_keys)
            route_keys.add(route_key)
            self.assertTrue(
                callable(getattr(client, operation["python"], None)),
                f"missing {operation['python']}",
            )
