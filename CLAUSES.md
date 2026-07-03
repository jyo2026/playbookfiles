# Clause Reference Guide

**Scope:** This playbook is grounded exclusively in Indian law — the Companies Act 2013, the Foreign Exchange Management (Non-Debt Instruments) Rules, 2019 (NDI Rules), FEMA, and CCI thresholds. All instruments referenced (CCPS, CCD, DPIIT-recognised convertible notes) are Indian FDI-compliant instruments. This guide does not reference SAFEs, US-style convertible notes, or other non-Indian security types — those instruments and their market conventions do not apply here.

---

## Top Clauses: Investor vs Founder vs Market Standard

| # | Clause | Investor Wants | Founder Fights For | Market Standard (India) |
|---|--------|---------------|-------------------|-----------------|
| 1 | Liquidation Preference | 1x Participating / "higher of" | 1x Non-Participating | **1x Non-Participating** |
| 2 | Anti-Dilution | Full Ratchet | Broad-Based Weighted Average | **Broad-Based Weighted Average** |
| 3 | Board Seat | Multiple seats / control | 1 seat (Series A) / Observer (Seed) | **Observer (Seed) / 1 seat, Lead Investor (Series A)** |
| 4 | Protective Provisions (AVM) | Broad veto incl. KMP hiring, capex, bank accounts | Structural matters only | **Narrow AVM — M&A, liquidation, debt threshold, cap table, share rights only** |
| 5 | Pre-Emptive Rights | Unlimited, all investors, all rounds | Lead/Majority only, capped by Series B | **Lead/Majority Investors, with standard carve-outs** |
| 6 | Drag-Along Rights | 50–51% threshold | 75%+ threshold | **75% threshold** |
| 7 | Redemption Rights | Present, time-bound | Absent entirely | **Absent — not market standard in India** |
| 8 | Founder Vesting | Full 4-year vest, no carveout | Liquidity carveout (Released Shares) | **4yr/1yr cliff; carveout standard at Series A+** |
| 9 | ROFO vs ROFR | ROFR over founder shares (matches third-party price at no upfront cost) | ROFO over founder shares (price floor set by founder, third parties stay incentivized to bid) | **Mechanic should be specified explicitly — "right of first refusal" is often used loosely for either; Company first, then Investors pro-rata, is the typical right-holder structure** |

---

## Deal-Killers 🚨

Never accept these without treating them as a fundamental signal about the investor relationship:

- **2x+ liquidation preference** — investor must recover double (or more) before founders see anything; converts equity into quasi-debt
- **Full ratchet anti-dilution** — one down-round, even a small bridge, can wipe out founder ownership entirely
- **Redemption rights** — forces a cash-drain or sale on the investor's schedule; for foreign investors this reclassifies the instrument from FDI equity to ECB, triggering a far more restrictive regulatory regime
- **1x Participating preferred / "higher of" liquidation construct** — investor double-dips: takes the 1x back, then also shares pro-rata in what's left
- **Board majority or 2+ investor seats at Series A** — hands over governance control even with minority economic ownership, especially when paired with broad AVM
- **Drag-along at 50–51% threshold** — allows a sale to be forced through without meaningful founder consent
- **Broad AVM covering operational matters** (KMP hiring/firing, bank account opening/closing, vendor contracts, capex/opex above a low threshold) — makes the company unoperatable without investor sign-off on routine decisions, and risks triggering FEMA "person in control" (NDI Rules 2019, Rule 23) or CCI "material influence" classification
- **Optionally convertible instruments for foreign investment** — not FDI-compliant, classified as debt under the ECB regime, and non-compliance carries FEMA compounding penalties of up to 3x the transaction amount

---

## Yellow Flags ⚠️

Negotiate rather than reject outright:

- Pre-emptive/mop-up rights without expiry or investor limit → restrict to Lead/Majority Investors, flag for renegotiation by Series B
- Drag-along at 52–74% → push to 75%
- AVM debt threshold set too low (e.g. ₹20L) → push to ₹1–2Cr so routine vendor advances don't require investor sign-off
- Board seat combined with broad AVM → push for one governance lever or the other, not both at maximum breadth
- Fall-away threshold on board/observer/AVM rights set too low (e.g. 5%) → push to 10–15% on a fully diluted basis
- Good Leaver/Bad Leaver definitions with unilateral investor discretion → narrow the definition and ensure vested shares are never clawed back
- Non-compete with undefined scope or duration → cap at 12 months post-departure with defined geography
- Founder lock-in with no fixed end date → cap at 3–4 years from closing with a longstop date
- Fixed IRR pricing on exit rights (put options) for domestic investors → acceptable as a negotiation point, but a FEMA violation if applied to foreign investors — fair-value pricing must govern the foreign leg
- ROFR held against the party more likely to be the seller (e.g., investor-held ROFR over founder shares) → the more onerous mechanic for that seller, since it deters third parties from bidding at all; push for ROFO instead, which gives the seller a price floor to shop with. If a ROFR is unavoidable, negotiate a "beat by X%" requirement rather than a bare match right

---

## Accept Without Pushback ✅

- 1x non-participating liquidation preference
- Broad-based weighted average anti-dilution (with ESOP pool included in the denominator)
- Observer rights at Seed (Lead/Majority Investors only, with fall-away)
- 1 board seat for Lead Investor at Series A
- Narrow AVM limited to structural decisions (M&A, liquidation, debt above threshold, cap table changes, share right variations)
- Drag-along at 75% threshold
- Tag-along rights (concept-level at term sheet stage)
- Quarterly information rights
- 4-year vesting / 1-year cliff for founders, with a liquidity carveout at Series A+
- Automatic conversion of preferred shares to equity at a Qualified IPO (provided the Qualified IPO definition is clean — size and exchange listing only, no IRR or valuation floor)
- CCPS or CCD as the FDI instrument, provided conversion price is fixed upfront and set at or above Fair Market Value at issuance

---

## All Clauses in Knowledge Base

| ID | Type | Title | Market Standard | Risk |
|----|------|-------|:---:|:---:|
| fv-carveout-001 | Founder Vesting | Founder Vesting with Liquidity Carveout | ✅ | medium |
| lp-001 | Liquidation Preference | 1x Non-Participating | ✅ | low |
| lp-002 | Liquidation Preference | 1x Participating / "Higher Of" Construct | ❌ | high |
| lp-003 | Liquidation Preference | 2x or Higher Liquidation Preference | ❌ | critical |
| ad-001 | Anti-Dilution | Broad-Based Weighted Average | ✅ | low |
| ad-002 | Anti-Dilution | Full Ratchet | ❌ | critical |
| bs-001 | Board Representation | Observer Rights (Lead/Majority, Seed) | ✅ | low |
| bs-002 | Board Representation | 1 Board Seat — Series A Lead Investor | ✅ | medium |
| bs-003 | Board Representation | Multiple Board Seats / Board Control | ❌ | critical |
| pp-001 | Protective Provisions (AVM) | Standard AVM — Structural Decisions Only | ✅ | medium |
| pp-002 | Protective Provisions (AVM) | Broad AVM — Operational Decisions | ❌ | critical |
| pp-003 | Protective Provisions (AVM) | Fall-Away Threshold on AVM Rights | ✅ | medium |
| pr-001 | Pre-Emptive Rights | Maintain Ownership % | ✅ | low |
| pr-002 | Pre-Emptive Rights | Mop-Up Rights — Unsubscribed Portion | ❌ | medium |
| da-001 | Drag-Along Rights | 75% Threshold | ✅ | low |
| da-002 | Drag-Along Rights | 50–51% Threshold | ❌ | high |
| ex-001 | Exit Rights | Exit Waterfall — Sequence Only at Term Sheet | ✅ | medium |
| ex-002 | Exit Rights | Put Option — Fair Value Pricing | ✅ | high |
| ex-003 | Exit Rights | Tag-Along — Concept Only at Term Sheet | ✅ | low |
| ex-004 | Exit Rights | Call Option — Defensive Mechanism | ✅ | medium |
| ex-005 | Exit Rights | ROFO vs ROFR — Transfer Restrictions | ✅ | medium |
| fv-001 | Founder Vesting | 4-Year / 1-Year Cliff | ✅ | low |
| fv-002 | Founder Vesting | Good Leaver / Bad Leaver | ✅ | high |
| ir-001 | Information Rights | Quarterly Reporting | ✅ | low |
| rr-001 | Redemption Rights | Redemption Rights (Deal Killer) | ❌ | critical |
| lk-001 | Founder Lock-In | Duration Must Be Capped | ✅ | high |
| lk-002 | Founder Lock-In | Non-Compete — Scope Must Be Defined | ✅ | high |
| st-001 | Statutory Thresholds | India Statutory Thresholds — Companies Act 2013 | ✅ | medium |
| avm-001 | AVM Schedule | Acceptable AVM Items — Structural Decisions | ✅ | low |
| avm-002 | AVM Schedule | Remove from AVM — Operational Decisions | ❌ | critical |
| avm-003 | AVM Schedule | Grey Area AVM Items — Narrow Before Accepting | ✅ | medium |
| dm-001 | Dematerialisation | Mandatory Dematerialisation — Private Companies (Non-Small) | ✅ | high |
| ci-001 | Convertible Instruments | FEMA / NDI Rules Compliance (CCPS, CCD, Convertible Notes) | ✅ | high |
| cr-001 | Conversion Rights | Automatic Conversion at Qualified IPO | ✅ | low |

---

## Governing Legal Framework

Every clause in the knowledge base is checked against, and cross-referenced to, the following Indian legal sources:

- **Companies Act 2013** — share classes and rights (Section 43), terms of allotment (Section 62), preference share issuance (Section 55 read with the Companies (Share Capital and Debentures) Rules 2014), statutory winding-up waterfall (Section 327), director appointments and board composition, dematerialisation requirements for non-small private companies
- **Foreign Exchange Management (Non-Debt Instruments) Rules, 2019 (NDI Rules)** — governs all foreign investment structuring, instrument eligibility (CCPS, CCD, DPIIT-recognised convertible notes), FMV-anchored pricing, and FC-GPR filing obligations via the RBI FIRMS portal
- **FEMA** and the **RBI ECB Master Direction** — govern the boundary between FDI-compliant equity instruments and debt (ECB) treatment; optionally convertible instruments fall outside FDI compliance and into this regime
- **CCI thresholds (2025)** — relevant to "material influence" and control classification where AVM or board rights extend into operational territory
- **SEBI ICDR Regulations 2018** — governs mandatory pre-IPO conversion of preferred shares to equity ahead of DRHP filing
- **Income Tax Act 1961** — Section 47(xb) treatment of CCPS-to-equity conversion at IPO as a non-taxable transfer

---

## Adding New Clauses

Edit `lib/clauseDatabase.ts` and add to the `clauseChunks` array:

```typescript
{
  id: 'new-001',
  clauseType: 'Your Clause Type',
  section: 'Section Name',
  stage: 'Seed, Series A',
  title: 'Short descriptive title',
  content: 'Full legal explanation of what this clause does and the implications.',
  tsPosition: 'What should be locked at term sheet stage vs deferred to the SHA.',
  founderPosition: 'The founder-side negotiating position.',
  investorPosition: 'The investor-side negotiating position.',
  marketPractice: 'What is actually standard in Indian VC deals for this clause.',
  marketStandard: true, // or false
  risk: 'low', // low | medium | high | critical
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  negotiationTips: 'What a lawyer should do about this clause.',
  legalFlag: 'Relevant Companies Act 2013 / NDI Rules / FEMA / CCI cross-references.',
}
```

All new clauses must be grounded in Indian law only. Do not introduce references to SAFEs, US-style convertible note conventions, Delaware law, or other non-Indian market practices.
