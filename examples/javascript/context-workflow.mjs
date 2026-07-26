import { memside } from "./memside-client.mjs";

const [scopeRef = "personal-planning", checkpointId] = process.argv.slice(2);
const query = new URLSearchParams({
  scope_level: "project",
  scope_ref: scopeRef,
  budget_mode: "light",
});

const [startup, workspaceProfile] = await Promise.all([
  memside(`/context/startup?${query}`),
  memside(`/context/workspace-profile?${query}`),
]);
const result = { startup, workspaceProfile };

if (checkpointId) {
  const resumeQuery = new URLSearchParams(query);
  resumeQuery.set("checkpoint_id", checkpointId);
  result.resume = await memside(`/context/resume?${resumeQuery}`);
}

console.log(JSON.stringify(result, null, 2));
