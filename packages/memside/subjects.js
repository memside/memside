function subjectPath(subjectId, suffix = "") {
  return `/subjects/${encodeURIComponent(subjectId)}${suffix}`;
}

export function createSubjectsApi(request) {
  return {
    list: (params = {}) =>
      request("GET", "/subjects", {
        query: {
          q: params.q,
          subject_type: params.subjectType,
          status: params.status,
          limit: params.limit
        }
      }),
    create: (input) => request("POST", "/subjects", { body: input }),
    get: (subjectId) => request("GET", subjectPath(subjectId)),
    update: (subjectId, patch) =>
      request("PATCH", subjectPath(subjectId), { body: patch }),
    listMemories: (subjectId, options = {}) =>
      request("GET", subjectPath(subjectId, "/memories"), {
        query: {
          include_archived: options.includeArchived,
          limit: options.limit
        }
      }),
    linkMemory: (subjectId, memoryId) =>
      request("POST", subjectPath(subjectId, "/memories"), {
        body: { memory_id: memoryId }
      }),
    unlinkMemory: (subjectId, memoryId) =>
      request(
        "DELETE",
        subjectPath(subjectId, `/memories/${encodeURIComponent(memoryId)}`)
      ),
    getContext: (subjectId, options = {}) =>
      request("GET", subjectPath(subjectId, "/context"), {
        query: {
          max_memories: options.maxMemories,
          max_facts: options.maxFacts,
          max_next_actions: options.maxNextActions,
          max_links: options.maxLinks
        }
      }),
    listFacts: (subjectId, options = {}) =>
      request("GET", subjectPath(subjectId, "/facts"), {
        query: {
          include_history: options.includeHistory,
          limit: options.limit
        }
      }),
    suggestFact: (subjectId, input) =>
      request("POST", subjectPath(subjectId, "/fact-suggestions"), {
        body: input
      }),
    listMemoryInsights: (subjectId, options = {}) =>
      request("GET", subjectPath(subjectId, "/memory-insights"), {
        query: {
          status: "pending",
          limit: options.limit
        }
      }),
    prepareDelete: (subjectId) =>
      request("POST", subjectPath(subjectId, "/deletion/prepare")),
    delete: (subjectId, options = {}) =>
      request("DELETE", subjectPath(subjectId), {
        body:
          options.deleteConfirmation === undefined
            ? undefined
            : { delete_confirmation: options.deleteConfirmation }
      })
  };
}
