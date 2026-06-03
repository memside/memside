import assert from "node:assert/strict";
import { test } from "node:test";
import { MemsideClient, MemsideError } from "../index.js";

test("startup sends bearer auth to the public API", async () => {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url, init });
      return jsonResponse({ ok: true });
    }
  });

  await client.context.startup();

  assert.equal(String(calls[0].url), "https://api.memside.com/context/startup");
  assert.equal(calls[0].init.headers.Authorization, "Bearer mem_sk_test_key");
});

test("search serializes query parameters", async () => {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url, init });
      return jsonResponse({ matches: [] });
    }
  });

  await client.memories.search({ q: "launch", limit: 5 });

  assert.equal(
    String(calls[0].url),
    "https://api.memside.com/memories/search?q=launch&limit=5"
  );
});

test("create sends JSON body", async () => {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url, init });
      return jsonResponse({ id: "mem_123" }, 201);
    }
  });

  await client.memories.create({ content: "Remember this" });

  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers["Content-Type"], "application/json");
  assert.equal(calls[0].init.body, JSON.stringify({ content: "Remember this" }));
});

test("failed requests throw MemsideError", async () => {
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async () =>
      jsonResponse(
        {
          ok: false,
          request_id: "req_test",
          error: {
            code: "unauthorized",
            message: "Invalid API key",
            status: 401,
            retryable: false
          }
        },
        401
      )
  });

  await assert.rejects(() => client.context.startup(), (error) => {
    assert.ok(error instanceof MemsideError);
    assert.equal(error.status, 401);
    assert.equal(error.code, "unauthorized");
    assert.equal(error.requestId, "req_test");
    return true;
  });
});

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json"
    }
  });
}
