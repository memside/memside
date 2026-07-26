import { memside } from "./memside-client.mjs";

let memoryId = process.argv[2];
if (!memoryId) {
  const memories = await memside("/memories?limit=1");
  memoryId = memories[0]?.id;
}

if (!memoryId) {
  console.log("No accessible memories found.");
  process.exit(0);
}

const encodedId = encodeURIComponent(memoryId);
const [memory, batch, revisions, contextMap, subjects] = await Promise.all([
  memside(`/memories/${encodedId}`),
  memside(`/memories/batch?memory_ids=${encodedId}`),
  memside(`/memories/${encodedId}/revisions`),
  memside(`/memories/${encodedId}/context-map`),
  memside(`/memories/${encodedId}/subjects`),
]);

console.log(
  JSON.stringify({ memory, batch, revisions, contextMap, subjects }, null, 2)
);
