import React, { useState } from 'react';
import { InputField, InputFieldState } from './InputField';

const STATES: InputFieldState[] = ['default', 'focus', 'filled', 'error'];

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

export default function App() {
  const [showCounter, setShowCounter]   = useState(false);
  const [maxLength]                      = useState(50);
  const [placeholderText, setPlaceholder] = useState('e.g. Placeholder text');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: TOKEN.bg, padding: '48px 64px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 8 }}>InputField</h1>
      <p style={{ fontSize: 13, color: TOKEN.textMuted, marginBottom: 48 }}>
        Single-line text input. Four states: default, focus, filled, error. Optional character counter.
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
            <div style={{ ...label, marginBottom: 10 }}>Options</div>
            <label style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 8, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: TOKEN.textPrimary,
            }}>
              <input
                type="checkbox"
                checked={showCounter}
                onChange={e => setShowCounter(e.target.checked)}
                style={{ accentColor: TOKEN.primary, width: 14, height: 14 }}
              />
              show-counter
            </label>
          </div>

          <div>
            <div style={{ ...label, marginBottom: 10 }}>Placeholder</div>
            <input
              value={placeholderText}
              onChange={e => setPlaceholder(e.target.value)}
              style={{
                width: '100%', padding: '7px 10px', borderRadius: 6,
                border: `1px solid ${TOKEN.border}`, backgroundColor: TOKEN.bg,
                color: TOKEN.textPrimary, fontFamily: 'Inter, sans-serif', fontSize: 13,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Preview */}
        <div style={{ flex: 1, minWidth: 380, display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Interactive */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 16 }}>Interactive</div>
            <div style={{
              padding: 40, borderRadius: 12,
              backgroundColor: '#212121',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 332 }}>
                <InputField
                  placeholder={placeholderText}
                  showCounter={showCounter}
                  maxLength={maxLength}
                />
              </div>
            </div>
          </div>

          {/* All states */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 16 }}>All states</div>
            <div style={{
              padding: '32px 40px', borderRadius: 12,
              backgroundColor: '#212121',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}>
              {STATES.map(s => (
                <div key={s}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
                    color: TOKEN.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em',
                    marginBottom: 8,
                  }}>
                    {s}
                  </div>
                  <div style={{ width: 332 }}>
                    <InputField
                      state={s}
                      value={s === 'default' ? '' : 'e.g. Placeholder text'}
                      placeholder="e.g. Placeholder text"
                      showCounter={showCounter}
                      counter={showCounter ? '17 / 50' : undefined}
                      errorMessage={s === 'error' ? 'This field is required.' : undefined}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* With counter */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TOKEN.textPrimary, marginBottom: 16 }}>With counter</div>
            <div style={{
              padding: '32px 40px', borderRadius: 12,
              backgroundColor: '#212121',
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div style={{ width: 332 }}>
                <InputField
                  placeholder="e.g. Placeholder text"
                  showCounter
                  maxLength={50}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
