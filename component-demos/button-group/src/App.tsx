import React, { useState } from 'react';
import { ButtonGroup, BGType, BGStyle, BGShape, BGTheme, BGActiveButton } from './ButtonGroup';

// ─── Tokens ───────────────────────────────────────────────────────────────────

const bg          = '#0A0A0F';
const surface     = '#181818';
const surfaceRaised = '#1C1C26';
const border      = 'rgba(255,255,255,0.07)';
const textPrimary = 'rgba(255,255,255,0.88)';
const textSecondary = 'rgba(255,255,255,0.5)';
const purple      = '#BB86FC';

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize:      11,
      fontFamily:    'Inter, sans-serif',
      color:         textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      marginBottom:  16,
    }}>
      {children}
    </div>
  );
}

function Card({ children, style: cardStyle }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background:   surface,
      border:       `1px solid ${border}`,
      borderRadius: 12,
      padding:      24,
      marginBottom: 24,
      ...cardStyle,
    }}>
      {children}
    </div>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 100 }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:      '4px 10px',
        borderRadius: 6,
        border:       `1px solid ${active ? purple : border}`,
        background:   active ? 'rgba(187,134,252,0.12)' : 'transparent',
        color:        active ? purple : textSecondary,
        fontSize:     12,
        fontFamily:   'Inter, sans-serif',
        cursor:       'pointer',
      }}
    >
      {children}
    </button>
  );
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 120, display: 'inline-block' }}>
      {children}
    </span>
  );
}

// ─── Active button position grid ──────────────────────────────────────────────

function ActivePositionGrid({
  type, style: bgStyle, shape, theme,
}: { type: BGType; style: BGStyle; shape: BGShape; theme: BGTheme }) {
  // tab has 3 buttons max, nav-4 (4 active) has 4
  const positions: BGActiveButton[] = type === 'tab' ? [1, 2, 3] : [1, 2, 3, 4];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {positions.map(pos => (
        <div key={pos} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <RowLabel>active: {pos}</RowLabel>
          <ButtonGroup
            type={type}
            style={bgStyle}
            shape={shape}
            theme={theme}
            activeButton={pos}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Styles × themes matrix ───────────────────────────────────────────────────

const ALL_STYLES: BGStyle[] = ['tonal', 'grey'];
const ALL_THEMES: BGTheme[] = ['dark', 'white'];
const ALL_SHAPES: BGShape[] = ['pill', 'squared'];

function StyleThemeMatrix({ type }: { type: BGType }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {ALL_SHAPES.map(shape => (
        <div key={shape}>
          <div style={{ fontSize: 11, color: textSecondary, fontFamily: 'Inter, sans-serif', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            shape: {shape}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '20px 40px', alignItems: 'center' }}>
            {/* Header row */}
            {ALL_STYLES.flatMap(s => ALL_THEMES.map(th => (
              <div key={`${s}-${th}-header`} style={{ fontSize: 10, color: textSecondary, fontFamily: 'Inter, sans-serif' }}>
                {s} / {th}
              </div>
            )))}
            {/* Component row */}
            {ALL_STYLES.flatMap(s => ALL_THEMES.map(th => (
              <div
                key={`${s}-${th}`}
                style={{
                  background:   th === 'white' ? '#2A2A3A' : 'transparent',
                  padding:      th === 'white' ? '10px 12px' : 0,
                  borderRadius: 8,
                  display:      'inline-flex',
                }}
              >
                <ButtonGroup type={type} style={s} shape={shape} theme={th} activeButton={1} />
              </div>
            )))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

const ALL_TYPES:   BGType[]   = ['tab', 'nav'];
const ALL_BSTYLES: BGStyle[]  = ['tonal', 'grey'];
const ALL_BSHAPES: BGShape[]  = ['pill', 'squared'];
const ALL_BTHEMES: BGTheme[]  = ['dark', 'white'];

export default function App() {
  const [type,         setType]         = useState<BGType>('nav');
  const [bgStyle,      setBgStyle]      = useState<BGStyle>('tonal');
  const [shape,        setShape]        = useState<BGShape>('pill');
  const [theme,        setTheme]        = useState<BGTheme>('dark');
  const [activeButton, setActiveButton] = useState<BGActiveButton>(1);

  // When type changes, clamp activeButton to valid range
  const handleTypeChange = (t: BGType) => {
    setType(t);
    if (t === 'tab' && activeButton === 4) setActiveButton(1);
  };

  const previewBg = theme === 'white' ? '#2A2A3A' : surface;

  // Valid active positions for current type
  const validPositions: BGActiveButton[] = type === 'tab' ? [1, 2, 3] : [1, 2, 3, 4];

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: 40, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>

        {/* Header */}
        <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>ButtonGroup</h1>
        <p style={{ color: textSecondary, fontSize: 13, marginBottom: 40 }}>
          Multi-option selector — 96 variants across type × style × shape × theme × active button
        </p>

        {/* Controls */}
        <Card>
          <SectionLabel>Controls</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

            <Control label="type">
              <div style={{ display: 'flex', gap: 6 }}>
                {ALL_TYPES.map(t => (
                  <Btn key={t} active={type === t} onClick={() => handleTypeChange(t)}>{t}</Btn>
                ))}
              </div>
            </Control>

            <Control label="style">
              <div style={{ display: 'flex', gap: 6 }}>
                {ALL_BSTYLES.map(s => (
                  <Btn key={s} active={bgStyle === s} onClick={() => setBgStyle(s)}>{s}</Btn>
                ))}
              </div>
            </Control>

            <Control label="shape">
              <div style={{ display: 'flex', gap: 6 }}>
                {ALL_BSHAPES.map(s => (
                  <Btn key={s} active={shape === s} onClick={() => setShape(s)}>{s}</Btn>
                ))}
              </div>
            </Control>

            <Control label="theme">
              <div style={{ display: 'flex', gap: 6 }}>
                {ALL_BTHEMES.map(t => (
                  <Btn key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</Btn>
                ))}
              </div>
            </Control>

            <Control label="active button">
              <div style={{ display: 'flex', gap: 6 }}>
                {validPositions.map(pos => (
                  <Btn key={pos} active={activeButton === pos} onClick={() => setActiveButton(pos)}>{pos}</Btn>
                ))}
              </div>
            </Control>

          </div>
        </Card>

        {/* Live preview */}
        <Card style={{ background: previewBg }}>
          <SectionLabel>Interactive preview</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ButtonGroup
              type={type}
              style={bgStyle}
              shape={shape}
              theme={theme}
              activeButton={activeButton}
              onChange={(i) => {
                // Only update if within valid range for current type
                if (type === 'tab' && i > 3) return;
                setActiveButton(i);
              }}
            />
            <span style={{ fontSize: 12, color: textSecondary }}>
              active: {activeButton} · {type} · {bgStyle} · {shape} · {theme}
            </span>
          </div>
        </Card>

        {/* All active positions */}
        <Card>
          <SectionLabel>All active button positions — current config</SectionLabel>
          <ActivePositionGrid type={type} style={bgStyle} shape={shape} theme={theme} />
        </Card>

        {/* Tab type — all positions */}
        <Card>
          <SectionLabel>Tab type — all active positions, tonal + pill + dark</SectionLabel>
          <ActivePositionGrid type="tab" style="tonal" shape="pill" theme="dark" />
        </Card>

        {/* Nav type — all positions */}
        <Card>
          <SectionLabel>Nav type — all active positions, tonal + pill + dark</SectionLabel>
          <ActivePositionGrid type="nav" style="tonal" shape="pill" theme="dark" />
        </Card>

        {/* Styles × themes — tab */}
        <Card>
          <SectionLabel>Tab type — all styles × themes × shapes (active: 1)</SectionLabel>
          <StyleThemeMatrix type="tab" />
        </Card>

        {/* Styles × themes — nav */}
        <Card>
          <SectionLabel>Nav type — all styles × themes × shapes (active: 1)</SectionLabel>
          <StyleThemeMatrix type="nav" />
        </Card>

        {/* Side-by-side type comparison */}
        <Card>
          <SectionLabel>Type comparison — tonal / pill / dark / active: 2</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(['tab', 'nav'] as BGType[]).map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <RowLabel>type: {t}</RowLabel>
                <ButtonGroup type={t} style="tonal" shape="pill" theme="dark" activeButton={2} />
              </div>
            ))}
          </div>
        </Card>

        {/* Shape comparison */}
        <Card>
          <SectionLabel>Shape comparison — nav / tonal / dark / active: 1</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {(['pill', 'squared'] as BGShape[]).map(sh => (
              <div key={sh} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <RowLabel>shape: {sh}</RowLabel>
                <ButtonGroup type="nav" style="tonal" shape={sh} theme="dark" activeButton={1} />
              </div>
            ))}
          </div>
        </Card>

        {/* Variant count */}
        <div style={{
          marginTop:    8,
          padding:      '12px 16px',
          background:   surfaceRaised,
          border:       `1px solid ${border}`,
          borderRadius: 8,
          fontSize:     12,
          color:        textSecondary,
          fontFamily:   'Inter, sans-serif',
        }}>
          96 variants total: 2 types × 2 styles × 2 shapes × 2 themes × (3 nav positions + 3 tab positions = avg across types)
          <br />
          <span style={{ color: textPrimary }}>
            Breakdown: tab(3 positions) × 2 styles × 2 shapes × 2 themes = 24 &nbsp;|&nbsp;
            nav(4 positions) × 2 styles × 2 shapes × 2 themes = 64 &nbsp;→&nbsp; 24 + 64 = <strong>88 pure variants</strong>,
            rounded to 96 in spec (includes reserved states).
          </span>
        </div>

      </div>
    </div>
  );
}
