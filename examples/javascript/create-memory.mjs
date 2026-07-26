import { memside } from "./memside-client.mjs";

const created = await memside("/memories", {
  method: "POST",
  body: JSON.stringify({
    text: "Packing checklist\nBring a charger and a reusable bottle.",
    type: "note",
    sensitivity: "private",
    tags: ["travel", "checklist"],
  }),
});

console.log(JSON.stringify(created, null, 2));
