import React, { useState } from 'react';
import { Checkbox, CheckboxState, CheckboxSize } from './Checkbox';
import { tokens } from './tokens';

const controlLabel: React.CSSProperties = {
  fontFamily: tokens.fontFamily,
  fontSize: '11px',
  fontWeight: '600',
  color: 'rgba(255,255,255,0.40)',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  marginBottom: '8px',
  display: 'block',
};

const controlOption: React.CSSProperties = {
  fontFamily: tokens.fontFamily,
  fontSize: '13px',
  color: 'rgba(255,255,255,0.70)',
  padding: '7px 12px',
  borderRadius: '6px',
  cursor: 'pointer',
  border: 'none',
  background: 'transparent',
  width: '100%',
  textAlign: 'left',
};

const controlOptionActive: React.CSSProperties = {
  background: 'rgba(187,134,252,0.12)',
  color: tokens.primary,
};

function ControlGroup({
  label, options, value, onChange,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <span style={controlLabel}>{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {options.map(opt => (
          <button
            key={opt}
            style={{ ...controlOption, ...(value === opt ? controlOptionActive : {}) }}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const ALL_STATES: CheckboxState[] = ['unselected', 'selected', 'selected-no fill'];
const ALL_SIZES: CheckboxSize[] = ['small', 'medium', 'large'];

export default function App() {
  const [state, setState] = useState<CheckboxState>('selected');
  const [size, setSize] = useState<CheckboxSize>('medium');

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: tokens.fontFamily, background: '#111' }}>
      {/* Controls */}
      <div style={{
        width: '220px',
        flexShrink: 0,
        background: '#0A0A0F',
        borderRight: `1px solid ${tokens.border}`,
        padding: '24px 16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ marginBottom: '28px' }}>
          <span style={{ ...controlLabel, fontSize: '12px', color: 'rgba(255,255,255,0.60)', letterSpacing: 0, textTransform: 'none', fontWeight: '600' }}>
            Checkbox
          </span>
          <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.30)', fontFamily: tokens.fontFamily }}>
            Stockifi Design System
          </span>
        </div>

        <ControlGroup label="State" options={ALL_STATES} value={state} onChange={v => setState(v as CheckboxState)} />
        <ControlGroup label="Size" options={ALL_SIZES} value={size} onChange={v => setSize(v as CheckboxSize)} />

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: `1px solid ${tokens.border}` }}>
          <span style={{ ...controlLabel, marginBottom: '4px' }}>Figma</span>
          <a
            href="https://www.figma.com/design/KuL3n9S8FiZuvD6F7P6Lv5/Component-Library?node-id=293-1249"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '12px', color: tokens.primary, fontFamily: tokens.fontFamily, textDecoration: 'none' }}
          >
            Open component →
          </a>
        </div>
      </div>

      {/* Preview */}
      <div style={{
        flex: 1,
        background: '#0A0A0F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 40,
      }}>
        {/* Controlled single */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Checkbox state={state} size={size} onChange={setState} />
          <span style={{ fontFamily: tokens.fontFamily, fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.3px' }}>
            state={state} · size={size}
          </span>
        </div>

        {/* All states × sizes grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: tokens.fontFamily, fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
            All states · all sizes
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '24px 0', justifyItems: 'center', alignItems: 'center' }}>
            {ALL_SIZES.map(sz => (
              <span key={sz} style={{ fontFamily: tokens.fontFamily, fontSize: '11px', color: 'rgba(255,255,255,0.30)', textAlign: 'center' }}>{sz}</span>
            ))}
            {ALL_STATES.map(st =>
              ALL_SIZES.map(sz => (
                <Checkbox key={`${st}-${sz}`} state={st} size={sz} />
              ))
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: 0, justifyItems: 'center' }}>
            {ALL_STATES.map(st => (
              <span key={st} style={{ fontFamily: tokens.fontFamily, fontSize: '10px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', gridColumn: 'span 1' }}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
