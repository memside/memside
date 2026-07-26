import { memside } from "./memside-client.mjs";

const [memoryId, idempotencyKey] = process.argv.slice(2);
if (!memoryId || !idempotencyKey) {
  throw new Error(
    "Usage: node subject-workflow.mjs <non-secret-memory-id> <idempotency-key>"
  );
}

const subject = await memside("/subjects", {
  method: "POST",
  body: JSON.stringify({
    name: "Weekend reading",
    subject_type: "topic",
    aliases: ["Reading list"],
  }),
});

const encodedSubjectId = encodeURIComponent(subject.id);
const link = await memside(`/subjects/${encodedSubjectId}/memories`, {
  method: "POST",
  body: JSON.stringify({ memory_id: memoryId }),
});

const suggestion = await memside(
  `/subjects/${encodedSubjectId}/fact-suggestions`,
  {
    method: "POST",
    body: JSON.stringify({
      suggestion_type: "add_fact",
      proposed_fact_type: "custom",
      proposed_fact_text: "This item belongs to the weekend reading list.",
      source_memory_id: memoryId,
      idempotency_key: idempotencyKey,
    }),
  }
);

console.log(JSON.stringify({ subject, link, suggestion }, null, 2));
