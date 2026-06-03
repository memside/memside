const DEFAULT_BASE_URL = "https://api.memside.com";

export class MemsideError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "MemsideError";
    this.status = options.status;
    this.code = options.code;
    this.retryable = options.retryable;
    this.requestId = options.requestId;
    this.details = options.details;
  }
}

export class MemsideClient {
  constructor(options = {}) {
    const apiKey = options.apiKey || process.env.MEMSIDE_API_KEY;

    if (!apiKey) {
      throw new MemsideError("Missing Memside API key", {
        code: "missing_api_key",
        status: 401,
        retryable: false
      });
    }

    this.apiKey = apiKey;
    this.baseUrl = normalizeBaseUrl(options.baseUrl || DEFAULT_BASE_URL);
    this.fetch = options.fetch || globalThis.fetch;

    if (typeof this.fetch !== "function") {
      throw new MemsideError("A fetch implementation is required", {
        code: "missing_fetch",
        retryable: false
      });
    }

    this.context = {
      startup: (params) => this.request("GET", "/context/startup", { query: params }),
      resume: (params) => this.request("GET", "/context/resume", { query: params }),
      workspaceProfile: (params) =>
        this.request("GET", "/context/workspace-profile", { query: params })
    };

    this.memories = {
      list: (params) => this.request("GET", "/memories", { query: params }),
      search: (params) => this.request("GET", "/memories/search", { query: params }),
      get: (id) => this.request("GET", `/memories/${encodeURIComponent(id)}`),
      create: (memory) => this.request("POST", "/memories", { body: memory }),
      update: (id, patch) =>
        this.request("PATCH", `/memories/${encodeURIComponent(id)}`, { body: patch }),
      delete: (id) => this.request("DELETE", `/memories/${encodeURIComponent(id)}`)
    };
  }

  async request(method, path, options = {}) {
    const url = buildUrl(this.baseUrl, path, options.query);
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${this.apiKey}`,
      ...options.headers
    };

    const init = { method, headers };

    if (options.body !== undefined) {
      headers["Content-Type"] = "application/json";
      init.body = JSON.stringify(options.body);
    }

    const response = await this.fetch(url, init);
    const payload = await readPayload(response);

    if (!response.ok) {
      throw toMemsideError(response, payload);
    }

    return payload;
  }
}

function normalizeBaseUrl(baseUrl) {
  return String(baseUrl).replace(/\/+$/, "");
}

function buildUrl(baseUrl, path, query) {
  const url = new URL(`${baseUrl}${path}`);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          url.searchParams.append(key, String(item));
        }
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url;
}

async function readPayload(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  const contentType = response.headers?.get?.("content-type") || "";

  if (contentType.includes("application/json")) {
    return JSON.parse(text);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function toMemsideError(response, payload) {
  const error = payload && typeof payload === "object" ? payload.error : null;
  const message = error?.message || response.statusText || "Memside API request failed";

  return new MemsideError(message, {
    status: error?.status || response.status,
    code: error?.code || "request_failed",
    retryable: Boolean(error?.retryable),
    requestId: payload?.request_id,
    details: payload
  });
}
