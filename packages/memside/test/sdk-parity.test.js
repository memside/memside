import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { MemsideClient } from "../index.js";

const fixture = JSON.parse(
  readFileSync(
    new URL("../../fixtures/sdk-parity.json", import.meta.url),
    "utf8"
  )
);

test("shared fixture maps every approved operation to a JavaScript method", () => {
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async () => new Response("{}")
  });
  const routeKeys = new Set();

  assert.equal(fixture.approved_operations.length, 26);
  for (const operation of fixture.approved_operations) {
    const routeKey = `${operation.method} ${operation.path}`;
    assert.equal(routeKeys.has(routeKey), false, `duplicate ${routeKey}`);
    routeKeys.add(routeKey);

    const method = operation.javascript
      .split(".")
      .reduce((value, key) => value?.[key], client);
    assert.equal(
      typeof method,
      "function",
      `missing ${operation.javascript}`
    );
  }
});
