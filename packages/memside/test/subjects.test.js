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

test("subject list maps public query options", async () => {
  const { calls, client } = recordingClient();

  await client.subjects.list({
    q: "reading",
    subjectType: "topic",
    status: "active",
    limit: 10
  });

  assert.equal(
    calls[0].url,
    "https://api.memside.com/subjects?q=reading&subject_type=topic&status=active&limit=10"
  );
});

test("subject create, get, and update use the stable routes", async () => {
  const { calls, client } = recordingClient();
  const input = {
    name: "Weekend reading",
    subject_type: "topic",
    aliases: ["Reading list"]
  };

  await client.subjects.create(input);
  await client.subjects.get("subject/id");
  await client.subjects.update("subject/id", { status: "archived" });

  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.body, JSON.stringify(input));
  assert.equal(calls[1].url, "https://api.memside.com/subjects/subject%2Fid");
  assert.equal(calls[2].init.method, "PATCH");
  assert.equal(calls[2].init.body, JSON.stringify({ status: "archived" }));
});

test("subject memory methods preserve link replay semantics", async () => {
  const { calls, client } = recordingClient();

  await client.subjects.listMemories("subject-id", {
    includeArchived: true,
    limit: 8
  });
  await client.memories.listSubjects("memory-id");
  await client.subjects.linkMemory("subject-id", "memory-id");
  await client.subjects.unlinkMemory("subject-id", "memory-id");

  assert.equal(
    calls[0].url,
    "https://api.memside.com/subjects/subject-id/memories?include_archived=true&limit=8"
  );
  assert.equal(
    calls[1].url,
    "https://api.memside.com/memories/memory-id/subjects"
  );
  assert.equal(calls[2].init.body, JSON.stringify({ memory_id: "memory-id" }));
  assert.equal(calls[3].init.method, "DELETE");
});

test("subject context maps bounded query options", async () => {
  const { calls, client } = recordingClient();

  await client.subjects.getContext("subject-id", {
    maxMemories: 12,
    maxFacts: 6,
    maxNextActions: 4,
    maxLinks: 3
  });

  assert.equal(
    calls[0].url,
    "https://api.memside.com/subjects/subject-id/context?max_memories=12&max_facts=6&max_next_actions=4&max_links=3"
  );
});

test("subject facts map history and limit options", async () => {
  const { calls, client } = recordingClient();

  await client.subjects.listFacts("subject-id", {
    includeHistory: true,
    limit: 25
  });

  assert.equal(
    calls[0].url,
    "https://api.memside.com/subjects/subject-id/facts?include_history=true&limit=25"
  );
});

test("fact suggestions preserve caller idempotency input", async () => {
  const { calls, client } = recordingClient();
  const suggestion = {
    suggestion_type: "add_fact",
    proposed_fact_type: "preference",
    proposed_fact_text: "Prefers printed books for long-form reading.",
    source_memory_id: "memory-id",
    idempotency_key: "reading-preference-v1"
  };

  await client.subjects.suggestFact("subject-id", suggestion);
  await client.subjects.suggestFact("subject-id", suggestion);

  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.body, JSON.stringify(suggestion));
  assert.equal(calls[1].init.body, calls[0].init.body);
  assert.equal(client.subjects.listFactSuggestions, undefined);
  assert.equal(client.subjects.reviewFactSuggestion, undefined);
});

test("subject deletion preparation sends no mutation body", async () => {
  const { calls, client } = recordingClient();

  await client.subjects.prepareDelete("subject-id");

  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.body, undefined);
  assert.equal(calls[0].init.headers["Content-Type"], undefined);
});

test("subject deletion sends only caller-supplied confirmation", async () => {
  const { calls, client } = recordingClient();

  await client.subjects.delete("subject-id");
  await client.subjects.delete("subject-id", {
    deleteConfirmation: "CONFIRM_DELETE_SUBJECT_subject-id"
  });

  assert.equal(calls[0].init.body, undefined);
  assert.equal(
    calls[1].init.body,
    JSON.stringify({
      delete_confirmation: "CONFIRM_DELETE_SUBJECT_subject-id"
    })
  );
});
