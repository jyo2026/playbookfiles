# Product Roadmap

## Version 1.0 — Current MVP ✅
- 19 term sheet clause chunks (Seed + Series A)
- Keyword-based retrieval
- GPT-4o-mini generation
- Jurisphere blue UI
- Vercel deployment

---

## Version 1.1 — Quick Wins (1 week)
- [ ] Add firm name and logo to header
- [ ] Add Series B and Series C clauses
- [ ] Add "Export playbook as PDF" button
- [ ] Add clause browsing page (see all 19 clauses)
- [ ] Save query history in browser

---

## Version 1.2 — Better Search (2 weeks)
- [ ] Replace keyword scoring with OpenAI vector embeddings
- [ ] Add Supabase with pgvector for semantic search
- [ ] Improve retrieval accuracy significantly
- [ ] Handle ambiguous queries better

---

## Version 2.0 — Multi-Firm Playbooks (1 month)
- [ ] User authentication (lawyers log in)
- [ ] Firm-specific knowledge bases
- [ ] "AZB view vs Trilegal view" comparison mode
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
| 1.2 With Supabase | $30 | Supabase free tier + more queries |
| 2.0 Multi-firm | $100 | Authentication + more storage |
| 3.0 Client-facing | $300+ | Scale + compliance features |
