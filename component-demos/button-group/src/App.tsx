import React, { useState } from 'react';
import { ButtonGroup, BGType, BGStyle, BGShape, BGTheme, BGActiveButton } from './ButtonGroup';

const bg            = '#0A0A0F';
const surface       = '#181818';
const border        = 'rgba(255,255,255,0.07)';
const textPrimary   = 'rgba(255,255,255,0.88)';
const textSecondary = 'rgba(255,255,255,0.5)';
const purple        = '#BB86FC';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
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

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 11px', borderRadius: 6,
      border: `1px solid ${active ? purple : border}`,
      background: active ? 'rgba(187,134,252,0.12)' : 'transparent',
      color: active ? purple : textSecondary,
      fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
    }}>
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 96 }}>{label}</span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

const ALL_TYPES:   BGType[]   = ['tab', 'nav'];
const ALL_STYLES:  BGStyle[]  = ['tonal', 'grey'];
const ALL_SHAPES:  BGShape[]  = ['pill', 'squared'];
const ALL_THEMES:  BGTheme[]  = ['dark', 'white'];

export default function App() {
  const [type,    setType]    = useState<BGType>('nav');
  const [style,   setStyle]   = useState<BGStyle>('tonal');
  const [shape,   setShape]   = useState<BGShape>('pill');
  const [theme,   setTheme]   = useState<BGTheme>('dark');
  const [active,  setActive]  = useState<BGActiveButton>(1);

  const validPositions: BGActiveButton[] = type === 'tab' ? [1, 2, 3] : [1, 2, 3, 4];
  const previewBg = theme === 'white' ? '#2A2A3A' : '#1C1C26';

  const handleType = (t: BGType) => { setType(t); if (t === 'tab' && active === 4) setActive(1); };
  const handleActive = (n: BGActiveButton) => { if (type === 'tab' && n > 3) return; setActive(n); };

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: '40px 40px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>

        <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>ButtonGroup</h1>
        <p style={{ color: textSecondary, fontSize: 13, marginBottom: 32 }}>
          96 variants — type × style × shape × theme × active button
        </p>

        {/* ── Top: controls + live preview side by side ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Controls */}
          <Card>
            <SectionLabel>Controls</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Row label="type">
                {ALL_TYPES.map(t => <Btn key={t} active={type === t} onClick={() => handleType(t)}>{t}</Btn>)}
              </Row>
              <Row label="style">
                {ALL_STYLES.map(s => <Btn key={s} active={style === s} onClick={() => setStyle(s)}>{s}</Btn>)}
              </Row>
              <Row label="shape">
                {ALL_SHAPES.map(s => <Btn key={s} active={shape === s} onClick={() => setShape(s)}>{s}</Btn>)}
              </Row>
              <Row label="theme">
                {ALL_THEMES.map(t => <Btn key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</Btn>)}
              </Row>
              <Row label="active button">
                {validPositions.map(n => <Btn key={n} active={active === n} onClick={() => handleActive(n)}>{n}</Btn>)}
              </Row>
            </div>
          </Card>

          {/* Live preview */}
          <Card style={{ background: previewBg, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel>Live preview</SectionLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20 }}>
              <ButtonGroup
                type={type} style={style} shape={shape} theme={theme}
                activeButton={active} onChange={handleActive}
              />
              <div style={{ fontSize: 11, color: textSecondary, lineHeight: 1.8 }}>
                <div>type: <span style={{ color: textPrimary }}>{type}</span></div>
                <div>style: <span style={{ color: textPrimary }}>{style}</span></div>
                <div>shape: <span style={{ color: textPrimary }}>{shape}</span></div>
                <div>theme: <span style={{ color: textPrimary }}>{theme}</span></div>
                <div>active: <span style={{ color: textPrimary }}>{active}</span></div>
              </div>
            </div>
          </Card>
        </div>

        {/* ── All active positions — current config ── */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>All active positions — current config</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {validPositions.map(pos => (
              <div key={pos} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 64 }}>active: {pos}</span>
                <div style={{ background: theme === 'white' ? '#2A2A3A' : 'transparent', padding: theme === 'white' ? '8px 10px' : 0, borderRadius: 6 }}>
                  <ButtonGroup type={type} style={style} shape={shape} theme={theme} activeButton={pos} onChange={handleActive} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── All styles × themes ── */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>All styles × themes — current type / shape / active: 1</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {ALL_STYLES.map(s => (
              <div key={s}>
                <div style={{ fontSize: 11, color: textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>style: {s}</div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {ALL_THEMES.map(th => (
                    <div key={th}>
                      <div style={{ fontSize: 10, color: textSecondary, marginBottom: 8 }}>{th}</div>
                      <div style={{ background: th === 'white' ? '#2A2A3A' : 'transparent', padding: th === 'white' ? '8px 10px' : 0, borderRadius: 6, display: 'inline-flex' }}>
                        <ButtonGroup type={type} style={s} shape={shape} theme={th} activeButton={1} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Shape comparison ── */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>Shape comparison — current type / style / theme / active: 1</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ALL_SHAPES.map(sh => (
              <div key={sh} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 64 }}>shape: {sh}</span>
                <div style={{ background: theme === 'white' ? '#2A2A3A' : 'transparent', padding: theme === 'white' ? '8px 10px' : 0, borderRadius: 6 }}>
                  <ButtonGroup type={type} style={style} shape={sh} theme={theme} activeButton={1} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Type comparison ── */}
        <Card>
          <SectionLabel>Type comparison — current style / shape / theme / active: 1</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ALL_TYPES.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 64 }}>type: {t}</span>
                <div style={{ background: theme === 'white' ? '#2A2A3A' : 'transparent', padding: theme === 'white' ? '8px 10px' : 0, borderRadius: 6 }}>
                  <ButtonGroup type={t} style={style} shape={shape} theme={theme} activeButton={1} />
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
