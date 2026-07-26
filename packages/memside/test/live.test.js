import assert from "node:assert/strict";
import { test } from "node:test";
import { MemsideClient } from "../index.js";

const apiKey = process.env.MEMSIDE_API_KEY;

test(
  "deployed read methods match the public SDK contract",
  { skip: !apiKey },
  async () => {
    const client = new MemsideClient({ apiKey });
    const startup = await client.context.startup({
      scope_level: "project",
      scope_ref: "sdk-live-test",
      budget_mode: "light"
    });
    assert.ok(startup.meta);

    const memories = await client.memories.list({ limit: 1 });
    assert.ok(Array.isArray(memories));

    const search = await client.memories.search({
      q: "sdk-live-test-no-match",
      limit: 1
    });
    assert.ok(Array.isArray(search));

    if (memories.length > 0) {
      const memory = await client.memories.get(memories[0].id);
      assert.equal(memory.id, memories[0].id);

      const batch = await client.memories.getBatch([memory.id]);
      assert.equal(batch.ok, true);
      assert.equal(batch.success_count, 1);
    }
  }
);
