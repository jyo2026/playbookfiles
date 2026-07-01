// Term Sheet Clause Knowledge Base
// Each "chunk" is a unit of knowledge the RAG system retrieves
// UPDATED: v6 — legal positions corrected per Term Sheet Playbook v6
// v6 changes: lp-001 (Section 327 CA 2013 statutory override), pr-002 (statutory vs contractual AVM distinction),
// pp-002 (FEMA/CCI control — Section 2(87) removed), ex-002 (dual-track foreign/domestic put option drafting)
// Extra clauses from prior version retained with legal references updated to NDI Rules 2019 / CA 2013 / CCI 2025

export interface ClauseChunk {
  id: string;
  clauseType: string;
  section: string;
  stage: string;
  title: string;
  content: string;
  tsPosition: string;
  founderPosition: string;
  investorPosition: string;
  marketPractice: string;
  marketStandard: boolean;
  risk: 'low' | 'medium' | 'high' | 'critical';
  keywords: string[];
  negotiationTips: string;
  shaNote?: string;
  legalFlag?: string;
  fallAway?: boolean;
  tier?: string;
  practiceNote?: string;
  sampleClause?: string;
  score?: number;
  narrativeSummary?: string;
  sortOrder?: number;
  sectionRisk?: 'low' | 'medium' | 'high' | 'critical';
}

export const clauseChunks: ClauseChunk[] = [

  // ── FOUNDER VESTING WITH LIQUIDITY CARVEOUT (NEW - v7) ──────────
  {
    id: 'fv-carveout-001',
    clauseType: 'Founder Vesting',
    section: 'Founder Lock-In & Vesting',
    stage: 'Seed, Series A, Series B',
    title: 'Founder Vesting with Liquidity Carveout — Released vs Restricted Shares',
    content:
      'A liquidity carveout allows a portion of founder shares to be "Released Shares" (vested immediately at closing) while the remaining "Restricted Shares" vest over a standard schedule (e.g., 4 years with 1-year cliff). Example: 20% Released Shares vest immediately; 80% Restricted Shares vest quarterly over 4 years after 1-year cliff. This structure protects founder liquidity and downside risk while maintaining investor alignment through the vesting schedule. Released Shares can typically be sold without restriction (subject to lock-up or drag-along terms). Restricted Shares undergo standard vesting, clawback, and Good Leaver/Bad Leaver mechanics.',
    tsPosition:
      'Agree to include a carveout at term sheet stage. Specify the percentage to be released upfront (Seed: 5%, Series A: 10-20%, Series B: 15-25%, depending on deal commercials). Lock in Released vs Restricted split explicitly to avoid SHA-stage renegotiation.',
    founderPosition:
      'Push aggressively for a carveout for founder liquidity and downside protection. Seed-stage founders can ask for 5%; Series A founders should target 10-20% based on prior work and deal stage. Frame as: "I need some liquidity upfront; I\'m not comfortable with 100% of my shares under a 4-year cliff." Emphasize that carveouts are market-standard and expected at Series A+. If investor resists, propose phased carveout (e.g., 10% now, 5% after Series B).',
    investorPosition:
      'Resist or negotiate carveouts down. Argue that full vesting aligns founder incentives with investor returns. If forced to accept, cap the carveout: Series A = max 10-15%, Series B = max 20%. Add conditions: (1) Released Shares are still subject to drag-along and lock-up clauses; (2) if founder leaves within 1 year, Released Shares are subject to clawback or repurchase at nominal value; (3) Good Leaver/Bad Leaver mechanics still apply to Released Shares on departure.',
    marketPractice:
      'Founder vesting carveouts are market-standard at Series A and later stages in India. Seed-stage founders rarely have leverage for large carveouts, but 5% is reasonable. Series A founders typically secure 10-20% carveouts, especially if they have prior exits or strong commercial traction. The exact percentage is deal-specific and depends on founder bargaining power, stage, and investor appetite.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['vesting', 'carveout', 'released shares', 'restricted shares', 'founder liquidity', 'cliff', '4-year', 'founder protection'],
    negotiationTips:
      'Lead with liquidity and downside protection rationale. Emphasize this is standard at Series A+. Show comps from your market (if possible). If investor refuses, propose: (1) smaller carveout now (10%), (2) additional carveout upon Series B, (3) accelerated vesting on acquisition (e.g., if exit >3x, all shares accelerate). Get founder counsel to draft the "Released vs Restricted" language in the term sheet — this prevents SHA-stage re-negotiation.',
    shaNote:
      'Released vs Restricted mechanics, Good Leaver/Bad Leaver definitions, clawback triggers, and acceleration events are all detailed in the SHA. Term sheet must lock the carveout percentage and Released Shares upfront. Do not defer to SHA. Also clarify: (1) Can released shares be sold in secondary markets? (2) Are released shares subject to lock-up agreements? (3) Do released shares participate in drag-along rights? Answer these at term sheet stage.',
    legalFlag:
      'Vesting structures are governed by Companies Act 2013 Section 43 (share classes and rights) and Section 62(1)(d) (terms of share allotment). The Articles of Association must explicitly authorize both Released and Restricted share classes, including vesting schedules, clawback mechanics, and acceleration triggers. Released Shares are typically ordinary equity; Restricted Shares may be conditional equity (contingent on vesting). For foreign investors, ensure the carveout structure complies with FEMA NDI Rules 2019 — the Released/Restricted distinction must not create an "assured return" element that triggers FEMA reclassification. Clawback on Bad Leaver departure (e.g., at nominal value) must be authorized in the AOA.',
    tier: 'Series A, Series B (less common at Seed unless founder has significant leverage)',
  },

  // ── LIQUIDATION PREFERENCE ──────────────────────────────────────
  {
    id: 'lp-001',
    clauseType: 'Liquidation Preference',
    section: 'Liquidation Preference',
    stage: 'Seed, Series A',
    title: '1x Non-Participating (Market Standard)',
    content:
      'Investor receives 1x their investment first on a Deemed Liquidation Event (M&A, asset sale). After recovery, ALL remaining proceeds go to common shareholders (founders) on a pro-rata basis. No double-dipping. Example: ₹200Cr exit, ₹20Cr invested → investor gets ₹20Cr, founders split ₹180Cr. Contrasted with participating preferred, where investor takes ₹20Cr first and then also participates pro-rata in the ₹180Cr.',
    tsPosition:
      'Agree concept at term sheet stage. Specify "non-participating" explicitly — do not leave it as "1x liquidation preference" without that qualifier, as it creates SHA-stage ambiguity that always resolves in the investor\'s favour.',
    founderPosition:
      'Push for 1x non-participating only. Remove any "higher of (a) 1x or (b) pro-rata" language — that formulation is participating preferred in disguise. This is the single most important economic term in the term sheet.',
    investorPosition:
      'Push for 1x participating or "higher of" construct to preserve upside on low-multiple exits. 1x non-participating is the acceptable fallback at Series A where deal competition exists.',
    marketPractice:
      '1x non-participating is market standard for Series A in India. Participating preferred is rare and increasingly absent from clean deals. Most institutional Indian VCs (Sequoia India, Accel, Lightspeed) use non-participating.',
    marketStandard: true,
    risk: 'low',
    keywords: ['liquidation', 'preference', 'non-participating', 'exit', 'payout', 'waterfall', '1x', 'deemed liquidation'],
    negotiationTips:
      'This is market standard — hold the line firmly. If investor pushes for participating preferred, walk through the numbers: on a typical 3–5x India exit, participating preferred cuts founder proceeds by 25–40%. That arithmetic usually ends the conversation.',
    shaNote:
      'Waterfall mechanics, conversion triggers, and Deemed Liquidation Event definitions are detailed in the SHA. Term sheet must lock "non-participating" explicitly to prevent SHA-stage drift.',
    legalFlag:
      'Liquidation preference is a contractually agreed waterfall for Deemed Liquidation Events (M&A, asset sale) and operates as agreed between parties. However, it cannot override the mandatory statutory preferential payments under Section 327 of the Companies Act 2013 in a formal winding-up or insolvency proceeding. Section 327 creates a fixed statutory waterfall: (1) Workmen\'s dues; (2) Taxes; (3) Secured creditors; (4) Unsecured creditors; (5) Shareholders. In an M&A exit, the contractual liquidation preference applies. In a true insolvency, the Section 327 statutory waterfall applies and preferred shareholders rank as ordinary shareholders — not as creditors. Liquidation preference protects value in strategic exits; it does not provide an absolute guarantee in insolvency.',
    tier: 'All investor tiers. Waterfall: Lead → Majority → Other → Founders.',
    sortOrder: 1,
    sectionRisk: 'high',
    narrativeSummary:
      'When a company is sold, wound up, or undergoes a merger, investors don\'t automatically share proceeds equally with founders. A liquidation preference clause determines who gets paid first, and how much, before the remaining money is split among all shareholders. In India, the standard position is a 1x non-participating preference: the investor recovers their investment amount first, and then steps aside entirely — everything left over goes to founders and other common shareholders on a pro-rata basis, with no further claim from the investor. This is considered fair because it protects the investor\'s downside without cutting into the founders\' upside. Where this clause becomes problematic is when investors push for "participating" preference, or a "higher of 1x or pro-rata" formulation — both of which let the investor recover their 1x and then also take a share of what remains, effectively double-dipping. It gets worse if the multiple climbs above 1x: a 2x preference means the investor must recover twice their investment before founders see anything, which on a modest exit can leave founders with nothing at all. The standard market response is to hold firmly at 1x non-participating, push back hard on any participating language, and treat anything above 1x as a signal that the investor doesn\'t believe in the business and is seeking debt-like protection through an equity instrument.',
    sampleClause:
      '7.1 Liquidation Preference. In the event of any liquidation, dissolution, winding up or Deemed Liquidation Event, the Investor shall be entitled to receive, in preference to the holders of Equity Shares, an amount per Preference Share equal to [1x] times the Original Issue Price for such Preference Share, prior to and in preference to any distribution to the holders of Equity Shares. Following such payment, the remaining proceeds, if any, shall be distributed to the holders of Equity Shares on an as-converted, pro rata basis, and the Investor shall not be entitled to any further distribution in respect of such Preference Shares.',
  },
  {
    id: 'lp-002',
    clauseType: 'Liquidation Preference',
    section: 'Liquidation Preference',
    stage: 'Seed, Series A',
    title: '1x Participating / "Higher Of" Construct',
    content:
      'Investor gets 1x back first, then also participates in remaining proceeds at their ownership percentage — double-dipping on exit. The "higher of (a) 1x or (b) pro-rata" formulation is functionally identical: on any exit where pro-rata exceeds 1x (i.e., almost all meaningful exits), the investor takes both. Example: ₹200Cr exit, ₹20Cr at ₹70Cr post (28.6% ownership) → Investor takes ₹20Cr + 28.6% of ₹180Cr = ₹71.4Cr. Founder loses ₹50Cr+ versus non-participating.',
    tsPosition:
      'Participating preferred or "higher of" construct typically appears in investor-drafted term sheets as the opening position. Founders will push back hard at term sheet stage. Investor counsel should decide upfront whether this is a genuine requirement or a negotiating anchor — conceding it in exchange for a participation cap is a common resolution.',
    founderPosition:
      'Reject. The "higher of (a) 1x or (b) pro-rata" formulation is participating preferred in disguise. Investor double-dips on exit. Push for clean 1x non-participating with no qualification.',
    investorPosition:
      'Argue this is fair on modest exits where pro-rata exceeds 1x — investor only takes what they would have received anyway. Frame as an investor-friendly floor, not a windfall.',
    marketPractice:
      'Non-standard. Increasingly rare in clean Indian Series A deals. Most reputable VC term sheet templates from IVCA use non-participating as the baseline.',
    marketStandard: false,
    risk: 'high',
    keywords: ['participating', 'double dip', 'liquidation', 'higher of', 'investor friendly', 'preferred', 'aggressive'],
    negotiationTips:
      '🚨 Fight this hard. On a typical 3–5x exit (most common in India), participating preferred can cut founder proceeds by 30–40%. If investor insists, propose a participation cap: investor stops participating once they have received 2x–3x total return, then converts to common pro-rata.',
    shaNote:
      'If forced to accept participating preferred, negotiate a participation cap in the SHA. Investor stops participating once they have received a defined return multiple (2x or 3x). Cap converts remaining participation to common.',
    legalFlag:
      'Participating preference shares require specific drafting under Companies Act 2013 Section 43 (kinds of share capital) and Section 55 read with Rule 9 of the Companies (Share Capital and Debentures) Rules 2014, which is the operative provision governing the issue of preference shares including participation rights. The Articles of Association must be amended to reflect the exact participation mechanics. For foreign investors, the participation structure must comply with NDI Rules 2019 — any instrument with assured return elements may be reclassified.',
    sampleClause:
      'The investor shall be entitled to receive, prior to and in preference to any distribution of the proceeds of the Liquidity Event to any other Shareholders, the higher of (a) an amount equal to 1X of the amounts invested by the investor; and (b) the investor\'s pro rata entitlement on an as if converted basis.',
  },
  {
    id: 'lp-003',
    clauseType: 'Liquidation Preference',
    section: 'Liquidation Preference',
    stage: 'Series A',
    title: '2x or Higher Liquidation Preference',
    content:
      'Investor receives 2x (or more) their investment before any other shareholder sees proceeds. On a ₹20Cr investment, investor needs ₹40Cr returned before founders receive a rupee. On any flat or modest exit — which describes the majority of Indian VC outcomes — founders receive nothing. 2x liquidation preferences effectively convert equity into expensive quasi-debt.',
    tsPosition:
      'A 2x+ liquidation preference is a significant opening position that well-advised founders will reject outright. Investor counsel should assess whether this is a genuine downside protection requirement or a negotiating anchor — in competitive deals it is almost always conceded. In distressed or pre-revenue scenarios it may be defensible but must be non-participating.',
    founderPosition:
      'Walk away. 1x is the absolute ceiling. Even 1.5x should be flagged and challenged. 2x+ signals the investor does not believe in the business and is seeking debt-like returns through an equity instrument.',
    investorPosition:
      'May appear in distressed or pre-revenue deals as downside protection. If used, must be non-participating — 2x participating is entirely unacceptable in any market.',
    marketPractice:
      'Not market standard. 2x+ liquidation preference is essentially absent from legitimate Indian VC deals at Seed or Series A. It appears only in distressed bridge financing or punitive rescue rounds.',
    marketStandard: false,
    risk: 'critical',
    keywords: ['2x', '3x', 'multiple', 'liquidation', 'preference', 'deal killer', 'distress', 'punitive'],
    negotiationTips:
      '🚨 DEAL KILLER. 1x is the absolute market maximum. Do not accept under any circumstances. If investor insists, treat it as a fundamental signal about the relationship and walk.',
    legalFlag:
      'High liquidation multiples on preference shares may be challenged under Companies Act 2013 provisions on preference share capital. Seek specific legal opinion on enforceability. For foreign investors, NDI Rules 2019 require that instruments qualifying as FDI equity cannot carry assured return features — a 2x+ liquidation preference that operates as an assured return may trigger ECB reclassification.',
  },

  // ── ANTI-DILUTION ───────────────────────────────────────────────
  {
    id: 'ad-001',
    clauseType: 'Anti-Dilution',
    section: 'Anti-Dilution',
    stage: 'Seed, Series A',
    title: 'Broad-Based Weighted Average Anti-Dilution',
    content:
      'If a future round is priced below the current round (down-round), investor receives additional shares. The adjustment formula uses a weighted average that includes ALL outstanding shares — common, preferred, ESOP pool, and convertibles. "Broad-based" refers to the size of this denominator. A larger denominator produces a smaller adjustment, making it relatively founder-friendly compared to narrow-based weighted average.',
    tsPosition:
      'Accept concept at term sheet stage. Specify "broad-based" explicitly — do not leave it as "weighted average" alone. Ambiguity at term sheet stage invariably resolves in the investor\'s favour at SHA stage.',
    founderPosition:
      'Insist on broad-based. The denominator must include all fully diluted shares: common + preferred + ESOP + convertibles. Flag immediately if term sheet says only "weighted average" without specifying — demand broad-based language before signing.',
    investorPosition:
      'Prefer narrow-based (smaller denominator = larger adjustment per share = better downside protection). Will attempt to exclude ESOP pool from denominator. Broad-based is the acceptable compromise.',
    marketPractice:
      'Broad-based weighted average is market standard in India for Seed and Series A. Narrow-based and full ratchet are both non-standard and should be resisted.',
    marketStandard: true,
    risk: 'low',
    keywords: ['anti-dilution', 'weighted average', 'broad-based', 'down round', 'protection', 'ESOP', 'denominator'],
    negotiationTips:
      'Accept broad-based weighted average without major pushback — it is market standard. Your key job is ensuring "broad-based" is explicit in the term sheet. If the investor tries to exclude ESOP from the denominator, push back: ESOP exclusion functionally converts it to narrow-based.',
    shaNote:
      'The precise weighted average formula — including exact definition of the denominator — must be set out in the SHA. Anti-dilution carve-outs (ESOP grants, conversions, regulatory issuances) also negotiated at SHA stage.',
    legalFlag:
      'Anti-dilution adjustments require a corresponding resolution to issue additional shares and an amendment to the SHA. Under NDI Rules 2019, any CCPS or CCD conversion price adjustment must still result in a conversion price at or above Fair Market Value at the date of original issuance — anti-dilution adjustments cannot push the effective conversion price below FMV at issuance for foreign investors.',
    fallAway: true,
    tier: 'Lead and Majority Investors holding preferred shares.',
    sortOrder: 2,
    sectionRisk: 'critical',
    narrativeSummary:
      'If a future funding round is priced lower than the current one — a "down round" — anti-dilution protection compensates the investor for the loss in value by giving them additional shares. The standard mechanism in India is broad-based weighted average: the adjustment is calculated using a formula that includes all outstanding shares, common, preferred, ESOP pool, and convertibles, in the denominator. The larger this denominator, the smaller the adjustment, which makes broad-based weighted average relatively founder-friendly compared to the alternatives. This protection is reasonable and expected by virtually every institutional investor, so it isn\'t usually a major negotiating battle on its own. Where it becomes problematic is in the details: investors sometimes try to exclude the ESOP pool from the denominator, which functionally narrows the formula and increases the dilution hit on founders, or push for "full ratchet" anti-dilution instead, which reprices the investor\'s entire holding to match the lowest price in any future round regardless of size — a mechanism that can wipe out founder ownership after even a small bridge round. The right approach is to insist explicitly on "broad-based" language rather than leaving it as generic "weighted average," confirm the ESOP pool is included in the denominator, and reject full ratchet outright as a non-starter.',
    sampleClause:
      'Notwithstanding anything, in the event Company issues any Equity Securities at a price lower than the Subscription Price and/or the Conversion Price, the Subscriber shall be entitled to the same adjustment mechanism as provided to holders of preferred shares in the Subsequent Financing Round, to protect its investment in CCPS.',
  },
  {
    id: 'ad-002',
    clauseType: 'Anti-Dilution',
    section: 'Anti-Dilution',
    stage: 'Seed, Series A',
    title: 'Full Ratchet Anti-Dilution',
    content:
      'If any future share is issued at a lower price, the investor\'s entire holding is retroactively repriced to that lower price — regardless of the size or nature of the down-round. Example: Series A at ₹70Cr post, investor at 28.6%. Series B bridge at ₹40Cr post (even if only ₹50L raised). Full ratchet reprices entire Series A holding. Investor ownership could jump from 28.6% to 50%+. Founder is crushed even if the company ultimately succeeds.',
    tsPosition:
      'Full ratchet is rarely deployed in legitimate deals and is almost universally rejected by well-advised founders. Investor counsel should treat it as a theoretical maximum position only — using it as a genuine ask in a competitive deal signals distrust and will likely kill the negotiation. Broad-based weighted average is the realistic ceiling.',
    founderPosition:
      'Non-negotiable rejection. One down-round — even a small bridge at a modest discount — can wipe out founder ownership entirely. This is never acceptable regardless of how it is framed.',
    investorPosition:
      'Rarely deployed in legitimate deals. Signals distrust of management. Use only as a bargaining chip — not as a genuine ask in a competitive deal.',
    marketPractice:
      'Not used in legitimate Series A deals in India. Occasionally appears in distressed bridge financing or predatory deals. Its presence is a signal about the investor, not the company.',
    marketStandard: false,
    risk: 'critical',
    keywords: ['full ratchet', 'down round', 'catastrophic', 'dilution', 'deal killer', 'ratchet', 'non-standard'],
    negotiationTips:
      '🚨 Reject on first presentation. Full ratchet is a deal killer under all circumstances. If an investor insists on it after being told the market standard, treat it as a fundamental red flag about their intentions.',
    legalFlag:
      'Full ratchet anti-dilution adjustments require shareholder approval to issue additional shares and Articles of Association amendments under Companies Act 2013. For foreign investors, any conversion price adjustment under NDI Rules 2019 must still result in conversion at or above FMV at issuance date — full ratchet adjustments pushing below FMV are non-compliant for CCPS/CCD instruments.',
  },

  // ── BOARD REPRESENTATION ────────────────────────────────────────
  {
    id: 'bs-001',
    clauseType: 'Board Representation',
    section: 'Board Representation',
    stage: 'Seed',
    title: 'Observer Rights — Lead/Majority Investors Only',
    content:
      'Investor attends board meetings and receives all board materials but has no voting rights. Founder retains full operational and governance control. Standard for Seed rounds where giving a board seat to every early investor is impractical. Observer rights fall away once investor drops below a defined shareholding threshold.',
    tsPosition:
      'Agree concept at term sheet stage. Specify which tier gets observer rights. Observer rights for Lead/Majority only — Other Investors receive information rights only. Insist fall-away threshold is referenced in term sheet even if mechanics are in SHA.',
    founderPosition:
      'Observer rights only for Lead/Majority Investors. Other Investors: information rights only. Insist fall-away threshold is referenced in term sheet even if details are in the SHA. This prevents all-investor observer rights creeping in at SHA stage.',
    investorPosition:
      'Observer rights for all investors above a minimum ticket size. Resist fall-away or push for a very low threshold. Observer rights at Seed often convert to a full board seat ask at Series A.',
    marketPractice:
      'Observer rights (no voting) for Lead Investor is the clear market standard at Seed. Full board seats at Seed are rare. 1 board seat for Lead Investor is standard at Series A.',
    marketStandard: true,
    risk: 'low',
    keywords: ['board', 'observer', 'seed', 'governance', 'fall-away', 'non-voting', 'information rights'],
    negotiationTips:
      'Accept observer rights at Seed without pushback — it is completely standard. Focus negotiation on (1) limiting observer rights to Lead/Majority only, and (2) ensuring a fall-away threshold is referenced at term sheet stage.',
    shaNote:
      'Fall-away threshold percentage, mechanics, and conversion to board seat at Series A are negotiated in the SHA. Observer rights should specify: attend all board meetings, receive all materials, speak but not vote.',
    legalFlag:
      'Observer rights are contractual — not statutory — and must be documented in the SHA. Board composition and director appointments are governed by Companies Act 2013. Foreign investor nominees may require additional FEMA compliance depending on investor domicile.',
    fallAway: true,
    tier: 'Lead Investor: board seat (Series A) or observer (Seed). Majority: observer with fall-away. Other: information rights only.',
  },
  {
    id: 'bs-002',
    clauseType: 'Board Representation',
    section: 'Board Representation',
    stage: 'Series A',
    title: '1 Board Seat — Series A Lead Investor',
    content:
      'Lead Investor gets one full board director seat with voting rights at Series A. Standard and reasonable. Typical board composition becomes: 2 founder directors + 1 investor director + 1 independent director. Concern arises if combined with broad AVM (affirmative voting matters) — investor then has both board vote AND veto rights simultaneously, which is market non-standard.',
    tsPosition:
      'Agree 1 seat for Lead Investor. Specify fall-away threshold concept in term sheet — do not leave it silent.',
    founderPosition:
      'Accept 1 seat. Push fall-away threshold to 10–15% (not 5%). Board seat should not be transferable on a secondary sale of investor shares. If investor has broad AVM as well as a board seat, push back on AVM scope — one or the other provides sufficient governance, not both at maximum breadth.',
    investorPosition:
      'A full board seat at Series A is the minimum acceptable. Push for low fall-away threshold (5%) and transferability to affiliates.',
    marketPractice:
      '1 board seat for Lead Investor at Series A is market standard in India. The standard board structure is 2 founders + 1 investor + 1 independent.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['board seat', 'director', 'series A', 'governance', 'voting rights', 'nomination', 'fall-away'],
    negotiationTips:
      'Accept 1 board seat at Series A — it is market standard. The two negotiation levers are (1) fall-away threshold — push for 10–15%, not 5%; and (2) transferability — the seat should not be transferable on a secondary share sale to a third party.',
    shaNote:
      'Fall-away %, transfer restrictions, observer mechanics, and board composition are detailed in the SHA. Include: removal of nominee director, replacement rights, and quorum requirements.',
    legalFlag:
      'Director appointments require filing with MCA within 30 days of appointment. Foreign investor nominees may require additional compliance under NDI Rules 2019 and FEMA. Board composition must comply with Companies Act 2013 — independent director requirements apply once paid-up capital or turnover thresholds are met.',
    fallAway: true,
    tier: 'Lead Investor only. Board seat right falls away when investor shareholding drops below agreed threshold (negotiate 10–15% fully diluted).',
    sortOrder: 3,
    sectionRisk: 'critical',
    narrativeSummary:
      'Board representation determines who sits on the company\'s board and gets a formal vote on its direction. At Series A, it\'s standard and reasonable for the Lead Investor to receive one full director seat with voting rights — the typical board composition becomes two founder directors, one investor director, and often one independent director. This is considered fair because the investor is putting in significant capital and a single seat gives them visibility and influence without giving them control. Where this becomes problematic is when an investor pushes for two or more seats, or for board majority, since that can hand over effective governance control even when the investor\'s economic ownership is still a minority stake — and the risk compounds if the same investor also holds broad affirmative voting rights, giving them both a board vote and a veto simultaneously. The other detail worth negotiating is the fall-away threshold: the board seat right should lapse once the investor\'s shareholding drops below an agreed percentage, typically 10–15% on a fully diluted basis, rather than persisting indefinitely as the investor gets diluted in later rounds. The standard response is to accept one seat for the Lead Investor, resist any push for additional seats or board control, and make sure the fall-away threshold and seat transferability are addressed early rather than left open.',
    sampleClause:
      'Composition of the Board: 4.1.1 The Company shall be managed by the Board who shall have powers to do all acts and take all actions that the Company is authorized to do, subject to those matters that are statutorily required under the Act to be approved by the Shareholders, and which shall be referred for approval by the Shareholders. 4.1.2 On and from the Effective Date and unless amended in accordance with the terms of this Agreement and the Act, the Board shall comprise of upto 3 (three) Directors such that the composition of the Board shall be: 4.1.2.1 2 (two) Directors who shall be the Founders themselves (collectively the "Founder Directors"); and 4.1.2.2 1 (one) Director nominated by the Lead Investor ("Lead Investor Director"). 4.1.3 A Director shall not be required to hold any qualification shares.',
  },
  {
    id: 'bs-003',
    clauseType: 'Board Representation',
    section: 'Board Representation',
    stage: 'Series A',
    title: 'Multiple Board Seats or Board Control',
    content:
      'Investor demands 2+ board seats or a majority of board seats, giving effective governance control at Series A. Even with minority economic ownership, board majority allows the investor to override founders on all director-level decisions. When combined with broad AVM, this creates near-total investor control.',
    tsPosition:
      'Multiple board seats are very difficult to achieve with well-advised founders at Series A and will face strong resistance. Investor counsel should assess whether board control is a genuine requirement — it is only realistic in distressed, sole-investor, or turnaround scenarios. In a standard Series A, 1 board seat is the achievable position; enhanced information rights can be offered as a compromise.',
    founderPosition:
      'Do not accept. 1 seat is market standard. Multiple board seats signal an investor who is seeking operational control, not just downside protection. Offer enhanced information rights (monthly calls, detailed reporting) instead.',
    investorPosition:
      'Multiple board seats provide maximum governance control but are very difficult to achieve with well-advised founders at Series A. Only realistic in distressed or sole-investor situations.',
    marketPractice:
      'Multiple investor board seats at Series A are not market standard in India. 1 investor seat on a 4-person board is the norm.',
    marketStandard: false,
    risk: 'critical',
    keywords: ['board control', 'majority', 'multiple seats', 'governance', 'control', 'aggressive', 'non-standard'],
    negotiationTips:
      '🚨 Do not accept. 1 seat is market standard. If investor needs more visibility, offer enhanced information rights — not additional board seats. Board majority at Series A fundamentally changes the founder-investor power balance.',
    legalFlag:
      'Board control by investors may trigger change of control provisions in existing material contracts and licenses. Check all material agreements. Under NDI Rules 2019 Rule 23, investor control of board composition may constitute "person in control" for FEMA purposes, potentially triggering downstream investment restrictions.',
  },

  // ── PROTECTIVE PROVISIONS / AVM ──────────────────────────────────
  {
    id: 'pp-001',
    clauseType: 'Protective Provisions',
    section: 'AVM',
    stage: 'Seed, Series A',
    title: 'Standard AVM — Structural Decisions Only',
    content:
      'Investor veto (affirmative vote) rights limited to structural decisions: (1) M&A or merger, (2) liquidation or wind-down, (3) new debt above defined threshold, (4) cap table changes or new share issuances, (5) variation of share rights. Does NOT include hiring, vendor contracts, compensation, budget decisions, or day-to-day operations. An AVM schedule (Annexure) must be attached to the term sheet before signing.',
    tsPosition:
      'Agree concept. Annexure must be attached before signing — do not agree to AVM "to be agreed at SHA stage" without a list in the term sheet.',
    founderPosition:
      'AVM limited to: M&A, liquidation, debt above threshold, cap table changes, share right variations. No operational matters. AVM rights vest in Lead/Majority Investors only. Fall-away applies. Push debt threshold to INR 1–2Cr minimum — INR 20L is operationally unworkable.',
    investorPosition:
      'Push for broad AVM including KMP hiring/firing, compensation above 10%, budget variations, and strategic alliances as opening position. Standard AVM is the fallback.',
    marketPractice:
      'Narrow AVM covering structural decisions only is market standard in India. Broad operational AVM is aggressive and signals an investor seeking management control, not downside protection.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['protective provisions', 'AVM', 'veto', 'structural', 'M&A', 'debt threshold', 'cap table', 'affirmative voting'],
    negotiationTips:
      'Focus negotiation on two things: (1) ensure the Annexure is attached to the term sheet itself — do not leave AVM to SHA; and (2) push debt threshold to INR 1–2Cr. INR 20L means you cannot take a routine vendor advance without investor consent.',
    shaNote:
      'Full AVM schedule is documented in the SHA. Fall-away threshold applies to AVM rights. The term sheet list is the ceiling — investors sometimes try to expand at SHA stage. Hold the line on the agreed list.',
    legalFlag:
      'Veto rights on share issuances must be consistent with Companies Act 2013 provisions. Debt thresholds should be in INR. AVM that gives investor de facto management control may affect FEMA and CCI characterisation — see [pp-002] legal flag for detail.',
    fallAway: true,
    tier: 'Lead and Majority Investors only. Subject to fall-away.',
    sortOrder: 4,
    sectionRisk: 'high',
    narrativeSummary:
      'Affirmative Vote Matters — also called protective provisions or investor veto rights — are a list of specific company decisions that cannot be taken without the investor\'s prior written consent, regardless of what the founders or the board want. In a well-drafted deal, this list covers only major structural events: selling the company, winding it down, issuing new shares, taking on significant debt, or changing the core business. These are decisions that could fundamentally affect the investor\'s return, so requiring their sign-off is reasonable. Where this clause becomes problematic is when investors try to expand the list to include operational decisions — hiring senior employees, approving the annual budget, or signing vendor contracts above a small threshold. A company that needs investor approval to hire a CFO or sign a ₹1 crore vendor contract cannot operate at the speed that startups require. The standard response is to always negotiate a matching exclusion list alongside the AVM list, and insist that AVM rights lapse, or "fall away," if the investor\'s shareholding drops below an agreed threshold.',
    sampleClause:
      'Notwithstanding any other provision of this Agreement, no matter listed in Schedule [Y] to this Agreement ("Affirmative Vote Matters") shall be proposed at a meeting of the Board or Shareholders\' or any meeting of a committee or subcommittee of the Board or by resolution by circulation in the Company without prior consent of the Lead Investor (written or through electronic mode) having been obtained. However, upon receipt of such prior consent, the resolution in relation to the Affirmative Vote Matters can only be passed in the manner consented to by the Lead Investor without any alterations, deletions or additions thereof. [X].2 The Parties agree that the principles set out in this Clause [X] (Affirmative Vote Matters) are fundamental to the governance of the Company and each Party undertakes not to commit any act or omission that would violate this Clause [X] (Affirmative Vote Matters). If any other provision of this Agreement conflicts with the provisions of this Clause [X] (Affirmative Vote Matters), the provisions of this Clause [X] shall prevail and be given effect.',
  },
  {
    id: 'pp-002',
    clauseType: 'Protective Provisions',
    section: 'AVM',
    stage: 'Seed, Series A',
    title: 'Broad AVM — Operational Decisions (Red Flag)',
    content:
      'Investor veto rights extend to operational decisions: KMP appointment/termination, compensation changes above 10%, capex/opex variations above 10%, bank account opening/closing, vendor contracts above a low threshold. A debt threshold of INR 20L means the company cannot take a routine supplier advance without investor sign-off. Effectively makes the company unoperatable without investor approval for day-to-day decisions.',
    tsPosition:
      'Operational AVM items are an investor-aggressive opening position that creates significant regulatory risk for both parties. Investor counsel should note that operational AVM — KMP hiring, capex, bank accounts — can trigger FEMA "person in control" classification under NDI Rules 2019 Rule 23 and CCI "material influence" under CCI 2025, which neither party wants. The realistic and cleaner position is structural AVM only, with enhanced information rights as a substitute for operational veto.',
    founderPosition:
      'Reject: KMP appointment/termination, compensation above 10%, capex/opex variations, bank account opening/closing. These make the company unoperatable. Also flag debt threshold of INR 20L as too low — push to INR 1–2Cr.',
    investorPosition:
      'Argues operational AVM is necessary for early-stage oversight given management risk at pre-revenue or early-revenue stage.',
    marketPractice:
      'Non-standard. Operational AVM signals an investor seeking management control, not just downside protection. Absent from all reputable institutional VC term sheets in India.',
    marketStandard: false,
    risk: 'critical',
    keywords: ['broad veto', 'KMP', 'hiring veto', 'operational control', 'aggressive', 'budget', 'bank account', 'AVM'],
    negotiationTips:
      '🚨 RED FLAG. Operational AVM is paralyzing. KMP veto means you cannot hire a VP of Engineering without investor sign-off. Bank account veto means routine treasury operations require approval. Push back firmly: AVM must cover structural decisions only.',
    legalFlag:
      'Broad operational AVM creates two distinct control classification risks that must be assessed separately from Companies Act 2013 subsidiary classification. (1) FEMA "Person in Control": Under NDI Rules 2019 Rule 23, operational control exercised through AVM can be characterised as making the investor a "person in control" even without board majority or 50% shareholding. This triggers deemed change of control under FEMA, with downstream investment restrictions and reporting consequences. (2) CCI "Material Influence": Per CCI 2025 FAQs, an investor with broad operational AVM covering KMP hiring, capex, and bank accounts may be exercising "material influence" over the target — triggering mandatory CCI M&A notification requirements even without an acquisition of control. Note: Section 2(87) of the Companies Act 2013 (subsidiary classification) requires positive control of board composition or more than 50% total voting power. Pure AVM veto rights do not satisfy the Section 2(87) test. The operative risks are FEMA/CCI characterisation, not Section 2(87). Reject broad operational AVM.',
  },
  {
    id: 'pp-003',
    clauseType: 'Protective Provisions',
    section: 'AVM',
    stage: 'Seed, Series A',
    title: 'Fall-Away Threshold on AVM Rights',
    content:
      'AVM rights automatically lapse (fall away) once the investor\'s shareholding drops below a defined percentage threshold. Once fallen away, investor is reclassified from Lead/Majority Investor to Other Investor and retains only information rights. Prevents investors who have been significantly diluted from continuing to exercise veto rights disproportionate to their remaining economic stake.',
    tsPosition:
      'Flag concept in term sheet. Details in SHA. Silence at term sheet stage is not consent to no fall-away.',
    founderPosition:
      'Always insist fall-away is referenced in term sheet even if mechanics are in SHA. Typical threshold: 10% of total share capital or a defined % of original holding. Do not allow "fall-away to be agreed at SHA stage" — it will be dropped.',
    investorPosition:
      'Resist fall-away entirely, or push for a very low threshold (1–2%). Argues AVM rights should be permanent as they were negotiated for the entire investment period.',
    marketPractice:
      'Increasingly market standard in sophisticated Indian VC deals. Absence of fall-away at term sheet stage is an aggressive investor position.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['fall-away', 'AVM', 'threshold', 'shareholding', 'reclassification', 'protective provisions', 'dilution'],
    negotiationTips:
      'Always reference fall-away in the term sheet itself — even one line is enough. Typical threshold is 10% of total share capital. Once fallen away, investor reclassifies to information rights only. This matters most at Series B+ when dilution begins to compound.',
    shaNote:
      'Fall-away % and reclassification mechanics are negotiated in the SHA AVM schedule. Fall-away should be measured on a fully diluted basis and triggered automatically (not requiring investor consent to take effect).',
    legalFlag:
      'Fall-away on AVM rights is a contractual mechanism — it has no statutory basis under Companies Act 2013. Statutory minority rights (e.g., 10%+ EGM right, 25%+1 special resolution block) continue regardless of contractual fall-away. Structure fall-away thresholds with reference to Companies Act 2013 statutory thresholds: 10%, 25%+1, 50%+1.',
    fallAway: true,
    tier: 'Lead and Majority Investors. Once threshold breached, reclassified to Other Investor with information rights only.',
  },

  // ── PRE-EMPTIVE & MOP-UP RIGHTS ──────────────────────────────────
  {
    id: 'pr-001',
    clauseType: 'Pre-Emptive Rights',
    section: 'Pre-Emptive Rights',
    stage: 'Seed, Series A',
    title: 'Pre-Emptive Rights — Maintain Ownership %',
    content:
      'Lead and Majority Investors have the right to participate in future funding rounds on a pro-rata basis to maintain their ownership percentage. Standard carve-outs apply: ESOP grants, regulatory issuances, convertible note conversions. Right is subject to fall-away and is typically renegotiated or capped at Series B.',
    tsPosition:
      'Agree concept for Lead/Majority Investors. Carve-outs to be specified. Do not agree to pre-emptive rights for all investors across all rounds without limitation.',
    founderPosition:
      'Accept for Lead/Majority only. Carve out: ESOP grants, regulatory issuances, convertible note conversions. Flag for renegotiation at Series B. All investors having unlimited pre-emptive rights across all rounds creates serious administrative complexity and can block clean round closings.',
    investorPosition:
      'Pre-emptive for all investors, all rounds, no carve-outs. Argues this is standard dilution protection.',
    marketPractice:
      'Pre-emptive rights for Lead/Majority Investors are market standard. All-investor unlimited pre-emptive rights are not standard. Renegotiation or cap at Series B is acceptable and increasingly common.',
    marketStandard: true,
    risk: 'low',
    keywords: ['pre-emptive', 'pro-rata', 'participation rights', 'future rounds', 'dilution', 'series B', 'follow-on'],
    negotiationTips:
      'Accept pre-emptive for Lead/Majority — it is standard. The two negotiation levers are: (1) ensure carve-outs are listed (ESOP, regulatory, convertible conversions); and (2) flag renegotiation at Series B so later investors do not inherit an unlimited pre-emptive rights overhang.',
    shaNote:
      'Carve-outs, exercise period (typically 20–30 days), and pro-rata calculation mechanics are detailed in the SHA. Ensure the calculation is on a fully diluted basis.',
    legalFlag:
      'Contractual pre-emptive rights must be read alongside statutory pre-emptive rights under Companies Act 2013 Section 62. Statutory pre-emptive rights may need to be waived by shareholders at each new issue to permit venture financing. For foreign investors, exercise of pre-emptive rights constitutes a new FDI inflow and requires FC-GPR filing via the RBI FIRMS portal within 30 days of allotment.',
    fallAway: true,
    tier: 'Lead and Majority Investors. Subject to fall-away.',
    sortOrder: 5,
    sectionRisk: 'medium',
    narrativeSummary:
      'Pre-emptive rights give existing investors the right to participate in future funding rounds on a pro-rata basis, so their ownership percentage doesn\'t get diluted just because they sit out a round. In India, it\'s standard for Lead and Majority Investors to hold this right, with carve-outs for things like ESOP grants, regulatory issuances, and convertible note conversions, since these aren\'t really "new rounds" in the commercial sense. This is generally reasonable: an investor who has already taken a risk on the company shouldn\'t be forced to watch their stake shrink every time a new round closes. Where it becomes problematic is when the right is extended to every investor across every future round without limitation, since that creates serious administrative complexity, can slow down or even block a clean round closing, and sometimes pairs with "mop-up" rights that let an investor absorb unsubscribed allocation and accumulate ownership over time without founders ever explicitly agreeing to it. The standard response is to limit pre-emptive rights to Lead and Majority Investors only, list the carve-outs clearly, and flag that the right should be renegotiated or capped by the time the company reaches Series B.',
  },
  {
    id: 'pr-002',
    clauseType: 'Pre-Emptive Rights',
    section: 'Pre-Emptive Rights',
    stage: 'Seed, Series A',
    title: 'Mop-Up Rights — Subscribe to Unsubscribed Portion',
    content:
      'Right for the Lead Investor to subscribe to any portion of a new round that goes unsubscribed by other investors. Distinct from pre-emptive rights (which maintain existing ownership %) — mop-up rights allow the investor to increase ownership by absorbing unused allocation. Combined with pre-emptive rights, mop-up allows systematic ownership accumulation over successive rounds without founder approval at each step.',
    tsPosition:
      'Flag if present. Distinguish clearly from pre-emptive rights. Cap strictly before accepting.',
    founderPosition:
      'Resist. If accepted, cap strictly — cannot be used to cross 25%+1 or 50%+1 statutory thresholds without founder consent. Mop-up + pre-emptive combined allows steady ownership accumulation. Cap mop-up at 35% fully diluted maximum.',
    investorPosition:
      'Push for mop-up alongside pre-emptive. Argues unused capital in a round should not be wasted — mop-up ensures the round closes at target size.',
    marketPractice:
      'Less common than pre-emptive rights. Lead Investor only if at all. Unlimited mop-up rights are non-standard.',
    marketStandard: false,
    risk: 'medium',
    keywords: ['mop-up', 'unsubscribed', 'pre-emptive', 'ownership accumulation', 'threshold', 'dilution', 'lead investor'],
    negotiationTips:
      '🚨 Mop-up rights are less visible but have compounding risk. Over successive rounds, mop-up + pre-emptive allows an investor to cross statutory thresholds without triggering the individual governance conversations those thresholds are meant to prompt. Cap explicitly in the term sheet.',
    shaNote:
      'Cap and statutory threshold mechanics are negotiated in the SHA. Cap mop-up: cannot exceed 35% fully diluted or cross 25%+1/50%+1 statutory thresholds without founder consent. SEBI Takeover Regulations (SAST 2011) do not apply — they are limited to listed companies.',
    legalFlag:
      'Mop-up combined with pre-emptive rights allows an investor to accumulate shareholding without requiring founder approval or governance safeguards at each step. The critical distinction to understand: contractual AVM veto rights and statutory shareholding thresholds operate independently. Contractual AVM veto (blocking M&A, capex, KMP) operates regardless of shareholding percentage — it is a contractual right. Statutory thresholds auto-accrue by operation of law: Section 115 CA 2013 (25%+1 blocks all special resolutions); Section 110 CA 2013 (75% is required to pass special resolutions). The real mop-up risk is not AVM — it is cumulative founder dilution below 50% (losing ordinary resolution control) or below 75% (losing special resolution authority). If an investor reaches 25%+1 through mop-up accumulation, they automatically block all special resolutions even without any contractual AVM veto. Cap mop-up with explicit reference to these thresholds: cannot cross 25%+1 or 50%+1 without founder consent in writing. No open offer obligation arises as SEBI Takeover Regulations (SAST 2011) apply only to listed companies.',
    fallAway: true,
    tier: 'Lead Investor only.',
  },

  // ── DRAG-ALONG RIGHTS ───────────────────────────────────────────
  {
    id: 'da-001',
    clauseType: 'Drag-Along Rights',
    section: 'Drag-Along Rights',
    stage: 'Seed, Series A',
    title: 'Drag-Along — 75% Threshold (Market Standard)',
    content:
      'If 75%+ of all shareholders on a fully diluted basis vote to accept a sale or merger, all remaining shareholders (including founders) can be compelled to sell on the same terms. High threshold means investor cannot force a sale without very broad shareholder consensus — founders retain meaningful protection against a premature or underpriced forced exit.',
    tsPosition:
      'Agree concept and threshold % only at term sheet stage. All mechanics in SHA/SSA.',
    founderPosition:
      'Push for 75% threshold on fully diluted basis. No timelines or trigger definitions needed at term sheet stage — those go in SHA. The key fight is ensuring 75% is on ALL shares, not preferred shares only.',
    investorPosition:
      'Push for 51–66% threshold calculated on preferred shares only. Lower threshold and preferred-only calculation maximises investor exit optionality.',
    marketPractice:
      '75% on fully diluted basis is market standard in India. Lower thresholds are viewed as founder-hostile and will face strong resistance from well-advised founders.',
    marketStandard: true,
    risk: 'low',
    keywords: ['drag along', '75%', 'threshold', 'forced sale', 'force me to sell', 'forced to sell', 'forced exit', 'compel sale', 'majority sale', 'M&A', 'exit', 'fully diluted', 'sell my company', 'drag along right'],
    negotiationTips:
      'Hold the 75% threshold firmly. The equally important point is the denominator: 75% must be on ALL shares fully diluted, not on preferred only. On preferred-only, investor may reach 75% without any founder votes.',
    shaNote:
      'Trigger events, floor valuation, notice periods, and drag-along mechanics are all in SHA. Not required at term sheet stage. Consider adding a minimum valuation floor below which drag-along cannot be exercised. SCOPE LIMITATION: The SHA should specify that drag-along rights are exercisable only in the context of an M&A transaction or full company sale — not any share transfer or partial exit. Majority shareholders do not have an unfettered right to invoke drag-along; the right is governed by the AOA terms and should be expressly limited to situations where an acquirer requires or demands full control of the company. An open-ended drag-along trigger not limited to M&A/full sale scenarios creates significant founder risk and will be challenged by founder counsel at SHA stage.',
    legalFlag:
      'Drag-along provisions must comply with Companies Act 2013. NCLT (National Company Law Tribunal) has jurisdiction over oppression and mismanagement claims under Sections 241–244 — founders forced into demonstrably unfair exits may have NCLT remedies. For listed or pre-IPO companies, SEBI ICDR Regulations 2018 lock-in requirements may restrict drag-along exercise during the statutory lock-in window. AOA EMBEDDING REQUIREMENT: A private company is required under Section 2(68) of the Companies Act 2013 to restrict the transfer of its shares through its Articles of Association. Under Section 10, the AOA binds the company and all its members as if each member had signed it. Drag-along provisions must therefore be embedded in the AOA — not just the SHA — to be enforceable against all shareholders including those who are not party to the SHA. A drag-along right contained only in the SHA is a contractual right between the signatories; it cannot bind a shareholder who did not sign the SHA or whose shares were acquired subsequently. Ensure AOA amendment is a condition precedent to closing.',
    tier: 'Lead and Majority Investors collectively to cross threshold.',
    sortOrder: 6,
    sectionRisk: 'high',
    narrativeSummary:
      'A drag-along right lets a defined majority of shareholders force everyone else, including founders, to sell their shares on the same terms if the company receives an acquisition offer. In India, the standard threshold is 75% of shareholders voting in favour, calculated on a fully diluted basis across all shares, not just preferred. This high bar is what makes the clause reasonable: an investor cannot force a sale without very broad consensus across the cap table, so founders retain meaningful protection against being pushed into a premature or underpriced exit. It becomes problematic when investors push the threshold down to 50–51%, especially if it\'s calculated on preferred shares only, since a Series A investor combined with other early investors or the option pool can often cross that bar without a single founder vote. It\'s equally important that the right only be exercisable in the context of a genuine M&A transaction or full company sale, not any partial transfer, and that it be properly written into the Articles of Association rather than just the shareholders agreement, since only the AOA binds every shareholder regardless of whether they signed the SHA. The standard response is to hold the threshold at 75% on a fully diluted basis and insist the AOA reflects it.',
  },
  {
    id: 'da-002',
    clauseType: 'Drag-Along Rights',
    section: 'Drag-Along Rights',
    stage: 'Seed, Series A',
    title: 'Drag-Along with 50–51% Threshold (Investor-Aggressive)',
    content:
      'If 50%+ vote to sell, all shareholders must sell. At Series A, the investor may hold 25–35% of shares. Combined with other early investors or the option pool, reaching 51% is straightforward. Founder can be forced into a sale they oppose at a price they find unacceptable — without any founder votes if the math works against them.',
    tsPosition:
      'A 51% drag-along threshold is an investor-aggressive opening position that founders will resist strongly. Investor counsel should use it as a negotiating anchor with a genuine expectation of conceding to 66% or 75% — the 51% position is most defensible when calculated on all shares fully diluted rather than preferred only. Realistic outcome in a competitive deal is 75% on fully diluted basis.',
    founderPosition:
      '🚨 RED FLAG. Push this to 75% minimum. At 51%, drag-along can be triggered without founder consent in a realistic cap table scenario. This is how founders lose control of exit timing and exit price.',
    investorPosition:
      '51% threshold maximises exit optionality. Push as opening position but be prepared to concede to 66% or 75% if founder resists.',
    marketPractice:
      '51% drag-along is not market standard in India. It is viewed as founder-hostile and is absent from clean institutional VC deals.',
    marketStandard: false,
    risk: 'high',
    keywords: ['drag along', '51%', 'low threshold', 'forced sale', 'investor control', 'aggressive', 'majority'],
    negotiationTips:
      '🚨 RED FLAG. Push this to 75% minimum without exception. At 51% calculated on preferred shares, the investor may be able to trigger drag-along unilaterally. This is a fundamental control term — do not defer to SHA.',
    legalFlag:
      'NCLT has jurisdiction over oppression and mismanagement claims under Companies Act 2013 Sections 241–244. Founders forced into demonstrably unfair exits through low-threshold drag-along may have NCLT remedies. NDI Rules 2019 do not restrict drag-along mechanics per se, but any exit pricing must comply with fair market value requirements under Rule 21 for foreign investors.',
  },

  // ── EXIT RIGHTS ──────────────────────────────────────────────────
  {
    id: 'ex-001',
    clauseType: 'Exit Rights',
    section: 'Exit Rights',
    stage: 'Series A',
    title: 'Exit Waterfall — Sequence Only at Term Sheet',
    content:
      'Standard exit sequence: (1) Qualified IPO → (2) Third Party Strategic Sale → (3) Buyback/Put Option. Each stage has longstop dates — if Stage 1 is not achieved by Year X, Stage 2 is triggered; if Stage 2 fails, Stage 3 (put option) is triggered. The term sheet agrees only the sequence; all timelines and trigger definitions go in the SHA.',
    tsPosition:
      'Agree sequence at term sheet stage: IPO → Third Party Sale → Buyback/Put. Do not agree to specific IRR or multiple thresholds in the Qualified IPO definition at term sheet stage.',
    founderPosition:
      'Accept waterfall concept. Do not agree to specific IRR or valuation floors in the Qualified IPO definition at term sheet stage — these create an investor right to reject a legitimate listing. Push: "Qualified IPO definition to be agreed at SHA stage."',
    investorPosition:
      'Push for specific IRR floor (e.g. 25% IRR or 3x) in Qualified IPO definition. Shorter timelines at each stage. Put option exercisable against founders personally.',
    marketPractice:
      'IPO → Strategic Sale → Buyback/Put is market standard exit waterfall sequence. Longstop dates go in SHA, not term sheet.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['exit waterfall', 'IPO', 'strategic sale', 'put option', 'buyback', 'qualified IPO', 'longstop'],
    negotiationTips:
      'The key founder protection at term sheet stage is keeping the Qualified IPO definition clean — no IRR floor, no valuation minimum. An IRR-linked Qualified IPO definition gives investors a contractual right to block a legitimate listing by arguing it does not meet the return threshold.',
    shaNote:
      'Longstop dates, trigger definitions, "good faith effort" standards, and dispute resolution are all in SHA. Each exit mechanism must have a clearly defined trigger — open-ended waterfalls are consistently litigated.',
    legalFlag:
      'Exit waterfall sequencing is upheld by Indian courts when properly documented. SEBI ICDR Regulations 2018 become operative on an IPO exit: (1) Minimum Promoter Contribution of 20% post-issue capital locked in for 18 months (Reg. 16). (2) Promoter holding above 20% MPC locked in for 6 months post-allotment (Reg. 17). (3) Non-promoter pre-IPO investors locked in for 6 months from allotment — VCFs/FVCIs/AIFs with 6+ month holding may be exempt. (4) SEBI may classify founders holding 10%+ as promoters. (5) Any contractual exit right (put, drag, secondary sale) exercisable during the SEBI lock-in window will be unenforceable — SHA must include a lock-in override clause suspending contractual exits during statutory lock-in.',
    tier: 'Lead and Majority Investors hold primary exit rights.',
  },
  {
    id: 'ex-002',
    clauseType: 'Exit Rights',
    section: 'Exit Rights',
    stage: 'Series A',
    title: 'Put Option — Fair Value Pricing',
    content:
      'Investor can require the company to buy back their shares at fair market value after a defined period (typically 5–7 years) if no Qualified IPO or strategic sale has occurred. Fair market value is determined by an independent valuer using an internationally accepted methodology (DCF, NAV, or market multiples). Put is exercisable against the company only — not against founders personally. In a mixed round with both foreign and domestic investors, separate put mechanics are required in the same SHA due to different legal regimes.',
    tsPosition:
      'Agree concept only. Pricing principle — fair value vs fixed IRR — must be flagged at term sheet stage. Do not defer the pricing principle to SHA.',
    founderPosition:
      'Accept put option concept. Insist pricing is fair value via independent valuer — not fixed IRR or assured return. Put exercisable against company only, not founders personally. In a mixed round, agree that foreign investor put = fair value and domestic investor put mechanics to be separately agreed at SHA.',
    investorPosition:
      'Push for fixed IRR pricing (e.g. 18% p.a. compounded). Put exercisable against founders personally as well as the company. Will argue fixed IRR reflects the risk premium on an illiquid private company investment.',
    marketPractice:
      'Fair value pricing via independent valuer is market standard for foreign investors. Fixed-return puts are legally vulnerable for foreign investors (FEMA violation) and remain challengeable for domestic investors (SCRA forward contract risk).',
    marketStandard: true,
    risk: 'high',
    keywords: ['put option', 'call option', 'fair value', 'IRR', 'exit', 'buyback', 'repurchase', 'assured return', 'NDI rules'],
    negotiationTips:
      '🚨 The pricing mechanism differs by investor domicile — this is not one-size-fits-all. For foreign investors, fixed IRR is a FEMA violation — hold firm on fair value. For domestic investors in the same round, fixed IRR is legally riskier but not prohibited — this is a negotiation point. The practical solution is dual-track drafting in the SHA.',
    shaNote:
      'Trigger events, notice periods, valuer appointment process, and exercise mechanics all in SHA. For mixed rounds: use separate put mechanics clauses for foreign and domestic investors in the same SHA document to ensure FEMA compliance is isolated to the foreign investor provision.',
    legalFlag:
      'Legal standard for put option pricing differs by investor domicile and must be drafted accordingly. Foreign/Non-Resident Investors: NDI Rules 2019 Rule 21(2)(c) governs exit pricing. A put option providing an absolute guaranteed exit price higher than Fair Market Value at the time of exercise violates FEMA pricing guidelines — the RBI can impose penalties and require reversal of the transaction. A capped-IRR structure is permissible provided the payout at exercise does not exceed FMV at that point. Compliant structures: (a) fair-value put at FMV as determined by a SEBI-registered Merchant Banker or Chartered Accountant using an internationally accepted methodology; or (b) capped IRR structure ("FMV or 18% IRR floor, whichever is lower") — the cap ensures no exit above FMV. Domestic/Resident Investors: NDI Rules 2019 do not apply. Fixed IRR puts are not prohibited, but face risk under SCRA Section 2(c) as "forward contracts" — many domestic investors successfully negotiate 18–20% IRR puts with this risk accepted. Practical solution — Dual-Track SHA Drafting: In a mixed round (foreign + domestic investors), the SHA must contain separate put mechanics: (a) Foreign investor put clause = fair-value or FMV-capped IRR (FEMA compliant); (b) Domestic investor put clause = fixed IRR (SCRA risk accepted by parties). Combining both investor types under a single put clause risks contaminating the foreign investor clause with assured return language. Banyan Tree Growth Capital L.L.C. v. Axiom Cordages Limited (Bombay HC, 30 April 2020, Commercial Arbitration Petition Nos. 475 & 476 of 2019): put options are valid under Indian law when structured as a buyback arrangement.',
    tier: 'Lead and Majority Investors.',
    sortOrder: 7,
    sectionRisk: 'high',
    narrativeSummary:
      'Exit rights determine how an investor eventually realises a return if there\'s no obvious buyer waiting in the wings. The standard exit waterfall in India runs: a Qualified IPO first, then a third-party strategic sale if no IPO materialises within an agreed window, and finally a put option as a last resort. The put option lets the investor require the company to buy back their shares — typically after five to seven years — at fair market value, as determined by an independent valuer using a recognised methodology like DCF or market multiples, and it should be exercisable against the company only, never against founders personally. This sequencing is reasonable because it gives founders a real runway to deliver a successful exit before any forced buyback becomes relevant. It becomes problematic when investors push for the put to be priced at a fixed IRR rather than fair value, since for foreign investors this isn\'t just aggressive, it\'s a FEMA compliance violation that can trigger penalties from the RBI; for domestic investors fixed IRR is legally riskier but not strictly prohibited, which means in a mixed round of foreign and domestic investors, the SHA needs separate put mechanics for each so the foreign investor clause doesn\'t get contaminated with assured-return language. The standard response is to accept the put option concept but hold firm that pricing is fair value via an independent valuer, not a guaranteed return.',
  },
  {
    id: 'ex-003',
    clauseType: 'Exit Rights',
    section: 'Exit Rights',
    stage: 'Seed, Series A',
    title: 'Tag-Along — Concept Only at Term Sheet',
    content:
      'If a founder sells shares to a third party, investors have the right to sell their shares on the same terms (pro-rata tag) or to sell their full holding (full tag for Lead Investor). Protects investors from being left behind when founders exit through secondary sales. Standard and reasonable.',
    tsPosition:
      'Agree concept. Pro-rata vs full tag-along to be specified. Mechanics in SHA.',
    founderPosition:
      'Accept pro-rata tag-along. Full tag-along for Lead Investor is acceptable. Carve-outs for inter-se founder transfers must be in SHA — tag-along should not apply to transfers between founders.',
    investorPosition:
      'Full tag-along for all investors on any founder share sale.',
    marketPractice:
      'Pro-rata tag-along for all investors. Full tag-along for Lead Investor. Universal in Indian VC deals.',
    marketStandard: true,
    risk: 'low',
    keywords: ['tag-along', 'co-sale', 'secondary', 'founder sale', 'pro-rata', 'exit', 'transfer'],
    negotiationTips:
      'Standard clause — accept without significant pushback. The one carve-out worth fighting for is inter-se founder transfers: tag-along should not apply when Founder A transfers shares to Founder B.',
    shaNote:
      'Carve-outs, exercise period, and mechanics are in SHA. No timelines needed at term sheet stage. ACQUIRER CHILLING EFFECT: Founders should be aware that granting full tag-along rights to all investors can deter incoming acquirers seeking full control of the company. When minority investors exercise full tag-along rights, the transaction size increases proportionately — an acquirer expecting to buy a 60% stake may find themselves contractually required to acquire 100% of the company at the same price per share. This either deters the acquirer entirely or significantly increases the acquisition cost. Pro-rata tag-along (rather than full tag-along for all investors) is therefore the founder-preferred position — it limits the proportionate increase in transaction size while still protecting minority investors from being left behind on worse terms.',
    legalFlag:
      'Tag-along rights are contractual — there is no statutory equivalent under Companies Act 2013. For foreign investors exercising tag-along rights on a secondary sale, the pricing must comply with NDI Rules 2019 Rule 21 — pricing at fair market value as determined by a SEBI-registered Merchant Banker.',
    tier: 'All investor tiers. Lead Investor may have enhanced (full) tag-along rights.',
  },
  {
    id: 'ex-004',
    clauseType: 'Exit Rights',
    section: 'Exit Rights',
    stage: 'Series A',
    title: 'Call Option — Defensive Mechanism',
    content:
      'Company or founders have the right to repurchase investor shares at fair value. Less common than put options. Used as a defensive mechanism against an obstructive investor or an attempted sale to a competitor. Price must be commercially reasonable — call options at deeply discounted prices risk being characterised as disguised transfers.',
    tsPosition:
      'Flag concept if founders want a defensive mechanism. Mechanics in SHA.',
    founderPosition:
      'Push for call option at fair value as a defensive mechanism. Primary use case: investor becomes obstructive (blocking strategic decisions) or attempts to sell to a competitor. Fair value pricing only.',
    investorPosition:
      'Resist call options or insist on premium pricing (1.5x cost). Argues a call option at fair value effectively caps upside at market rate with no premium.',
    marketPractice:
      'Less common than put options. Promoters/company hold this right. Used selectively in founder-friendly deals.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['call option', 'repurchase', 'defensive', 'fair value', 'competitor', 'obstructive investor'],
    negotiationTips:
      'Call options are a useful defensive tool but must be priced at fair value to be enforceable. Deeply discounted call options (e.g. at cost) risk being challenged as disguised transfer mechanisms.',
    shaNote:
      'Pricing formula, trigger events, and exercise mechanics are all in SHA.',
    legalFlag:
      'Call options at deeply discounted prices risk being characterised as disguised share transfers and may be challenged under Companies Act 2013. Price must be commercially reasonable. For foreign investors, any call option exercise resulting in a buyback of shares must comply with NDI Rules 2019 pricing requirements — fair market value as determined by an internationally accepted methodology.',
    tier: 'Promoters/founders or company.',
  },

  // ── FOUNDER VESTING & LEAVER PROVISIONS ─────────────────────────
  {
    id: 'fv-001',
    clauseType: 'Founder Vesting',
    section: 'Founder Lock-In & Vesting',
    stage: 'Seed, Series A',
    title: 'Founder Vesting — 4-Year / 1-Year Cliff',
    content:
      '25% of founder shares vest at the 1-year cliff; remaining 75% vest monthly over the following 3 years (1/36th per month). If a founder leaves before 1 year, no shares vest — they are repurchased at nominal value. Vested and unvested shares are treated differently on exit and on departure. Acceleration mechanics (single trigger vs double trigger) are negotiated at SHA stage.',
    tsPosition:
      'Agree concept and schedule at term sheet stage. Vested vs unvested distinction to be flagged.',
    founderPosition:
      'Accept 4yr/1yr cliff. Flag at term sheet stage: (1) vested and unvested shares are treated differently on exit; (2) clawback concept exists and will be negotiated at SHA; (3) acceleration concept — single vs double trigger — to be addressed at SHA. Do not allow investor to claim SHA merely implements term sheet when it comes to Good/Bad Leaver definitions.',
    investorPosition:
      '4yr/1yr cliff. Full clawback of unvested shares at nominal value on departure. No acceleration on change of control.',
    marketPractice:
      '4-year vesting with 1-year cliff is universal in Indian venture-backed companies. Any variation must be justified.',
    marketStandard: true,
    risk: 'low',
    keywords: ['founder vesting', '4 year', '1 year cliff', 'reverse vesting', 'shares', 'clawback', 'acceleration'],
    negotiationTips:
      'Accept this — it is universal. Key negotiation points are downstream: (1) vesting commencement from incorporation date, not investment date; (2) double trigger acceleration (termination post-acquisition); and (3) Good Leaver definition must be narrow and objective.',
    shaNote:
      'Exact clawback pricing, acceleration triggers (single vs double), and Good/Bad Leaver definitions are all in SHA. The term sheet should flag these concepts exist without defining them — do not allow SHA to treat them as merely mechanical.',
    legalFlag:
      'Reverse vesting of founder shares requires careful structuring under Companies Act 2013. The buyback mechanism for unvested shares on departure must comply with Section 68 (buyback of shares) or be structured as a transfer to a founders\' trust. Buyback out of profits or fresh issue proceeds only.',
    tier: 'Founders and promoters.',
  },
  {
    id: 'fv-002',
    clauseType: 'Founder Vesting',
    section: 'Founder Lock-In & Vesting',
    stage: 'Seed, Series A',
    title: 'Good Leaver / Bad Leaver — Concept Flag at Term Sheet',
    content:
      'Good Leaver (involuntary departure — illness, death, termination without cause): retains all vested shares; unvested are clawed back at nominal value. Bad Leaver (resignation, termination for cause, breach): both vested and unvested shares clawed back, typically at cost or nominal value. The definitions of "good" and "bad" leaver, and the pricing on clawback, are the most heavily negotiated provisions in the SHA.',
    tsPosition:
      'Flag concept at term sheet stage. Definitions negotiated entirely at SHA stage.',
    founderPosition:
      'Flag at term sheet: Good Leaver retains all vested shares. Bad Leaver definition must be narrow and objective — not open to investor discretion. Unvested shares clawed back regardless of leaver status. Investor cannot later claim SHA merely implements agreed term sheet — this is open for negotiation at SHA stage.',
    investorPosition:
      'Bad Leaver defined broadly to include any departure. Both vested and unvested shares clawed back at nominal value on Bad Leaver classification.',
    marketPractice:
      'Concept flagged at term sheet. Full definitions, pricing, and classification mechanism are negotiated at SHA — not at term sheet stage.',
    marketStandard: true,
    risk: 'high',
    keywords: ['good leaver', 'bad leaver', 'clawback', 'vesting', 'departure', 'termination', 'cause'],
    negotiationTips:
      '🚨 The Good/Bad Leaver definition is where investors try to insert broad discretion. Push back hard on: (1) investor having unilateral power to classify a leaver as "bad"; (2) "bad leaver" including involuntary termination without cause; and (3) vested shares being clawed back on bad leaver — vested shares should always be retained.',
    shaNote:
      'Good/Bad Leaver definitions, clawback pricing (nominal vs cost vs fair value), classification mechanism, dispute resolution, and acceleration all in SHA. Do not allow term sheet to pre-define Bad Leaver.',
    legalFlag:
      'Clawback of shares on departure requires compliance with Companies Act 2013 Section 68 (buyback) or structuring as a contractual transfer at an agreed price. The buyback price (cost vs nominal vs fair value) must be specified in the SHA — ambiguity creates NCLT litigation risk. For foreign investors buying back founder shares, pricing must comply with NDI Rules 2019 Rule 21.',
    tier: 'Founders and promoters.',
  },

  // ── INFORMATION RIGHTS ──────────────────────────────────────────
  {
    id: 'ir-001',
    clauseType: 'Information Rights',
    section: 'Information Rights',
    stage: 'Seed, Series A',
    title: 'Quarterly Reporting — Market Standard',
    content:
      'Lead/Majority Investors receive quarterly financial statements (P&L, balance sheet, cash flow) plus board materials within 45 days of quarter end. Annual audited accounts within 90 days of financial year end. Other Investors receive financials only. Audit rights: once per year with 30 days written notice. Monthly MIS is not the baseline — it is an exception for Lead Investor only where justified.',
    tsPosition:
      'Agree concept. Tiering by investor class acceptable.',
    founderPosition:
      'Quarterly financials + board materials for Lead/Majority. Other Investors: financials only. Audit: once/year, 30 days notice. Resist monthly MIS as a baseline obligation — offer it to Lead Investor as a concession, not a right.',
    investorPosition:
      'Monthly MIS + unlimited audit rights for all investors. Argues early-stage companies require closer monitoring.',
    marketPractice:
      'Quarterly reporting is market standard in India. Monthly reporting acceptable for Lead Investor only, and only where Lead Investor has a board seat.',
    marketStandard: true,
    risk: 'low',
    keywords: ['information rights', 'reporting', 'quarterly', 'financials', 'board materials', 'MIS', 'audit'],
    negotiationTips:
      'Accept quarterly reporting without pushback — it is standard. The key tier distinction to enforce is Lead/Majority getting board materials while Other Investors get financials only. Monthly MIS for all investors is not standard and creates ongoing administrative burden.',
    shaNote:
      'Audit notice periods, confidentiality obligations, and tiering mechanics are detailed in the SHA. Specify clearly what constitutes "board materials" — some investors interpret this broadly.',
    legalFlag:
      'Financial reporting must comply with Companies Act 2013 accounting standards. Audited annual accounts are mandatory for all companies above applicable thresholds. Information rights provisions should include a confidentiality obligation on the investor — financial information shared under information rights is typically material non-public information.',
    fallAway: true,
    tier: 'Lead/Majority: quarterly financials + board materials. Others: financials only. Subject to fall-away.',
    sortOrder: 8,
    sectionRisk: 'low',
    narrativeSummary:
      'Information rights set out what financial and operational information the company must regularly share with its investors. In India, the standard is quarterly reporting: Lead and Majority Investors receive financial statements, profit and loss, balance sheet, and cash flow, along with board materials within 45 days of quarter end, plus annual audited accounts within 90 days of the financial year closing. Investors below that tier typically get financials only, not board materials. This is reasonable because investors need enough visibility to track how their capital is performing without the company having to run two sets of reporting cycles for different investor classes. It becomes a problem when investors push for monthly MIS reporting as a baseline obligation for everyone, since that creates a meaningful ongoing administrative burden for an early-stage company that doesn\'t always have the finance team to support it. The standard response is to accept quarterly reporting without much pushback, since it\'s genuinely standard, but resist monthly reporting as a default right — it can be offered selectively to the Lead Investor as a concession if they have a board seat, rather than extended to every investor as a matter of course.',
  },

  // ── REDEMPTION RIGHTS ───────────────────────────────────────────
  {
    id: 'rr-001',
    clauseType: 'Redemption Rights',
    section: 'Redemption Rights',
    stage: 'Series A',
    title: 'Redemption Rights (Deal Killer)',
    content:
      'Investor can force company to buy back their shares at a specified price (often with a guaranteed return element) if no IPO or exit occurs by a set date. Example: "Investor can redeem at 1.2x investment in Year 5 if no exit." This converts equity into quasi-debt with a maturity date, creates artificial exit pressure, and may trigger balance sheet reclassification. For foreign investors, any instrument with a redemption right is not a fully compulsorily convertible instrument under NDI Rules 2019 and will be reclassified as an ECB.',
    tsPosition:
      'Reject entirely at term sheet stage. Do not negotiate on redemption rights.',
    founderPosition:
      'Reject. Converts equity to quasi-debt. Creates forced liquidation risk. If investor insists past initial pushback, treat it as a red flag about their intentions.',
    investorPosition:
      'May appear after 5+ years as a last-resort exit protection if no IPO or M&A has occurred. Argues it is only triggered in failure scenarios.',
    marketPractice:
      'Non-standard. Red flag in any term sheet. Redemption rights appear in private equity and distressed bridge deals — not standard venture capital.',
    marketStandard: false,
    risk: 'critical',
    keywords: ['redemption', 'buyback', 'forced liquidation', 'time limit', 'exit', 'quasi-debt', 'ECB', 'deal killer'],
    negotiationTips:
      '🚨 Redemption rights convert equity to quasi-debt. For a foreign investor, accepting a redemption right re-classifies the entire instrument from FDI equity to ECB — triggering a significantly more restrictive regulatory regime. For any investor, it creates an artificial time-bomb forcing a sale or massive cash drain. Do not accept under any circumstances.',
    shaNote:
      'If redemption rights genuinely cannot be avoided (very rare), negotiate: (1) redemption only from distributable profits, not capital; (2) 7+ year horizon; (3) board approval required before exercise; (4) no forced liquidation or winding-up right. These conditions make the clause largely unexercisable in practice.',
    legalFlag:
      'Under Rule 2 read with Rule 21 of the Foreign Exchange Management (Non-Debt Instruments) Rules, 2019 (NDI Rules — operative from 17 October 2019, superseding TISPRO 2000), only fully and compulsorily convertible instruments qualify as equity instruments for FDI purposes. Any instrument carrying a redemption right is not fully compulsorily convertible and will be reclassified as a debt instrument, attracting the RBI Master Direction on External Commercial Borrowings (ECB) — a significantly more restrictive regime with end-use restrictions, all-in cost ceilings, minimum average maturity periods, and mandatory hedging requirements. For domestic investors, redemption rights may cause reclassification of the instrument as a financial liability under Indian Accounting Standards (Ind AS 32), affecting the company\'s balance sheet, net worth covenants, and regulatory ratios. Redemption of preference shares, if permitted, is governed by Companies Act 2013 Section 55 — redemption must be out of distributable profits or proceeds of fresh issue of shares, not from capital.',
    sortOrder: 9,
    sectionRisk: 'high',
    narrativeSummary:
      'A redemption right lets an investor force the company to buy back their shares at a specified price, often with a guaranteed return built in, if no IPO or acquisition has happened by an agreed date. This is fundamentally different from a put option priced at fair value, because redemption rights effectively convert what is supposed to be equity into quasi-debt with a maturity date — the company is suddenly on the hook for a defined cash payout regardless of how the business is actually performing. There isn\'t really a "reasonable" version of this clause in a standard Indian venture deal; it shows up almost exclusively in private equity or distressed bridge financing, not legitimate early-stage venture capital. The problem compounds for foreign investors specifically: under the FEMA Non-Debt Instruments Rules, only fully and compulsorily convertible instruments qualify as equity for FDI purposes, so accepting a redemption right reclassifies the entire investment as debt, pulling it into the much more restrictive External Commercial Borrowings regime. The standard response is to reject redemption rights outright at term sheet stage and treat their presence as a signal worth taking seriously about how the investor views the relationship.',
  },

  // ── FOUNDER LOCK-IN & NON-COMPETE ───────────────────────────────
  {
    id: 'lk-001',
    clauseType: 'Founder Lock-In',
    section: 'Founder Lock-In & Vesting',
    stage: 'Seed, Series A',
    title: 'Founder Lock-In — Duration Must Be Capped',
    content:
      'Founders are restricted from selling shares for a defined period. Standard and reasonable in concept. The critical negotiation point is duration: lock-in tied to "the period the investor remains a shareholder" is open-ended and effectively indefinite. Lock-in must have a defined maximum duration — typically 3–4 years from closing — that operates regardless of whether the investor has exited.',
    tsPosition:
      'Agree concept. Duration must be defined and capped.',
    founderPosition:
      'Reject open-ended lock-in tied to investor shareholding period. Push for a defined maximum duration (3–4 years from closing). Lock-in must not extend beyond a defined longstop date regardless of investor exit status.',
    investorPosition:
      'Lock-in for the entire period the investor remains a shareholder. Argues founders should remain committed as long as investor capital is at risk.',
    marketPractice:
      'Lock-in concept is market standard. Open-ended duration tied to investor exit is aggressive and non-standard.',
    marketStandard: true,
    risk: 'high',
    keywords: ['founder lock-in', 'transfer restriction', 'secondary sale', 'duration', 'longstop', 'vesting'],
    negotiationTips:
      '🚨 The duration is everything. Open-ended lock-in tied to investor exit is a mechanism for indefinite founder restraint. Cap it at 3–4 years from closing with a longstop date that operates regardless. Also ensure lock-in does not prevent inter-se founder transfers.',
    shaNote:
      'Employment obligations, permitted activities during lock-in, inter-se transfer carve-outs, and permitted transfers to family trusts are detailed in the SHA.',
    legalFlag:
      'Founder lock-in is a share transfer restriction and is contractually enforceable. It is distinct from non-compete (which restrains trade and is governed by Section 27 of the Indian Contract Act 1872). Lock-in during active shareholding and employment is enforceable. The combination of an open-ended lock-in and a broad non-compete creates a position where founders are effectively indefinitely restrained — this should be identified and resisted at term sheet stage.',
    tier: 'All founders. Obligations are several — each founder is individually bound.',
    sortOrder: 10,
    sectionRisk: 'high',
    narrativeSummary:
      'Founder lock-in and vesting are two related mechanisms that govern how and when founders actually own their shares outright. Vesting is the more familiar of the two: founder shares vest over time, typically a four-year schedule with a one-year cliff, so 25% vests after the first year and the remainder vests monthly over the following three years, with unvested shares clawed back at nominal value if a founder leaves early. This protects the investor against a founder walking away shortly after closing while still holding a large equity stake. Lock-in works alongside this by restricting a founder\'s ability to sell or transfer their shares for a defined period, which is reasonable in concept since investors want assurance that founders remain committed for at least the early years of the company\'s life. Where this becomes problematic is when the lock-in duration is left open-ended, tied to "the period the investor remains a shareholder" rather than a fixed date, since that can keep founders restrained indefinitely regardless of how long the company has been operating or how the relationship with the investor has evolved. The standard response is to accept the vesting schedule as-is, since it\'s genuinely universal, but insist that lock-in carries a defined maximum duration, typically three to four years from closing, that applies regardless of the investor\'s own exit timeline.',
  },
  {
    id: 'lk-002',
    clauseType: 'Founder Lock-In',
    section: 'Founder Lock-In & Vesting',
    stage: 'Seed, Series A',
    title: 'Non-Compete — Scope Must Be Defined',
    content:
      'Founders are restricted from starting or joining a competing business. Reasonable in concept if scoped to the specific business activity and geography. Problematic if drafted broadly (all of "the sector"), for long durations (3 years post-share disposal), or tied to share disposal rather than employment cessation — as this creates a post-departure restraint that is legally fragile under Indian law.',
    tsPosition:
      'Agree concept at term sheet stage. Scope and geography must be defined before SHA.',
    founderPosition:
      'Push for narrow scope: direct competitors only, defined geography, defined business activity. Duration: maximum 1–2 years post-departure. Resist "3 years from later of employment cessation or share disposal" — combined with an open-ended lock-in, this is effectively indefinite.',
    investorPosition:
      '3-year non-compete from the later of employment cessation or share disposal. Broad scope covering the sector.',
    marketPractice:
      'Non-compete concept is standard. Narrow scope (specific activity, defined geography, short duration post-departure) is market standard.',
    marketStandard: true,
    risk: 'high',
    keywords: ['non-compete', 'restraint', 'trade', 'competition', 'departure', 'post-employment', 'geography', 'Section 27'],
    negotiationTips:
      '🚨 Non-competes are legally fragile in India post-departure. Investors often draft them broadly knowing they may not be fully enforceable — but enforcement risk is not the only concern. A broadly drafted non-compete can deter future employment even if technically unenforceable. Push for narrow scope, defined geography, and 12-month maximum post-departure duration.',
    shaNote:
      'Exact scope, geography, duration, and permitted exceptions (e.g. passive investment below 2% in a public company) are in SHA. Ensure non-compete has a defined list of "competing businesses" rather than a sector-wide description.',
    legalFlag:
      'Section 27 of the Indian Contract Act, 1872 renders agreements in restraint of trade void as a matter of public policy. Indian courts have consistently refused to enforce post-employment non-competes after the employment or directorship relationship ends. A non-compete operative after the founder leaves the company is legally fragile regardless of how it is drafted. Defensible positions: (1) non-compete operative only during the period of active employment or directorship — these are enforced by Indian courts; or (2) a narrow, time-limited post-departure restriction tied specifically to protection of confidential information or trade secrets — even then, enforcement is uncertain and fact-specific. At SHA stage: ensure non-compete is defined narrowly by geography, activity, and duration (12 months post-departure maximum is the recommended ceiling). Founders must be advised that a broadly drafted non-compete, even if signed, may not be enforceable in an Indian court.',
    tier: 'All founders.',
  },

  // ── STATUTORY SHAREHOLDING THRESHOLDS ───────────────────────────
  {
    id: 'st-001',
    clauseType: 'Statutory Thresholds',
    section: 'Statutory Thresholds',
    stage: 'Seed, Series A',
    title: 'India Statutory Thresholds — Companies Act 2013',
    content:
      'Companies Act 2013 creates automatic rights at defined shareholding thresholds that operate independently of any contractual provisions in the SHA. These thresholds set the floor for negotiating contractual fall-away and AVM rights. Key thresholds: 10%+: right to call EGM + right to file NCLT petition. 25%+1: blocks all special resolutions. 50%+1: ordinary resolution control. 75%: required to pass special resolutions. 90%: squeeze-out of minority.',
    tsPosition:
      'Reference point only. Not directly negotiated in term sheet. But fall-away thresholds and AVM caps in the term sheet must be set with reference to these levels.',
    founderPosition:
      'Structure SHA rights at or above statutory thresholds. Fall-away thresholds should reference the 10%, 25%+1, and 50%+1 levels. Avoid giving contractual rights at sub-threshold levels that cannot be supported by statutory backing.',
    investorPosition:
      'Target 25%+1 to achieve statutory special resolution blocking rights. Use statutory thresholds as a floor for negotiating contractual rights.',
    marketPractice:
      'SHA rights are layered on top of statutory rights. Investors in Indian VC rounds often target 20–26% ownership to stay near the 25%+1 special resolution blocking threshold.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['statutory', 'Companies Act', '25%', '75%', 'special resolution', 'EGM', 'NCLT', 'threshold', 'squeeze-out'],
    negotiationTips:
      'Understanding the statutory thresholds is essential to negotiating fall-away provisions intelligently. An investor at 24% has no statutory blocking rights — they rely entirely on contractual AVM. An investor at 26% has automatic special resolution block regardless of what the SHA says. These thresholds are not negotiable.',
    shaNote:
      'All contractual rights in the SHA must be checked against statutory minimums. SHA provisions cannot remove or dilute statutory minority rights — they can only add to them.',
    legalFlag:
      'Companies Act 2013 thresholds are mandatory and operate by statute. SHA provisions that purport to override or waive statutory rights will not be enforced. The thresholds are: Section 100 (10%+: EGM requisition); Section 244 (10%+: NCLT oppression petition); Section 114 (ordinary resolutions: simple majority); Section 114 read with Section 4 of Schedule (special resolutions: 75%). Contractual rights in SHA are additive to, not replacements for, statutory rights.',
    tier: '10%+: EGM right + NCLT petition. 25%+1: blocks special resolutions. 50%+1: ordinary control. 75%: special resolutions. 90%: squeeze-out.',
  },

  // ── AVM SCHEDULE ─────────────────────────────────────────────────
  {
    id: 'avm-001',
    clauseType: 'AVM Schedule',
    section: 'AVM Schedule',
    stage: 'Seed, Series A',
    title: 'Acceptable AVM Items — Standard Structural Decisions',
    content:
      'These items are universally accepted as appropriate AVM in Indian VC deals and should not require significant negotiation: (1) Board size changes, (2) Variation of share rights, (3) Acquisitions above threshold, (4) JV or subsidiary creation, (5) M&A and amalgamations, (6) Material asset sales, (7) Company name or trademark changes, (8) IP disposal outside ordinary course, (9) Statutory auditor appointment, (10) Related party transactions above defined threshold.',
    tsPosition:
      'Accept in AVM schedule without pushback.',
    founderPosition:
      'Accept these items without pushback. They are structural decisions appropriate for minority investor oversight. Focus negotiation energy on keeping operational items off the list.',
    investorPosition:
      'Will include these as the baseline AVM schedule. May use them as anchors to justify adding operational items alongside.',
    marketPractice:
      'These structural decisions are universally accepted as appropriate AVM in Indian VC deals.',
    marketStandard: true,
    risk: 'low',
    keywords: ['AVM', 'affirmative voting', 'structural', 'M&A', 'subsidiary', 'auditor', 'related party', 'acceptable'],
    negotiationTips:
      'Accept this list without pushback. But watch for investor bundling: using the structural list as a base and then adding operational items (KMP hiring, capex, budget) in the same schedule. Review the complete AVM schedule carefully before signing.',
    shaNote:
      'Full AVM schedule is documented in the SHA. The term sheet Annexure establishes the ceiling — investors will attempt to expand at SHA stage.',
    legalFlag:
      'Structural AVM items do not, by themselves, create control classification risk under FEMA NDI Rules 2019 or CCI 2025 guidelines. The control risk arises only when operational AVM items are added — see [avm-002] and [pp-002].',
    tier: 'Lead and Majority Investors.',
  },
  {
    id: 'avm-002',
    clauseType: 'AVM Schedule',
    section: 'AVM Schedule',
    stage: 'Seed, Series A',
    title: 'Remove from AVM — Operational Decisions',
    content:
      'These items must be removed from any AVM schedule: (1) KMP appointment/termination, (2) KMP compensation changes above 10%, (3) Capex/opex variations above 10%, (4) Bank account opening/closing. Additionally, any debt threshold of INR 20L must be raised to INR 1–2Cr minimum. A debt veto at INR 20L means the company cannot take a routine vendor advance without investor sign-off.',
    tsPosition:
      'Remove before signing. Non-negotiable.',
    founderPosition:
      'Remove entirely. KMP appointment veto means you cannot hire a key employee without investor approval. Bank account veto means routine treasury operations require sign-off. These items make the company unoperatable. Debt threshold of INR 20L must be raised to INR 1–2Cr.',
    investorPosition:
      'Will attempt to include these items for early-stage oversight, arguing management risk at pre-revenue stage justifies operational visibility.',
    marketPractice:
      'Operational AVM is non-standard. Its presence in a term sheet signals an investor seeking management control, not just downside protection.',
    marketStandard: false,
    risk: 'critical',
    keywords: ['AVM', 'KMP', 'capex', 'bank account', 'operational', 'remove', 'non-standard', 'debt threshold'],
    negotiationTips:
      '🚨 These items are non-negotiable removals. Use the FEMA and CCI arguments if the investor pushes back: operational AVM can trigger "person in control" classification under NDI Rules 2019 Rule 23 and "material influence" under CCI 2025 — creating regulatory consequences neither party wants.',
    shaNote:
      'The SHA AVM schedule must reflect the agreed term sheet list exactly. Watch for operational items being re-introduced at SHA stage under different naming.',
    legalFlag:
      'Operational AVM (KMP hiring, capex, bank accounts) creates two distinct control classification risks. (1) FEMA "Person in Control" (NDI Rules 2019 Rule 23): Operational control through AVM can constitute making the investor a "person in control" even without board majority or 50% shareholding — triggering deemed change of control under FEMA with downstream investment and reporting consequences. (2) CCI "Material Influence" (CCI 2025 FAQs): An investor with broad operational AVM may be exercising "material influence" over the target, triggering mandatory CCI M&A notification requirements. Note: Section 2(87) CA 2013 subsidiary classification requires positive control of board composition or >50% total voting power — pure AVM veto rights do not satisfy this test. The operative regulatory risks are FEMA/CCI, not Section 2(87). See also [pp-002] legal flag.',
    tier: 'Lead and Majority Investors.',
  },
  {
    id: 'avm-003',
    clauseType: 'AVM Schedule',
    section: 'AVM Schedule',
    stage: 'Seed, Series A',
    title: 'Grey Area AVM Items — Narrow Before Accepting',
    content:
      'These items are acceptable in principle but must be narrowed before inclusion in the AVM schedule: (1) Dividend distributions — exclude employee bonuses and director fees, limit to capital distributions only. (2) ESOP — plan creation and material amendments only, not individual grants. (3) Related party transactions — add minimum threshold (INR 50L) and arm\'s length carve-out. (4) Strategic alliances — limit to equity investments and exclusive arrangements above a defined revenue threshold.',
    tsPosition:
      'Accept in principle with narrowed language.',
    founderPosition:
      'Accept with narrowing: dividend clause must exclude operational compensation; ESOP must cover plan-level changes only; related party must have INR 50L minimum threshold and arm\'s length carve-out; strategic alliances must be limited to material exclusive arrangements above a defined size.',
    investorPosition:
      'Will push for broadly drafted versions of all these items.',
    marketPractice:
      'These items are acceptable in principle but require narrowed language to be appropriate for a minority investor position.',
    marketStandard: true,
    risk: 'medium',
    keywords: ['AVM', 'grey area', 'ESOP', 'dividend', 'related party', 'strategic alliance', 'narrowing', 'threshold'],
    negotiationTips:
      'The narrowing language for each item should be proposed by founder counsel and agreed before the term sheet is signed. Leaving these items broadly drafted in the term sheet Annexure gives the investor a strong SHA-stage argument for broad implementation.',
    shaNote:
      'Exact thresholds and carve-outs for each item are negotiated in the SHA AVM schedule. The term sheet Annexure should include the narrowing language agreed, not just the item name.',
    legalFlag:
      'Grey area AVM items, when broadly drafted, can individually shift toward operational control classification under FEMA NDI Rules 2019 Rule 23 and CCI 2025 material influence analysis. The key is narrowing each item so it clearly targets structural and material decisions, not routine management operations.',
    tier: 'Lead and Majority Investors.',
  },

  // ── DEMATERIALISATION ────────────────────────────────────────────
  {
    id: 'dm-001',
    clauseType: 'Dematerialisation',
    section: 'Dematerialisation',
    stage: 'Seed, Series A',
    title: 'Mandatory Dematerialisation — Private Companies (Non-Small)',
    content:
      'All non-small private companies must dematerialise their entire existing share capital before issuing any new shares. New shares in this round must be issued in demat form. The incoming investor must have an active demat account with a SEBI-registered Depository Participant (NSDL or CDSL) before the round closes. "Small company" is defined under Section 2(85) of the Companies Act 2013 as having paid-up capital not exceeding INR 4Cr AND turnover not exceeding INR 40Cr — both conditions must be met for the exemption to apply.',
    tsPosition:
      'Flag at term sheet stage. Demat status is a condition precedent to closing — not a post-closing obligation.',
    founderPosition:
      'Ensure company has completed dematerialisation of all existing shares before closing. Any new investor receiving shares must have an active demat account. Demat is a condition precedent to closing. Verify company is not a small company under Section 2(85) — if turnover exceeds INR 40Cr or paid-up capital exceeds INR 4Cr, mandatory demat applies.',
    investorPosition:
      'Must confirm demat account details before term sheet is signed. Failure to have an active demat account delays closing and may affect round economics.',
    marketPractice:
      'Mandatory for all non-small private companies. Non-compliance blocks share allotment.',
    marketStandard: true,
    risk: 'high',
    keywords: ['dematerialisation', 'demat', 'NSDL', 'CDSL', 'depository', 'ISIN', 'PAS Rules', 'condition precedent'],
    negotiationTips:
      'This is a compliance item, not a negotiation point. The practical risk is timing: if either party has not completed demat set-up by closing, allotment is legally blocked. Build demat confirmation as a condition precedent in the SHA and verify both company and investor demat status before signing the term sheet.',
    shaNote:
      'Demat account details, DP confirmation, and ISIN confirmation must all be obtained before SHA execution. Include demat status confirmation as a condition precedent to closing in the SHA.',
    legalFlag:
      'Under the Companies (Prospectus and Allotment of Securities) Second Amendment Rules, 2023 (PAS Rules 2023), all private companies other than small companies are required to dematerialise their entire share capital. New shares cannot be issued, transferred, or subscribed to in physical form by such companies. A private company that has not dematerialised existing shares before the round closes cannot legally allot shares to the incoming investor — the allotment is non-compliant and may be void. Founders must verify: (1) company is not a small company under Section 2(85) CA 2013 (paid-up capital not exceeding INR 4Cr AND turnover not exceeding INR 40Cr — both conditions); (2) existing shares are dematerialised via a valid ISIN obtained from NSDL or CDSL; (3) incoming investor holds an active demat account with a SEBI-registered Depository Participant. Non-compliance may render the allotment void and expose directors to penalties under the Companies Act 2013.',
    tier: 'Mandatory for company and all incoming investors. No tier distinction.',
  },

  // ── CONVERTIBLE INSTRUMENTS ──────────────────────────────────────
  {
    id: 'ci-001',
    clauseType: 'Convertible Instruments',
    section: 'Convertible Instruments',
    stage: 'Seed, Series A',
    title: 'Convertible Instruments — FEMA / NDI Rules Compliance',
    content:
      'Three main instruments used in Indian VC rounds for foreign investment: (1) CCPS (Compulsorily Convertible Preference Shares) — most common at Series A. (2) CCD (Compulsorily Convertible Debentures) — used where interest deductibility is a priority. (3) Convertible Notes — available only to DPIIT-recognised startups, 10-year maximum tenure. Optionally convertible instruments are NOT FDI-compliant and trigger the ECB regime. Conversion price and formula must be fixed upfront — not left open — and cannot be below FMV at the date of issuance.',
    tsPosition:
      'Flag instrument type and pricing principle at term sheet stage. Full mechanics in investment agreement and SHA.',
    founderPosition:
      'At term sheet stage, confirm: (1) instrument type — equity shares, CCPS, or CCD only for FDI-compliant foreign investment; (2) conversion price or formula fixed upfront; (3) conversion price at conversion cannot be below FMV at date of issuance. For Convertible Notes: confirm DPIIT startup recognition status. No assured return or fixed IRR for non-resident investors — pricing must reference FMV.',
    investorPosition:
      'May push for optionally convertible instruments (OCI/OCPS) or fixed-return structures for better downside protection. These are ECB-regulated for foreign investors and must be flagged and rejected.',
    marketPractice:
      'CCPS is the most common instrument in Indian VC seed and Series A rounds. CCDs used where interest deductibility is a priority. Convertible Notes used at angel/pre-seed for DPIIT-recognised startups only.',
    marketStandard: true,
    risk: 'high',
    keywords: ['CCPS', 'CCD', 'convertible note', 'NDI rules', 'FEMA', 'FDI', 'instrument', 'conversion price', 'FMV', 'ECB', 'DPIIT'],
    negotiationTips:
      '🚨 Instrument choice has major regulatory consequences for foreign investors. CCPS or CCD only — optionally convertible instruments trigger ECB treatment and penalties of up to 3x the transaction amount. Ensure conversion price formula is fixed upfront and the pricing mechanic is FMV-anchored.',
    shaNote:
      'Instrument-specific mechanics, conversion triggers, anti-dilution formula on conversion, coupon rate (CCDs), dividend rate (CCPS), and FC-GPR filing obligations all negotiated in investment agreement and SHA.',
    legalFlag:
      'Operative instrument: Rule 2 and Rule 21 of the Foreign Exchange Management (Non-Debt Instruments) Rules, 2019 (NDI Rules), which superseded TISPRO 2000 on 17 October 2019. INSTRUMENT FLAGS: (A) CCPS — Treated as equity under NDI Rules from date of issuance. Conversion price must be at or above FMV at issuance. Dividends are not tax-deductible for the company. Conversion at IPO is not a taxable transfer under Section 47(xb) of the Income Tax Act. File FC-GPR via RBI FIRMS portal within 30 days of allotment. (B) CCD — Fully, compulsorily, and mandatorily convertible debentures only qualify as equity instruments under NDI Rules. Optionally or partially convertible debentures = debt = ECB regime. Coupon rate cannot exceed SBI PLR at issuance. Conversion price and formula fixed upfront; conversion price must be at or above FMV at issuance even if company value subsequently declines. Interest is tax-deductible for the company (unlike CCPS). File FC-GPR within 30 days of allotment. (C) CONVERTIBLE NOTES — Permissible only for DPIIT-recognised startups from eligible investors. Maximum tenure 10 years from date of issue (extended from 5 years by NDI Rules amendment). Must convert into equity shares, CCPS, or CCD — not optionally convertible instruments. Valuation deferred to next priced round. (D) OPTIONALLY CONVERTIBLE INSTRUMENTS — Not FDI-compliant. Classified as debt. Must comply with RBI ECB Master Direction. Non-compliance triggers FEMA compounding penalties of up to 3x the transaction amount and potential Enforcement Directorate proceedings.',
    tier: 'Foreign investors: NDI Rules apply mandatorily. Domestic investors: Companies Act 2013 and SEBI (if applicable) govern. Convertible Notes: DPIIT-recognised startups only.',
  },

  // ── CONVERSION RIGHTS (retained from prior version — legal refs updated) ───
  {
    id: 'cr-001',
    clauseType: 'Conversion Rights',
    section: 'Conversion Rights',
    stage: 'Seed, Series A',
    title: 'Automatic Conversion at Qualified IPO (Standard)',
    content:
      'All preferred shares (CCPS or otherwise) automatically convert to equity shares at a Qualified IPO or upon a supermajority preferred shareholder vote to convert. Ensures all investors participate in the IPO alongside founders on an equal common-share footing. The Qualified IPO definition must be realistic — an unrealistically high valuation or IRR threshold gives investors a contractual right to block a legitimate listing.',
    tsPosition:
      'Accept automatic conversion. Term sheet should specify the Qualified IPO threshold: minimum raise size (e.g. INR 500Cr) and listing on NSE/BSE Mainboard. Do not agree to IRR-linked Qualified IPO thresholds.',
    founderPosition:
      'Accept automatic conversion — it is standard. Ensure the Qualified IPO threshold is realistic for the Indian market. Resist IRR or valuation floors in the Qualified IPO definition: these give investors a veto over a legitimate listing.',
    investorPosition:
      'Automatic conversion at IPO is acceptable. May push for an IRR or valuation floor in the Qualified IPO definition to ensure the IPO represents a successful exit, not just a listing.',
    marketPractice:
      'Automatic conversion of all preferred instruments at a Qualified IPO is standard in all Indian VC deals. Manual conversion requiring investor consent is non-standard.',
    marketStandard: true,
    risk: 'low',
    keywords: ['conversion', 'IPO', 'preferred', 'automatic', 'qualified IPO', 'listing', 'NSE', 'BSE', 'CCPS'],
    negotiationTips:
      'Standard clause — accept without major pushback. The one point worth fighting on is the Qualified IPO definition: keep it clean (size and exchange only). Any IRR or valuation floor in the Qualified IPO definition is a disguised investor exit right and should be removed.',
    shaNote:
      'Conversion mechanics (ratio, price, anti-dilution adjustments on conversion), voluntary conversion rights, and Qualified IPO definition are detailed in the SHA and investment agreement.',
    legalFlag:
      'Conversion of CCPS to equity shares at IPO is not a taxable transfer under Section 47(xb) of the Income Tax Act 1961. For foreign investors, conversion of CCPS or CCD to equity shares at IPO requires filing a revised FC-GPR or FC-TRS (as applicable) with the RBI via the FIRMS portal. Under SEBI ICDR Regulations 2018, all preferred shares must be converted to equity before filing the Draft Red Herring Prospectus (DRHP) — mandatory pre-IPO restructuring. The conversion ratio and any anti-dilution adjustments must be resolved before DRHP filing so the final equity cap table is clean.',
    tier: 'All investor tiers.',
    sortOrder: 11,
    sectionRisk: 'medium',
    narrativeSummary:
      'Conversion rights govern how preferred shares — whether CCPS or another instrument — turn into ordinary equity shares. In India, the standard approach is automatic conversion: all preferred shares convert to equity at a Qualified IPO, or whenever a supermajority of preferred shareholders votes in favour of conversion, putting every investor on the same equal common-share footing as the founders going into the listing. This is reasonable and expected, since SEBI regulations actually require all preferred shares to be converted to equity before the IPO paperwork can even be filed, so resisting conversion isn\'t really an option once an IPO is genuinely on the table. Where this becomes problematic is in how "Qualified IPO" gets defined: if the term sheet attaches an unrealistically high valuation or a minimum IRR threshold to that definition, the investor effectively gains a contractual veto over a legitimate listing, since the company could complete a real IPO that simply doesn\'t clear the investor\'s return bar. The standard response is to accept automatic conversion without much friction, but keep the Qualified IPO definition clean and objective, anchored to a minimum raise size and a recognised exchange listing rather than a return threshold.',
  },

];

// ── HELPER FUNCTIONS ────────────────────────────────────────────────

// Get all unique section names
export function getAllSections(): string[] {
  return [...new Set(clauseChunks.map((c) => c.section))];
}

// Get all unique clause types (alias for getAllSections)
export function getAllClauseTypes(): string[] {
  return [...new Set(clauseChunks.map((c) => c.clauseType))];
}

// Get clauses by section name
export function getBySection(section: string): ClauseChunk[] {
  return clauseChunks.filter((c) => c.section === section);
}

// Search function: match query against clause keywords, title, content
// Accepts optional mode parameter (used by playbook.ts)
export function searchClauses(query: string, mode?: string): ClauseChunk[] {
  const q = query.toLowerCase();
  const scored = clauseChunks.map((chunk) => {
    let score = 0;
    if (chunk.clauseType.toLowerCase().includes(q)) score += 10;
    if (chunk.title.toLowerCase().includes(q)) score += 8;
    if (chunk.section.toLowerCase().includes(q)) score += 8;
    chunk.keywords.forEach((kw) => {
      if (q.includes(kw.toLowerCase()) || kw.toLowerCase().includes(q)) score += 5;
    });
    if (chunk.content.toLowerCase().includes(q)) score += 3;
    if (chunk.tsPosition.toLowerCase().includes(q)) score += 2;
    if (chunk.founderPosition.toLowerCase().includes(q)) score += 2;
    if (chunk.investorPosition.toLowerCase().includes(q)) score += 2;
    if (chunk.legalFlag?.toLowerCase().includes(q)) score += 3;
    // Boost critical/high risk items so lawyers see them
    if (chunk.risk === 'critical') score += 2;
    if (chunk.risk === 'high') score += 1;
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => ({ ...s.chunk, score: s.score }))
    .slice(0, 5);
}
