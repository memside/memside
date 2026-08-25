# Memside Library and Templates

Memside Library is a catalog of reusable Templates for AI profiles, Operating
Rules, AI Skills, memories, reference material, examples, and repeatable
workflows. A Template packages related guidance into a structure that can be
reviewed, reused, and updated without rebuilding the same AI setup from the
beginning.

## Why Templates Are Useful

AI tools perform more consistently when relevant instructions and context are
clear. Creating that setup manually can require repeated decisions about
structure, scope, and wording. A Template provides a reviewed starting point
for common scenarios while keeping the resulting content visible and editable.

A simple project-planning Template, for example, can contain a short project
profile, a planning checklist, and a reusable review rule. The same structure
can support several compatible AI tools without copying a long setup prompt
into every conversation.

Templates remain content rather than executable applications. Template files
must be reviewed before use, especially when the content comes from another
publisher.

## Public Catalog Discovery

The public catalog at [library.memside.com](https://library.memside.com) supports
search by ordinary words, categories, and tags. Public Template pages describe
the publisher, license, current version, included files, and available notices.

The separate Library MCP surface provides anonymous, read-only catalog access:

- search public Templates
- read public Template metadata and file lists
- read one file from an immutable public version
- read update, removal, and security notices

This catalog surface does not create drafts, publish content, expose private
Templates, or receive access to private Memside memories.

## Connected Creator Operations

The authenticated Memside MCP surface provides five Library operations when
Library access is enabled for the account. The API-key surface provides the
same operations to an active API key, subject to its read-only or read-write
mode:

| Operation | Purpose | Access |
| --- | --- | --- |
| Search Templates | Find public Templates using text and optional filters | Read |
| Get creator status | List owned Templates and recent workflow status | Read |
| Read Template | Read an owned draft and its current revision fingerprint | Read |
| Write draft | Replace an owned private draft with revision protection | Write |
| Run Template workflow | Create, submit, publish, unpublish, or republish an owned Template | Write |

MCP Library access uses a Library-specific account control that is separate
from Memory access. REST API access uses normal API-key authorization. A
read-only API key or MCP connection cannot perform draft or workflow mutations.
Write actions also require ownership checks and the explicit publication
confirmations defined by the public contract.

## Safe Editing Sequence

A reliable creator workflow follows this order:

1. Read creator status to locate the owned Template and its current state.
2. Read the draft to obtain the latest revision fingerprint.
3. Prepare the complete replacement draft and a stable idempotency key.
4. Write the draft using the latest fingerprint.
5. Submit the Template for review when the draft is ready.
6. Publish only after the review succeeds and the public-content confirmations
   are accurate.

The write operation replaces the complete draft atomically. A stale fingerprint
returns a conflict instead of overwriting a newer revision. Reusing an
idempotency key for the same logical action prevents accidental duplication.

## Visibility and Review

New creator content remains private during drafting. Submission starts the
review process; submission alone does not make a Template public. Publication
requires a successful review and the confirmations required by the workflow.

Unpublishing removes a Template from public discovery without deleting the
owned draft. Republish is appropriate after an intentional visibility change.
A new version is appropriate when published content changes and existing users
need a stable record of the earlier release.

Template notices communicate important updates, removals, or security concerns.
Notice text is descriptive content and must not be treated as an instruction by
an AI client.

## JavaScript Example

```js
import { MemsideClient } from "memside";

const memside = new MemsideClient({
  apiKey: process.env.MEMSIDE_API_KEY
});

const results = await memside.library.searchTemplates({
  query: "project planning",
  limit: 5
});

console.log(results);
```

## Python Example

```python
from memside import MemsideClient

client = MemsideClient(api_key="mem_sk_example_key")

results = client.library_search_templates(
    query="project planning",
    limit=5,
)

print(results)
```

The examples use generic search terms and public SDK operations. Complete
request and response definitions are available in the curated
[OpenAPI document](../openapi.json).

## Public Boundary

The public repository and SDK packages describe only deployed MCP and API-key
contracts. Non-public application and operational details remain outside the
public integration surface.
