import React from 'react';

export type SegmentedSize  = 'mobile' | 'desktop-sm' | 'desktop-lg';
export type SegmentedState = 'left-selected' | 'right-selected';
export type SegmentedStyle = 'pill' | 'squared';
export type SegmentedTheme = 'dark' | 'white';

export interface SegmentedToggleProps {
  size?: SegmentedSize;
  state?: SegmentedState;
  style?: SegmentedStyle;
  theme?: SegmentedTheme;
  leftLabel?: string;
  rightLabel?: string;
  showLabels?: boolean;
  onChange?: (selected: 'left' | 'right') => void;
}

// tokens
const purple700     = '#BB86FC';
const containerBg   = '#1C1C26';   // BG/DesignBase/Grey 3
const textOnActive  = '#0A0A0A';   // BG/DesignBase/Grey 1
const textInactive  = 'rgba(255,255,255,0.88)';
const whiteActive   = '#EEEEEE';   // Neutral/Grey 200

const SIZE: Record<SegmentedSize, { h: number; segH: number; hPad: number; fontSize: number; gap: number }> = {
  'mobile':     { h: 48, segH: 40, hPad: 16, fontSize: 14, gap: 6 },
  'desktop-lg': { h: 44, segH: 36, hPad: 14, fontSize: 14, gap: 6 },
  'desktop-sm': { h: 34, segH: 26, hPad: 10, fontSize: 12, gap: 4 },
};

const RADIUS: Record<SegmentedStyle, number> = {
  pill:    999,
  squared: 8,
};

function IconPlaceholder({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" fill={color} />
    </svg>
  );
}

export function SegmentedToggle({
  size = 'desktop-sm',
  state = 'left-selected',
  style = 'pill',
  theme = 'dark',
  leftLabel = 'Label A',
  rightLabel = 'Label B',
  showLabels = true,
  onChange,
}: SegmentedToggleProps) {
  const sz = SIZE[size];
  const radius = RADIUS[style];
  const segRadius = style === 'pill' ? radius - 4 : radius - 2;
  const activeColor = theme === 'dark' ? purple700 : whiteActive;
  const iconSize = sz.fontSize - 2;

  const Segment = ({
    side,
    label,
  }: {
    side: 'left' | 'right';
    label: string;
  }) => {
    const isActive = (side === 'left' && state === 'left-selected') || (side === 'right' && state === 'right-selected');
    const labelColor = isActive ? textOnActive : textInactive;
    const iconColor  = isActive ? textOnActive : textInactive;

    return (
      <div
        onClick={() => onChange?.(side)}
        style={{
          flex: 1,
          height: sz.segH,
          borderRadius: segRadius,
          background: isActive ? activeColor : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: sz.gap,
          paddingInline: sz.hPad,
          cursor: 'pointer',
          transition: 'background 150ms ease',
          userSelect: 'none',
        }}
      >
        <IconPlaceholder size={iconSize} color={iconColor} />
        {showLabels && (
          <span style={{ fontSize: sz.fontSize, color: labelColor, fontFamily: 'Inter, sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>
            {label}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: containerBg,
        borderRadius: radius,
        padding: 4,
        height: sz.h,
        gap: 0,
      }}
    >
      <Segment side="left" label={leftLabel} />
      <Segment side="right" label={rightLabel} />
    </div>
  );
}
