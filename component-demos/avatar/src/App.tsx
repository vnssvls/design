import React, { useState } from 'react';
import { Avatar, AvatarType, AvatarSize } from './Avatar';

const SIZES: AvatarSize[] = ['sm', 'md', 'lg', 'xl', 'xxl'];
const TYPES: AvatarType[] = ['placeholder', 'name', 'brand', 'image'];

const TOKEN = {
  bg: '#0A0A0F',
  surface: '#181818',
  border: 'rgba(255,255,255,0.07)',
  textPrimary: 'rgba(255,255,255,0.88)',
  textMuted: '#9898B0',
  primary: '#BB86FC',
} as const;

const label: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontWeight: 600,
  color: TOKEN.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: 13,
  fontWeight: 600,
  color: TOKEN.textPrimary,
  marginBottom: 20,
};

export default function App() {
  const [activeType, setActiveType] = useState<AvatarType>('placeholder');
  const [activeSize, setActiveSize] = useState<AvatarSize>('md');
  const [active, setActive] = useState(false);
  const [letter, setLetter] = useState('V');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: TOKEN.bg, padding: '48px 64px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 8 }}>Avatar</h1>
      <p style={{ fontSize: 13, color: TOKEN.textMuted, marginBottom: 48 }}>
        Displays a user or entity identity. Supports initials, brand color, image, and placeholder states.
      </p>

      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>

        {/* Controls */}
        <div style={{
          width: 240,
          padding: 24,
          backgroundColor: TOKEN.surface,
          borderRadius: 12,
          border: `1px solid ${TOKEN.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          flexShrink: 0,
        }}>
          <div>
            <div style={{ ...label, marginBottom: 10 }}>Type</div>
            {TYPES.map(t => (
              <button key={t} onClick={() => setActiveType(t)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '7px 10px', borderRadius: 6, marginBottom: 4,
                border: 'none', cursor: 'pointer',
                backgroundColor: activeType === t ? 'rgba(187,134,252,0.12)' : 'transparent',
                color: activeType === t ? TOKEN.primary : TOKEN.textPrimary,
                fontFamily: 'Inter, sans-serif', fontSize: 13,
              }}>{t}</button>
            ))}
          </div>

          <div>
            <div style={{ ...label, marginBottom: 10 }}>Size</div>
            {SIZES.map(s => (
              <button key={s} onClick={() => setActiveSize(s)} style={{
                display: 'inline-block',
                padding: '5px 10px', borderRadius: 6, marginRight: 6, marginBottom: 6,
                border: `1px solid ${activeSize === s ? TOKEN.primary : TOKEN.border}`,
                cursor: 'pointer',
                backgroundColor: activeSize === s ? 'rgba(187,134,252,0.12)' : 'transparent',
                color: activeSize === s ? TOKEN.primary : TOKEN.textPrimary,
                fontFamily: 'Inter, sans-serif', fontSize: 12,
              }}>{s}</button>
            ))}
          </div>

          <div>
            <div style={{ ...label, marginBottom: 10 }}>Active ring</div>
            <button onClick={() => setActive(v => !v)} style={{
              padding: '7px 14px', borderRadius: 6,
              border: `1px solid ${active ? TOKEN.primary : TOKEN.border}`,
              cursor: 'pointer',
              backgroundColor: active ? 'rgba(187,134,252,0.12)' : 'transparent',
              color: active ? TOKEN.primary : TOKEN.textPrimary,
              fontFamily: 'Inter, sans-serif', fontSize: 13,
            }}>{active ? 'On' : 'Off'}</button>
          </div>

          {(activeType === 'name' || activeType === 'brand') && (
            <div>
              <div style={{ ...label, marginBottom: 10 }}>Letter</div>
              <input
                value={letter}
                onChange={e => setLetter(e.target.value)}
                maxLength={1}
                style={{
                  width: 48, padding: '7px 10px', borderRadius: 6,
                  border: `1px solid ${TOKEN.border}`,
                  backgroundColor: TOKEN.bg,
                  color: TOKEN.textPrimary,
                  fontFamily: 'Inter, sans-serif', fontSize: 16, fontWeight: 600,
                  textAlign: 'center', outline: 'none',
                }}
              />
            </div>
          )}
        </div>

        {/* Live preview */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ ...sectionTitle }}>Preview</div>
          <div style={{
            padding: 48,
            backgroundColor: TOKEN.surface,
            borderRadius: 12,
            border: `1px solid ${TOKEN.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 48,
          }}>
            <Avatar type={activeType} size={activeSize} active={active} letter={letter} />
          </div>

          {/* All sizes */}
          <div style={{ ...sectionTitle }}>All sizes — {activeType}</div>
          <div style={{
            padding: '32px 40px',
            backgroundColor: TOKEN.surface,
            borderRadius: 12,
            border: `1px solid ${TOKEN.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginBottom: 48,
          }}>
            {SIZES.map(s => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <Avatar type={activeType} size={s} active={active} letter={letter} />
                <span style={{ ...label, fontSize: 10 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* All types */}
          <div style={{ ...sectionTitle }}>All types — {activeSize}</div>
          <div style={{
            padding: '32px 40px',
            backgroundColor: TOKEN.surface,
            borderRadius: 12,
            border: `1px solid ${TOKEN.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}>
            {TYPES.map(t => (
              <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <Avatar type={t} size={activeSize} active={active} letter={letter} />
                <span style={{ ...label, fontSize: 10 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
