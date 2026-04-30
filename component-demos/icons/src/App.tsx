import { useState } from 'react';
import { ICON_CATEGORIES, SEMANTIC_COLORS, SIZES, type IconDef } from './icons';

const BG = '#0A0A0F';
const SURFACE = '#181818';
const BORDER = 'rgba(255,255,255,0.07)';
const TEXT_PRIMARY = 'rgba(255,255,255,0.88)';
const TEXT_MUTED = '#9898B0';
const PURPLE = '#BB86FC';

function SvgIcon({ svg, size, color }: { svg: string; size: number; color: string }) {
  return (
    <span
      style={{ color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svg.replace(/width="[^"]*"/, `width="${size}"`).replace(/height="[^"]*"/, `height="${size}"`) }}
    />
  );
}

function IconCard({ icon, size }: { icon: IconDef; size: number }) {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: '16px 12px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        cursor: 'default',
      }}
    >
      {/* color swatches row */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {SEMANTIC_COLORS.map((c) => (
          <div
            key={c.label}
            title={`${c.label} — ${c.token}\n${c.value}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: size + 12,
              height: size + 12,
              borderRadius: 8,
              border: `1px solid ${BORDER}`,
              background: BG,
              cursor: 'pointer',
            }}
            onClick={() => copy(icon.path)}
          >
            <SvgIcon svg={icon.svg} size={size} color={c.value} />
          </div>
        ))}
      </div>

      {/* name + path */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600, color: TEXT_PRIMARY, letterSpacing: '0.3px' }}>
          {icon.name}
        </div>
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 10,
            color: copied ? PURPLE : TEXT_MUTED,
            marginTop: 2,
            cursor: 'pointer',
            transition: 'color 0.15s',
          }}
          onClick={() => copy(icon.path)}
          title="Click to copy path"
        >
          {copied ? 'copied!' : icon.path}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [size, setSize] = useState(20);

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: TEXT_PRIMARY }}>
      {/* header */}
      <div style={{ padding: '48px 48px 0' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: PURPLE, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
          Stockifi Design System
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Icons</h1>
        <p style={{ fontSize: 13, color: TEXT_MUTED, marginBottom: 32 }}>
          All icons use <code style={{ background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: 4, fontSize: 12 }}>currentColor</code> — apply token color at implementation. Click any path to copy.
        </p>

        {/* size selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
          <span style={{ fontSize: 12, color: TEXT_MUTED, marginRight: 4 }}>Preview size</span>
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                padding: '4px 12px',
                borderRadius: 6,
                border: `1px solid ${size === s ? PURPLE : BORDER}`,
                background: size === s ? 'rgba(187,134,252,0.12)' : 'transparent',
                color: size === s ? PURPLE : TEXT_MUTED,
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: size === s ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {s}px
            </button>
          ))}
        </div>

        {/* color legend */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
          {SEMANTIC_COLORS.map((c) => (
            <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.value, border: c.value === 'rgba(255,255,255,0.88)' ? `1px solid ${BORDER}` : 'none' }} />
              <span style={{ fontSize: 11, color: TEXT_MUTED }}>{c.label}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', fontFamily: 'monospace' }}>{c.token}</span>
            </div>
          ))}
        </div>
      </div>

      {/* categories */}
      <div style={{ padding: '0 48px 80px' }}>
        {ICON_CATEGORIES.map((category) => (
          <div key={category.label} style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: TEXT_MUTED, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16, borderBottom: `1px solid ${BORDER}`, paddingBottom: 10 }}>
              {category.label}
              <span style={{ fontSize: 11, fontWeight: 400, marginLeft: 8, textTransform: 'none', letterSpacing: 0 }}>
                {category.icons.length} icons
              </span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
              {category.icons.map((icon) => (
                <IconCard key={icon.name} icon={icon} size={size} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
