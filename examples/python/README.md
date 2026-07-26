# Python Examples

These executable examples use only Python's standard library and public
Memside API-key routes.

Requirements:

- Python 3.9 or newer
- a Memside API key

Set your API key first.

macOS or Linux:

```bash
export MEMSIDE_API_KEY="mem_sk_your_key_here"
```

Windows PowerShell:

```powershell
$env:MEMSIDE_API_KEY = "mem_sk_your_key_here"
```

## Read Workflows

```bash
python context_workflow.py personal-planning
python memory_read_workflow.py memory-id
python subject_read_workflow.py subject-id
```

Pass a known checkpoint ID as the second Context argument to include resume
context. Without one, the workflow reads startup and workspace context only.

The Memory and Subject identifiers are optional. When omitted, the example
uses the first accessible item and exits cleanly if none exists.

## Write Workflows

These examples change data. Review each script before running it.

```bash
python create_memory.py
python update_memory.py memory-id 2 "Travel checklist updated"
python subject_workflow.py memory-id stable-idempotency-key
```

The update example requires the version previously returned by the API. The
Subject workflow requires a non-secret Memory and a caller-selected stable
idempotency key.

## Explicit Deletion

Deletion examples never construct confirmations:

```bash
python prepare_subject_delete.py subject-id
python delete_subject.py subject-id exact-confirmation
python delete_memory.py memory-id exact-confirmation
```

Review the Subject deletion preview or your application's Memory deletion
workflow before passing an exact confirmation.

## Files

- `memside_http.py`: shared bearer-authenticated HTTP helper
- read workflow files: Context, Memory, and Subject reads
- create/update workflow files: explicit public writes
- deletion files: caller-confirmed destructive requests
