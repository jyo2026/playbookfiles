# Clause Reference Guide

## Top 6 Clauses: Investor vs Founder vs Market Standard

| # | Clause | Investor Wants | Founder Fights For | Market Standard |
|---|--------|---------------|-------------------|-----------------|
| 1 | Liquidation Preference | 1x Participating | 1x Non-Participating | **1x Non-Participating** |
| 2 | Anti-Dilution | Full Ratchet | Weighted Average | **Weighted Average** |
| 3 | Board Seat | Dedicated seat | Observer only | **Observer (Seed) / 1 seat (Series A)** |
| 4 | Protective Provisions | Broad veto (incl. hiring) | Veto on cap table/M&A only | **Narrow list, no hiring veto** |
| 5 | Pro-Rata Rights | Unlimited all rounds | No pro-rata | **Capped at Series B only** |
| 6 | Drag-Along Rights | 51% threshold | Supermajority 75%+ | **75% threshold** |

---

## Deal-Killers 🚨

Never accept these:
- **2x+ liquidation preference** — company must return double before founders see anything
- **Full ratchet anti-dilution** — one down-round can wipe founders out
- **Redemption rights** — time-bomb forcing a sale on investor's schedule
- **Participating preferred** — investor double-dips on exit proceeds
- **Drag-along at 51%** — investor can force sale without founder consent
- **Broad protective provisions** — veto on hiring/vendor contracts paralyses operations

---

## Yellow Flags ⚠️

Negotiate these:
- Pro-rata rights without expiry → cap at Series B
- Drag-along at 50-66% → push to 75%
- Monthly reporting → push for quarterly
- Audit rights with no notice → add 30-day notice + once/year limit
- Board seat + broad protective provisions together → push for one or the other

---

## Accept Without Pushback ✅

- 1x non-participating liquidation preference
- Weighted average anti-dilution
- Observer seat at Seed
- 1 board seat at Series A
- 4-year vesting / 1-year cliff for founders
- Quarterly information rights
- Automatic conversion at qualified IPO

---

## All Clauses in Knowledge Base

| ID | Type | Title | Risk |
|----|------|-------|------|
| lp-001 | Liquidation Preference | 1x Non-Participating | low |
| lp-002 | Liquidation Preference | 1x Participating | high |
| lp-003 | Liquidation Preference | 2x or Higher | critical |
| ad-001 | Anti-Dilution | Weighted Average | low |
| ad-002 | Anti-Dilution | Full Ratchet | critical |
| bs-001 | Board Representation | Observer Rights (Seed) | low |
| bs-002 | Board Representation | 1 Investor Seat (Series A) | medium |
| bs-003 | Board Representation | Multiple Seats / Board Control | critical |
| pp-001 | Protective Provisions | Standard List | medium |
| pp-002 | Protective Provisions | Broad / Aggressive | critical |
| pr-001 | Pro-Rata Rights | Capped at Series B | low |
| pr-002 | Pro-Rata Rights | Unlimited All Rounds | high |
| da-001 | Drag-Along Rights | 75% Threshold | low |
| da-002 | Drag-Along Rights | 50-51% Threshold | high |
| ir-001 | Information Rights | Quarterly Reporting | low |
| ir-002 | Information Rights | Monthly + Audit | medium |
| rr-001 | Redemption Rights | Present | critical |
| fv-001 | Founder Vesting | 4yr / 1yr cliff | low |
| cr-001 | Conversion Rights | Auto at IPO | low |

---

## Adding New Clauses

Edit `lib/clauseDatabase.ts` and add to the `clauseChunks` array:

```typescript
{
  id: 'new-001',
  clauseType: 'Your Clause Type',
  stage: 'Seed, Series A',
  title: 'Short descriptive title',
  content: 'Full legal explanation of what this clause does and the implications.',
  marketStandard: true, // or false
  risk: 'low', // low | medium | high | critical
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  negotiationTips: 'What a lawyer should do about this clause.',
}
```
