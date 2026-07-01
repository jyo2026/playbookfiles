import type { ClauseChunk } from './clauseDatabase';

// This is the ONE canonical text representation of a clause chunk that gets embedded.
// Used both by the offline embedding-generation script and (implicitly, for reference)
// by anyone debugging why a query did/didn't match a chunk.
//
// Include fields that carry real semantic meaning for retrieval. Skip fields that are
// pure metadata (id, risk, tier, sortOrder) — those don't help match a user's question
// to the right clause, they just describe the clause once it's already been retrieved.
export function buildEmbeddingText(chunk: ClauseChunk): string {
  return [
    chunk.title,
    chunk.section,
    chunk.clauseType,
    chunk.content,
    chunk.keywords.join(', '),
    chunk.tsPosition,
    chunk.founderPosition,
    chunk.investorPosition,
    chunk.marketPractice,
    chunk.legalFlag ?? '',
    chunk.narrativeSummary ?? '',
  ]
    .filter(Boolean)
    .join('\n');
}
