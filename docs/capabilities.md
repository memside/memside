# Capabilities

Memside is an AI continuity and memory hub. It is built for people who move between AI tools, IDEs, coding agents, projects, and working sessions, but still want the next AI to understand the important context without pasting a long prompt every time.

The product is centered on reusable context. A memory can be a project note, a decision, a task, an operating rule, a checkpoint, an imported conversation, or a supporting file. Connected AI tools can search and retrieve this context through MCP or direct API access, while the Memside app remains the place where users can review, edit, delete, and organize their own memory base.

## Cross-AI Continuity

Memside carries context between ChatGPT, Claude, Grok, GitHub Copilot, Codex, Cursor, Antigravity, opencode, and other compatible AI tools. The goal is not to replace those tools. The goal is to provide a shared continuity layer so each connected tool can retrieve relevant context when requested.

This matters when a project spans multiple assistants. One tool may support planning, another writing, and another implementation. Without a shared memory layer, each tool starts with a partial view. Memside stores stable context once so each connected tool can retrieve the relevant parts.

## Memory Search and Fetch

Connected tools can search saved memories and fetch specific memories when more detail is needed. Search is meant to be preview-first, so an AI can scan relevant context without loading every saved item into the conversation.

This is useful when a chat has drifted. A connected AI can retrieve the latest Memside context for a project, checkpoint, rule, or decision and return to the intended track with a smaller, targeted context load.

## Checkpoints and Resume Context

Checkpoints are for handoff and restart. A checkpoint can capture the current goal, key decisions, next action, open questions, and resume instructions.

Resume context helps a connected AI restart work from a known point after a long break, a new chat, a tool switch, or a project handoff. The current resume packet replaces repeated explanation of the complete project.

## Operating Rules

Operating Rules are durable instructions that connected AI tools can use when they need to follow a consistent behavior. Examples include coding standards, writing preferences, review rules, security constraints, or project-specific working rules.

They are different from one-off chat instructions. A rule is saved, scoped, and reusable.

## User AI Profile

The User AI Profile stores reusable working preferences. It can describe response structure, important tradeoffs, commonly used tools, and linked memories that deserve additional attention.

This helps connected AI tools apply stable preferences without repeating the same profile prompt in every conversation.

## Memside Library and Templates

Memside Library provides reusable Templates for profiles, Operating Rules, AI
Skills, memories, references, examples, and repeatable workflows. Templates
offer a reviewed starting point when an effective AI setup is unclear or would
otherwise require repeated manual configuration.

Public catalog discovery is read-only. Authenticated creator operations support
search, status checks, protected draft reads, atomic draft replacement, and
reviewed publication workflows. Library permissions remain separate from
Memory permissions. See [Memside Library and Templates](template-library.md).

## AI Skills

AI Skills are reusable instruction packs. They are useful for importing and maintaining files such as `AGENTS.md`, `CLAUDE.md`, `SKILL.md`, or other Markdown instructions that should be reused across AI tools.

Memside preserves the original source and can store optimized versions for compact or detailed reuse.

## Attachments and Imported Context

Memside can store supporting files and imported text so that important context is not scattered across chat exports, local notes, and documents. Attachments remain behind backend access checks, and connected AI tools only receive context through the permitted Memside surfaces.

## Public Integration Surface

The public integration surface is intentionally smaller than the full app. MCP and API-key access are designed for AI clients and scripts. Account management, sensitive app-session workflows, and non-public product surfaces remain app-only.

This keeps the public integration useful without exposing private implementation details or expanding the AI-facing surface unnecessarily.
