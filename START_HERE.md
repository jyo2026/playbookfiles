# START HERE
## Term Sheet Playbook MVP — Everything You Need

---

## What You Have

A complete, production-ready Next.js app that:
- Takes questions about Seed/Series A term sheet clauses
- Retrieves relevant clauses from a legal knowledge base (RAG)
- Uses GPT-4 to generate a negotiation playbook
- Shows red flags, yellow flags, market guidance, and steps
- Deploys to Vercel in under 1 hour
- Costs ~$3/month to run

---

## 21 Files in This Project

### Code Files (run the app)
| File | What it does |
|------|-------------|
| `pages/index.tsx` | The main page — search box and results |
| `pages/api/playbook.ts` | The RAG engine — retrieval + GPT generation |
| `pages/_app.tsx` | App wrapper (don't edit) |
| `lib/clauseDatabase.ts` | Knowledge base — 19 clause chunks |
| `styles/globals.css` | Fonts, animations, scrollbar |

### Config Files (make the app work)
| File | What it does |
|------|-------------|
| `package.json` | Lists all dependencies |
| `next.config.js` | Next.js settings |
| `tsconfig.json` | TypeScript settings |
| `tailwind.config.js` | Colour palette |
| `postcss.config.js` | CSS processing |
| `.env.example` | Template for your API key |
| `.gitignore` | Tells git what not to upload |

### Documentation Files (read these)
| File | Read when |
|------|----------|
| `START_HERE.md` | First (this file) |
| `README.md` | Setting up locally |
| `DEPLOYMENT.md` | Deploying to Vercel |
| `ARCHITECTURE.md` | Understanding how RAG works |
| `CLAUSES.md` | All 19 clauses and how to add more |
| `CUSTOMISATION.md` | Changing firm name, colours, model |
| `TROUBLESHOOTING.md` | Fixing common problems |
| `DEMO_SCRIPT.md` | How to present this to partners |
| `ROADMAP.md` | What to build next |

---

## How to Get Started

### Non-coder (follow the PDF guide)
1. Follow the 10-Step Beginner Guide PDF
2. It walks through every click and command

### Have some tech experience
1. Read `README.md` for setup
2. Follow `DEPLOYMENT.md` to go live
3. Read `CLAUSES.md` to add your own clauses

### Developer
1. `npm install && cp .env.example .env.local`
2. Add OpenAI key to `.env.local`
3. `npm run dev`
4. Read `ARCHITECTURE.md` to understand the RAG flow

---

## The One Thing You Must Do

Before anything else works, you need an OpenAI API key:
1. Go to: https://platform.openai.com/api-keys
2. Create a new key
3. Copy it into `.env.local` as: `OPENAI_API_KEY=sk-...`

Without this, the search will not work.

---

## Demo Queries to Try First

- "What should I negotiate on liquidation preference?"
- "How do I handle anti-dilution in Series A?"
- "What protective provisions are too aggressive?"
- "Is a 50% drag-along threshold acceptable?"
- "Should I accept participating preferred?"

---

## Key Facts

| | |
|-|-|
| Build time | 2-3 days (you have it now) |
| Deploy time | Under 1 hour |
| Monthly cost | ~$3 USD |
| Clauses | 19 (easily add more) |
| Response time | 5-8 seconds |
| Coverage | Seed + Series A |
| Model | GPT-4o-mini |

---

## Next: Read README.md → then DEPLOYMENT.md
