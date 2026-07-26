import { memside } from "./memside-client.mjs";

const [subjectId, confirmation] = process.argv.slice(2);
if (!subjectId || !confirmation) {
  throw new Error(
    "Usage: node delete-subject.mjs <subject-id> <exact-confirmation>"
  );
}

const result = await memside(`/subjects/${encodeURIComponent(subjectId)}`, {
  method: "DELETE",
  body: JSON.stringify({ delete_confirmation: confirmation }),
});

console.log(JSON.stringify(result, null, 2));
