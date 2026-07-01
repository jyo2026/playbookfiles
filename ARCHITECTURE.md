# Architecture: How RAG Works in This App

## The Flow

```
User types query
      ↓
pages/index.tsx
POST /api/playbook { query, mode }
      ↓
pages/api/playbook.ts
  Step 1 — RETRIEVAL
    retrieveClauses(query, mode) — lib/retrieval.ts
    Embeds the query (OpenAI text-embedding-3-small),
    compares it against precomputed clause embeddings via cosine similarity,
    blends in a keyword-relevance score, ranks, and returns
    the top 8 most relevant clause chunks
      ↓
  Step 2 — AUGMENTATION
    Build prompt with: system (lawyer persona) + retrieved chunks + user query
      ↓
  Step 3 — GENERATION
    OpenAI gpt-4o-mini generates JSON playbook
    { summary, tsPosition, primaryPosition, opposingPosition,
      marketPractice, redFlags, yellowFlags, negotiationSteps,
      shaNote, legalFlag }
      ↓
Return { query, mode, retrievedChunks, playbook } to frontend
      ↓
pages/index.tsx displays:
  - Retrieved Clauses (expandable cards)
  - Playbook (summary, red flags, yellow flags, steps)
```

## Knowledge Base Structure (lib/clauseDatabase.ts)

33 clause chunks covering Seed and Series A term sheet provisions. Each chunk:
```typescript
{
  id: string              // unique ID e.g. 'lp-001'
  clauseType: string      // e.g. 'Liquidation Preference'
  stage: string           // e.g. 'Seed, Series A'
  title: string           // short descriptive title
  content: string         // full legal explanation
  marketStandard: boolean // is this what most deals look like?
  risk: 'low' | 'medium' | 'high' | 'critical'
  keywords: string[]      // search terms
  tsPosition: string      // what to agree at term sheet stage
  founderPosition: string
  investorPosition: string
  marketPractice: string
  negotiationTips: string // lawyer-curated advice
  shaNote?: string        // what's deferred to SHA/SSA stage
  legalFlag?: string      // India-specific statutory note (Companies Act 2013, FEMA, etc.)
}
```

## Retrieval: Semantic Search + Keyword Boost

Retrieval is embedding-based, not word-matching. Two things happen ahead of time and one thing happens per query:

**Ahead of time (offline, via `scripts/generateEmbeddings.ts`):**
Every clause chunk is converted to a canonical text block (`lib/embeddingText.ts` — title, section, content, keywords, positions, market practice, legal flag) and embedded once using `text-embedding-3-small`. The resulting vectors are saved to `lib/clauseEmbeddings.json`, which is committed to the repo.

**Per query (`lib/retrieval.ts`):**
1. The incoming query is embedded (one API call).
2. Cosine similarity is computed between the query embedding and every precomputed clause embedding.
3. A keyword-relevance score is computed in parallel — a lightweight scorer matching the query against clause type, title, section, keywords, and content (no risk-level bonus; risk is metadata, not a relevance signal).
4. The two scores are blended: `combinedScore = semanticScore * 0.8 + keywordScore * 0.2`.
5. Chunks below a similarity threshold (0.3) are discarded as unrelated. The remaining chunks are ranked by combined score, and the top 8 are returned.

This means a query like "can investors force me to sell my company" retrieves the drag-along clause on meaning, even though it shares no words with how that clause is written — while a query using precise legal terminology ("drag-along threshold") still gets a boost from the exact-term match.

## File Map

| File | Role |
|------|------|
| `lib/clauseDatabase.ts` | Knowledge base — add clauses here |
| `lib/embeddingText.ts` | Builds the text representation of a clause chunk for embedding |
| `lib/clauseEmbeddings.json` | Precomputed vector embeddings for every clause chunk (committed to repo) |
| `lib/retrieval.ts` | Retrieval logic — semantic + keyword hybrid search |
| `scripts/generateEmbeddings.ts` | Offline script — run after any change to `clauseDatabase.ts` to regenerate `clauseEmbeddings.json` |
| `pages/api/playbook.ts` | RAG engine entry point — change model/prompt here |
| `pages/index.tsx` | UI — change design here |
| `styles/globals.css` | Styling — change colours here |
| `tailwind.config.js` | Colour palette — legal-50 to legal-900 |

## Maintaining the Knowledge Base

Whenever `lib/clauseDatabase.ts` is edited (adding, removing, or rewording a clause), run:
```bash
npx tsx scripts/generateEmbeddings.ts
```
and commit the updated `lib/clauseEmbeddings.json` alongside the database change.
