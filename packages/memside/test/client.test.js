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

test("batch get repeats exact memory ids", async () => {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url, init });
      return jsonResponse({ ok: true, items: [] });
    }
  });

  await client.memories.getBatch(["id-1", "id-2"], {
    includeAttachments: true
  });

  assert.equal(
    String(calls[0].url),
    "https://api.memside.com/memories/batch?memory_ids=id-1&memory_ids=id-2&include_attachments=true"
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

  const input = {
    type: "note",
    text: "Packing checklist\nBring a charger and a reusable bottle."
  };
  await client.memories.create(input);

  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers["Content-Type"], "application/json");
  assert.equal(calls[0].init.body, JSON.stringify(input));
});

test("delete sends the resource-specific confirmation", async () => {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url, init });
      return jsonResponse({ deleted: true, id: "memory-id" });
    }
  });

  await client.memories.delete("memory-id", "CONFIRM_DELETE_memory-id");

  assert.equal(calls[0].init.method, "DELETE");
  assert.equal(
    calls[0].init.body,
    JSON.stringify({ delete_confirmation: "CONFIRM_DELETE_memory-id" })
  );
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
    assert.equal(error.details, undefined);
    return true;
  });
});

test("legacy string detail is preserved as a safe SDK error", async () => {
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async () =>
      jsonResponse({ detail: "Resource is unavailable" }, 404, {
        "retry-after": "12"
      })
  });

  await assert.rejects(() => client.memories.get("missing"), (error) => {
    assert.equal(error.status, 404);
    assert.equal(error.code, "request_failed");
    assert.equal(error.message, "Resource is unavailable");
    assert.equal(error.retryAfter, "12");
    assert.equal(error.details, "Resource is unavailable");
    return true;
  });
});

test("legacy structured detail exposes code and message", async () => {
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async () =>
      jsonResponse(
        {
          detail: {
            code: "version_conflict",
            message: "Fetch the latest version and retry",
            current_version: 4
          }
        },
        409
      )
  });

  await assert.rejects(() => client.memories.update("memory-id", {}), (error) => {
    assert.equal(error.code, "version_conflict");
    assert.equal(error.message, "Fetch the latest version and retry");
    assert.equal(error.details.current_version, 4);
    return true;
  });
});

test("empty error responses still produce MemsideError", async () => {
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async () => new Response(null, { status: 503 })
  });

  await assert.rejects(() => client.context.startup(), (error) => {
    assert.ok(error instanceof MemsideError);
    assert.equal(error.status, 503);
    assert.equal(error.code, "request_failed");
    return true;
  });
});

test("non-JSON error responses remain safe", async () => {
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async () =>
      new Response("Temporary upstream failure", {
        status: 503,
        headers: { "content-type": "text/plain" }
      })
  });

  await assert.rejects(() => client.context.startup(), (error) => {
    assert.equal(error.status, 503);
    assert.equal(error.code, "request_failed");
    assert.equal(error.details, "Temporary upstream failure");
    return true;
  });
});

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...headers
    }
  });
}
