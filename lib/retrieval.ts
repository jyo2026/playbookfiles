import OpenAI from 'openai';
import { clauseChunks, type ClauseChunk } from './clauseDatabase';
// Importing the JSON directly (rather than fs.readFileSync) lets Next.js's bundler
// package it with the serverless function automatically — no runtime filesystem
// path issues on Vercel.
import clauseEmbeddingsData from './clauseEmbeddings.json';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EMBEDDING_MODEL = 'text-embedding-3-small';

// Tune this after testing against real founder queries. Cosine similarity for
// OpenAI embeddings on related-but-not-identical legal text typically lands
// ~0.25-0.5; genuinely unrelated queries ("what's the weather") land much lower.
// Start here, then adjust based on false positives/negatives you observe.
const SIMILARITY_THRESHOLD = 0.3;

// Raised from 5: a hard cap of 5 silently drops chunks on compound questions
// ("what should I push back on across liquidation preference and anti-dilution").
// 8 clauses is still a small, cheap prompt for gpt-4o-mini, and chunks past the
// similarity threshold that don't make the cut are genuinely lower-relevance,
// not victims of an arbitrary ceiling.
const TOP_K = 8;

// Deliberately NOT reusing clauseDatabase.ts's searchClauses() here. That function
// adds +2/+1 points for risk === 'critical'/'high' regardless of query relevance —
// a reasonable choice for a UI that wants to surface alarming clauses, but it has
// no place informing what counts as "relevant to this query." This scorer is query
// relevance only: same field-matching logic, risk bonus removed.
function keywordRelevanceScore(query: string, chunk: ClauseChunk): number {
  const q = query.toLowerCase();
  let score = 0;
  if (chunk.clauseType.toLowerCase().includes(q)) score += 10;
  if (chunk.title.toLowerCase().includes(q)) score += 8;
  if (chunk.section.toLowerCase().includes(q)) score += 8;
  chunk.keywords.forEach((kw) => {
    if (q.includes(kw.toLowerCase()) || kw.toLowerCase().includes(q)) score += 5;
  });
  if (chunk.content.toLowerCase().includes(q)) score += 3;
  if (chunk.tsPosition.toLowerCase().includes(q)) score += 2;
  if (chunk.founderPosition.toLowerCase().includes(q)) score += 2;
  if (chunk.investorPosition.toLowerCase().includes(q)) score += 2;
  if (chunk.legalFlag?.toLowerCase().includes(q)) score += 3;
  return score;
}

interface StoredEmbedding {
  id: string;
  embedding: number[];
}

const embeddingsById = new Map<string, number[]>(
  (clauseEmbeddingsData as StoredEmbedding[]).map((e) => [e.id, e.embedding])
);

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export interface RetrievedChunk extends ClauseChunk {
  semanticScore: number;
  keywordScore: number;
  combinedScore: number;
}

// Hybrid retrieval: semantic similarity does the heavy lifting (understands
// "what happens if founder gets fired" ≈ "Good Leaver / Bad Leaver" even with
// zero shared words), keyword score is a smaller boost that rewards exact
// legal-term matches ("drag-along") so precise terminology isn't diluted by
// semantic near-misses.
export async function retrieveClauses(query: string, mode?: string): Promise<RetrievedChunk[]> {
  const queryEmbeddingRes = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: query,
  });
  const queryEmbedding = queryEmbeddingRes.data[0].embedding;

  const scored = clauseChunks.map((chunk) => {
    const embedding = embeddingsById.get(chunk.id);
    const semanticScore = embedding ? cosineSimilarity(queryEmbedding, embedding) : 0;
    // Raw score is unbounded (roughly 0-30); normalize to ~0-1 so it doesn't
    // dominate the semantic score in the blend below.
    const keywordScore = Math.min(keywordRelevanceScore(query, chunk) / 30, 1);
    const combinedScore = semanticScore * 0.8 + keywordScore * 0.2;
    return { chunk, semanticScore, keywordScore, combinedScore };
  });

  return scored
    .filter((s) => s.semanticScore >= SIMILARITY_THRESHOLD)
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .slice(0, TOP_K)
    .map((s) => ({
      ...s.chunk,
      semanticScore: s.semanticScore,
      keywordScore: s.keywordScore,
      combinedScore: s.combinedScore,
    }));
}
