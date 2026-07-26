import { memside } from "./memside-client.mjs";

const [memoryId, expectedVersionText, ...textParts] = process.argv.slice(2);
const expectedVersion = Number(expectedVersionText);
const text = textParts.join(" ").trim();

if (!memoryId || !Number.isInteger(expectedVersion) || !text) {
  throw new Error(
    "Usage: node update-memory.mjs <memory-id> <expected-version> <new-text>"
  );
}

const updated = await memside(
  `/memories/${encodeURIComponent(memoryId)}`,
  {
    method: "PATCH",
    body: JSON.stringify({
      text,
      expected_version: expectedVersion,
    }),
  }
);

console.log(JSON.stringify(updated, null, 2));
