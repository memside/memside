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

test("memory revisions use the public read route", async () => {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify(fixture.memory_revision_list), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }
  });

  const result = await client.memories.getRevisions("memory/id");

  assert.deepEqual(result, fixture.memory_revision_list);
  assert.equal(calls[0].init.method, "GET");
  assert.equal(
    calls[0].url,
    "https://api.memside.com/memories/memory%2Fid/revisions"
  );
});
