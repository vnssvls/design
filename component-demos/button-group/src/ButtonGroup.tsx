import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BGType        = 'tab' | 'nav';
export type BGStyle       = 'tonal' | 'grey';
export type BGShape       = 'pill' | 'squared';
export type BGTheme       = 'dark' | 'white';
export type BGActiveButton = 1 | 2 | 3 | 4;

export interface ButtonGroupProps {
  type?:         BGType;
  style?:        BGStyle;
  shape?:        BGShape;
  theme?:        BGTheme;
  activeButton?: BGActiveButton;
  onChange?:     (index: BGActiveButton) => void;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

const purple = '#BB86FC';

const CONTAINER_BG: Record<BGStyle, string> = {
  tonal: 'rgba(187,134,252,0.06)',
  grey:  'rgba(255,255,255,0.06)',
};

const ACTIVE_BG: Record<BGStyle, string> = {
  tonal: 'rgba(187,134,252,0.25)',
  grey:  'rgba(255,255,255,0.10)',
};

const CONTAINER_STROKE = 'rgba(255,255,255,0.06)';

const ACTIVE_LABEL:   Record<BGTheme, string> = {
  dark:  'rgba(255,255,255,1.0)',
  white: 'rgba(255,255,255,1.0)',
};

const INACTIVE_LABEL: Record<BGTheme, string> = {
  dark:  'rgba(255,255,255,0.50)',
  white: 'rgba(255,255,255,0.50)',
};

// ─── Label sets ───────────────────────────────────────────────────────────────

const TAB_LABELS    = ['Last 7 days', 'Last 30 days', 'Last 90 days'] as const;
// nav-3 is shown when activeButton is 1, 2, or 3
const NAV_LABELS_3  = ['Variance', 'Suppliers', 'Recipe Cost'] as const;
// nav-4 is shown when activeButton is 4
const NAV_LABELS_4  = ['Items', 'Recipes', 'Tasks', 'Tab 4'] as const;

function getLabels(type: BGType, activeButton: BGActiveButton): string[] {
  if (type === 'tab') return [...TAB_LABELS];
  // Nav shows 4 buttons only when active is 4
  return activeButton === 4 ? [...NAV_LABELS_4] : [...NAV_LABELS_3];
}

// ─── Sizing ───────────────────────────────────────────────────────────────────

const CONTAINER_H  = 34;   // px
const BUTTON_H     = 26;   // px
const H_PAD        = 12;   // px per button
const FONT_SIZE    = 12;   // px
const DOT_SIZE     = 6;    // px
const DOT_GAP      = 5;    // px between dot and label

// ─── Dot indicator ────────────────────────────────────────────────────────────

function Dot() {
  return (
    <span
      style={{
        width:        DOT_SIZE,
        height:       DOT_SIZE,
        borderRadius: '50%',
        background:   purple,
        flexShrink:   0,
        display:      'inline-block',
      }}
    />
  );
}

// ─── Single button ────────────────────────────────────────────────────────────

interface ButtonItemProps {
  label:     string;
  isActive:  boolean;
  bgStyle:   BGStyle;
  theme:     BGTheme;
  shape:     BGShape;
  isFirst:   boolean;
  isLast:    boolean;
  onClick:   () => void;
}

function ButtonItem({
  label, isActive, bgStyle, theme, shape, isFirst, isLast, onClick,
}: ButtonItemProps) {
  const innerRadius = shape === 'pill' ? 999 : 6;

  // For pill shape we give inner buttons a slightly tighter radius
  // to fit snugly inside the container; first/last buttons get full inner curve.
  const borderRadius =
    shape === 'pill'
      ? innerRadius
      : isFirst && isLast
        ? innerRadius
        : isFirst
          ? `${innerRadius}px 2px 2px ${innerRadius}px`
          : isLast
            ? `2px ${innerRadius}px ${innerRadius}px 2px`
            : '2px';

  return (
    <button
      onClick={onClick}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            isActive ? DOT_GAP : 0,
        height:         BUTTON_H,
        paddingInline:  H_PAD,
        borderRadius,
        background:     isActive ? ACTIVE_BG[bgStyle] : 'transparent',
        border:         'none',
        cursor:         'pointer',
        transition:     'background 150ms ease',
        whiteSpace:     'nowrap',
        userSelect:     'none',
        // Transition max-width so the dot doesn't cause layout jump
      }}
    >
      {isActive && <Dot />}
      <span
        style={{
          fontSize:   FONT_SIZE,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          color:      isActive ? ACTIVE_LABEL[theme] : INACTIVE_LABEL[theme],
          transition: 'color 150ms ease',
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── ButtonGroup ─────────────────────────────────────────────────────────────

export function ButtonGroup({
  type         = 'nav',
  style        = 'tonal',
  shape        = 'pill',
  theme        = 'dark',
  activeButton = 1,
  onChange,
}: ButtonGroupProps) {
  const labels       = getLabels(type, activeButton);
  const containerR   = shape === 'pill' ? 999 : 8;
  const containerPad = 4;

  return (
    <div
      style={{
        display:      'inline-flex',
        alignItems:   'center',
        height:       CONTAINER_H,
        padding:      containerPad,
        borderRadius: containerR,
        background:   CONTAINER_BG[style],
        border:       `1px solid ${CONTAINER_STROKE}`,
        gap:          2,
      }}
    >
      {labels.map((label, i) => {
        const oneBasedIndex = (i + 1) as BGActiveButton;
        return (
          <ButtonItem
            key={label}
            label={label}
            isActive={oneBasedIndex === activeButton}
            bgStyle={style}
            theme={theme}
            shape={shape}
            isFirst={i === 0}
            isLast={i === labels.length - 1}
            onClick={() => onChange?.(oneBasedIndex)}
          />
        );
      })}
    </div>
  );
}
