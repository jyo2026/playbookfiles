// Run this OFFLINE whenever clauseDatabase.ts changes — it is NOT called at request time.
// Usage:
//   npm install -D tsx dotenv
//   npx tsx scripts/generateEmbeddings.ts
//
// Requires OPENAI_API_KEY to be set (e.g. in .env.local, loaded below via dotenv).
// Writes lib/clauseEmbeddings.json, which is committed to the repo and imported at
// request time — no embedding API calls happen for the corpus during a live request,
// only for the user's incoming query.

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { clauseChunks } from '../lib/clauseDatabase';
import { buildEmbeddingText } from '../lib/embeddingText';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EMBEDDING_MODEL = 'text-embedding-3-small';

interface StoredEmbedding {
  id: string;
  embedding: number[];
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set. Aborting.');
    process.exit(1);
  }

  console.log(`Embedding ${clauseChunks.length} clause chunks with ${EMBEDDING_MODEL}...`);

  const results: StoredEmbedding[] = [];

  for (const chunk of clauseChunks) {
    const text = buildEmbeddingText(chunk);
    const res = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
    });
    results.push({ id: chunk.id, embedding: res.data[0].embedding });
    console.log(`  ✓ ${chunk.id}`);
  }

  const outPath = path.join(__dirname, '../lib/clauseEmbeddings.json');
  fs.writeFileSync(outPath, JSON.stringify(results));
  console.log(`\nWrote ${results.length} embeddings to ${outPath}`);
  console.log('Commit this file to the repo — it is read at request time, not regenerated.');
}

main().catch((err) => {
  console.error('Failed to generate embeddings:', err);
  process.exit(1);
});
