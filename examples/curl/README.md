# curl Examples

These commands use public Memside API-key routes only.

Set your API key:

```bash
export MEMSIDE_API_KEY="mem_sk_your_key_here"
```

On Windows PowerShell:

```powershell
$env:MEMSIDE_API_KEY = "mem_sk_your_key_here"
```

The commands below use POSIX shell variable syntax. In Windows PowerShell,
replace `$MEMSIDE_API_KEY`, `$MEMORY_ID`, `$SUBJECT_ID`, and `$CHECKPOINT_ID`
with their `$env:` forms.

## Context Workflow

```bash
curl "https://api.memside.com/context/startup?scope_level=project&scope_ref=personal-planning&budget_mode=light" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/context/resume?checkpoint_id=$CHECKPOINT_ID&budget_mode=light" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/context/workspace-profile?scope_level=project&scope_ref=personal-planning&budget_mode=light" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

The resume request requires a known checkpoint ID. If the scope has no
checkpoint, the API returns `404`.

## Memory Read Workflow

List or search:

```bash
curl "https://api.memside.com/memories?limit=5" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/memories/search?q=packing&limit=5" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

Set an identifier returned by Memside:

```bash
export MEMORY_ID="memory-id"
```

Read one Memory and its bounded public context:

```bash
curl "https://api.memside.com/memories/$MEMORY_ID" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/memories/batch?memory_ids=$MEMORY_ID" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/memories/$MEMORY_ID/revisions" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/memories/$MEMORY_ID/context-map" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/memories/$MEMORY_ID/subjects" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

## Memory Write Workflow

Create a generic private Memory:

```bash
curl https://api.memside.com/memories \
  -X POST \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Packing checklist\nBring a charger and a reusable bottle.",
    "type": "note",
    "sensitivity": "private",
    "tags": ["travel", "checklist"]
  }'
```

Update using the version previously returned by the API:

```bash
curl "https://api.memside.com/memories/$MEMORY_ID" \
  -X PATCH \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Packing checklist\nPack a reusable bottle.",
    "expected_version": 2
  }'
```

## Subject, Fact, and Insight Workflow

List or create Subjects:

```bash
curl "https://api.memside.com/subjects?limit=5" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl https://api.memside.com/subjects \
  -X POST \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Weekend reading",
    "subject_type": "topic",
    "aliases": ["Reading list"]
  }'
```

Set a Subject identifier returned by Memside:

```bash
export SUBJECT_ID="subject-id"
```

Link a non-secret Memory and read the Subject workflow:

```bash
curl "https://api.memside.com/subjects/$SUBJECT_ID/memories" \
  -X POST \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"memory_id\":\"$MEMORY_ID\"}"

curl "https://api.memside.com/subjects/$SUBJECT_ID/context" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/subjects/$SUBJECT_ID/facts?limit=10" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"

curl "https://api.memside.com/subjects/$SUBJECT_ID/memory-insights?limit=10" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

Submit a source-backed Fact Suggestion with a caller-selected stable key:

```bash
curl "https://api.memside.com/subjects/$SUBJECT_ID/fact-suggestions" \
  -X POST \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"suggestion_type\":\"add_fact\",
    \"proposed_fact_type\":\"custom\",
    \"proposed_fact_text\":\"This item belongs to the weekend reading list.\",
    \"source_memory_id\":\"$MEMORY_ID\",
    \"idempotency_key\":\"weekend-reading-v1\"
  }"
```

## Explicit Deletion

Prepare Subject deletion without changing data:

```bash
curl "https://api.memside.com/subjects/$SUBJECT_ID/deletion/prepare" \
  -X POST \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

Deletion commands require exact confirmations supplied by the caller. Do not
run them until you have reviewed the relevant confirmation workflow.

```bash
curl "https://api.memside.com/subjects/$SUBJECT_ID" \
  -X DELETE \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"delete_confirmation":"exact-confirmation"}'

curl "https://api.memside.com/memories/$MEMORY_ID" \
  -X DELETE \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"delete_confirmation":"exact-confirmation"}'
```
