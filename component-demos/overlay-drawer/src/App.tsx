import React, { useState } from 'react';
import { Drawer, DrawerType, DrawerSize, DrawerTheme } from './Drawer';
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

const ALL_TYPES: DrawerType[] = [
  'drawer.SalesDays',
  'drawer.SavedReports.list',
  'drawer.SavedReports.empty',
  'drawer.UndefinedSales',
  'drawer.RecipeDetail',
  'drawer.AffectedItems',
];

export default function App() {
  const [type, setType] = useState<DrawerType>('drawer.UndefinedSales');
  const [size, setSize] = useState<DrawerSize>('large');
  const [theme, setTheme] = useState<DrawerTheme>('Grey');

  const appBg = theme === 'Tonal' ? tokens.bgCanvas : '#424242';

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: tokens.fontFamily, background: '#111' }}>
      {/* Controls */}
      <div
        style={{
          width: '220px',
          flexShrink: 0,
          background: '#0A0A0F',
          borderRight: `1px solid ${tokens.border}`,
          padding: '24px 16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '28px' }}>
          <span style={{ ...controlLabel, fontSize: '12px', color: 'rgba(255,255,255,0.60)', letterSpacing: 0, textTransform: 'none', fontWeight: '600' }}>
            overlay.drawer
          </span>
          <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.30)', fontFamily: tokens.fontFamily }}>
            Stockifi Design System
          </span>
        </div>

        <ControlGroup
          label="Type"
          options={ALL_TYPES}
          value={type}
          onChange={v => {
            const t = v as DrawerType;
            setType(t);
            if (t === 'drawer.SalesDays') setSize('small');
            else if (t.startsWith('drawer.SavedReports')) setSize('medium');
            else setSize('large');
          }}
        />

        <ControlGroup
          label="Size"
          options={['small', 'medium', 'large']}
          value={size}
          onChange={v => setSize(v as DrawerSize)}
        />

        <ControlGroup
          label="Theme"
          options={['Grey', 'Tonal']}
          value={theme}
          onChange={v => setTheme(v as DrawerTheme)}
        />

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: `1px solid ${tokens.border}` }}>
          <span style={{ ...controlLabel, marginBottom: '4px' }}>Figma</span>
          <a
            href="https://www.figma.com/design/KuL3n9S8FiZuvD6F7P6Lv5/Component-Library?node-id=897-10782"
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: '12px', color: tokens.primary, fontFamily: tokens.fontFamily, textDecoration: 'none' }}
          >
            Open component →
          </a>
        </div>
      </div>

      {/* Preview */}
      <div
        style={{
          flex: 1,
          background: appBg,
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'flex-end',
          position: 'relative',
          transition: 'background 0.2s',
          overflow: 'hidden',
        }}
      >
        {/* Dimmed content area behind drawer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
          <Drawer type={type} size={size} theme={theme} />
        </div>

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            fontFamily: tokens.fontFamily,
            fontSize: '11px',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.3px',
          }}
        >
          type={type} · size={size} · theme={theme}
        </div>
      </div>
    </div>
  );
}
