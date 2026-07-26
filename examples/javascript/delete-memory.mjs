import { memside } from "./memside-client.mjs";

const [memoryId, confirmation] = process.argv.slice(2);
if (!memoryId || !confirmation) {
  throw new Error(
    "Usage: node delete-memory.mjs <memory-id> <exact-confirmation>"
  );
}

const result = await memside(`/memories/${encodeURIComponent(memoryId)}`, {
  method: "DELETE",
  body: JSON.stringify({ delete_confirmation: confirmation }),
});

console.log(JSON.stringify(result, null, 2));
