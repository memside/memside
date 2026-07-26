import { memside } from "./memside-client.mjs";

const subjectId = process.argv[2];
if (!subjectId) {
  throw new Error("Usage: node prepare-subject-delete.mjs <subject-id>");
}

const preview = await memside(
  `/subjects/${encodeURIComponent(subjectId)}/deletion/prepare`,
  { method: "POST" }
);

console.log(JSON.stringify(preview, null, 2));
