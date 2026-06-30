# Term Sheet Playbook MVP

A RAG-powered negotiation advisor for corporate lawyers working on Seed and Series A venture funding rounds. Built with Next.js and OpenAI.

## What It Does

- Lawyer types a question: *"What should I negotiate on liquidation preference?"*
- App retrieves the most relevant clause chunks from a legal knowledge base
- GPT-4 generates a structured playbook: red flags, yellow flags, market guidance, negotiation steps
- Lawyer sees exactly which clauses informed the advice (full RAG transparency)

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

### 3. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Deploy to Vercel
Push to GitHub, import repo in Vercel, add `OPENAI_API_KEY` environment variable, deploy.

## Project Structure

```
pages/
  index.tsx          Main UI
  api/playbook.ts    RAG engine (retrieval + GPT generation)
  _app.tsx           App wrapper
lib/
  clauseDatabase.ts  15+ term sheet clause chunks
styles/
  globals.css        Styling
```

## Tech Stack

- **Frontend:** Next.js 14 + React + Tailwind CSS
- **Backend:** Next.js API Routes (serverless)
- **LLM:** OpenAI GPT-4o-mini
- **Deployment:** Vercel

## Cost

~$3/month at 100 queries/month with gpt-4o-mini.
