import React, { useState } from 'react';
import { ToggleSwitch, ToggleSize, ToggleState } from './ToggleSwitch';

const bg = '#0A0A0F';
const surface = '#181818';
const border = 'rgba(255,255,255,0.07)';
const textPrimary = 'rgba(255,255,255,0.88)';
const textSecondary = 'rgba(255,255,255,0.5)';
const purple = '#BB86FC';

const sizes: ToggleSize[] = ['mobile', 'desktop-lg', 'desktop-sm'];
const states: ToggleState[] = ['unchecked', 'checked', 'disabled-unchecked', 'disabled-checked'];

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
  const [size, setSize] = useState<ToggleSize>('desktop-sm');
  const [slim, setSlim] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [liveChecked, setLiveChecked] = useState(false);

  return (
    <div style={{ background: bg, minHeight: '100vh', padding: 40, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h1 style={{ color: textPrimary, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Toggle Switch</h1>
        <p style={{ color: textSecondary, fontSize: 13, marginBottom: 40 }}>On/off control — 24 variants across size × slim × state</p>

        {/* Controls */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <Label>Controls</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Control label="size">
              <div style={{ display: 'flex', gap: 6 }}>
                {sizes.map(s => <Btn key={s} active={size === s} onClick={() => setSize(s)}>{s}</Btn>)}
              </div>
            </Control>
            <Control label="slim">
              <div style={{ display: 'flex', gap: 6 }}>
                {[false, true].map(v => <Btn key={String(v)} active={slim === v} onClick={() => setSlim(v)}>{v ? 'true' : 'false'}</Btn>)}
              </div>
            </Control>
            <Control label="show-label">
              <div style={{ display: 'flex', gap: 6 }}>
                {[true, false].map(v => <Btn key={String(v)} active={showLabel === v} onClick={() => setShowLabel(v)}>{v ? 'true' : 'false'}</Btn>)}
              </div>
            </Control>
            <Control label="show-hint">
              <div style={{ display: 'flex', gap: 6 }}>
                {[true, false].map(v => <Btn key={String(v)} active={showHint === v} onClick={() => setShowHint(v)}>{v ? 'true' : 'false'}</Btn>)}
              </div>
            </Control>
          </div>
        </div>

        {/* Live preview */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <Label>Interactive preview</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <ToggleSwitch
              size={size}
              slim={slim}
              state={liveChecked ? 'checked' : 'unchecked'}
              showLabel={showLabel}
              showHint={showHint}
              onChange={setLiveChecked}
            />
            <span style={{ fontSize: 12, color: textSecondary }}>{liveChecked ? 'checked' : 'unchecked'}</span>
          </div>
        </div>

        {/* All states */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <Label>All states — current size + slim</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {states.map(st => (
              <div key={st} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 11, color: textSecondary }}>{st}</span>
                <ToggleSwitch size={size} slim={slim} state={st} showLabel={showLabel} showHint={showHint} />
              </div>
            ))}
          </div>
        </div>

        {/* All sizes × slim × checked */}
        <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: 24 }}>
          <Label>All sizes × slim — checked state</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sizes.map(s => (
              <div key={s}>
                <span style={{ fontSize: 11, color: textSecondary, display: 'block', marginBottom: 10 }}>{s}</span>
                <div style={{ display: 'flex', gap: 32 }}>
                  {[false, true].map(sl => (
                    <div key={String(sl)} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: 10, color: textSecondary }}>slim={String(sl)}</span>
                      <ToggleSwitch size={s} slim={sl} state="checked" showLabel showHint />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
