const BASE_URL = "https://api.memside.com";

function apiKey() {
  const key = process.env.MEMSIDE_API_KEY;
  if (!key) {
    throw new Error("Set MEMSIDE_API_KEY before running this example.");
  }
  return key;
}

export async function memside(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = body?.error?.message || body?.detail || response.statusText;
    throw new Error(`Memside request failed: ${response.status} ${message}`);
  }

  return body;
}
