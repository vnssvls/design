import React from 'react';
import { tokens } from './tokens';

export type BadgeVariant = 'filled' | 'outlined' | 'muted';
export type BadgeStyle = 'rounded' | 'square';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeColor =
  | 'success' | 'warning' | 'error' | 'primary' | 'neutral'
  | 'menu-item' | 'prebatch' | 'pos button';

export interface BadgeProps {
  variant?: BadgeVariant;
  badgeStyle?: BadgeStyle;
  size?: BadgeSize;
  color?: BadgeColor;
  showDot?: boolean;
  showLabel?: boolean;
  showClose?: boolean;
  label?: string;
}

const COLOR_BASE: Record<BadgeColor, string> = {
  success:      tokens.success,
  warning:      tokens.warning,
  error:        tokens.error,
  primary:      tokens.primary,
  neutral:      '#FFFFFF',
  'menu-item':  tokens.menuItem,
  prebatch:     tokens.prebatch,
  'pos button': tokens.posButton,
};

const FILLED_TEXT: Record<BadgeColor, string> = {
  success:      '#FFFFFF',
  warning:      '#FFFFFF',
  error:        '#FFFFFF',
  primary:      '#0A0A0A',
  neutral:      '#0A0A0A',
  'menu-item':  '#0D4159',
  prebatch:     '#0E6126',
  'pos button': '#3A360A',
};

const BG_OPACITY: Record<BadgeColor, number> = {
  success:      0.12,
  warning:      0.10,
  error:        0.10,
  primary:      0.12,
  neutral:      0.06,
  'menu-item':  0.12,
  prebatch:     0.12,
  'pos button': 0.06,
};

const BORDER_OPACITY: Record<BadgeColor, number> = {
  success:      0.35,
  warning:      0.35,
  error:        0.35,
  primary:      0.35,
  neutral:      0.18,
  'menu-item':  0.35,
  prebatch:     0.35,
  'pos button': 0.18,
};

const SIZE_STYLES: Record<BadgeSize, { height: number; hPad: number; fontSize: number; dotSize: number }> = {
  sm: { height: 20, hPad: 8,  fontSize: 11, dotSize: 5 },
  md: { height: 24, hPad: 10, fontSize: 12, dotSize: 6 },
  lg: { height: 28, hPad: 12, fontSize: 14, dotSize: 7 },
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function Badge({
  variant = 'filled',
  badgeStyle = 'rounded',
  size = 'md',
  color = 'success',
  showDot = false,
  showLabel = true,
  showClose = false,
  label = 'Label',
}: BadgeProps) {
  const base = COLOR_BASE[color];
  const s = SIZE_STYLES[size];
  const borderRadius = badgeStyle === 'rounded' ? 999 : 4;

  let bg: string;
  let textColor: string;
  let border: string | undefined;

  if (variant === 'filled') {
    bg = base;
    textColor = FILLED_TEXT[color];
    border = undefined;
  } else {
    bg = hexToRgba(base, BG_OPACITY[color]);
    textColor = base;
    border = variant === 'outlined'
      ? `1px solid ${hexToRgba(base, BORDER_OPACITY[color])}`
      : undefined;
  }

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: s.dotSize,
    height: s.height,
    paddingLeft: s.hPad,
    paddingRight: showClose ? s.hPad - 2 : s.hPad,
    borderRadius,
    background: bg,
    border: border ?? 'none',
    boxSizing: 'border-box',
    fontFamily: tokens.fontFamily,
    fontSize: s.fontSize,
    fontWeight: 500,
    color: textColor,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  return (
    <div style={containerStyle}>
      {showDot && (
        <span style={{
          width: s.dotSize,
          height: s.dotSize,
          borderRadius: '50%',
          background: textColor,
          flexShrink: 0,
        }} />
      )}
      {showLabel && <span>{label}</span>}
      {showClose && (
        <span
          style={{
            marginLeft: 2,
            width: s.dotSize + 4,
            height: s.dotSize + 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            opacity: 0.6,
            flexShrink: 0,
          }}
        >
          <svg width={s.dotSize + 2} height={s.dotSize + 2} viewBox="0 0 8 8" fill="none">
            <path d="M1 1L7 7M7 1L1 7" stroke={textColor} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      )}
    </div>
  );
}
