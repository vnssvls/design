import React from 'react';

export type SegmentedSize  = 'mobile' | 'desktop-sm' | 'desktop-lg';
export type SegmentedStyle = 'pill' | 'squared';
export type SegmentedTheme = 'dark' | 'white' | 'tonal';
export type SegmentedCount = 2 | 3 | 4;

export interface SegmentedToggleProps {
  size?:         SegmentedSize;
  count?:        SegmentedCount;
  activeButton?: 1 | 2 | 3 | 4;
  style?:        SegmentedStyle;
  theme?:        SegmentedTheme;
  labels?:       string[];
  showLabels?:   boolean;
  showIcons?:    boolean;
  onChange?:     (index: number) => void;
}

// Design tokens
const TOKENS = {
  containerBg:    '#1C1C26',  // BG/DesignBase/Grey 3
  purple700:      '#BB86FC',  // Purple/Primary 700
  purple25:       'rgba(155,126,189,0.25)', // BG/DesignBase/Purple 25%
  grey200:        '#EEEEEE',  // Neutral/Grey 200
  darkText:       '#0A0A0A',  // BG/DesignBase/Grey 1
  white:          '#FFFFFF',
  white60:        'rgba(255,255,255,0.60)',
  iconGreyActive: 'rgba(142,142,142,1)',  // white theme active icon
};

const SIZES: Record<SegmentedSize, { h: number; segH: number; hPad: number; fontSize: number; iconSize: number; cr: number; crSquared: number }> = {
  'mobile':     { h: 48, segH: 40, hPad: 14, fontSize: 14, iconSize: 20, cr: 20, crSquared: 6 },
  'desktop-lg': { h: 44, segH: 36, hPad: 12, fontSize: 14, iconSize: 18, cr: 18, crSquared: 6 },
  'desktop-sm': { h: 34, segH: 26, hPad: 10, fontSize: 12, iconSize: 15, cr: 13, crSquared: 4 },
};

const CONTAINER_CR: Record<SegmentedSize, { pill: number; squared: number }> = {
  'mobile':     { pill: 24, squared: 8 },
  'desktop-lg': { pill: 22, squared: 8 },
  'desktop-sm': { pill: 17, squared: 6 },
};

function IconDot({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="6.5" stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" fill={color} />
    </svg>
  );
}

function getActiveSegmentBg(theme: SegmentedTheme): string {
  if (theme === 'dark')  return TOKENS.purple700;
  if (theme === 'white') return TOKENS.grey200;
  return TOKENS.purple25; // tonal
}

function getLabelColor(theme: SegmentedTheme, isActive: boolean): string {
  if (!isActive) return TOKENS.white60;
  if (theme === 'white' || theme === 'dark') return TOKENS.darkText;
  return TOKENS.white; // tonal active label is white
}

function getIconColor(theme: SegmentedTheme, isActive: boolean): string {
  if (!isActive) return TOKENS.white;
  if (theme === 'white') return TOKENS.iconGreyActive;
  return isActive && theme === 'dark' ? TOKENS.white : TOKENS.white;
}

const DEFAULT_LABELS = ['Label A', 'Label B', 'Label C', 'Label D'];

export function SegmentedToggle({
  size         = 'desktop-sm',
  count        = 2,
  activeButton = 1,
  style        = 'pill',
  theme        = 'dark',
  labels,
  showLabels   = true,
  showIcons    = true,
  onChange,
}: SegmentedToggleProps) {
  const sz = SIZES[size];
  const containerCr = style === 'pill' ? CONTAINER_CR[size].pill : CONTAINER_CR[size].squared;
  const segCr = style === 'pill' ? sz.cr : sz.crSquared;
  const segLabels = labels ?? DEFAULT_LABELS.slice(0, count);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: TOKENS.containerBg,
        borderRadius: containerCr,
        padding: 4,
        height: sz.h,
        gap: 0,
        boxSizing: 'border-box',
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const isActive = i + 1 === activeButton;
        const activeBg = getActiveSegmentBg(theme);
        const labelColor = getLabelColor(theme, isActive);
        const iconColor = getIconColor(theme, isActive);

        return (
          <div
            key={i}
            onClick={() => onChange?.(i + 1)}
            style={{
              height: sz.segH,
              borderRadius: segCr,
              background: isActive ? activeBg : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingInline: sz.hPad,
              cursor: 'pointer',
              transition: 'background 150ms ease',
              userSelect: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {showIcons && (
              <IconDot size={sz.iconSize} color={iconColor} />
            )}
            {showLabels && (
              <span
                style={{
                  fontSize: sz.fontSize,
                  color: labelColor,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                }}
              >
                {segLabels[i] ?? `Label ${i + 1}`}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
