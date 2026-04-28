import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BGCount        = 3 | 4;
export type BGStyle        = 'default' | 'with-dot' | 'with-icon';
export type BGShape        = 'rectangle' | 'rounded';
export type BGTheme        = 'tonal' | 'grey';
export type BGActiveButton = 1 | 2 | 3 | 4;

export interface ButtonGroupProps {
  count?:        BGCount;
  style?:        BGStyle;
  shape?:        BGShape;
  theme?:        BGTheme;
  activeButton?: BGActiveButton;
  labels?:       string[];
  onChange?:     (index: BGActiveButton) => void;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

const CONTAINER_BG: Record<BGTheme, string> = {
  tonal: 'rgba(155, 126, 189, 0.06)',
  grey:  'rgba(255, 255, 255, 0.06)',
};

const ACTIVE_BG: Record<BGTheme, string> = {
  tonal: 'rgba(155, 126, 189, 0.25)',
  grey:  'rgba(255, 255, 255, 0.10)',
};

const CONTAINER_STROKE = 'rgba(255, 255, 255, 0.06)';
const ACTIVE_LABEL     = 'rgba(255, 255, 255, 1.0)';
const INACTIVE_LABEL   = 'rgba(255, 255, 255, 0.50)';
const DOT_COLOR        = '#BB86FC';

const CONTAINER_H = 34;
const BUTTON_H    = 26;
const H_PAD       = 12;
const FONT_SIZE   = 12;
const DOT_SIZE    = 6;
const ICON_SIZE   = 12;
const INDICATOR_GAP = 5;

const DEFAULT_LABELS = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];

// ─── Dot indicator ────────────────────────────────────────────────────────────

function Dot() {
  return (
    <span style={{
      width: DOT_SIZE, height: DOT_SIZE,
      borderRadius: '50%',
      background: DOT_COLOR,
      flexShrink: 0,
      display: 'inline-block',
    }} />
  );
}

// ─── Icon placeholder (matches the target/dot icon from the Figma icon set) ──

function Icon() {
  return (
    <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="6.5" stroke={DOT_COLOR} strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" fill={DOT_COLOR} />
    </svg>
  );
}

// ─── Single button ────────────────────────────────────────────────────────────

interface ButtonItemProps {
  label:    string;
  isActive: boolean;
  style:    BGStyle;
  shape:    BGShape;
  theme:    BGTheme;
  onClick:  () => void;
}

function ButtonItem({ label, isActive, style, shape, theme, onClick }: ButtonItemProps) {
  const radius = shape === 'rounded' ? 999 : 6;
  const showIndicator = isActive && style !== 'default';

  return (
    <button
      onClick={onClick}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            showIndicator ? INDICATOR_GAP : 0,
        height:         BUTTON_H,
        paddingInline:  H_PAD,
        borderRadius:   radius,
        background:     isActive ? ACTIVE_BG[theme] : 'transparent',
        border:         'none',
        cursor:         'pointer',
        transition:     'background 150ms ease',
        whiteSpace:     'nowrap',
        userSelect:     'none',
      }}
    >
      {isActive && style === 'with-dot'  && <Dot />}
      {isActive && style === 'with-icon' && <Icon />}
      <span style={{
        fontSize:   FONT_SIZE,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        color:      isActive ? ACTIVE_LABEL : INACTIVE_LABEL,
        transition: 'color 150ms ease',
      }}>
        {label}
      </span>
    </button>
  );
}

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

export function ButtonGroup({
  count        = 3,
  style        = 'default',
  shape        = 'rectangle',
  theme        = 'tonal',
  activeButton = 1,
  labels,
  onChange,
}: ButtonGroupProps) {
  const containerRadius = shape === 'rounded' ? 999 : 8;
  const resolvedLabels  = labels ?? DEFAULT_LABELS.slice(0, count);
  const clampedActive   = Math.min(activeButton, count) as BGActiveButton;

  return (
    <div style={{
      display:      'inline-flex',
      alignItems:   'center',
      height:       CONTAINER_H,
      padding:      4,
      borderRadius: containerRadius,
      background:   CONTAINER_BG[theme],
      border:       `1px solid ${CONTAINER_STROKE}`,
      gap:          2,
    }}>
      {resolvedLabels.map((label, i) => {
        const oneBasedIndex = (i + 1) as BGActiveButton;
        return (
          <ButtonItem
            key={i}
            label={label}
            isActive={oneBasedIndex === clampedActive}
            style={style}
            shape={shape}
            theme={theme}
            onClick={() => onChange?.(oneBasedIndex)}
          />
        );
      })}
    </div>
  );
}
