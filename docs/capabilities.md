# Capabilities

Memside is an AI continuity and memory hub. It is built for people who move between AI tools, projects, devices, and working sessions, but still want the next AI to understand the important context without pasting a long prompt every time.

The product is centered on reusable context. A memory can be a project note, a decision, a task, an operating rule, a checkpoint, an imported conversation, or a supporting file. Connected AI tools can search and retrieve this context through MCP or direct API access, while the Memside app remains the place where users can review, edit, delete, and organize their own memory base.

## Cross-AI Continuity

Memside helps you carry context between ChatGPT, Claude, Grok, Codex, Cursor, Antigravity, opencode, and other MCP-capable tools. The goal is not to replace those tools. The goal is to give them a shared continuity layer so each one can pick up the right context when you ask.

This matters when a project spans multiple assistants. You may use ChatGPT for planning, Claude for writing, Cursor for code, and Codex for implementation. Without a shared memory layer, each tool starts with a partial view. With Memside, you can store the stable context once and let each connected tool retrieve the pieces it needs.

## Memory Search and Fetch

Connected tools can search saved memories and fetch specific memories when more detail is needed. Search is meant to be preview-first, so an AI can scan relevant context without loading every saved item into the conversation.

This is useful when a chat has drifted. Instead of pasting the whole project brief again, you can ask the AI to pull the latest Memside context for the project, checkpoint, rule, or decision. The AI can then get back to the intended track with a smaller and more targeted context load.

## Checkpoints and Resume Context

Checkpoints are for handoff and restart. A checkpoint can capture the current goal, key decisions, next action, open questions, and resume instructions.

Resume context helps a connected AI restart work from a known point. This is useful after a long break, a new chat, a tool switch, or a project handoff. Instead of re-explaining the entire project, you can ask for the current resume packet and continue from there.

## Operating Rules

Operating Rules are durable instructions that connected AI tools can use when they need to follow a consistent behavior. Examples include coding standards, writing preferences, review rules, security constraints, or project-specific working rules.

They are different from one-off chat instructions. A rule is saved, scoped, and reusable.

## User AI Profile

The User AI Profile stores personal working preferences. It can describe how you like answers structured, what tradeoffs you care about, what tools you commonly use, and which linked memories are especially important.

This helps connected AI tools understand you without needing the same preference prompt in every conversation.

## AI Skills

AI Skills are reusable instruction packs. They are useful for importing and maintaining files such as `AGENTS.md`, `CLAUDE.md`, `SKILL.md`, or other Markdown instructions that should be reused across AI tools.

Memside preserves the original source and can store optimized versions for compact or detailed reuse.

## Attachments and Imported Context

Memside can store supporting files and imported text so that important context is not scattered across chat exports, local notes, and documents. Attachments remain behind backend access checks, and connected AI tools only receive context through the permitted Memside surfaces.

## Public Integration Surface

The public integration surface is intentionally smaller than the full app. MCP and API-key access are designed for AI clients and scripts. Some account, settings, attachment, assistant, and audit features remain app-only.

This keeps the public integration useful without exposing private implementation details or expanding the AI-facing surface unnecessarily.
