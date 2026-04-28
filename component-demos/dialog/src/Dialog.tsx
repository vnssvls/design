import React, { useState } from 'react';
import { tokens } from './tokens';

export type DialogType = 'input' | 'alert' | 'confirmation';
export type DialogTheme = 'Grey' | 'Tonal';

interface DialogProps {
  type: DialogType;
  theme: DialogTheme;
  title?: string;
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  shell: {
    fontFamily: tokens.fontFamily,
    borderRadius: tokens.radiusDialog,
    border: `1px solid ${tokens.border}`,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  },
  header: {
    padding: '20px 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: tokens.fontSizeBase,
    fontWeight: tokens.fontWeightSemiBold,
    color: tokens.textPrimary,
    margin: 0,
  },
  subtitle: {
    fontSize: tokens.fontSizeSm,
    color: 'rgba(255,255,255,0.80)',
    margin: 0,
    lineHeight: '1.5',
  },
  closeBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: 'none',
    background: tokens.closeButtonBg,
    color: 'rgba(255,255,255,0.50)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
  },
  body: {
    padding: '0 20px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: tokens.fontSizeXs,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    background: tokens.inputBg,
    border: `1px solid ${tokens.border}`,
    borderRadius: tokens.radiusInput,
    padding: '9px 12px',
    fontSize: tokens.fontSizeSm,
    color: tokens.textPrimary,
    fontFamily: tokens.fontFamily,
    outline: 'none',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: tokens.error,
  },
  errorMsg: {
    fontSize: tokens.fontSizeXs,
    color: tokens.error,
  },
  footer: {
    padding: '12px 20px 20px',
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
  },
  btnGhost: {
    background: 'transparent',
    border: 'none',
    color: tokens.buttonGhostText,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamily,
    fontWeight: tokens.fontWeightMedium,
    padding: '8px 12px',
    borderRadius: tokens.radiusButton,
    cursor: 'pointer',
  },
  btnDanger: {
    background: tokens.errorBg,
    border: 'none',
    color: tokens.error,
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamily,
    fontWeight: tokens.fontWeightMedium,
    padding: '8px 14px',
    borderRadius: tokens.radiusButton,
    cursor: 'pointer',
  },
  btnPrimary: {
    background: '#fff',
    border: 'none',
    color: '#0A0A0F',
    fontSize: tokens.fontSizeSm,
    fontFamily: tokens.fontFamily,
    fontWeight: tokens.fontWeightSemiBold,
    padding: '8px 14px',
    borderRadius: tokens.radiusButton,
    cursor: 'pointer',
  },
  btnPrimaryDisabled: {
    background: 'rgba(255,255,255,0.20)',
    color: 'rgba(255,255,255,0.30)',
    cursor: 'not-allowed',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 0 4px',
  },
  checkboxLabel: {
    fontSize: tokens.fontSizeSm,
    color: 'rgba(255,255,255,0.80)',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    borderRadius: tokens.radiusCheckbox,
    accentColor: tokens.primary,
    cursor: 'pointer',
    flexShrink: 0,
  },
  divider: {
    height: '1px',
    background: tokens.border,
    margin: '0',
  },
};

export function Dialog({ type, theme, title = 'Save Report As' }: DialogProps) {
  const [inputValue, setInputValue] = useState('');
  const [inputState, setInputState] = useState<'default' | 'duplicate' | 'error'>('default');
  const [checked, setChecked] = useState(false);

  const bg = theme === 'Tonal' ? tokens.bgTonal : tokens.bgGrey;

  const shellStyle: React.CSSProperties = {
    ...styles.shell,
    backgroundColor: bg,
    width: type === 'confirmation' ? '420px' : '380px',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (inputState !== 'default') setInputState('default');
  };

  const handleSave = () => {
    if (!inputValue.trim()) {
      setInputState('error');
    } else if (inputValue === 'Duplicate Report') {
      setInputState('duplicate');
    }
  };

  return (
    <div style={shellStyle}>
      {/* Header */}
      {type === 'alert' ? (
        <div style={styles.header}>
          <div style={styles.headerRow}>
            <h2 style={styles.title}>{title}</h2>
            <button style={styles.closeBtn}>✕</button>
          </div>
          <p style={styles.subtitle}>Would you like to save your changes or discard them?</p>
        </div>
      ) : (
        <div style={{ ...styles.header, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.closeBtn}>✕</button>
        </div>
      )}

      {/* Body */}
      {type === 'input' && (
        <div style={styles.body}>
          <div style={{ paddingTop: '12px' }}>
            <p style={styles.label}>Report name</p>
          </div>
          <input
            style={{
              ...styles.input,
              ...(inputState !== 'default' ? styles.inputError : {}),
            }}
            placeholder="e.g. Placeholder text"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputState === 'duplicate' && (
            <p style={styles.errorMsg}>A report with this name already exists.</p>
          )}
          {inputState === 'error' && (
            <p style={styles.errorMsg}>Report name cannot be empty.</p>
          )}
        </div>
      )}

      {type === 'confirmation' && (
        <div style={styles.body}>
          <p style={{ ...styles.subtitle, paddingTop: '12px' }}>
            This action cannot be undone. Do you want to continue?
          </p>
          <div style={styles.checkboxRow}>
            <input
              type="checkbox"
              id="confirm-checkbox"
              style={styles.checkbox}
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
            />
            <label htmlFor="confirm-checkbox" style={styles.checkboxLabel}>
              Yes, delete this saved report
            </label>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={styles.footer}>
        {type === 'input' && (
          <>
            <button style={styles.btnGhost}>Cancel</button>
            <button style={styles.btnPrimary} onClick={handleSave}>Save</button>
          </>
        )}
        {type === 'alert' && (
          <>
            <button style={styles.btnGhost}>Cancel</button>
            <button style={styles.btnDanger}>Discard</button>
            <button style={styles.btnPrimary}>Save</button>
          </>
        )}
        {type === 'confirmation' && (
          <>
            <button style={styles.btnGhost}>Cancel</button>
            <button
              style={{
                ...styles.btnDanger,
                ...(!checked ? styles.btnPrimaryDisabled : {}),
              }}
              disabled={!checked}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
