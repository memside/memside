# Token Savings and Context Reuse

Memside can reduce repeated token use by keeping durable context outside the chat until it is needed. The basic idea is simple: save stable context once, then let the connected AI retrieve a compact and relevant subset instead of pasting the same long background into every new conversation.

This does not mean every workflow uses fewer tokens automatically. Token savings depend on how much context you would otherwise paste, how specific the search is, and how well the memory base is maintained. The practical advantage is that Memside gives you tools to retrieve context selectively.

## Startup Context

Startup context is a compact first-load packet. It can include useful orientation such as active checkpoints, relevant memory previews, operating rules, profile hints, and lightweight metadata.

Use startup context when an AI tool is starting work in a new chat or session and needs enough background to orient itself. It is meant to be smaller than a full project dump.

Example prompt:

```text
Use Memside startup context for this workspace, then tell me what you understand before making changes.
```

## Resume Context

Resume context is for restarting from a checkpoint. It can include the checkpoint summary, next action, key decisions, open questions, related memory previews, and other handoff details.

Use resume context when work was paused and you want the AI to continue from the last known state. This is especially helpful when the previous chat became long, moved in different directions, or was handled in another AI tool.

Example prompt:

```text
Pull the latest Memside resume context for this project and continue from the next action.
```

## Search Before Fetch

Search results should be treated as a shortlist. A connected AI can search first, inspect previews, and fetch full memory details only for the items that matter.

This pattern helps avoid loading irrelevant memory bodies. It also makes the AI explain which context it is using before it acts.

Example prompt:

```text
Search Memside for the current launch plan. Fetch only the memories that are directly needed.
```

## Public Hints and Safe Reuse

Public memories can be used as safer reusable hints inside your account. They are useful for context that is intentionally low-risk, such as public product language, public docs positioning, or general project background.

Public does not mean every memory is published on the web. It means the memory has a lower sensitivity classification inside Memside and can be treated as safer for AI-facing reuse than private or secret content.

## Checkpoint Hygiene

Token savings improve when checkpoints are kept current. A good checkpoint is short, concrete, and focused on what another AI needs to continue work.

Good checkpoints usually include:

- the current goal
- what changed
- key decisions
- next action
- unresolved questions
- important memory references

Poor checkpoints are vague or too long. If a checkpoint becomes a full transcript, it loses the benefit of compact continuation.

## Practical Result

The practical result is not just fewer tokens. It is less repeated setup, fewer context mistakes, and faster recovery when a conversation loses direction. A single pull from Memside can bring the AI back to the project state, rules, and next step that matter.
