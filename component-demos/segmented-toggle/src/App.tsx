import React, { useState } from 'react';
import { SegmentedToggle, SegmentedSize, SegmentedState, SegmentedStyle, SegmentedTheme } from './SegmentedToggle';

const bg = '#0A0A0F';
const surface = '#181818';
const border = 'rgba(255,255,255,0.07)';
const textPrimary = 'rgba(255,255,255,0.88)';
const textSecondary = 'rgba(255,255,255,0.5)';
const purple = '#BB86FC';

const sizes: SegmentedSize[]   = ['mobile', 'desktop-lg', 'desktop-sm'];
const styles: SegmentedStyle[] = ['pill', 'squared'];
const themes: SegmentedTheme[] = ['dark', 'white'];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontFamily: 'Inter, sans-serif', color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
      {children}
    </div>
  );
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 12, color: textSecondary, fontFamily: 'Inter, sans-serif', minWidth: 80 }}>{label}</span>
      {children}
    </div>
  );
}

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '4px 10px', borderRadius: 6, border: `1px solid ${active ? purple : border}`,
        background: active ? 'rgba(187,134,252,0.12)' : 'transparent',
        color: active ? purple : textSecondary, fontSize: 12,
        fontFamily: 'Inter, sans-serif', cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [size, setSize]           = useState<SegmentedSize>('desktop-sm');
  const [segStyle, setSegStyle]   = useState<SegmentedStyle>('pill');
  const [theme, setTheme]         = useState<SegmentedTheme>('dark');
  const [showLabels, setShowLabels] = useState(true);
  const [liveState, setLiveState] = useState<SegmentedState>('left-selected');

  // white theme needs a slightly lighter bg to be visible
  const previewBg = theme === 'white' ? '#2A2A3A' : surface;

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: 40, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Segmented Toggle</h1>
        <p style={{ color: textSecondary, fontSize: 13, marginBottom: 40 }}>Binary A/B choice — 24 variants across size × state × style × theme</p>

        {/* Controls */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <Label>Controls</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Control label="size">
              <div style={{ display: 'flex', gap: 6 }}>
                {sizes.map(s => <Btn key={s} active={size === s} onClick={() => setSize(s)}>{s}</Btn>)}
              </div>
            </Control>
            <Control label="style">
              <div style={{ display: 'flex', gap: 6 }}>
                {styles.map(s => <Btn key={s} active={segStyle === s} onClick={() => setSegStyle(s)}>{s}</Btn>)}
              </div>
            </Control>
            <Control label="theme">
              <div style={{ display: 'flex', gap: 6 }}>
                {themes.map(t => <Btn key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</Btn>)}
              </div>
            </Control>
            <Control label="show-labels">
              <div style={{ display: 'flex', gap: 6 }}>
                {[true, false].map(v => <Btn key={String(v)} active={showLabels === v} onClick={() => setShowLabels(v)}>{v ? 'true' : 'false'}</Btn>)}
              </div>
            </Control>
          </div>
        </div>

        {/* Live preview */}
        <div style={{ background: previewBg, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <Label>Interactive preview</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <SegmentedToggle
              size={size}
              style={segStyle}
              theme={theme}
              state={liveState}
              showLabels={showLabels}
              onChange={(side) => setLiveState(side === 'left' ? 'left-selected' : 'right-selected')}
            />
            <span style={{ fontSize: 12, color: textSecondary }}>{liveState}</span>
          </div>
        </div>

        {/* All sizes */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <Label>All sizes — current style + theme, both states</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sizes.map(s => (
              <div key={s}>
                <span style={{ fontSize: 11, color: textSecondary, display: 'block', marginBottom: 10 }}>{s}</span>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', background: theme === 'white' ? '#2A2A3A' : 'transparent', padding: theme === 'white' ? '12px' : 0, borderRadius: 8 }}>
                  {(['left-selected', 'right-selected'] as SegmentedState[]).map(st => (
                    <div key={st} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 10, color: textSecondary }}>{st}</span>
                      <SegmentedToggle size={s} style={segStyle} theme={theme} state={st} showLabels={showLabels} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Styles × Themes */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24 }}>
          <Label>All styles × themes — desktop-sm, left-selected</Label>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            {styles.map(st => themes.map(th => (
              <div key={`${st}-${th}`} style={{
                display: 'flex', flexDirection: 'column', gap: 8,
                background: th === 'white' ? '#2A2A3A' : 'transparent',
                padding: th === 'white' ? 12 : 0, borderRadius: 8,
              }}>
                <span style={{ fontSize: 11, color: textSecondary }}>{st} / {th}</span>
                <SegmentedToggle size="desktop-sm" style={st} theme={th} state="left-selected" showLabels />
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
  );
}
