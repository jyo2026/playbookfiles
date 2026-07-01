# Term Sheet Playbook MVP

A RAG-powered negotiation advisor for corporate lawyers and founders working on Seed and Series A venture funding rounds in India. Built with Next.js and OpenAI.

## What It Does

- User types a question: *"What should I negotiate on liquidation preference?"* — or asks it in plain English, e.g. *"can investors force me to sell my company?"*
- App embeds the query and retrieves the most relevant clause chunks from a legal knowledge base using semantic similarity, blended with a keyword-relevance boost
- gpt-4o-mini generates a structured playbook: summary, term sheet position, negotiating positions for both sides, market practice, red flags, yellow flags, and negotiation steps
- User sees exactly which clauses informed the advice (full RAG transparency)
- Answers are grounded strictly in the retrieved clauses — if nothing relevant is found, the tool says so instead of guessing

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Add your API key
```bash
cp .env.example .env.local
# Open .env.local and replace the placeholder with your real OpenAI API key
```

### 3. Generate clause embeddings
```bash
npm install -D tsx dotenv
cp .env.local .env
npx tsx scripts/generateEmbeddings.ts
```
This reads every clause in `lib/clauseDatabase.ts`, embeds it via OpenAI, and writes `lib/clauseEmbeddings.json`. Re-run this any time you edit the clause database.

### 4. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 5. Deploy to Vercel
Push to GitHub, import repo in Vercel, add `OPENAI_API_KEY` environment variable, deploy. Make sure `lib/clauseEmbeddings.json` is committed — it's read at request time, not generated on Vercel.

## Project Structure

```
pages/
  index.tsx              Main UI
  api/playbook.ts        RAG engine (retrieval + GPT generation)
  _app.tsx               App wrapper
lib/
  clauseDatabase.ts       33 term sheet clause chunks
  embeddingText.ts        Builds text representation of a clause for embedding
  clauseEmbeddings.json   Precomputed clause embeddings (committed)
  retrieval.ts            Semantic + keyword hybrid retrieval
scripts/
  generateEmbeddings.ts   Offline script to (re)generate clauseEmbeddings.json
styles/
  globals.css             Styling
```

## Tech Stack

- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Next.js API Routes (serverless)
- **Retrieval:** OpenAI `text-embedding-3-small` (semantic similarity) blended with keyword scoring
- **LLM:** OpenAI gpt-4o-mini (generation)
- **Deployment:** Vercel

## Cost

~$3/month at 100 queries/month. Each query costs one embedding call (query only — the clause corpus is embedded once, offline) plus one gpt-4o-mini generation call; the embedding call adds a negligible fraction of a cent per query.
