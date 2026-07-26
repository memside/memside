import { memside } from "./memside-client.mjs";

let subjectId = process.argv[2];
if (!subjectId) {
  const subjects = await memside("/subjects?limit=1");
  subjectId = subjects[0]?.id;
}

if (!subjectId) {
  console.log("No accessible Subjects found.");
  process.exit(0);
}

const encodedId = encodeURIComponent(subjectId);
const [subject, memories, context, facts, insights] = await Promise.all([
  memside(`/subjects/${encodedId}`),
  memside(`/subjects/${encodedId}/memories?limit=10`),
  memside(`/subjects/${encodedId}/context`),
  memside(`/subjects/${encodedId}/facts?limit=10`),
  memside(`/subjects/${encodedId}/memory-insights?limit=10`),
]);

console.log(
  JSON.stringify({ subject, memories, context, facts, insights }, null, 2)
);
