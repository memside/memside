import { memside } from "./memside-client.mjs";

const query = process.argv.slice(2).join(" ").trim() || "launch";
const params = new URLSearchParams({ q: query, limit: "5" });
const results = await memside(`/memories/search?${params.toString()}`);

console.log(JSON.stringify(results, null, 2));
