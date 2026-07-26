import type {
  Memory,
  MemoryBatchResult,
  MemoryCreateInput,
  MemoryDeleteResult,
  MemoryListParams,
  MemorySearchParams,
  MemoryUpdateInput,
  ResumeContext,
  ResumeContextParams,
  StartupContext,
  StartupContextParams,
  WorkspaceProfile,
  WorkspaceProfileParams
} from "./types.js";

export * from "./types.js";

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
    getBatch(
      ids: string[],
      options?: { includeAttachments?: boolean }
    ): Promise<MemoryBatchResult>;
    create(memory: MemoryCreateInput): Promise<Memory>;
    update(id: string, patch: MemoryUpdateInput): Promise<Memory>;
    delete(id: string, deleteConfirmation?: string): Promise<MemoryDeleteResult>;
  };

  request<T = unknown>(
    method: string,
    path: string,
    options?: MemsideRequestOptions
  ): Promise<T>;
}
