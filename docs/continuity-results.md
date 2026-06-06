# Continuity and Context Results

Memside helps AI assistants start with compact, relevant context instead of
making users repeat the same background in every session.

These results are shared as practical product signals. They combine controlled
internal tests with early pilot usage patterns across chat and IDE workflows.

## Continuity Test Summary

The continuity test checks whether an AI assistant can resume work, follow saved
preferences, use the right project context, and choose memory capture behavior
without needing a long manual setup.

| Context approach | Continuity score |
| --- | ---: |
| No Context | ~45% |
| Long Context Dump | ~84-85% |
| Memside Context | ~96-99% |
| Very Detailed Manual Prompt | ~97-99% |

The main takeaway is simple: Memside Context performed close to a very detailed
manual prompt, while requiring much less repeated setup from the user.

A very detailed manual prompt means a long prompt where the user includes every
important detail by hand: project state, preferences, decisions, references, and
next steps. With Memside, the user can ask the AI to save the checkpoint,
references, and useful context, then move to a new chat and ask it to continue
from that checkpoint using Memside.

## Context Reuse and Token Savings

**Token savings:** in separate context-reuse tests, Memside reduced repeated
full-context transfer by **83-91%** on representative project datasets.

| Dataset | Repeated full-context transfer | Memside startup context | Reduction |
| --- | ---: | ---: | ---: |
| Light | 5,296 tokens | 875 tokens | 83% |
| Medium | 10,946 tokens | 1,316 tokens | 88% |
| Heavy | 21,505 tokens | 1,834 tokens | 91% |

Token savings vary by workflow. Memside helps most when users would otherwise
paste the same large project context, instructions, and status notes into every
new AI session.

## Controlled Eval Model Set

Controlled eval runs were performed on a selected set of hosted and open models,
including:

- `llama-3.3-70b-versatile`
- `mistral-medium-3.5-128b`
- `minimax-m3`
- `nemotron-3-ultra`
- `owl-alpha`
- `nemotron-3-super-120b-a12b`
- `laguna-m.1`
- `gpt-oss-120b`
- `gemma-4-26b-a4b-it`
- `gemma-4-31b-it`

Model routing and provider availability change over time, so the public summary
focuses on the pattern rather than one provider route.

## Pilot Usage Coverage

Early pilot usage has included frontier and open model families from OpenAI,
Anthropic, Google Gemini, xAI/Grok, MiniMax, Z.ai/GLM, Moonshot/Kimi, and other
open model providers across chat, IDE, and coding-agent workflows.

Across those workflows, the repeated pattern was that AI assistants stayed more
aligned when they could start from Memside context instead of relying on memory
inside one chat window.

## Disclaimer

Results are based on internal tests and early pilot usage patterns. Performance
varies by model, provider, prompt style, user workflow, and the quality of saved
context.
