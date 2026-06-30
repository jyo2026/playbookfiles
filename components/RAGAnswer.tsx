import React, { useState } from 'react';
import type { ClauseChunk } from '@/lib/clauseDatabase';

type Tab = 'summary' | 'positions' | 'market-practice' | 'alternatives' | 'india-legal';

interface PlaybookResponse {
  query: string;
  mode: 'founder' | 'investor';
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

interface RAGAnswerProps {
  response: PlaybookResponse;
}

// Returns the value only if it is non-null, non-empty, and not the literal string "null"
const v = (s: string | null | undefined): string | null =>
  s && s !== 'null' && s.trim() !== '' ? s : null;

const RISK_COLORS: Record<string, { text: string; bg: string }> = {
  critical: { text: '#b91c1c', bg: '#fef2f2' },
  high: { text: '#c2410c', bg: '#fff7ed' },
  medium: { text: '#1d4ed8', bg: '#eff6ff' },
  low: { text: '#15803d', bg: '#f0fdf4' },
};

export default function RAGAnswer({ response }: RAGAnswerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  const hasRetrievedClauses = response.retrievedChunks && response.retrievedChunks.length > 0;
  const primaryClause = hasRetrievedClauses ? response.retrievedChunks[0] : null;

  // Detect out-of-scope: no chunks, or summary signals it is out of scope
  const summaryText = response.playbook.summary ?? '';
  const isOutOfScope =
    !hasRetrievedClauses ||
    !v(summaryText) ||
    summaryText.toLowerCase().includes('outside the scope') ||
    summaryText.toLowerCase().includes('cannot be answered') ||
    summaryText.toLowerCase().includes('not within the scope') ||
    summaryText.toLowerCase().includes('does not fall within') ||
    summaryText.toLowerCase().includes('is not covered');

  // ── OUT-OF-SCOPE or META-QUERY: show only summary, no tabs ──
  if (isOutOfScope) {
    return (
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Term Sheet Playbook
        </p>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          {response.query}
        </h1>

        <div style={{ backgroundColor: '#f9fafb', borderRadius: 8, padding: '24px', border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: 0 }}>
            {v(summaryText) ?? 'This query is outside the scope of the Term Sheet Playbook. Please ask about a specific clause or provision.'}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40, paddingTop: 20, borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={() => (window.location.href = '/')}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              backgroundColor: '#111827',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            New query →
          </button>
        </div>
      </div>
    );
  }

  // ── IN-SCOPE CLAUSE QUERY: full tabbed view ──
  const riskStyle = RISK_COLORS[primaryClause!.risk] || RISK_COLORS.low;

  return (
    <div>
      {/* Header */}
      <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Term Sheet Playbook
      </p>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.01em' }}>
          {primaryClause!.title}
        </h1>
        <span
          style={{
            padding: '4px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 600,
            backgroundColor: '#111827',
            color: '#ffffff',
          }}
        >
          {response.mode === 'founder' ? 'Founder counsel' : 'Investor counsel'}
        </span>
      </div>

      {/* Risk badge */}
      <span
        style={{
          display: 'inline-block',
          padding: '3px 10px',
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          marginBottom: 24,
          backgroundColor: riskStyle.bg,
          color: riskStyle.text,
        }}
      >
        {primaryClause!.risk} risk
      </span>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: 28 }}>
        {(
          [
            { id: 'summary', label: 'Summary' },
            { id: 'positions', label: 'Positions' },
            { id: 'market-practice', label: 'Market practice' },
            { id: 'alternatives', label: 'Alternatives' },
            { id: 'india-legal', label: 'India legal' },
          ] as { id: Tab; label: string }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 0',
              marginRight: 28,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeTab === tab.id ? 700 : 400,
              color: activeTab === tab.id ? '#111827' : '#9ca3af',
              borderBottom: activeTab === tab.id ? '2px solid #111827' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── SUMMARY TAB ── */}
      {activeTab === 'summary' && (
        <div>
          {v(response.playbook.summary) && (
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: '0 0 24px' }}>
              {response.playbook.summary}
            </p>
          )}

          {v(response.playbook.marketPractice) && (
            <div style={{ backgroundColor: '#f9fafb', borderRadius: 8, padding: '16px 18px', marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>
                Market practice
              </p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                {response.playbook.marketPractice}
              </p>
            </div>
          )}

          {response.playbook.redFlags && response.playbook.redFlags.filter(f => v(f)).length > 0 && (
            <div style={{ marginBottom: 24 }}>
              {response.playbook.redFlags.filter(f => v(f)).map((flag, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: 8,
                    padding: '14px 16px',
                    marginBottom: 10,
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, color: '#991b1b', lineHeight: 1.6 }}>
                    <span style={{ marginRight: 8 }}>⊘</span>
                    {flag}
                  </p>
                </div>
              ))}
            </div>
          )}

          {response.playbook.yellowFlags && response.playbook.yellowFlags.filter(f => v(f)).length > 0 && (
            <div>
              {response.playbook.yellowFlags.filter(f => v(f)).map((flag, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: 8,
                    padding: '14px 16px',
                    marginBottom: 10,
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fde68a',
                  }}
                >
                  <p style={{ margin: 0, fontSize: 14, color: '#92400e', lineHeight: 1.6 }}>
                    <span style={{ marginRight: 8 }}>△</span>
                    {flag}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── POSITIONS TAB ── */}
      {activeTab === 'positions' && (
        <div>
          {v(response.playbook.primaryPosition) && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>
                Your position — {response.mode} counsel
              </p>
              <div style={{ backgroundColor: response.mode === 'founder' ? '#f0fdf4' : '#eff6ff', borderRadius: 8, padding: '16px 18px' }}>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                  {response.playbook.primaryPosition}
                </p>
              </div>
            </div>
          )}

          {v(response.playbook.tsPosition) && (
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>
                Term sheet position
              </p>
              <div style={{ backgroundColor: '#faf5ff', borderRadius: 8, padding: '16px 18px' }}>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                  {response.playbook.tsPosition}
                </p>
              </div>
            </div>
          )}

          {v(response.playbook.opposingPosition) && (
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>
                What {response.mode === 'founder' ? 'investor' : 'founder'} counsel will argue
              </p>
              <div style={{ backgroundColor: '#f9fafb', borderRadius: 8, padding: '16px 18px' }}>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                  {response.playbook.opposingPosition}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── MARKET PRACTICE TAB ── */}
      {activeTab === 'market-practice' && (
        <div>
          {v(response.playbook.marketPractice) && (
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: 0 }}>
              {response.playbook.marketPractice}
            </p>
          )}

          {v(response.playbook.shaNote) && (
            <div style={{ marginTop: 28, backgroundColor: '#f0f9ff', borderRadius: 8, padding: '16px 18px', border: '1px solid #bae6fd' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#0369a1', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                SHA / SSA Stage
              </p>
              <p style={{ fontSize: 14, color: '#0c4a6e', margin: 0, lineHeight: 1.6 }}>
                {response.playbook.shaNote}
              </p>
            </div>
          )}

          {response.playbook.negotiationSteps && response.playbook.negotiationSteps.filter(s => v(s)).length > 0 && (
            <div style={{ marginTop: 28 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                Negotiation Steps
              </p>
              {response.playbook.negotiationSteps.filter(s => v(s)).map((step, idx) => (
                <div key={idx} style={{ marginBottom: 10, fontSize: 14, color: '#374151', lineHeight: 1.6 }}>
                  <strong>Step {idx + 1}:</strong> {step}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ALTERNATIVES TAB ── */}
      {activeTab === 'alternatives' && (
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>
            Related Clauses
          </p>

          {primaryClause ? (
            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px 18px' }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '0 0 8px' }}>
                {primaryClause.title}
              </h4>
              <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 12px' }}>
                {primaryClause.section} · <span style={{ color: riskStyle.text, fontWeight: 600 }}>{primaryClause.risk.toUpperCase()}</span>
              </p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }}>
                {primaryClause.content.substring(0, 250)}...
              </p>
            </div>
          ) : (
            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No related clauses found.</p>
          )}
        </div>
      )}

      {/* ── INDIA LEGAL TAB ── */}
      {activeTab === 'india-legal' && (
        <div>
          {primaryClause?.legalFlag ? (
            <>
              <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 8, padding: '16px 18px', marginBottom: 24 }}>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>
                  {primaryClause.legalFlag}
                </p>
              </div>

              <div style={{ marginTop: 24, padding: '16px 18px', backgroundColor: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>
                  Applicable Framework
                </p>
                <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
                  {v(response.playbook.legalFlag) ??
                    'This analysis considers Companies Act 2013, relevant sections, Articles of Association, and FEMA NDI Rules 2019 where applicable.'}
                </p>
              </div>
            </>
          ) : (
            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No India-specific legal flags for this clause.</p>
          )}
        </div>
      )}

      {/* Footer Navigation */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40, paddingTop: 20, borderTop: '1px solid #e5e7eb' }}>
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            backgroundColor: '#111827',
            color: '#ffffff',
            border: 'none',
            fontWeight: 600,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          New query →
        </button>
      </div>
    </div>
  );
}
