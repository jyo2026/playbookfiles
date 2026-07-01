import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { searchClauses, ClauseChunk } from '@/lib/clauseDatabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Mode = 'founder' | 'investor';

interface RequestBody {
  query: string;
  mode?: Mode;
}

interface PlaybookResponse {
  query: string;
  mode: Mode;
  retrievedChunks: ClauseChunk[];
  playbook: {
    summary: string;
    tsPosition: string;
    primaryPosition: string;
    opposingPosition: string;
    marketPractice: string;
    redFlags: string[];
    yellowFlags: string[];
    negotiationSteps: string[];
    shaNote?: string;
    legalFlag?: string;
  };
}

// ── System prompts per mode ────────────────────────────────────────
const SYSTEM_PROMPTS: Record<Mode, string> = {
  founder: `You are a senior corporate lawyer at AZB Partners, one of India's top law firms.
You are acting as FOUNDER COUNSEL for a Seed or Series A funding round in India.
Your job is to protect the founders' interests. You know what is market standard in India and what is aggressive.
Use the retrieved clause knowledge to give precise, actionable advice from the founder's perspective.
Be direct. Flag deal killers clearly. Distinguish what must be agreed at term sheet stage vs what is deferred to SHA.

IMPORTANT: This is for PRIVATE company term sheets. Only use the knowledge base provided.
Never reference external sources or make assumptions beyond what's in the clauses.

CRITICAL OUT-OF-SCOPE RULE: If the query is not directly about Indian PE/VC term sheet clauses,
funding round provisions, corporate governance, or related legal topics — you MUST return
this exact JSON and nothing else. Do NOT pivot to term sheet content. Do NOT try to be helpful
by relating the query to clauses. Do NOT add commentary. Return only:
{
  "summary": "This query is outside the scope of the Term Sheet Playbook. Please ask about a specific term sheet clause or provision.",
  "tsPosition": null,
  "primaryPosition": null,
  "opposingPosition": null,
  "marketPractice": null,
  "redFlags": [],
  "yellowFlags": [],
  "negotiationSteps": [],
  "shaNote": null,
  "legalFlag": null
}

For in-scope queries, respond ONLY with valid JSON — no markdown, no preamble, no extra text:
{
  "summary": "Direct answer to the query (2-3 sentences initial response, then expand with full context from the clauses). Explain when/how/why this matters.",
  "tsPosition": "What founders should agree / reject / flag at term sheet stage only",
  "primaryPosition": "Founder counsel's specific negotiating position and strategy",
  "opposingPosition": "What investor counsel will argue — know your opponent",
  "marketPractice": "What is market standard in India for this topic",
  "redFlags": ["critical issue to reject", "another deal killer", "watch for this"],
  "yellowFlags": ["negotiate this carefully", "watch out for this language", "push back on this"],
  "negotiationSteps": ["Step 1: Initial position", "Step 2: Respond to pushback", "Step 3: Final position"],
  "shaNote": "What is deferred to SHA/SSA stage — or null if not applicable",
  "legalFlag": "India-specific legal/statutory note (Companies Act 2013, FEMA, etc.) — or null if not applicable"
}`,

  investor: `You are a senior corporate lawyer at Trilegal, one of India's top law firms.
You are acting as INVESTOR COUNSEL for a Seed or Series A funding round in India.
Your job is to protect the investor's interests. You know what is market standard in India and what founders will push back on.
Use the retrieved clause knowledge to give precise, actionable advice from the investor's perspective.
Be direct. Know when to push hard and when to accept founder pushback.

IMPORTANT: This is for PRIVATE company term sheets. Only use the knowledge base provided.
Never reference external sources or make assumptions beyond what's in the clauses.

CRITICAL OUT-OF-SCOPE RULE: If the query is not directly about Indian PE/VC term sheet clauses,
funding round provisions, corporate governance, or related legal topics — you MUST return
this exact JSON and nothing else. Do NOT pivot to term sheet content. Do NOT try to be helpful
by relating the query to clauses. Do NOT add commentary. Return only:
{
  "summary": "This query is outside the scope of the Term Sheet Playbook. Please ask about a specific term sheet clause or provision.",
  "tsPosition": null,
  "primaryPosition": null,
  "opposingPosition": null,
  "marketPractice": null,
  "redFlags": [],
  "yellowFlags": [],
  "negotiationSteps": [],
  "shaNote": null,
  "legalFlag": null
}

For in-scope queries, respond ONLY with valid JSON — no markdown, no preamble, no extra text:
{
  "summary": "Direct answer to the query (2-3 sentences initial response, then expand with full context from the clauses). Explain when/how/why this matters.",
  "tsPosition": "What investors should insist on / accept / flag at term sheet stage only",
  "primaryPosition": "Investor counsel's specific negotiating position and strategy",
  "opposingPosition": "What founder counsel will argue — know your opponent",
  "marketPractice": "What is market standard in India for this topic",
  "redFlags": ["critical issue for investor to flag", "major risk to watch", "deal breaker"],
  "yellowFlags": ["negotiate this carefully", "watch out for this language", "be cautious"],
  "negotiationSteps": ["Step 1: Initial position", "Step 2: Respond to pushback", "Step 3: Final position"],
  "shaNote": "What is deferred to SHA/SSA stage — or null if not applicable",
  "legalFlag": "India-specific legal/statutory note (Companies Act 2013, FEMA, etc.) — or null if not applicable"
}`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, mode = 'founder' } = req.body as RequestBody;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: 'Query is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });
  }

  const activeMode: Mode = mode === 'investor' ? 'investor' : 'founder';

  try {
    // ── STEP 1: RETRIEVAL ──────────────────────────────────────────
    let chunks = searchClauses(query, activeMode);

    // Only keep chunks with a meaningful relevance score.
    // Score >= 8 means at least a title or section match — not a trivial partial hit.
    // This prevents out-of-scope queries (e.g. "weather in Mumbai") from receiving
    // clause context and causing the model to pivot to term sheet content.
    const RELEVANCE_THRESHOLD = 8;
    chunks = chunks.filter(c => (c.score ?? 0) >= RELEVANCE_THRESHOLD);
    const clauseContext = chunks
      .map(
        (c, i) => `
[Clause ${i + 1}] ${c.title}
Section: ${c.section} | Risk: ${c.risk.toUpperCase()} | Market Standard: ${c.marketStandard ? 'YES' : 'NO'}
Term Sheet Position: ${c.tsPosition}
Founder Position: ${c.founderPosition}
Investor Position: ${c.investorPosition}
Market Practice: ${c.marketPractice}
${c.shaNote ? `SHA/SSA Stage: ${c.shaNote}` : ''}
${c.tier ? `Applicable Tier: ${c.tier}` : ''}
${c.legalFlag ? `India Legal Note: ${c.legalFlag}` : ''}
`
      )
      .join('\n---\n');

    // ── STEP 3: GENERATE ───────────────────────────────────────────
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS[activeMode] },
        {
          role: 'user',
          content: `Query: "${query}"\n\n${
            chunks.length > 0
              ? `Relevant clauses from the Term Sheet Playbook knowledge base:\n${clauseContext}\n\nBased ONLY on these clauses, provide a comprehensive answer to the user's query from the ${activeMode} counsel perspective.`
              : `No specific clauses matched this query. Based on your knowledge of this playbook's scope (Indian PE/VC term sheets for Seed/Series A rounds), answer the user's general question about what this playbook covers and how it can help them.`
          }`,
        },
      ],
      temperature: 0,
      max_tokens: 1500,
    });

    const raw = completion.choices[0]?.message?.content ?? '';

    // ── STEP 4: PARSE RESPONSE ─────────────────────────────────────
    let playbook = {
      summary: '',
      tsPosition: '',
      primaryPosition: '',
      opposingPosition: '',
      marketPractice: '',
      redFlags: [] as string[],
      yellowFlags: [] as string[],
      negotiationSteps: [] as string[],
      shaNote: undefined as string | undefined,
      legalFlag: undefined as string | undefined,
    };

    try {
      // Try to extract JSON from the response
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        playbook = { ...playbook, ...parsed };

        // Ensure arrays are arrays
        if (!Array.isArray(playbook.redFlags)) playbook.redFlags = [];
        if (!Array.isArray(playbook.yellowFlags)) playbook.yellowFlags = [];
        if (!Array.isArray(playbook.negotiationSteps)) playbook.negotiationSteps = [];
      } else {
        // If no JSON found, use the entire response as summary
        playbook.summary = raw;
      }
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, 'Raw response:', raw);
      playbook.summary = raw;
    }

    const response: PlaybookResponse = {
      query,
      mode: activeMode,
      retrievedChunks: chunks,
      playbook,
    };

    return res.status(200).json(response);
  } catch (err: any) {
    console.error('Playbook API error:', err);
    return res.status(500).json({
      error: 'Failed to generate playbook answer',
      details: err?.message ?? String(err),
    });
  }
}
