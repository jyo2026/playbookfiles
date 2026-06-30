# Architecture: How RAG Works in This App

## The Flow

```
User types query
      ↓
pages/index.tsx
POST /api/playbook { query }
      ↓
pages/api/playbook.ts
  Step 1 — RETRIEVAL
    searchClauses(query) against clauseDatabase.ts
    Returns top 5 most relevant clause chunks
      ↓
  Step 2 — AUGMENTATION
    Build prompt with: system (lawyer persona) + retrieved chunks + user query
      ↓
  Step 3 — GENERATION
    OpenAI GPT-4o-mini generates JSON playbook
    { summary, marketGuidance, redFlags, yellowFlags, negotiationSteps }
      ↓
Return { query, retrievedChunks, playbook } to frontend
      ↓
pages/index.tsx displays:
  - Retrieved Clauses (expandable cards)
  - Playbook (summary, red flags, yellow flags, steps)
```

## Knowledge Base Structure (clauseDatabase.ts)

Each clause chunk:
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
  negotiationTips: string // lawyer-curated advice
}
```

## Search Algorithm

Simple keyword scoring (MVP approach):
- clauseType match → +10 points
- title match → +8 points  
- keyword match → +5 points
- content match → +3 points
- critical risk boost → +2 points
- high risk boost → +1 point

Top 5 scoring chunks are retrieved.

## Upgrade Path

For better search accuracy, replace keyword scoring with vector embeddings:
1. `openai.embeddings.create()` for each chunk at startup
2. Cosine similarity between query embedding and chunk embeddings
3. Return top-k most similar chunks

## File Map

| File | Role |
|------|------|
| `lib/clauseDatabase.ts` | Knowledge base — add clauses here |
| `pages/api/playbook.ts` | RAG engine — change model/prompt here |
| `pages/index.tsx` | UI — change design here |
| `styles/globals.css` | Styling — change colours here |
| `tailwind.config.js` | Colour palette — legal-50 to legal-900 |
