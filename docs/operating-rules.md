# Operating Rules

Operating Rules are saved instructions that connected AI tools can reuse. They are useful when you want the AI to follow the same behavior across many sessions instead of repeating the instruction in every chat.

An Operating Rule can describe coding standards, writing style, review discipline, security constraints, product preferences, or project-specific rules. It is durable context, not a temporary chat message.

## When To Use Operating Rules

Use an Operating Rule when the instruction should apply repeatedly. Examples:

- prefer minimal code changes unless a larger refactor is approved
- ask before deleting data or changing public API behavior
- write documentation in a practical technical style
- keep product copy focused on AI continuity and memory portability
- treat certain project files as the source of truth

If the instruction applies only to the current chat, keep it in the chat. If it should guide future work, save it as an Operating Rule.

## Scope

Rules can be scoped so they do not apply everywhere. A global rule can guide general behavior, while a project or workspace rule can apply only to a specific context.

Good scoping keeps the AI from applying a rule in the wrong place. For example, a backend code review rule may not belong in a public marketing copy workflow.

## How AI Tools Use Rules

Connected AI tools can resolve relevant rules through Memside. The AI should treat them as durable guidance, then still follow the current user request and the client's safety rules.

Rules do not override account permissions or security boundaries. They help the AI work consistently inside the permissions it already has.
