import { memside } from "./memside-client.mjs";

const created = await memside("/memories", {
  method: "POST",
  body: JSON.stringify({
    text: "JavaScript example\nMemside JavaScript example created this memory.",
    type: "note",
    sensitivity: "private",
    tags: ["example", "javascript"],
  }),
});

console.log(JSON.stringify(created, null, 2));
