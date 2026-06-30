# Demo Script
## Presenting the Term Sheet Playbook to Partners (5 minutes)

---

### Opening (30 seconds)

> "I want to show you something we built in 2-3 days.
> It's a RAG-powered legal tech tool for term sheet negotiation.
> RAG means Retrieval-Augmented Generation — the AI retrieves relevant knowledge first, 
> then generates advice from that knowledge, rather than guessing from general training.
> Let me show you why that matters."

---

### Demo Query 1: Core feature (1 minute)

Type: **"What should I negotiate on liquidation preference?"**

Wait for results, then say:

> "Look at the top section — 'Retrieved Clauses'.
> These are the specific clauses our system matched to this question.
> You can see: 1x Non-Participating, 1x Participating, 2x preference.
> Each has a risk rating: LOW, HIGH, CRITICAL.
> Each shows whether it's market standard or not.
> This is the retrieval step — the AI didn't guess, it looked things up."

> "Now look at the Playbook below.
> The red flags section tells us: never accept participating preferred, never accept 2x.
> The yellow flags say: watch out for these specific scenarios.
> The steps tell us exactly what to say in the negotiation room."

> "A first-year associate just got the same output a 10-year partner would give."

---

### Demo Query 2: Red flags (1 minute)

Type: **"Should I accept participating preferred?"**

> "Watch the red flags section.
> The tool immediately flags this as a deal-killer.
> It even gives the financial model: on a $200M exit,
> participating preferred costs the founder $50M+ compared to non-participating.
> That's the kind of specific number that wins a negotiation."

---

### Demo Query 3: Show RAG transparency (1 minute)

Type: **"Is a 50% drag-along threshold acceptable?"**

Click to expand the retrieved clause cards.

> "This is what makes RAG different from just asking ChatGPT.
> You can see exactly which clauses were retrieved — drag-along 75%, drag-along 51%.
> The AI's answer is based on these specific documents, not its general training.
> In a law firm, this is like showing your work.
> Partners can audit the reasoning. Clients can trust the output."

---

### Closing (1 minute)

> "This is the MVP — 2-3 days of work, $3/month to run.
> We have 19 clauses in the knowledge base right now covering Seed and Series A.
> We can expand to Series B, Series C, fintech-specific clauses, firm-specific playbooks.
> We can add your firm's precedents directly into the knowledge base.
> And we can add authentication so only your lawyers can access it."

> "The question isn't whether we build this — it's what we build next."

---

### Questions You'll Get

**"How accurate is it?"**
> "It's only as accurate as the knowledge base we give it.
> That's the point — we control the knowledge base.
> We put in our firm's precedents, our market knowledge, our red flags.
> It becomes smarter the more we add."

**"Can clients use it?"**
> "Not yet — we'd add authentication first.
> But it could become a client-facing product:
> 'Upload your term sheet and get a red-flag report.'"

**"What does it cost?"**
> "$3/month right now. If 100 lawyers use it daily, maybe $200/month.
> Still cheaper than one hour of associate time."

**"Is it secure?"**
> "API key is stored securely in environment variables, never in the code.
> All queries go through our own server, not directly to OpenAI.
> For production: we'd add auth, audit logging, and data encryption."

---

### Key Numbers to Remember
- **Build time:** 2-3 days
- **Running cost:** ~$3/month
- **Clauses:** 19 (easily expandable)
- **Response time:** 5-8 seconds
- **Coverage:** Seed + Series A (expandable)
