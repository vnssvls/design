import React, { useState } from 'react';
import { ToastNotif, ToastType, ToastMode } from './ToastNotif';

const TYPES: ToastType[] = ['Info', 'Success', 'Warning', 'Error'];
const MODES: ToastMode[] = ['Light', 'Dark'];

const TOKEN = {
  bg: '#0A0A0F',
  surface: '#181818',
  surfaceLight: '#FCFBFB',
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

export default function App() {
  const [type, setType]               = useState<ToastType>('Info');
  const [mode, setMode]               = useState<ToastMode>('Light');
  const [showTitle, setShowTitle]     = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [showIcon, setShowIcon]       = useState(true);
  const [showClose, setShowClose]     = useState(true);
  const [title, setTitle]             = useState('Info/Success/Warning title');
  const [subtitle, setSubtitle]       = useState('Short and clear additional description.');

  const previewBg = mode === 'Dark' ? '#212121' : '#F0F0F0';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: TOKEN.bg, padding: '48px 64px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 8 }}>toast.notif</h1>
      <p style={{ fontSize: 13, color: TOKEN.textMuted, marginBottom: 48 }}>
        Contextual notification toast. Supports Info, Success, Warning, and Error states in Light and Dark modes.
      </p>

      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>

        {/* Controls */}
        <div style={{
          width: 240, padding: 24,
          backgroundColor: TOKEN.surface,
          borderRadius: 12, border: `1px solid ${TOKEN.border}`,
          display: 'flex', flexDirection: 'column', gap: 24, flexShrink: 0,
        }}>
          <div>
            <div style={{ ...label, marginBottom: 10 }}>Type</div>
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '7px 10px', borderRadius: 6, marginBottom: 4,
                border: 'none', cursor: 'pointer',
                backgroundColor: type === t ? 'rgba(187,134,252,0.12)' : 'transparent',
                color: type === t ? TOKEN.primary : TOKEN.textPrimary,
                fontFamily: 'Inter, sans-serif', fontSize: 13,
              }}>{t}</button>
            ))}
          </div>

          <div>
            <div style={{ ...label, marginBottom: 10 }}>Mode</div>
            {MODES.map(m => (
              <button key={m} onClick={() => setMode(m)} style={{
                display: 'inline-block', padding: '5px 12px', borderRadius: 6,
                marginRight: 6, border: `1px solid ${mode === m ? TOKEN.primary : TOKEN.border}`,
                cursor: 'pointer',
                backgroundColor: mode === m ? 'rgba(187,134,252,0.12)' : 'transparent',
                color: mode === m ? TOKEN.primary : TOKEN.textPrimary,
                fontFamily: 'Inter, sans-serif', fontSize: 13,
              }}>{m}</button>
            ))}
          </div>

          <div>
            <div style={{ ...label, marginBottom: 10 }}>Visibility</div>
            {([
              ['show-title',    showTitle,    setShowTitle],
              ['show-subtitle', showSubtitle, setShowSubtitle],
              ['show-icon',     showIcon,     setShowIcon],
              ['show-close',    showClose,    setShowClose],
            ] as const).map(([name, val, setter]) => (
              <label key={name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 8, cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: TOKEN.textPrimary,
              }}>
                <input
                  type="checkbox"
                  checked={val}
                  onChange={e => (setter as (v: boolean) => void)(e.target.checked)}
                  style={{ accentColor: TOKEN.primary, width: 14, height: 14 }}
                />
                {name}
              </label>
            ))}
          </div>

          <div>
            <div style={{ ...label, marginBottom: 10 }}>Title</div>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: '100%', padding: '7px 10px', borderRadius: 6,
                border: `1px solid ${TOKEN.border}`, backgroundColor: TOKEN.bg,
                color: TOKEN.textPrimary, fontFamily: 'Inter, sans-serif', fontSize: 13,
                outline: 'none',
              }}
            />
          </div>

          <div>
            <div style={{ ...label, marginBottom: 10 }}>Subtitle</div>
            <textarea
              value={subtitle}
              onChange={e => setSubtitle(e.target.value)}
              rows={2}
              style={{
                width: '100%', padding: '7px 10px', borderRadius: 6,
                border: `1px solid ${TOKEN.border}`, backgroundColor: TOKEN.bg,
                color: TOKEN.textPrimary, fontFamily: 'Inter, sans-serif', fontSize: 13,
                outline: 'none', resize: 'vertical',
              }}
            />
          </div>
        </div>

        {/* Preview + all variants */}
        <div style={{ flex: 1, minWidth: 380 }}>

          {/* Live preview */}
          <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 16 }}>Preview</div>
          <div style={{
            padding: 48, borderRadius: 12,
            backgroundColor: previewBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 48,
            transition: 'background-color 0.2s',
          }}>
            <ToastNotif
              type={type} mode={mode}
              title={title} subtitle={subtitle}
              showTitle={showTitle} showSubtitle={showSubtitle}
              showIcon={showIcon} showClose={showClose}
            />
          </div>

          {/* All types — Light */}
          <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 16 }}>All types — Light</div>
          <div style={{
            padding: '32px 40px', borderRadius: 12,
            backgroundColor: '#E8E8E8',
            display: 'flex', flexDirection: 'column', gap: 12,
            marginBottom: 48,
          }}>
            {TYPES.map(t => (
              <ToastNotif key={t} type={t} mode="Light" title={`${t} title`} subtitle="Short and clear additional description." />
            ))}
          </div>

          {/* All types — Dark */}
          <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 16 }}>All types — Dark</div>
          <div style={{
            padding: '32px 40px', borderRadius: 12,
            backgroundColor: '#212121',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {TYPES.map(t => (
              <ToastNotif key={t} type={t} mode="Dark" title={`${t} title`} subtitle="Short and clear additional description." />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
