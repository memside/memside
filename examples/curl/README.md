# curl Examples

Set your API key as an environment variable before running examples:

```bash
export MEMSIDE_API_KEY="mem_sk_your_key_here"
```

On Windows PowerShell:

```powershell
$env:MEMSIDE_API_KEY = "mem_sk_your_key_here"
```

## Startup Context

```bash
curl https://api.memside.com/context/startup \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

## Search Memories

```bash
curl "https://api.memside.com/memories/search?q=launch&limit=5" \
  -H "Authorization: Bearer $MEMSIDE_API_KEY"
```

## Create a Memory

```bash
curl https://api.memside.com/memories \
  -X POST \
  -H "Authorization: Bearer $MEMSIDE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Launch note\nMemside public repository setup started.",
    "type": "note",
    "sensitivity": "private",
    "tags": ["launch", "github"]
  }'
```
