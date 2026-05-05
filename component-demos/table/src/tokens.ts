import React from 'react';

export const T = {
  bg:             '#0A0A0F',
  surface:        '#181818',
  surfaceGrey:    '#212121',
  grey2:          '#0F0F12',
  headerTonal:    '#0F0D14',
  purple:         '#BB86FC',
  success:        '#47B881',
  warning:        '#FF863B',
  danger:         '#BA4C4E',
  amber:          '#FFB300',
  white88:        'rgba(255,255,255,0.88)',
  white60:        'rgba(255,255,255,0.60)',
  white30:        'rgba(255,255,255,0.30)',
  white10:        'rgba(255,255,255,0.10)',
  white08:        'rgba(255,255,255,0.08)',
  white06:        'rgba(255,255,255,0.06)',
  rowDivider:     'rgba(255,255,255,0.06)',
  hoverTonal:     'rgba(255,255,255,0.025)',
  hoverGrey:      'rgba(255,255,255,0.06)',
  selectedBg:     'rgba(187,134,252,0.06)',
  selectedAccent: '#BB86FC',
  skeleton:       'rgba(255,255,255,0.08)',
  sectionBg:      'rgba(255,255,255,0.03)',
  sectionBorder:  'rgba(255,255,255,0.07)',
  labelMuted:     '#6b7280',
} as const;

export type Density         = 'desktop' | 'tablet' | 'mobile';
export type Theme           = 'tonal' | 'grey';
export type RowState        = 'default' | 'hover' | 'selected' | 'loading' | 'empty';
export type Sentiment       = 'neutral' | 'positive' | 'negative' | 'warning';
export type SortDir         = 'none' | 'asc' | 'desc';
export type Align           = 'left' | 'center';
export type StatusDisplay   = 'complete' | 'in-progress' | 'incomplete' | 'empty';
export type HealthSentiment = 'good' | 'warning' | 'bad';
export type ActionType      = 'download' | 'open' | 'view';

export const SENTIMENT_COLOR: Record<Sentiment, string> = {
  neutral:  T.white88,
  positive: T.success,
  negative: '#E06060',
  warning:  T.warning,
};

// When flex is provided, cell becomes a flex item with minWidth.
// When not provided, cell uses fixed width (backward-compatible default).
export function cellSize(width: number, flex?: string): React.CSSProperties {
  return flex
    ? { flex, minWidth: width, boxSizing: 'border-box' }
    : { width, flexShrink: 0, boxSizing: 'border-box' };
}
