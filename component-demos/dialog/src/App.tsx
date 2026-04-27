import React, { useState } from 'react';
import { Dialog, DialogType, DialogTheme } from './Dialog';
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
  transition: 'background 0.15s',
};

const controlOptionActive: React.CSSProperties = {
  background: 'rgba(187,134,252,0.12)',
  color: tokens.primary,
};

function ControlGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <span style={controlLabel}>{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {options.map(opt => (
          <button
            key={opt}
            style={{
              ...controlOption,
              ...(value === opt ? controlOptionActive : {}),
            }}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [type, setType] = useState<DialogType>('input');
  const [theme, setTheme] = useState<DialogTheme>('Grey');

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily: tokens.fontFamily,
        background: '#111',
      }}
    >
      {/* Controls panel */}
      <div
        style={{
          width: '200px',
          flexShrink: 0,
          background: '#0A0A0F',
          borderRight: `1px solid ${tokens.border}`,
          padding: '24px 16px',
          overflowY: 'auto',
        }}
      >
        <div style={{ marginBottom: '28px' }}>
          <span style={{ ...controlLabel, fontSize: '12px', color: 'rgba(255,255,255,0.60)', letterSpacing: 0, textTransform: 'none', fontWeight: '600' }}>
            Dialog
          </span>
          <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.30)', fontFamily: tokens.fontFamily }}>
            Stockifi Design System
          </span>
        </div>

        <ControlGroup
          label="Type"
          options={['input', 'alert', 'confirmation']}
          value={type}
          onChange={v => setType(v as DialogType)}
        />

        <ControlGroup
          label="Theme"
          options={['Grey', 'Tonal']}
          value={theme}
          onChange={v => setTheme(v as DialogTheme)}
        />

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: `1px solid ${tokens.border}` }}>
          <span style={{ ...controlLabel, marginBottom: '4px' }}>Figma</span>
          <a
            href="https://www.figma.com/design/KuL3n9S8FiZuvD6F7P6Lv5/Component-Library?node-id=990-4866"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '12px', color: tokens.primary, fontFamily: tokens.fontFamily, textDecoration: 'none' }}
          >
            Open component →
          </a>
        </div>
      </div>

      {/* Preview area */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme === 'Tonal' ? tokens.bgCanvas : '#2A2A2A',
          transition: 'background 0.2s',
          position: 'relative',
        }}
      >
        {/* Overlay backdrop simulation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Dialog type={type} theme={theme} />
        </div>

        {/* Variant label */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: tokens.fontFamily,
            fontSize: '11px',
            color: 'rgba(255,255,255,0.30)',
            letterSpacing: '0.4px',
          }}
        >
          type={type} · theme={theme}
        </div>
      </div>
    </div>
  );
}
