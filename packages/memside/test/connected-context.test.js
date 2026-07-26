import assert from "node:assert/strict";
import { test } from "node:test";
import { MemsideClient } from "../index.js";

function recordingClient() {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response("{}", {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }
  });
  return { calls, client };
}

test("memory context map uses the bounded public read route", async () => {
  const { calls, client } = recordingClient();

  await client.memories.getContextMap("memory/id");

  assert.equal(calls[0].init.method, "GET");
  assert.equal(
    calls[0].url,
    "https://api.memside.com/memories/memory%2Fid/context-map"
  );
});

test("memory insights are restricted to pending reads", async () => {
  const { calls, client } = recordingClient();

  await client.subjects.listMemoryInsights("subject/id", { limit: 25 });

  assert.equal(calls[0].init.method, "GET");
  assert.equal(
    calls[0].url,
    "https://api.memside.com/subjects/subject%2Fid/memory-insights?status=pending&limit=25"
  );
  assert.equal(client.subjects.refreshMemoryInsights, undefined);
  assert.equal(client.subjects.reviewMemoryInsight, undefined);
  assert.equal(client.subjects.undoMemoryInsight, undefined);
});
