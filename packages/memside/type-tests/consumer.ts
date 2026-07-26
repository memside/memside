import {
  type ContextMap,
  type FactSuggestion,
  type FactSuggestionCreateInput,
  MemsideClient,
  type Memory,
  type MemoryBatchResult,
  type MemoryCreateInput,
  type MemoryDeleteResult,
  type MemoryInsightList,
  type MemoryRevisionList,
  type Subject,
  type SubjectContext,
  type SubjectCreateInput,
  type SubjectDeleteResult,
  type SubjectDeletionPreview,
  type SubjectFactList,
  type SubjectMemoryLinkResult
} from "../index.js";

declare const client: MemsideClient;

const createInput: MemoryCreateInput = {
  type: "note",
  text: "Packing checklist\nBring a charger and a reusable bottle.",
  sensitivity: "private"
};

const created: Promise<Memory> = client.memories.create(createInput);
const batch: Promise<MemoryBatchResult> = client.memories.getBatch(["memory-id"]);
const deleted: Promise<MemoryDeleteResult> = client.memories.delete(
  "memory-id",
  "CONFIRM_DELETE_memory-id"
);
const contextMap: Promise<ContextMap> =
  client.memories.getContextMap("memory-id");
const revisions: Promise<MemoryRevisionList> =
  client.memories.getRevisions("memory-id");
const subjectInput: SubjectCreateInput = {
  name: "Weekend reading",
  subject_type: "topic",
  aliases: ["Reading list"]
};
const subject: Promise<Subject> = client.subjects.create(subjectInput);
const linked: Promise<SubjectMemoryLinkResult> =
  client.subjects.linkMemory("subject-id", "memory-id");
const subjectContext: Promise<SubjectContext> =
  client.subjects.getContext("subject-id", { maxMemories: 10 });
const facts: Promise<SubjectFactList> = client.subjects.listFacts(
  "subject-id",
  { includeHistory: true }
);
const suggestionInput: FactSuggestionCreateInput = {
  suggestion_type: "add_fact",
  proposed_fact_type: "preference",
  proposed_fact_text: "Prefers printed books for long-form reading.",
  source_memory_id: "memory-id",
  idempotency_key: "reading-preference-v1"
};
const suggestion: Promise<FactSuggestion> =
  client.subjects.suggestFact("subject-id", suggestionInput);
const insights: Promise<MemoryInsightList> =
  client.subjects.listMemoryInsights("subject-id", { limit: 25 });
const deletePreview: Promise<SubjectDeletionPreview> =
  client.subjects.prepareDelete("subject-id");
const subjectDeleted: Promise<SubjectDeleteResult> = client.subjects.delete(
  "subject-id",
  { deleteConfirmation: "CONFIRM_DELETE_SUBJECT_subject-id" }
);

void created;
void batch;
void deleted;
void contextMap;
void revisions;
void subject;
void linked;
void subjectContext;
void facts;
void suggestion;
void insights;
void deletePreview;
void subjectDeleted;
