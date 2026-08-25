import assert from "node:assert/strict";
import { test } from "node:test";
import { MemsideClient } from "../index.js";

test("Library methods use the approved public routes", async () => {
  const calls = [];
  const client = new MemsideClient({
    apiKey: "mem_sk_test_key",
    fetch: async (url, init) => {
      calls.push({ url: String(url), init });
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "content-type": "application/json" }
      });
    }
  });

  await client.library.searchTemplates({ query: "project planning", limit: 5 });
  await client.library.getCreatorStatus("template-id");
  await client.library.readTemplate("template-id", {
    file_paths: ["README.md"]
  });
  await client.library.writeDraft("template-id", {
    expected_fingerprint: "a".repeat(64),
    idempotency_key: "planning-template-v1",
    files: [
      {
        path: "README.md",
        content: "# Project planning\n\nA simple planning checklist.",
        target: "reusable_template"
      }
    ]
  });
  await client.library.runTemplateWorkflow({
    action: "unpublish",
    idempotency_key: "planning-template-v2",
    template_id: "template-id"
  });

  assert.deepEqual(
    calls.map(({ url, init }) => [init.method, url]),
    [
      ["GET", "https://api.memside.com/library/templates?query=project+planning&limit=5"],
      ["GET", "https://api.memside.com/library/creator/status?template_id=template-id"],
      ["POST", "https://api.memside.com/library/templates/template-id/read"],
      ["PUT", "https://api.memside.com/library/templates/template-id/draft"],
      ["POST", "https://api.memside.com/library/templates/workflow"]
    ]
  );
  assert.equal(
    calls[2].init.body,
    JSON.stringify({ file_paths: ["README.md"] })
  );
  assert.equal(
    calls[3].init.body,
    JSON.stringify({
      expected_fingerprint: "a".repeat(64),
      idempotency_key: "planning-template-v1",
      files: [
        {
          path: "README.md",
          content: "# Project planning\n\nA simple planning checklist.",
          target: "reusable_template"
        }
      ]
    })
  );
  assert.equal(
    calls[4].init.body,
    JSON.stringify({
      action: "unpublish",
      idempotency_key: "planning-template-v2",
      template_id: "template-id"
    })
  );
});
