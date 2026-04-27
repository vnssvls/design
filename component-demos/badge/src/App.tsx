import React, { useState } from 'react';
import { Badge, BadgeVariant, BadgeStyle, BadgeSize, BadgeColor } from './Badge';
import { tokens } from './tokens';

const ALL_COLORS: BadgeColor[] = [
  'success', 'warning', 'error', 'primary', 'neutral',
  'menu-item', 'prebatch', 'pos button',
];

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

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '7px 12px',
        marginBottom: '4px',
        cursor: 'pointer',
      }}
      onClick={() => onChange(!value)}
    >
      <span style={{ fontFamily: tokens.fontFamily, fontSize: '13px', color: 'rgba(255,255,255,0.70)' }}>
        {label}
      </span>
      <div style={{
        width: 32,
        height: 18,
        borderRadius: 999,
        background: value ? tokens.primary : 'rgba(255,255,255,0.12)',
        position: 'relative',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}>
        <div style={{
          position: 'absolute',
          top: 3,
          left: value ? 17 : 3,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.15s',
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [variant, setVariant] = useState<BadgeVariant>('filled');
  const [badgeStyle, setBadgeStyle] = useState<BadgeStyle>('rounded');
  const [size, setSize] = useState<BadgeSize>('md');
  const [color, setColor] = useState<BadgeColor>('success');
  const [showDot, setShowDot] = useState(false);
  const [showLabel, setShowLabel] = useState(true);
  const [showClose, setShowClose] = useState(false);

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
            Badge
          </span>
          <span style={{ display: 'block', fontSize: '11px', color: 'rgba(255,255,255,0.30)', fontFamily: tokens.fontFamily }}>
            Stockifi Design System
          </span>
        </div>

        <ControlGroup label="Variant" options={['filled', 'outlined', 'muted']} value={variant} onChange={v => setVariant(v as BadgeVariant)} />
        <ControlGroup label="Style" options={['rounded', 'square']} value={badgeStyle} onChange={v => setBadgeStyle(v as BadgeStyle)} />
        <ControlGroup label="Size" options={['sm', 'md', 'lg']} value={size} onChange={v => setSize(v as BadgeSize)} />
        <ControlGroup label="Color" options={ALL_COLORS} value={color} onChange={v => setColor(v as BadgeColor)} />

        <span style={controlLabel}>Slots</span>
        <Toggle label="show-dot" value={showDot} onChange={setShowDot} />
        <Toggle label="show-label" value={showLabel} onChange={setShowLabel} />
        <Toggle label="show-close" value={showClose} onChange={setShowClose} />

        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: `1px solid ${tokens.border}` }}>
          <span style={{ ...controlLabel, marginBottom: '4px' }}>Figma</span>
          <a
            href="https://www.figma.com/design/KuL3n9S8FiZuvD6F7P6Lv5/Component-Library?node-id=646-1346"
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
        background: tokens.bgCanvas,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 40,
      }}>
        {/* Single controlled badge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <Badge
            variant={variant}
            badgeStyle={badgeStyle}
            size={size}
            color={color}
            showDot={showDot}
            showLabel={showLabel}
            showClose={showClose}
          />
          <span style={{ fontFamily: tokens.fontFamily, fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.3px' }}>
            variant={variant} · style={badgeStyle} · size={size} · color={color}
          </span>
        </div>

        {/* All colors at current settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: tokens.fontFamily, fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.4px', textTransform: 'uppercase' }}>
            All colors · {variant} · {badgeStyle}
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {ALL_COLORS.map(c => (
              <Badge
                key={c}
                variant={variant}
                badgeStyle={badgeStyle}
                size={size}
                color={c}
                showDot={showDot}
                showLabel={showLabel}
                showClose={showClose}
                label={c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
