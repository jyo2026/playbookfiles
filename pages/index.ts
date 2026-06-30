import React, { useState } from 'react';
import { getAllSections, getBySection, searchClauses, type ClauseChunk } from '@/lib/clauseDatabase';
import ClauseViewer from '@/components/ClauseViewer';
import RAGAnswer from '@/components/RAGAnswer';

type Screen = 'home' | 'clause' | 'answer';
type Mode = 'founder' | 'investor';

// Clauses hidden from sidebar but available in knowledge base
const HIDDEN_SECTIONS = [
  'Statutory Thresholds',
  'AVM Schedule',
  'Dematerialisation',
  'Convertible Instruments',
];

interface PlaybookResponse {
  query: string;
  mode: Mode;
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

const RISK_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#3b82f6',
  low: '#22c55e',
};

const EXAMPLE_QUERIES = [
  'Liquidation preference',
  'Anti-dilution',
  'Put option enforceability',
  'Drag-along threshold',
];

// Group clauses by section, pick one representative per section
function getSectionList(includeHidden = false) {
  const sections = getAllSections();
  const filtered = includeHidden ? sections : sections.filter(s => !HIDDEN_SECTIONS.includes(s));
  const list = filtered.map((section) => {
    const clauses = getBySection(section);
    // Pick the clause with a narrativeSummary/sortOrder as representative (matches ClauseViewer logic);
    // fall back to highest risk if no clause in the section has been given a curated narrative yet.
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    const withSort = clauses.find(c => typeof c.sortOrder === 'number');
    const rep = withSort ?? [...clauses].sort((a, b) => order[a.risk] - order[b.risk])[0];
    const displayRisk = withSort?.sectionRisk ?? rep?.risk ?? 'low';
    return { section, risk: displayRisk, sortOrder: withSort?.sortOrder ?? 999 };
  });
  // Sections with an explicit sortOrder come first, in that order; everything else follows in original order.
  return list.sort((a, b) => a.sortOrder - b.sortOrder);
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>('home');
  const [mode, setMode] = useState<Mode>('founder');
  const [query, setQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [ragResponse, setRagResponse] = useState<PlaybookResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const sectionList = getSectionList();
  const visibleSections = sidebarExpanded ? sectionList : sectionList.slice(0, 6);
  const hiddenCount = sectionList.length - 6;

  const sidebarBg = mode === 'founder' ? '#3d5a3e' : '#3d3d3d';
  const sidebarActive = mode === 'founder' ? '#4e7250' : '#555555';

  const handleQuerySubmit = async (q: string) => {
    const finalQuery = q || query;
    if (!finalQuery.trim()) return;
    setQuery(finalQuery);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/playbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: finalQuery, mode }),
      });
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json() as PlaybookResponse;
      setRagResponse(data);
      setScreen('answer');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch answer');
    } finally {
      setLoading(false);
    }
  };

  const handleClauseClick = (section: string) => {
    setSelectedSection(section);
    setScreen('clause');
  };

  const selectedClauses = selectedSection ? getBySection(selectedSection) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#ffffff' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 24px', borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#ffffff', zIndex: 10, flexShrink: 0,
      }}>
        <span style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>For Internal Discussion Only</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setMode('founder')}
            style={{
              padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: mode === 'founder' ? 'none' : '1px solid #d1d5db',
              backgroundColor: mode === 'founder' ? '#1a1a1a' : 'transparent',
              color: mode === 'founder' ? '#ffffff' : '#6b7280',
              transition: 'all 0.15s',
            }}
          >Founder counsel</button>
          <button
            onClick={() => setMode('investor')}
            style={{
              padding: '7px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: mode === 'investor' ? 'none' : '1px solid #d1d5db',
              backgroundColor: mode === 'investor' ? '#1a1a1a' : 'transparent',
              color: mode === 'investor' ? '#ffffff' : '#6b7280',
              transition: 'all 0.15s',
            }}
          >Investor counsel</button>
          <button style={{ padding: '7px 10px', borderRadius: 6, border: '1px solid #e5e7eb', background: 'transparent', cursor: 'pointer', color: '#6b7280', fontSize: 18, lineHeight: 1 }}>···</button>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{
          width: 260, flexShrink: 0, backgroundColor: sidebarBg,
          display: 'flex', flexDirection: 'column', padding: '24px 0',
          overflowY: 'auto', transition: 'background-color 0.3s',
        }}>
          <div style={{ padding: '0 20px', marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Clauses
            </span>
          </div>
          {visibleSections.map(({ section, risk }) => {
            const isActive = selectedSection === section && screen === 'clause';
            return (
              <button
                key={section}
                onClick={() => handleClauseClick(section)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 20px', width: '100%', textAlign: 'left',
                  background: isActive ? sidebarActive : 'transparent',
                  border: 'none', cursor: 'pointer',
                  borderLeft: isActive ? '3px solid rgba(255,255,255,0.6)' : '3px solid transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: RISK_COLORS[risk], flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: isActive ? '#ffffff' : 'rgba(255,255,255,0.75)', fontWeight: isActive ? 600 : 400 }}>
                  {section}
                </span>
              </button>
            );
          })}
          {hiddenCount > 0 && (
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 20px', background: 'transparent', border: 'none',
                cursor: 'pointer', color: 'rgba(255,255,255,0.45)', fontSize: 13,
              }}
            >
              <span style={{ fontSize: 11 }}>{sidebarExpanded ? '∧' : '∨'}</span>
              {sidebarExpanded ? 'Show less' : `${hiddenCount} more clauses`}
            </button>
          )}

          {/* Risk legend */}
          <div style={{ marginTop: 'auto', padding: '20px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {Object.entries(RISK_COLORS).map(([label, color]) => (
              <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color }} />
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </span>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#ffffff' }}>

          {/* ── SCREEN 1: HOME ── */}
          {screen === 'home' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100%', padding: '60px 40px' }}>
              <h1 style={{ fontSize: 40, fontWeight: 700, color: '#111827', margin: '0 0 40px', letterSpacing: '-0.02em' }}>
                Term Sheet Playbook
              </h1>

              {/* Search bar */}
              <div style={{ width: '100%', maxWidth: 580, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #d1d5db', borderRadius: 12, padding: '4px 4px 4px 16px', backgroundColor: '#ffffff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <span style={{ color: '#9ca3af', fontSize: 16, marginRight: 10 }}>🔍</span>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleQuerySubmit(query); }}
                    placeholder='"When does fall-away threshold apply?"'
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, color: '#374151', backgroundColor: 'transparent', padding: '8px 0' }}
                  />
                  <button
                    onClick={() => handleQuerySubmit(query)}
                    disabled={loading || !query.trim()}
                    style={{
                      padding: '10px 20px', borderRadius: 8, border: 'none',
                      backgroundColor: loading || !query.trim() ? '#d1d5db' : '#4e7250',
                      color: '#ffffff', fontWeight: 700, fontSize: 14, cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    {loading ? 'Asking...' : <>Ask <span style={{ fontSize: 12 }}>↗</span></>}
                  </button>
                </div>
                {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>{error}</p>}
              </div>

              {/* Example chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', maxWidth: 580 }}>
                {EXAMPLE_QUERIES.map(q => (
                  <button
                    key={q}
                    onClick={() => handleQuerySubmit(q)}
                    style={{
                      padding: '7px 16px', borderRadius: 999, border: '1px solid #d1d5db',
                      backgroundColor: '#ffffff', color: '#374151', fontSize: 13, cursor: 'pointer',
                      fontWeight: 500, transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#9ca3af'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#d1d5db'}
                  >
                    {q}
                  </button>
                ))}
              </div>


              {/* Footer */}
              <div style={{ position: 'absolute', bottom: 20, fontSize: 12, color: '#9ca3af' }}>
                Companies Act 2013 · FEMA
              </div>
            </div>
          )}

          {/* ── SCREEN 2: CLAUSE DETAIL ── */}
          {screen === 'clause' && selectedSection && (
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 40px' }}>
              {/* Back */}
              <button
                onClick={() => { setScreen('home'); setSelectedSection(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 13, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
              >
                ← Back
              </button>
              <ClauseViewer section={selectedSection} clauses={selectedClauses} mode={mode} />
            </div>
          )}

          {/* ── SCREEN 3: RAG ANSWER ── */}
          {screen === 'answer' && ragResponse && (
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 40px' }}>
              <button
                onClick={() => { setScreen('home'); setRagResponse(null); setQuery(''); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 13, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
              >
                ← New query
              </button>
              <RAGAnswer response={ragResponse} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
