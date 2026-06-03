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
  requestId?: string;
  details?: unknown;
}

export class MemsideError extends Error {
  status?: number;
  code?: string;
  retryable?: boolean;
  requestId?: string;
  details?: unknown;

  constructor(message: string, options?: MemsideErrorOptions);
}

export class MemsideClient {
  constructor(options?: MemsideClientOptions);

  context: {
    startup(params?: Record<string, unknown>): Promise<unknown>;
    resume(params?: Record<string, unknown>): Promise<unknown>;
    workspaceProfile(params?: Record<string, unknown>): Promise<unknown>;
  };

  memories: {
    list(params?: Record<string, unknown>): Promise<unknown>;
    search(params?: Record<string, unknown>): Promise<unknown>;
    get(id: string): Promise<unknown>;
    create(memory: Record<string, unknown>): Promise<unknown>;
    update(id: string, patch: Record<string, unknown>): Promise<unknown>;
    delete(id: string): Promise<unknown>;
  };

  request(method: string, path: string, options?: MemsideRequestOptions): Promise<unknown>;
}
