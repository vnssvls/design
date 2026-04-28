import React, { useState } from 'react';
import { ButtonGroup, BGCount, BGStyle, BGShape, BGTheme, BGActiveButton } from './ButtonGroup';

const bg            = '#0A0A0F';
const surface       = '#181818';
const surfaceAlt    = '#1C1C26';
const border        = 'rgba(255,255,255,0.07)';
const borderFocus   = 'rgba(255,255,255,0.18)';
const textPrimary   = 'rgba(255,255,255,0.88)';
const textSecondary = 'rgba(255,255,255,0.5)';
const purple        = '#BB86FC';

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
      <span style={{ fontSize: 12, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 88 }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function LabelInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        flex: 1, padding: '5px 10px', borderRadius: 6,
        border: `1px solid ${border}`, background: surfaceAlt,
        color: textPrimary, fontSize: 12, fontFamily: 'Inter, sans-serif',
        outline: 'none', transition: 'border-color 120ms ease',
        minWidth: 0,
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

const ALL_COUNTS:  BGCount[]  = [3, 4];
const ALL_STYLES:  BGStyle[]  = ['default', 'with-dot', 'with-icon'];
const ALL_SHAPES:  BGShape[]  = ['rectangle', 'rounded'];
const ALL_THEMES:  BGTheme[]  = ['tonal', 'grey'];

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [count,   setCount]   = useState<BGCount>(3);
  const [style,   setStyle]   = useState<BGStyle>('default');
  const [shape,   setShape]   = useState<BGShape>('rectangle');
  const [theme,   setTheme]   = useState<BGTheme>('tonal');
  const [active,  setActive]  = useState<BGActiveButton>(1);
  const [labels,  setLabels]  = useState(['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time']);

  const validPositions = Array.from({ length: count }, (_, i) => (i + 1) as BGActiveButton);
  const currentLabels  = labels.slice(0, count);

  // Use actual library bg colors so the component reads correctly in context
  const previewBg      = theme === 'grey' ? '#212121' : '#0A0A0F';
  const previewBgLabel = theme === 'grey' ? 'BG/DesignBase/Grey 2 — #212121' : 'BG/DesignBase/Grey 1 — #0A0A0F';

  const handleCount = (c: BGCount) => {
    setCount(c);
    if (active > c) setActive(1);
  };

  const handleActive = (n: BGActiveButton) => {
    if (n > count) return;
    setActive(n);
  };

  const updateLabel = (index: number, value: string) => {
    setLabels(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: '40px 40px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>ButtonGroup</h1>
        <p style={{ color: textSecondary, fontSize: 13, marginBottom: 32 }}>
          84 variants — count × active button × style × shape × theme
        </p>

        {/* ── Top: controls + live preview ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Controls */}
          <Card>
            <SectionLabel>Properties</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              <ControlRow label="count">
                {ALL_COUNTS.map(c => (
                  <ToggleBtn key={c} active={count === c} onClick={() => handleCount(c)}>
                    {c} buttons
                  </ToggleBtn>
                ))}
              </ControlRow>

              <ControlRow label="active button">
                {validPositions.map(n => (
                  <ToggleBtn key={n} active={active === n} onClick={() => handleActive(n)}>
                    {n}
                  </ToggleBtn>
                ))}
              </ControlRow>

              <ControlRow label="style">
                {ALL_STYLES.map(s => (
                  <ToggleBtn key={s} active={style === s} onClick={() => setStyle(s)}>{s}</ToggleBtn>
                ))}
              </ControlRow>

              <ControlRow label="shape">
                {ALL_SHAPES.map(s => (
                  <ToggleBtn key={s} active={shape === s} onClick={() => setShape(s)}>{s}</ToggleBtn>
                ))}
              </ControlRow>

              <ControlRow label="theme">
                {ALL_THEMES.map(t => (
                  <ToggleBtn key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</ToggleBtn>
                ))}
              </ControlRow>

              {/* Label inputs */}
              <div style={{ marginTop: 4, paddingTop: 14, borderTop: `1px solid ${border}` }}>
                <div style={{ fontSize: 11, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Button labels
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Array.from({ length: count }).map((_, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, color: textSecondary, minWidth: 60, fontFamily: 'Inter, sans-serif' }}>
                        Button {i + 1}
                      </span>
                      <LabelInput
                        value={labels[i] ?? ''}
                        onChange={v => updateLabel(i, v)}
                        placeholder={`Label ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Card>

          {/* Live preview */}
          <Card style={{ background: previewBg, display: 'flex', flexDirection: 'column' }}>
            <SectionLabel>Live preview</SectionLabel>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24 }}>
              <ButtonGroup
                count={count} style={style} shape={shape} theme={theme}
                activeButton={active} labels={currentLabels} onChange={handleActive}
              />
              <div>
                <MetaLine label="count"         value={String(count)} />
                <MetaLine label="active button" value={String(active)} />
                <MetaLine label="style"         value={style} />
                <MetaLine label="shape"         value={shape} />
                <MetaLine label="theme"         value={theme} />
                <MetaLine label="bg"            value={previewBgLabel} />
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
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 60 }}>active: {pos}</span>
                <div style={{
                  background: theme === 'grey' ? '#2A2A3A' : 'transparent',
                  padding: theme === 'grey' ? '8px 10px' : 0,
                  borderRadius: 6,
                }}>
                  <ButtonGroup
                    count={count} style={style} shape={shape} theme={theme}
                    activeButton={pos} labels={currentLabels} onChange={handleActive}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Style comparison ── */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>All styles — current count / shape / theme / active: 1</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ALL_STYLES.map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 72 }}>{s}</span>
                <div style={{
                  background: theme === 'grey' ? '#2A2A3A' : 'transparent',
                  padding: theme === 'grey' ? '8px 10px' : 0,
                  borderRadius: 6,
                }}>
                  <ButtonGroup
                    count={count} style={s} shape={shape} theme={theme}
                    activeButton={1} labels={currentLabels}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Shape comparison ── */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>Shape comparison — current count / style / theme / active: 1</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ALL_SHAPES.map(sh => (
              <div key={sh} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 72 }}>{sh}</span>
                <div style={{
                  background: theme === 'grey' ? '#2A2A3A' : 'transparent',
                  padding: theme === 'grey' ? '8px 10px' : 0,
                  borderRadius: 6,
                }}>
                  <ButtonGroup
                    count={count} style={style} shape={sh} theme={theme}
                    activeButton={1} labels={currentLabels}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Theme comparison ── */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>Theme comparison — current count / style / shape / active: 1</SectionLabel>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {ALL_THEMES.map(t => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 11, color: textSecondary }}>{t}</span>
                <div style={{
                  background: t === 'grey' ? '#2A2A3A' : 'transparent',
                  padding: t === 'grey' ? '8px 10px' : 0,
                  borderRadius: 6,
                  display: 'inline-flex',
                }}>
                  <ButtonGroup
                    count={count} style={style} shape={shape} theme={t}
                    activeButton={1} labels={currentLabels}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Count comparison ── */}
        <Card>
          <SectionLabel>Count comparison — current style / shape / theme / active: 1</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {ALL_COUNTS.map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 11, color: textSecondary, minWidth: 72 }}>{c} buttons</span>
                <div style={{
                  background: theme === 'grey' ? '#2A2A3A' : 'transparent',
                  padding: theme === 'grey' ? '8px 10px' : 0,
                  borderRadius: 6,
                }}>
                  <ButtonGroup
                    count={c} style={style} shape={shape} theme={theme}
                    activeButton={1} labels={labels.slice(0, c)}
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
