# Customisation Guide

## Change Your Firm Name

Open `pages/index.tsx`, find the header section (~line 100):
```tsx
<h1 className="...">Term Sheet Playbook</h1>
<p className="...">RAG-powered negotiation advisor</p>
```
Change these to your firm name.

---

## Add New Clauses

Open `lib/clauseDatabase.ts` and add to the `clauseChunks` array.
See `CLAUSES.md` for the full schema.

The more specific your clause content and keywords, the better the retrieval.

---

## Change the GPT Prompt

Open `pages/api/playbook.ts`, find `systemPrompt` (~line 15).
You can change the lawyer persona, firm name, tone, or output format.

---

## Change Colours

Open `tailwind.config.js`. The palette is:
```js
legal: {
  50:  '#f8fafd',  // lightest background
  100: '#e8f0f7',  // light background
  200: '#d4e4f0',  // borders
  300: '#b5d4e8',
  400: '#7fb3d5',
  500: '#4a90c2',  // accent blue
  600: '#2e5a8c',
  700: '#1e3a56',  // primary dark blue
  800: '#152a42',
  900: '#0f1f2e',  // darkest (header, footer)
}
```
Change any hex value to match your brand.

---

## Switch to a Different Model

Open `pages/api/playbook.ts`, find `model: 'gpt-4o-mini'`.

Options:
- `gpt-4o-mini` — fast, cheap (~$0.02/query)
- `gpt-4o` — smarter, more expensive (~$0.10/query)
- `gpt-4-turbo` — powerful, moderate cost

---

## Add More Demo Queries

Open `pages/index.tsx`, find `DEMO_QUERIES` array (~line 60):
```tsx
const DEMO_QUERIES = [
  'What should I negotiate on liquidation preference?',
  // add yours here
];
```

---

## Extend to Series B / Series C

1. Add `stage: 'Series B'` chunks in `clauseDatabase.ts`
2. Add relevant keywords (convertible notes, ratchets, full ratchet triggers at scale)
3. Demo queries will start returning the new clauses automatically

---

## Use Claude API Instead of OpenAI

Install Anthropic SDK:
```bash
npm install @anthropic-ai/sdk
```

In `pages/api/playbook.ts`, replace:
```ts
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const completion = await openai.chat.completions.create({ model: 'gpt-4o-mini', ... });
```
With:
```ts
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const msg = await client.messages.create({ model: 'claude-sonnet-4-6', ... });
```
Update `.env.example` to use `ANTHROPIC_API_KEY`.
