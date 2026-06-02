# JavaScript Examples

These examples use the built-in `fetch` API. A small Memside SDK is planned for a later phase, but the direct API is usable today.

```js
const apiKey = process.env.MEMSIDE_API_KEY;

async function memside(path, options = {}) {
  const response = await fetch(`https://api.memside.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Memside request failed: ${response.status}`);
  }

  return response.json();
}

const startup = await memside("/context/startup");
console.log(startup);

const created = await memside("/memories", {
  method: "POST",
  body: JSON.stringify({
    text: "Launch note\nMemside JavaScript example created a memory.",
    type: "note",
    sensitivity: "private",
    tags: ["example", "javascript"],
  }),
});

console.log(created);
```
