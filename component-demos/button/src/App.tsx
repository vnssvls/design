import React, { useState } from 'react';
import { Button, ButtonType, ButtonSize, ButtonState } from './Button';
import { tokens } from './tokens';

const ALL_TYPES:  ButtonType[]  = ['primary', 'secondary', 'secondary-grey', 'ghost', 'white'];
const ALL_SIZES:  ButtonSize[]  = ['small', 'medium', 'large'];
const ALL_STATES: ButtonState[] = ['default', 'hover', 'active', 'disabled'];

const controlLabel: React.CSSProperties = {
  fontFamily:    tokens.fontFamily,
  fontSize:      '11px',
  fontWeight:    '600',
  color:         'rgba(255,255,255,0.40)',
  textTransform: 'uppercase',
  letterSpacing: '0.6px',
  marginBottom:  '8px',
  display:       'block',
};

const controlOption: React.CSSProperties = {
  fontFamily:  tokens.fontFamily,
  fontSize:    '13px',
  color:       'rgba(255,255,255,0.70)',
  padding:     '7px 12px',
  borderRadius:'6px',
  cursor:      'pointer',
  border:      'none',
  background:  'transparent',
  width:       '100%',
  textAlign:   'left',
};

const controlOptionActive: React.CSSProperties = {
  background: 'rgba(187,134,252,0.12)',
  color:      tokens.primary,
};

function ControlGroup({ label, options, value, onChange }: {
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
      style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7px 12px', marginBottom:'4px', cursor:'pointer' }}
      onClick={() => onChange(!value)}
    >
      <span style={{ fontFamily: tokens.fontFamily, fontSize: '13px', color: 'rgba(255,255,255,0.70)' }}>{label}</span>
      <div style={{ width:32, height:18, borderRadius:999, background: value ? tokens.primary : 'rgba(255,255,255,0.12)', position:'relative', transition:'background 0.15s', flexShrink:0 }}>
        <div style={{ position:'absolute', top:3, left: value ? 17 : 3, width:12, height:12, borderRadius:'50%', background:'#fff', transition:'left 0.15s' }} />
      </div>
    </div>
  );
}

// Dark bg swatch for white button visibility
const CANVAS_BG: Record<ButtonType, string> = {
  primary:         '#0A0A0F',
  secondary:       '#0A0A0F',
  'secondary-grey':'#0A0A0F',
  ghost:           '#0A0A0F',
  white:           '#2A2A3A',
};

export default function App() {
  const [type,      setType]      = useState<ButtonType>('primary');
  const [size,      setSize]      = useState<ButtonSize>('medium');
  const [state,     setState]     = useState<ButtonState>('default');
  const [showIcon,  setShowIcon]  = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  const previewBg = CANVAS_BG[type];

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily: tokens.fontFamily, background:'#111' }}>
      {/* Controls */}
      <div style={{ width:'220px', flexShrink:0, background:'#0A0A0F', borderRight:`1px solid ${tokens.border}`, padding:'24px 16px', overflowY:'auto', display:'flex', flexDirection:'column' }}>
        <div style={{ marginBottom:'28px' }}>
          <span style={{ ...controlLabel, fontSize:'12px', color:'rgba(255,255,255,0.60)', letterSpacing:0, textTransform:'none', fontWeight:'600' }}>Button</span>
          <span style={{ display:'block', fontSize:'11px', color:'rgba(255,255,255,0.30)', fontFamily: tokens.fontFamily }}>Stockifi Design System</span>
        </div>

        <ControlGroup label="Type"  options={ALL_TYPES}  value={type}  onChange={v => setType(v as ButtonType)} />
        <ControlGroup label="Size"  options={ALL_SIZES}  value={size}  onChange={v => setSize(v as ButtonSize)} />
        <ControlGroup label="State" options={ALL_STATES} value={state} onChange={v => setState(v as ButtonState)} />

        <span style={controlLabel}>Slots</span>
        <Toggle label="show-icon"  value={showIcon}  onChange={setShowIcon} />
        <Toggle label="show-label" value={showLabel} onChange={setShowLabel} />

        <div style={{ marginTop:'auto', paddingTop:'24px', borderTop:`1px solid ${tokens.border}` }}>
          <span style={{ ...controlLabel, marginBottom:'4px' }}>Figma</span>
          <a href="https://www.figma.com/design/KuL3n9S8FiZuvD6F7P6Lv5/Component-Library?node-id=611-74"
            target="_blank" rel="noreferrer"
            style={{ fontSize:'12px', color: tokens.primary, fontFamily: tokens.fontFamily, textDecoration:'none' }}>
            Open component →
          </a>
        </div>
      </div>

      {/* Preview */}
      <div style={{ flex:1, background: previewBg, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:48, transition:'background 0.2s' }}>
        {/* Single controlled */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <Button type={type} size={size} state={state} showIcon={showIcon} showLabel={showLabel} />
          <span style={{ fontFamily: tokens.fontFamily, fontSize:'11px', color:'rgba(255,255,255,0.25)', letterSpacing:'0.3px' }}>
            type={type} · size={size} · state={state}
          </span>
        </div>

        {/* All states for current type */}
        <div style={{ display:'flex', flexDirection:'column', gap:16, alignItems:'center' }}>
          <span style={{ fontFamily: tokens.fontFamily, fontSize:'11px', color:'rgba(255,255,255,0.25)', letterSpacing:'0.4px', textTransform:'uppercase' }}>
            All states · {type}
          </span>
          <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
            {ALL_SIZES.map(sz => (
              <div key={sz} style={{ display:'flex', gap:12, alignItems:'center' }}>
                <span style={{ fontFamily: tokens.fontFamily, fontSize:'10px', color:'rgba(255,255,255,0.20)', width:48, textAlign:'right' }}>{sz}</span>
                {ALL_STATES.map(st => (
                  <Button key={st} type={type} size={sz} state={st} showIcon={showIcon} showLabel={showLabel} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* All types at current size/state */}
        <div style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'center' }}>
          <span style={{ fontFamily: tokens.fontFamily, fontSize:'11px', color:'rgba(255,255,255,0.25)', letterSpacing:'0.4px', textTransform:'uppercase' }}>
            All types · {size} · {state}
          </span>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
            {ALL_TYPES.map(t => (
              <Button key={t} type={t} size={size} state={state} showIcon={showIcon} showLabel={showLabel} label={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
