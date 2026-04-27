import React from 'react';
import { tokens } from './tokens';

export type ButtonType  = 'primary' | 'secondary' | 'secondary-grey' | 'ghost' | 'white';
export type ButtonSize  = 'small' | 'medium' | 'large';
export type ButtonState = 'default' | 'hover' | 'active' | 'disabled';

export interface ButtonProps {
  type?:      ButtonType;
  size?:      ButtonSize;
  state?:     ButtonState;
  label?:     string;
  showIcon?:  boolean;
  showLabel?: boolean;
  onClick?:   () => void;
}

const SIZE: Record<ButtonSize, { height: number; hPad: number; fontSize: number; gap: number; iconSize: number }> = {
  small:  { height: 32, hPad: 12, fontSize: 13, gap: 6,  iconSize: 14 },
  medium: { height: 36, hPad: 16, fontSize: 14, gap: 8,  iconSize: 16 },
  large:  { height: 43, hPad: 20, fontSize: 16, gap: 8,  iconSize: 18 },
};

// BG fills per type × state
function getBg(type: ButtonType, state: ButtonState): string {
  if (state === 'disabled') return 'transparent';
  if (type === 'primary') {
    if (state === 'hover')   return 'rgba(187,134,252,0.80)';
    if (state === 'active')  return tokens.primary;
    return tokens.primary;
  }
  if (type === 'white') {
    if (state === 'hover') return 'rgba(255,255,255,0.90)';
    return tokens.white; // default + active = 100%
  }
  if (type === 'secondary' || type === 'secondary-grey') {
    if (state === 'hover')  return 'rgba(187,134,252,0.08)';
    if (state === 'active') return 'rgba(187,134,252,0.16)';
    return 'transparent';
  }
  // ghost
  return 'transparent';
}

function getBorder(type: ButtonType, state: ButtonState): string | undefined {
  if (type === 'secondary')      return '1px solid rgba(142,102,192,1)'; // Purple/Primary 800
  if (type === 'secondary-grey') return '1px solid rgba(75,75,75,1)';    // Neutral/Grey 600
  return undefined;
}

function getTextColor(type: ButtonType): string {
  if (type === 'primary' || type === 'white') return '#0A0A0A';
  return tokens.white;
}

function getOpacity(state: ButtonState): number {
  if (state === 'disabled') return 0.38;
  return 1;
}

function ArrowIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Button({
  type      = 'primary',
  size      = 'medium',
  state     = 'default',
  label     = 'Button',
  showIcon  = false,
  showLabel = true,
  onClick,
}: ButtonProps) {
  const s         = SIZE[size];
  const bg        = getBg(type, state);
  const border    = getBorder(type, state);
  const textColor = getTextColor(type);
  const opacity   = getOpacity(state);

  return (
    <div
      onClick={state !== 'disabled' ? onClick : undefined}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            s.gap,
        height:         s.height,
        paddingLeft:    s.hPad,
        paddingRight:   s.hPad,
        borderRadius:   8,
        background:     bg,
        border:         border ?? 'none',
        opacity,
        cursor:         state === 'disabled' ? 'not-allowed' : 'pointer',
        fontFamily:     tokens.fontFamily,
        fontSize:       s.fontSize,
        fontWeight:     500,
        color:          textColor,
        whiteSpace:     'nowrap',
        userSelect:     'none',
        boxSizing:      'border-box',
        transition:     'background 0.12s, opacity 0.12s',
      }}
    >
      {showIcon && <ArrowIcon size={s.iconSize} color={textColor} />}
      {showLabel && <span>{label}</span>}
    </div>
  );
}
