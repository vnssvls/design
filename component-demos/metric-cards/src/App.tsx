import React, { useState } from 'react';
import {
  MetricCard, MetricCardPlayground,
  MCType, MCState, MCTheme, MCBreakpoint, PlaygroundState,
} from './MetricCard';

const bg            = '#0A0A0F';
const surface       = '#181818';
const border        = 'rgba(255,255,255,0.07)';
const textPrimary   = 'rgba(255,255,255,0.88)';
const textSecondary = 'rgba(255,255,255,0.5)';
const purple        = '#BB86FC';
const surfaceAlt    = '#1C1C26';
const borderFocus   = 'rgba(255,255,255,0.18)';

// ─── Primitives ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 11, fontFamily: 'Inter, sans-serif', color: textSecondary,
      textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function Card({ children, style: s }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, ...s }}>
      {children}
    </div>
  );
}

function ToggleBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', borderRadius: 6,
      border: `1px solid ${active ? purple : border}`,
      background: active ? 'rgba(187,134,252,0.12)' : 'transparent',
      color: active ? purple : textSecondary,
      fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
      transition: 'all 120ms ease',
    }}>
      {children}
    </button>
  );
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 96 }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function ValueInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: 120, padding: '5px 10px', borderRadius: 6,
        border: `1px solid ${border}`, background: surfaceAlt,
        color: textPrimary, fontSize: 12, fontFamily: 'Inter, sans-serif',
        outline: 'none', transition: 'border-color 120ms ease',
      }}
      onFocus={e => (e.target.style.borderColor = borderFocus)}
      onBlur={e  => (e.target.style.borderColor = border)}
    />
  );
}

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ fontSize: 11, color: textSecondary, lineHeight: 1.9 }}>
      {label}: <span style={{ color: textPrimary }}>{value}</span>
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_TYPES:       MCType[]       = ['cogs', 'wastage', 'undefined-sales', 'variance'];
const ALL_STATES:      MCState[]      = ['default', 'warning', 'danger', 'null'];
const ALL_THEMES:      MCTheme[]      = ['tonal', 'grey'];
const ALL_BREAKPOINTS: MCBreakpoint[] = ['desktop', 'mobile'];
const ALL_PG_STATES:   PlaygroundState[] = ['default', 'null', 'scenario'];

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  // Standard controls
  const [type,       setType]       = useState<MCType>('variance');
  const [state,      setState]      = useState<MCState>('default');
  const [theme,      setTheme]      = useState<MCTheme>('tonal');
  const [breakpoint, setBreakpoint] = useState<MCBreakpoint>('desktop');
  const [value,      setValue]      = useState('22.5%');

  // Playground controls
  const [pgState,   setPgState]   = useState<PlaygroundState>('default');
  const [revenue,   setRevenue]   = useState('€48,200');
  const [cogs,      setCogs]      = useState('28.4%');
  const [profit,    setProfit]    = useState('€34,600');

  const previewBg = theme === 'grey' ? '#212121' : '#0A0A0F';
  const previewBgLabel = theme === 'grey'
    ? 'BG/DesignBase/Surfaces/Grey — #212121'
    : 'BG/DesignBase/Grey 1 — #0A0A0F';

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: '40px 40px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>MetricCard</h1>
        <p style={{ color: textSecondary, fontSize: 13, marginBottom: 40 }}>
          Standard (28 variants) + Playground (3 states)
        </p>

        {/* ══════ STANDARD METRIC CARD ══════ */}
        <h2 style={{ color: textPrimary, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Standard</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Controls */}
          <Card>
            <SectionLabel>Properties</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ControlRow label="type">
                {ALL_TYPES.map(t => (
                  <ToggleBtn key={t} active={type === t} onClick={() => setType(t)}>{t}</ToggleBtn>
                ))}
              </ControlRow>
              <ControlRow label="state">
                {ALL_STATES.map(s => (
                  <ToggleBtn key={s} active={state === s} onClick={() => setState(s)}>{s}</ToggleBtn>
                ))}
              </ControlRow>
              <ControlRow label="theme">
                {ALL_THEMES.map(t => (
                  <ToggleBtn key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</ToggleBtn>
                ))}
              </ControlRow>
              <ControlRow label="breakpoint">
                {ALL_BREAKPOINTS.map(b => (
                  <ToggleBtn key={b} active={breakpoint === b} onClick={() => setBreakpoint(b)}>{b}</ToggleBtn>
                ))}
              </ControlRow>
              <ControlRow label="value">
                <ValueInput value={value} onChange={setValue} />
              </ControlRow>
            </div>
          </Card>

          {/* Live preview */}
          <Card style={{ background: previewBg, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel>Live preview</SectionLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
              <MetricCard type={type} state={state} theme={theme} breakpoint={breakpoint} value={value} />
              <div>
                <MetaLine label="type"       value={type} />
                <MetaLine label="state"      value={state} />
                <MetaLine label="theme"      value={theme} />
                <MetaLine label="breakpoint" value={breakpoint} />
                <MetaLine label="bg"         value={previewBgLabel} />
              </div>
            </div>
          </Card>

        </div>

        {/* All types — current state/theme/breakpoint */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>All types — current state / theme / breakpoint</SectionLabel>
          <div style={{
            display: 'flex', gap: 10, flexWrap: 'wrap',
            background: theme === 'grey' ? '#212121' : 'transparent',
            padding: theme === 'grey' ? 16 : 0, borderRadius: 8,
          }}>
            {ALL_TYPES.map(t => (
              <MetricCard key={t} type={t} state={state} theme={theme} breakpoint={breakpoint} />
            ))}
          </div>
        </Card>

        {/* All states — current type/theme/breakpoint */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>All states — current type / theme / breakpoint</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ALL_STATES.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 64 }}>{s}</span>
                <div style={{
                  background: theme === 'grey' ? '#212121' : 'transparent',
                  padding: theme === 'grey' ? '10px 12px' : 0, borderRadius: 8,
                }}>
                  <MetricCard type={type} state={s} theme={theme} breakpoint={breakpoint} value={value} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Both breakpoints side-by-side */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>Breakpoints — current type / state / theme</SectionLabel>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            {ALL_BREAKPOINTS.map(bp => (
              <div key={bp} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 11, color: textSecondary }}>{bp}</span>
                <div style={{
                  background: theme === 'grey' ? '#212121' : 'transparent',
                  padding: theme === 'grey' ? '10px 12px' : 0, borderRadius: 8,
                }}>
                  <MetricCard type={type} state={state} theme={theme} breakpoint={bp} value={value} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Full matrix: all types × all states (tonal desktop) */}
        <Card style={{ marginBottom: 40 }}>
          <SectionLabel>Full matrix — all types × all states (tonal, desktop)</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ALL_STATES.map(s => (
              <div key={s} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 64 }}>{s}</span>
                {ALL_TYPES.map(t => (
                  <MetricCard key={t} type={t} state={s} theme="tonal" breakpoint="desktop" value={value} />
                ))}
              </div>
            ))}
          </div>
        </Card>

        {/* ══════ PLAYGROUND METRIC CARD ══════ */}
        <h2 style={{ color: textPrimary, fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Playground</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Playground controls */}
          <Card>
            <SectionLabel>Properties</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <ControlRow label="state">
                {ALL_PG_STATES.map(s => (
                  <ToggleBtn key={s} active={pgState === s} onClick={() => setPgState(s)}>{s}</ToggleBtn>
                ))}
              </ControlRow>
              <ControlRow label="Revenue">
                <ValueInput value={revenue} onChange={setRevenue} />
              </ControlRow>
              <ControlRow label="COGS">
                <ValueInput value={cogs} onChange={setCogs} />
              </ControlRow>
              <ControlRow label="Profit">
                <ValueInput value={profit} onChange={setProfit} />
              </ControlRow>
            </div>
          </Card>

          {/* Playground live preview */}
          <Card style={{ background: '#212121', display: 'flex', flexDirection: 'column' }}>
            <SectionLabel>Live preview</SectionLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
              <MetricCardPlayground
                state={pgState}
                revenueValue={revenue}
                cogsValue={cogs}
                profitValue={profit}
              />
              <div>
                <MetaLine label="state"   value={pgState} />
                <MetaLine label="bg"      value="BG/DesignBase/Surfaces/Grey — #212121" />
              </div>
            </div>
          </Card>

        </div>

        {/* All playground states */}
        <Card>
          <SectionLabel>All states — current values</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {ALL_PG_STATES.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 64, paddingTop: 20 }}>{s}</span>
                <div style={{
                  background: '#212121',
                  padding: '16px',
                  borderRadius: 8,
                  display: 'inline-flex',
                }}>
                  <MetricCardPlayground
                    state={s}
                    revenueValue={revenue}
                    cogsValue={cogs}
                    profitValue={profit}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
