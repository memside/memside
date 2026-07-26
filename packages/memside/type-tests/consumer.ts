import {
  MemsideClient,
  type Memory,
  type MemoryBatchResult,
  type MemoryCreateInput,
  type MemoryDeleteResult
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

void created;
void batch;
void deleted;
