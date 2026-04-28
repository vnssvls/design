import React, { useState } from 'react';
import { SegmentedToggle, SegmentedSize, SegmentedStyle, SegmentedTheme, SegmentedCount } from './SegmentedToggle';

const bg           = '#0A0A0F';
const surface      = '#181818';
const border       = 'rgba(255,255,255,0.07)';
const textPrimary  = 'rgba(255,255,255,0.88)';
const textSecondary = 'rgba(255,255,255,0.5)';
const purple       = '#BB86FC';

const sizes:  SegmentedSize[]  = ['mobile', 'desktop-lg', 'desktop-sm'];
const styles: SegmentedStyle[] = ['pill', 'squared'];
const themes: SegmentedTheme[] = ['dark', 'white', 'tonal'];
const counts: SegmentedCount[] = [2, 3, 4];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 88 }}>{label}</span>
      {children}
    </div>
  );
}

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{
      padding: '4px 10px', borderRadius: 6,
      border: `1px solid ${active ? purple : border}`,
      background: active ? 'rgba(187,134,252,0.12)' : 'transparent',
      color: active ? purple : textSecondary,
      fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
    }}>
      {children}
    </button>
  );
}

export default function App() {
  const [size,       setSize]       = useState<SegmentedSize>('desktop-sm');
  const [segStyle,   setSegStyle]   = useState<SegmentedStyle>('pill');
  const [theme,      setTheme]      = useState<SegmentedTheme>('dark');
  const [count,      setCount]      = useState<SegmentedCount>(2);
  const [showLabels, setShowLabels] = useState(true);
  const [showIcons,  setShowIcons]  = useState(true);
  const [active,     setActive]     = useState(1);

  const previewBg = theme === 'white' ? '#2A2A3A' : surface;

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: 40, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Segmented Toggle</h1>
        <p style={{ color: textSecondary, fontSize: 13, marginBottom: 40 }}>
          162 variants — size × count × active button × style × theme
        </p>

        {/* Controls */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <SectionLabel>Controls</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Row label="size">
              <div style={{ display: 'flex', gap: 6 }}>
                {sizes.map(s => <Btn key={s} active={size === s} onClick={() => setSize(s)}>{s}</Btn>)}
              </div>
            </Row>
            <Row label="count">
              <div style={{ display: 'flex', gap: 6 }}>
                {counts.map(c => <Btn key={c} active={count === c} onClick={() => { setCount(c); if (active > c) setActive(1); }}>{c} segments</Btn>)}
              </div>
            </Row>
            <Row label="style">
              <div style={{ display: 'flex', gap: 6 }}>
                {styles.map(s => <Btn key={s} active={segStyle === s} onClick={() => setSegStyle(s)}>{s}</Btn>)}
              </div>
            </Row>
            <Row label="theme">
              <div style={{ display: 'flex', gap: 6 }}>
                {themes.map(t => <Btn key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</Btn>)}
              </div>
            </Row>
            <Row label="show-labels">
              <div style={{ display: 'flex', gap: 6 }}>
                {[true, false].map(v => <Btn key={String(v)} active={showLabels === v} onClick={() => setShowLabels(v)}>{String(v)}</Btn>)}
              </div>
            </Row>
            <Row label="show-icons">
              <div style={{ display: 'flex', gap: 6 }}>
                {[true, false].map(v => <Btn key={String(v)} active={showIcons === v} onClick={() => setShowIcons(v)}>{String(v)}</Btn>)}
              </div>
            </Row>
          </div>
        </div>

        {/* Interactive preview */}
        <div style={{ background: previewBg, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <SectionLabel>Interactive preview</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <SegmentedToggle
              size={size} count={count} activeButton={active as 1|2|3|4}
              style={segStyle} theme={theme}
              showLabels={showLabels} showIcons={showIcons}
              onChange={setActive}
            />
            <span style={{ fontSize: 12, color: textSecondary }}>active button: {active}</span>
          </div>
        </div>

        {/* Count matrix */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <SectionLabel>Count × active button — current size / style / theme</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {counts.map(c => (
              <div key={c}>
                <span style={{ fontSize: 11, color: textSecondary, display: 'block', marginBottom: 12 }}>{c} segments</span>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', background: theme === 'white' ? '#2A2A3A' : 'transparent', padding: theme === 'white' ? '12px' : 0, borderRadius: 8 }}>
                  {Array.from({ length: c }).map((_, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 10, color: textSecondary }}>active: {i + 1}</span>
                      <SegmentedToggle
                        size={size} count={c as SegmentedCount} activeButton={(i + 1) as 1|2|3|4}
                        style={segStyle} theme={theme}
                        showLabels={showLabels} showIcons={showIcons}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All themes */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <SectionLabel>All themes — desktop-sm, pill, 3 segments, active: 2</SectionLabel>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {themes.map(t => (
              <div key={t} style={{
                display: 'flex', flexDirection: 'column', gap: 8,
                background: t === 'white' ? '#2A2A3A' : 'transparent',
                padding: t === 'white' ? 12 : 0, borderRadius: 8,
              }}>
                <span style={{ fontSize: 11, color: textSecondary }}>{t}</span>
                <SegmentedToggle size="desktop-sm" count={3} activeButton={2} style="pill" theme={t} showLabels showIcons />
              </div>
            ))}
          </div>
        </div>

        {/* All sizes */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <SectionLabel>All sizes — current style / theme, 2 segments</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sizes.map(s => (
              <div key={s}>
                <span style={{ fontSize: 11, color: textSecondary, display: 'block', marginBottom: 10 }}>{s}</span>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', background: theme === 'white' ? '#2A2A3A' : 'transparent', padding: theme === 'white' ? '12px' : 0, borderRadius: 8 }}>
                  {[1, 2].map(ab => (
                    <div key={ab} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 10, color: textSecondary }}>active: {ab}</span>
                      <SegmentedToggle size={s} count={2} activeButton={ab as 1|2} style={segStyle} theme={theme} showLabels showIcons />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All styles × themes */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24 }}>
          <SectionLabel>All styles × themes — desktop-sm, 2 segments, active: 1</SectionLabel>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {styles.map(st => themes.map(th => (
              <div key={`${st}-${th}`} style={{
                display: 'flex', flexDirection: 'column', gap: 8,
                background: th === 'white' ? '#2A2A3A' : 'transparent',
                padding: th === 'white' ? 12 : 0, borderRadius: 8,
              }}>
                <span style={{ fontSize: 11, color: textSecondary }}>{st} / {th}</span>
                <SegmentedToggle size="desktop-sm" count={2} activeButton={1} style={st} theme={th} showLabels showIcons />
              </div>
            )))}
          </div>
        </div>

      </div>
    </div>
  );
}
