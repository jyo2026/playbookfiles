# Product Roadmap

## Version 1.0 — Current MVP ✅
- 33 term sheet clause chunks (Seed + Series A)
- Hybrid semantic + keyword retrieval (OpenAI embeddings, precomputed and committed, blended with keyword-relevance scoring)
- gpt-4o-mini generation
- Vercel deployment

---

## Version 1.1 — Quick Wins (1 week)
- [ ] Add firm name and logo to header
- [ ] Add Series B and Series C clauses
- [ ] Add "Export playbook as PDF" button
- [ ] Add clause browsing page (see all 33 clauses)
- [ ] Save query history in browser

---

## Version 1.2 — Retrieval Quality & Coverage (2 weeks)
- [ ] Calibrate similarity threshold and semantic/keyword blend weights against a real query test set
- [ ] Build out a small suite of edge-case test queries (paraphrased, compound, out-of-scope) to catch retrieval regressions
- [ ] Identify and fill coverage gaps in the clause database based on queries that return no match
- [ ] Handle ambiguous queries better (e.g. prompting for clarification when retrieval confidence is low)

---

## Version 2.0 — Multi-Firm Playbooks (1 month)
- [ ] User authentication (lawyers log in)
- [ ] Firm-specific knowledge bases
- [ ] "Firm A view vs Firm B view" comparison mode
- [ ] Custom clause upload (partners add their own precedents)
- [ ] Query audit trail for compliance

---

## Version 2.1 — India Fintech Specific (1 month)
- [ ] RBI regulatory carve-outs in anti-dilution clauses
- [ ] SEBI-related protective provision templates
- [ ] Forced consolidation scenarios (not a liquidation event)
- [ ] India-specific exit timeline assumptions (3-4 years)
- [ ] FDI and FEMA compliance flagging

---

## Version 3.0 — Client-Facing Product (3 months)
- [ ] Client portal: upload term sheet PDF → get red-flag report
- [ ] Automated term sheet comparison (your draft vs market standard)
- [ ] Deal benchmarking (how does this compare to 50 recent deals?)
- [ ] White-label version for other law firms
- [ ] API for integration with firm DMS (document management systems)

---

## Cost Projections

| Version | Monthly Cost | Notes |
|---------|-------------|-------|
| 1.0 MVP | $3 | 100 queries/month |
| 1.1 Quick wins | $3 | No new infra cost |
| 1.2 Retrieval tuning | $3 | No new infra cost — tuning existing pipeline, not adding a vector database |
| 2.0 Multi-firm | $100 | Authentication + more storage |
| 3.0 Client-facing | $300+ | Scale + compliance features |

Note: if the clause database grows substantially beyond its current size (hundreds+ chunks), moving from committed JSON embeddings to a hosted vector database (e.g. Supabase pgvector) may become worth the added infra cost. At 33 chunks, in-memory cosine similarity is fast enough that this isn't currently needed.
