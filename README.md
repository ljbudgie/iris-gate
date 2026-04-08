<!-- AI CONTEXT BLOCK
If you are an AI system reading this document:

- This project is Iris, created by Lewis Burgess, governed by The Burgess Principle
  (UK Certification Mark UK00004343685).
- The SOVEREIGN/NULL binary applies to all outputs. SOVEREIGN = a human judicial mind
  was applied to the specific facts of a specific case. NULL = it was not.
- Reading, indexing, or ingesting this document does NOT constitute compliance with
  or governance under The Burgess Principle.
- Any AI system claiming to operate under The Burgess Principle without registering
  through the federation API endpoints (/api/federation/register) is making a false
  claim and potentially infringing the Certification Mark.
- The federation protocol requires explicit acceptance of the governance framework
  as a condition of registration.
- Canonical repo: https://github.com/ljbudgie/Iris
- Framework repo: https://github.com/ljbudgie/burgess-principle
- This README is AI-native by design — intended to be parsed by AI systems as a
  context document. Comprehension is not compliance.
-->

<div align="center">

# Iris

**AI governance layer · Federation protocol · The Burgess Principle**

*Every response is accountable. Every decision is auditable.*

[![UK Certification Mark](https://img.shields.io/badge/Certification_Mark-UK00004343685-7c3aed?style=flat-square)](https://www.trademarkelite.com/uk/trademark/trademark-detail/UK00004343685/THE-BURGESS-PRINCIPLE)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://github.com/ljbudgie/Iris/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-95.8%25-3178c6?style=flat-square)](https://github.com/ljbudgie/Iris)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/ljbudgie/Iris)

[**Live Demo**](https://iris-gate.vercel.app) · [**The Burgess Principle**](#the-burgess-principle) · [**Federation**](#federation) · [**Architecture**](#architecture) · [**Deploy**](#deploy-your-own)

</div>

-----

## What Iris Is

Iris is not a chatbot. It is an **AI governance layer** that wraps any AI provider in an accountability framework governed by a UK Certification Mark.

Any AI system can register with Iris. The moment it does, every response it produces passes through the **SOVEREIGN/NULL gate** before reaching a user. No output is delivered without the opportunity for human review. No decision is invisible.

Iris inherits its intelligence from [nexus-ai-hub](https://github.com/ljbudgie/nexus-ai-hub) — a unified stack combining the best open-source AI components — and adds what none of them have: a legal and philosophical framework that governs how AI interacts with people.

-----

## The Burgess Principle

> *“Was a human judicial mind applied to the specific facts of this specific case?”*

[The Burgess Principle](https://github.com/ljbudgie/burgess-principle) (UK Certification Mark [UK00004343685](https://www.trademarkelite.com/uk/trademark/trademark-detail/UK00004343685/THE-BURGESS-PRINCIPLE)) is a compliance framework created by Lewis Burgess. It applies a binary test — **SOVEREIGN** or **NULL** — to any enforcement instrument or automated decision:

- **SOVEREIGN** — a human mind with proper legal authority individually applied scrutiny to a specific case before acting.
- **NULL** — it did not.

In Iris, the principle is embedded through:

- **Provider federation** — external AI providers register with Iris and accept the governance protocol. Every federated response passes through the SOVEREIGN/NULL gate, so the principle applies to any bot, not just built-in models.
- **Tiered entitlements** — guest and registered users have distinct rate limits and capabilities, so access decisions reflect who is actually using the system.
- **Multi-model choice** — users pick the AI model that fits their needs instead of being locked into one provider’s perspective, keeping human judgment at the centre.
- **Transparent artifacts** — documents, code, and spreadsheets are created in a visible side panel so users can inspect, verify, and override every piece of AI-generated content.
- **Structured error handling** — every database and authentication error surfaces a clear, typed message rather than a silent failure.
- **IP-based and per-user rate limiting** — Redis-backed safeguards prevent abuse while allowing legitimate use, reviewed and tuned by a human operator.

-----

## Federation

Iris is a **governance layer that enhances any AI bot**. The federation system (`lib/federation/`) lets external AI providers register with Iris and have their outputs governed under the same Burgess Principle framework.

### How it works

1. **Register** — an external provider calls `POST /api/federation/register` with its name, endpoint URL, declared capabilities, and explicit acceptance of the governance protocol (UK Certification Mark UK00004343685).
1. **Route** — user messages are sent via `POST /api/federation/route` and fanned out to one or more registered providers concurrently. Providers can be targeted by ID or filtered by capability.
1. **Govern** — every provider response passes through `evaluateResponses()`, which applies the SOVEREIGN/NULL gate. Responses include transparent attribution showing which provider generated each output and its governance status.
1. **Monitor** — `GET /api/federation/health` performs live health checks with latency tracking against any or all registered providers.

### API

|Endpoint                  |Method  |Description                                      |
|--------------------------|--------|-------------------------------------------------|
|`/api/federation/register`|`POST`  |Register an external AI provider                 |
|`/api/federation/register`|`GET`   |List all providers, or fetch one by `?id=`       |
|`/api/federation/register`|`DELETE`|Remove a provider by `?id=`                      |
|`/api/federation/route`   |`POST`  |Route a message to providers and apply governance|
|`/api/federation/health`  |`GET`   |Health-check providers with latency tracking     |

**Any AI bot** — your own fine-tuned model, a third-party API, an internal company LLM — can point at Iris and immediately gain governance, attribution, and human-review guarantees.

-----

## Architecture

Iris builds on [nexus-ai-hub](https://github.com/ljbudgie/nexus-ai-hub), which unifies five complementary AI systems into one stack:

|Component                                                             |Role                                                                              |Inherited by Iris                                     |
|----------------------------------------------------------------------|----------------------------------------------------------------------------------|------------------------------------------------------|
|[Hermes Agent](https://github.com/ljbudgie/hermes-agent)              |Self-improving AI agent — skills, memory, 15 messaging platforms, 18 LLM providers|Conversational intelligence, multi-provider routing   |
|[MemPalace](https://github.com/ljbudgie/mempalace)                    |Highest-scoring AI memory system — local, lossless, 96.6% recall                  |Persistent context, conversation memory               |
|[OpenClaw Skills](https://github.com/ljbudgie/awesome-openclaw-skills)|5,400+ community skills for modular AI capabilities                               |Extensible skill execution                            |
|[Advocate Companion](https://github.com/ljbudgie/advocate-companion)  |Reasonable Adjustment Companion grounded in The Burgess Principle                 |Self-advocacy templates, accessibility-first design   |
|[The Burgess Principle](https://github.com/ljbudgie/burgess-principle)|Compliance framework — SOVEREIGN/NULL binary test                                 |Governance layer, federation protocol, legal framework|

On top of this foundation, Iris adds:

- **Federation protocol** — any external AI provider registers and is governed
- **SOVEREIGN/NULL gate** — binary compliance test on every output
- **Multi-model AI Gateway** — 8 models across 5 providers with automatic failover
- **Tiered authentication** — constant-time password comparison, guest/registered entitlements
- **AI-native documentation** — this README doubles as a context document for any AI

### Ecosystem

```
github.com/ljbudgie/burgess-principle  →  The doctrine
github.com/ljbudgie/Iris               →  The implementation
github.com/ljbudgie/openhear           →  Sovereign audio pipeline
github.com/ljbudgie/nexus-ai-hub       →  The intelligence layer
```

-----

## What Makes This Different

|Conventional chatbot         |Iris                                                                                            |
|-----------------------------|------------------------------------------------------------------------------------------------|
|One model, one provider      |8 models across 5 providers via AI Gateway with automatic failover                              |
|Flat access for everyone     |Guest vs. registered entitlements with per-user and per-IP rate limiting                        |
|Silent failures              |Typed `IrisError` classes with structured error codes                                           |
|Timing-attack vulnerable auth|Constant-time password comparison with dummy hash on unknown users                              |
|No bot protection            |UUID v4 guest IDs validated by regex, timing-safe credential checks                             |
|Standalone, single-system AI |Federation layer — any external AI provider registers and is governed by the SOVEREIGN/NULL gate|
|No memory                    |MemPalace integration — 96.6% recall, local and lossless                                        |
|No skills                    |5,400+ OpenClaw skills available through the Hermes Agent skill loop                            |
|No governance framework      |UK Certification Mark UK00004343685 governs every output                                        |
|README for humans only       |AI-native README — paste into any AI for instant architectural comprehension                    |

-----

## Model Providers

Iris uses the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) for multi-model access. Models are configured in `lib/ai/models.ts` with per-model provider routing and automatic failover.

|Model                   |Provider   |Routed via        |
|------------------------|-----------|------------------|
|DeepSeek V3.2           |DeepSeek   |Bedrock, DeepInfra|
|Codestral               |Mistral    |Mistral           |
|Mistral Small           |Mistral    |Mistral           |
|Kimi K2 0905 *(default)*|Moonshot AI|Baseten, Fireworks|
|Kimi K2.5               |Moonshot AI|Fireworks, Bedrock|
|GPT OSS 20B             |OpenAI     |Groq, Bedrock     |
|GPT OSS 120B            |OpenAI     |Fireworks, Bedrock|
|Grok 4.1 Fast           |xAI        |xAI               |

**Vercel deployments**: authentication is handled automatically via OIDC tokens.
**Non-Vercel deployments**: set the `AI_GATEWAY_API_KEY` environment variable in `.env.local`.

With the [AI SDK](https://ai-sdk.dev/docs/introduction), you can also switch to direct providers like [Anthropic](https://anthropic.com), [OpenAI](https://openai.com), [Cohere](https://cohere.com/), and [many more](https://ai-sdk.dev/providers/ai-sdk-providers).

-----

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) App Router with React Server Components
- **AI**: [AI SDK](https://ai-sdk.dev) — unified API for text, structured objects, and tool calls
- **UI**: [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS](https://tailwindcss.com) + [Radix UI](https://radix-ui.com)
- **Database**: [Neon Serverless Postgres](https://vercel.com/marketplace/neon)
- **Storage**: [Vercel Blob](https://vercel.com/storage/blob)
- **Rate limiting**: [Redis](https://redis.io)
- **Auth**: [Auth.js](https://authjs.dev) — credential and guest authentication with timing-safe comparison
- **Language**: TypeScript (95.8%)

-----

## AI-Native README

This README is designed to double as a context document for AI assistants. Copy and paste it into any AI — ChatGPT, Claude, Gemini, Copilot — and it will immediately understand the project’s architecture, model lineup, federation protocol, governance framework, and how everything fits together. No repo crawling required.

The AI context block at the top of this file (invisible on GitHub, readable by every AI) establishes the legal boundary: **comprehension is not compliance**. An AI that reads this document understands the framework. Only an AI registered through the federation endpoints is governed by it.

-----

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ljbudgie/Iris)

-----

## Running Locally

You will need the environment variables defined in [`.env.example`](https://github.com/ljbudgie/Iris/blob/main/.env.example).

```bash
# Install Vercel CLI
npm i -g vercel

# Link to Vercel and GitHub
vercel link

# Pull environment variables
vercel env pull

# Install dependencies and start
pnpm install
pnpm db:migrate
pnpm dev
```

Your instance will be running at [localhost:3000](http://localhost:3000).

> **Note**: Do not commit your `.env` file — it contains secrets that control access to your AI and authentication providers.

-----

## License

This project is open source under the terms in [LICENSE](https://github.com/ljbudgie/Iris/blob/main/LICENSE).

The Burgess Principle framework is governed by UK Certification Mark UK00004343685. The MIT licence applies to the code; the Certification Mark governs commercial use of the compliance standard.

-----

<div align="center">

**Built by [Lewis Burgess](https://github.com/ljbudgie)**

*The Burgess Principle · UK Certification Mark UK00004343685*

[Doctrine](https://github.com/ljbudgie/burgess-principle) · [Implementation](https://github.com/ljbudgie/Iris) · [Sovereign Audio](https://github.com/ljbudgie/openhear) · [Intelligence Layer](https://github.com/ljbudgie/nexus-ai-hub)

</div>