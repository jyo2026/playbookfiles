import React, { useState } from 'react';
import type { ClauseChunk } from '@/lib/clauseDatabase';

type Tab = 'summary' | 'india-law';
type Mode = 'founder' | 'investor';

interface ClauseViewerProps {
  section: string;
  clauses: ClauseChunk[];
  mode: Mode;
}

const RISK_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: '#fef2f2', text: '#b91c1c', label: 'Critical risk' },
  high:     { bg: '#fff7ed', text: '#c2410c', label: 'High risk' },
  medium:   { bg: '#eff6ff', text: '#1d4ed8', label: 'Medium risk' },
  low:      { bg: '#f0fdf4', text: '#15803d', label: 'Low risk' },
};

export default function ClauseViewer({ section, clauses, mode }: ClauseViewerProps) {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  // Representative clause for header info: prefer the clause that carries a
  // narrative summary (the canonical demo-style explanation), falling back to
  // the lowest-risk (most standard) clause in the section.
  const order: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  const withNarrative = clauses.find(c => c.narrativeSummary);
  const rep = withNarrative ?? [...clauses].sort((a, b) => order[a.risk] - order[b.risk])[0];

  if (!rep) return null;

  // Left-tab display risk prefers the curated sectionRisk override (founder-facing risk level
  // for the section as a whole) over the individual representative clause's own risk field.
  const displayRisk = rep.sectionRisk ?? rep.risk;
  const riskStyle = RISK_COLORS[displayRisk] ?? RISK_COLORS.low;

  return (
    <div>
      {/* Eyebrow */}
      <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Clause Overview
      </p>

      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', margin: 0, letterSpacing: '-0.01em' }}>
          {section}
        </h1>
        <span style={{
          padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
          backgroundColor: '#111827', color: '#ffffff',
        }}>
          {mode === 'founder' ? 'Founder counsel' : 'Investor counsel'}
        </span>
      </div>

      {/* Risk badge */}
      <span style={{
        display: 'inline-block', padding: '3px 10px', borderRadius: 999,
        fontSize: 12, fontWeight: 600, marginBottom: 24,
        backgroundColor: riskStyle.bg, color: riskStyle.text,
      }}>
        {riskStyle.label}
      </span>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: 28 }}>
        {([
          { id: 'summary', label: 'Summary' },
          { id: 'india-law', label: 'Indian law' },
        ] as { id: Tab; label: string }[]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 0', marginRight: 28, background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: activeTab === tab.id ? 700 : 400,
              color: activeTab === tab.id ? '#111827' : '#9ca3af',
              borderBottom: activeTab === tab.id ? '2px solid #111827' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary tab */}
      {activeTab === 'summary' && (
        <div>
          {/* Narrative explanation — flowing prose, demo style */}
          <div style={{ backgroundColor: '#f9fafb', borderRadius: 12, padding: '28px 30px', marginBottom: 28, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 16, color: '#1f2937', lineHeight: 1.8, margin: 0, whiteSpace: 'pre-line' }}>
              {rep.narrativeSummary ?? `${rep.content}\n\n${rep.marketPractice}`}
            </p>
          </div>

          {/* Example SHA Language */}
          {rep.sampleClause && (
            <div style={{ marginTop: 28, marginBottom: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                Example SHA Language
              </p>
              <div style={{ backgroundColor: '#f9fafb', borderRadius: 8, padding: '16px 18px', fontFamily: 'monospace', fontSize: 13, color: '#374151', lineHeight: 1.7, border: '1px solid #e5e7eb' }}>
                {rep.sampleClause}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 40, paddingTop: 20, borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setActiveTab('india-law')}
              style={{ padding: '10px 20px', borderRadius: 8, backgroundColor: '#111827', color: '#ffffff', border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            >
              Indian law →
            </button>
          </div>
        </div>
      )}

      {/* India law tab */}
      {activeTab === 'india-law' && (
        <div>
          {/* Statutory references header */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>
              <span style={{ fontWeight: 600, color: mode === 'founder' ? '#15803d' : '#374151' }}>
                {mode === 'founder' ? 'Founder counsel' : 'Investor counsel'}
              </span>
              {rep.legalFlag && (
                <span style={{ color: '#9ca3af' }}> · Companies Act 2013 · FEMA NDI Rules 2019</span>
              )}
            </p>
          </div>

          {clauses.map(clause => (
            clause.legalFlag ? (
              <div key={clause.id} style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: '0 0 10px' }}>{clause.title}</h3>
                <div style={{ backgroundColor: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: 8, padding: '16px 18px' }}>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>{clause.legalFlag}</p>
                </div>
                {clause.fallAway && (
                  <div style={{ marginTop: 12, backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 16px' }}>
                    <p style={{ fontSize: 13, color: '#92400e', margin: 0, lineHeight: 1.6 }}>
                      <strong>Fall-away threshold:</strong> {clause.tier ?? 'Rights may lapse when investor shareholding drops below specified thresholds. Mechanics negotiated in SHA.'}
                    </p>
                  </div>
                )}
              </div>
            ) : null
          ))}

          {!clauses.some(c => c.legalFlag) && (
            <p style={{ color: '#9ca3af', fontStyle: 'italic', fontSize: 14 }}>No India-specific legal flags for this clause type.</p>
          )}

          {/* Statutory framework */}
          <div style={{ marginTop: 24, padding: '16px 18px', backgroundColor: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>Statutory Framework</p>
            <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>
              This analysis considers Companies Act 2013, FEMA NDI Rules 2019, SEBI regulations, and Indian contract law applicable to private company venture capital investments.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, paddingTop: 20, borderTop: '1px solid #e5e7eb' }}>
            <button
              onClick={() => setActiveTab('summary')}
              style={{ padding: '10px 20px', borderRadius: 8, backgroundColor: '#f3f4f6', color: '#374151', border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            >
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
