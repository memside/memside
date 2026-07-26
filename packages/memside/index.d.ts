import type {
  Memory,
  MemoryBatchResult,
  MemoryCreateInput,
  MemoryDeleteResult,
  MemoryListParams,
  MemoryRevisionList,
  MemorySearchParams,
  MemoryUpdateInput,
  ResumeContext,
  ResumeContextParams,
  StartupContext,
  StartupContextParams,
  WorkspaceProfile,
  WorkspaceProfileParams
} from "./types.js";
import type {
  FactSuggestion,
  FactSuggestionCreateInput,
  Subject,
  SubjectContext,
  SubjectContextOptions,
  SubjectCreateInput,
  SubjectDeleteOptions,
  SubjectDeleteResult,
  SubjectDeletionPreview,
  SubjectListParams,
  SubjectMemory,
  SubjectMemoryLinkResult,
  SubjectMemoryListOptions,
  SubjectMemoryUnlinkResult,
  SubjectFactList,
  SubjectFactListOptions,
  SubjectUpdateInput
} from "./subject-types.js";
import type {
  ContextMap,
  MemoryInsightList,
  MemoryInsightListOptions
} from "./connected-context-types.js";

export * from "./types.js";
export * from "./subject-types.js";
export * from "./connected-context-types.js";

export interface MemsideClientOptions {
  apiKey?: string;
  baseUrl?: string;
  fetch?: typeof fetch;
}

export interface MemsideRequestOptions {
  query?: Record<string, unknown>;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface MemsideErrorOptions {
  status?: number;
  code?: string;
  retryable?: boolean;
  retryAfter?: string;
  requestId?: string;
  details?: unknown;
}

export class MemsideError extends Error {
  status?: number;
  code?: string;
  retryable?: boolean;
  retryAfter?: string;
  requestId?: string;
  details?: unknown;

  constructor(message: string, options?: MemsideErrorOptions);
}

export class MemsideClient {
  constructor(options?: MemsideClientOptions);

  context: {
    startup(params?: StartupContextParams): Promise<StartupContext>;
    resume(params?: ResumeContextParams): Promise<ResumeContext>;
    workspaceProfile(params: WorkspaceProfileParams): Promise<WorkspaceProfile>;
  };

  memories: {
    list(params?: MemoryListParams): Promise<Memory[]>;
    search(params?: MemorySearchParams): Promise<Memory[]>;
    get(id: string): Promise<Memory>;
    getRevisions(id: string): Promise<MemoryRevisionList>;
    getContextMap(id: string): Promise<ContextMap>;
    listSubjects(id: string): Promise<Subject[]>;
    getBatch(
      ids: string[],
      options?: { includeAttachments?: boolean }
    ): Promise<MemoryBatchResult>;
    create(memory: MemoryCreateInput): Promise<Memory>;
    update(id: string, patch: MemoryUpdateInput): Promise<Memory>;
    delete(id: string, deleteConfirmation?: string): Promise<MemoryDeleteResult>;
  };

  subjects: {
    list(params?: SubjectListParams): Promise<Subject[]>;
    create(input: SubjectCreateInput): Promise<Subject>;
    get(subjectId: string): Promise<Subject>;
    update(subjectId: string, patch: SubjectUpdateInput): Promise<Subject>;
    listMemories(
      subjectId: string,
      options?: SubjectMemoryListOptions
    ): Promise<SubjectMemory[]>;
    linkMemory(
      subjectId: string,
      memoryId: string
    ): Promise<SubjectMemoryLinkResult>;
    unlinkMemory(
      subjectId: string,
      memoryId: string
    ): Promise<SubjectMemoryUnlinkResult>;
    getContext(
      subjectId: string,
      options?: SubjectContextOptions
    ): Promise<SubjectContext>;
    listFacts(
      subjectId: string,
      options?: SubjectFactListOptions
    ): Promise<SubjectFactList>;
    suggestFact(
      subjectId: string,
      input: FactSuggestionCreateInput
    ): Promise<FactSuggestion>;
    listMemoryInsights(
      subjectId: string,
      options?: MemoryInsightListOptions
    ): Promise<MemoryInsightList>;
    prepareDelete(subjectId: string): Promise<SubjectDeletionPreview>;
    delete(
      subjectId: string,
      options?: SubjectDeleteOptions
    ): Promise<SubjectDeleteResult>;
  };

  request<T = unknown>(
    method: string,
    path: string,
    options?: MemsideRequestOptions
  ): Promise<T>;
}
