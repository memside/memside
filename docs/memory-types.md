# Memory Types and Sensitivity

Memside stores different kinds of memory because not all context should behave the same way. A task checkpoint, a durable operating rule, a project note, and a sensitive personal detail need different handling.

## Common Memory Types

Typical memory types include notes, tasks, events, goals, prompts, operating rules, shopping lists, wishlists, ideas, and logs. The exact type helps Memside organize the memory and helps connected AI tools understand how to use it.

For example, a task memory can carry next actions and status. An operating rule can carry reusable behavior guidance. A note can preserve general context.

## Public Memories

Public memories are for context that is safe to reuse broadly inside your Memside-connected workflows. They are useful for public product descriptions, general project positioning, public docs language, or other context that does not need a stricter boundary.

Public memories can help token efficiency because they are safer candidates for lightweight hints and repeated AI-facing context. They should still be written carefully. Public in Memside should not be used for passwords, secrets, private customer data, or sensitive personal context.

## Private Memories

Private is the default sensitivity for normal personal or work context. Use private memories for notes, decisions, checkpoints, project details, and user-specific information that should remain scoped to your account.

Private memories can still be available to connected AI tools when the authenticated user asks for them and the tool has the right access path. They are not public web pages.

## Secret Memories

Secret memories are for context that should not be exposed through AI-facing MCP or API-key flows. Use secret for sensitive information that should remain app-only.

Secret memories are intentionally excluded from connected AI access. This boundary lets you keep sensitive notes in Memside without treating every AI integration as trusted for that data.

## Choosing a Sensitivity

Use public when the content is safe to reuse as broad context. Use private for normal personal or project memory. Use secret when AI-facing tools should not retrieve the memory.

If you are unsure, choose private. If the memory contains credentials, private tokens, confidential account details, or sensitive personal information, choose secret or avoid storing it.
