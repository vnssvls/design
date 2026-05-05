import React, { useState } from 'react';

// ─── Tokens ───────────────────────────────────────────────────────────────────

export const T = {
  bg:                   '#0A0A0F',
  surface:              '#181818',
  surfaceGrey:          '#212121',
  headerTonal:          '#0F0D14',
  purple:               '#BB86FC',
  success:              '#47B881',
  warning:              '#FF863B',
  danger:               '#BA4C4E',
  amber:                '#FFB300',
  white88:              'rgba(255,255,255,0.88)',
  white60:              'rgba(255,255,255,0.60)',
  white30:              'rgba(255,255,255,0.30)',
  white10:              'rgba(255,255,255,0.10)',
  white08:              'rgba(255,255,255,0.08)',
  white06:              'rgba(255,255,255,0.06)',
  rowDivider:           'rgba(255,255,255,0.06)',
  hoverTonal:           'rgba(255,255,255,0.025)',
  hoverGrey:            'rgba(255,255,255,0.06)',
  selectedBg:           'rgba(187,134,252,0.06)',
  selectedAccent:       '#BB86FC',
  skeleton:             'rgba(255,255,255,0.08)',
  sectionBg:            'rgba(255,255,255,0.03)',
  sectionBorder:        'rgba(255,255,255,0.07)',
  labelMuted:           '#6b7280',
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

export type Density       = 'desktop' | 'tablet' | 'mobile';
export type Theme         = 'tonal' | 'grey';
export type RowState      = 'default' | 'hover' | 'selected' | 'loading' | 'empty';
export type Sentiment     = 'neutral' | 'positive' | 'negative' | 'warning';
export type SortDir       = 'none' | 'asc' | 'desc';
export type Align         = 'left' | 'center';
export type StatusDisplay = 'complete' | 'in-progress' | 'incomplete' | 'empty';
export type HealthSentiment = 'good' | 'warning' | 'bad';
export type ActionType    = 'download' | 'open' | 'view';

// ─── Icons ────────────────────────────────────────────────────────────────────

export function IconCheck({ size = 16, color = T.success }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevron({
  direction, size = 12, color = T.white60,
}: { direction: 'right' | 'down'; size?: number; color?: string }) {
  const d = direction === 'right' ? 'M5 4L9 8L5 12' : 'M4 6L8 10L12 6';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSort({ dir }: { dir: SortDir }) {
  if (dir === 'asc') return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <path d="M6 3L9 7H3L6 3Z" fill={T.white88} />
    </svg>
  );
  if (dir === 'desc') return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <path d="M6 9L3 5H9L6 9Z" fill={T.white88} />
    </svg>
  );
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <path d="M6 2L8.5 5.5H3.5L6 2Z" fill={T.white30} />
      <path d="M6 10L3.5 6.5H8.5L6 10Z" fill={T.white30} />
    </svg>
  );
}

export function IconFace({ sentiment }: { sentiment: HealthSentiment }) {
  const color = sentiment === 'good' ? T.success : sentiment === 'warning' ? T.warning : T.danger;
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1" fill={color} />
      <circle cx="15" cy="10" r="1" fill={color} />
      {sentiment === 'good' && (
        <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      )}
      {sentiment === 'warning' && (
        <path d="M8.5 15H15.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      )}
      {sentiment === 'bad' && (
        <path d="M8 16C8 16 9.5 14 12 14C14.5 14 16 16 16 16"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function IconDownload({ color = T.white60 }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M8 3V10M8 10L5 7M8 10L11 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconOpen({ color = T.white60 }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M9 4H12V7M12 4L7.5 8.5M5 4H4C3.45 4 3 4.45 3 5V12C3 12.55 3.45 13 4 13H11C11.55 13 12 12.55 12 12V11"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconView({ color = T.white60 }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8C1.5 8 4 3.5 8 3.5C12 3.5 14.5 8 14.5 8C14.5 8 12 12.5 8 12.5C4 12.5 1.5 8 1.5 8Z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function IconEmpty() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <rect x="2" y="6" width="16" height="12" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <path d="M6 6V5C6 3.9 6.9 3 8 3H12C13.1 3 14 3.9 14 5V6"
        stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 11H13.5M6.5 14H10.5"
        stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export function Skeleton({ width, height = 12 }: { width: number; height?: number }) {
  return (
    <div style={{
      width,
      height,
      borderRadius: 4,
      background: T.skeleton,
      animation: 'shimmer 1.5s ease-in-out infinite',
    }} />
  );
}

// ─── CellText ─────────────────────────────────────────────────────────────────

export interface CellTextProps {
  value?: string;
  align?: Align;
  empty?: boolean;
  width: number;
  density?: Density;
}

export function CellText({
  value = 'Text', align = 'left', empty = false, width, density = 'desktop',
}: CellTextProps) {
  const height = density === 'tablet' ? 48 : 58;
  return (
    <div style={{
      width, height, flexShrink: 0,
      display: 'flex', alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      padding: '0 16px',
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13,
        color: empty ? T.white30 : T.white88,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {empty ? '—' : value}
      </span>
    </div>
  );
}

// ─── CellMetric ───────────────────────────────────────────────────────────────

export interface CellMetricProps {
  value?: string;
  sentiment?: Sentiment;
  empty?: boolean;
  width: number;
  density?: Density;
}

const SENTIMENT_COLOR: Record<Sentiment, string> = {
  neutral:  T.white88,
  positive: T.success,
  negative: '#E06060',
  warning:  T.warning,
};

export function CellMetric({
  value = '22.5%', sentiment = 'neutral', empty = false, width, density = 'desktop',
}: CellMetricProps) {
  const height = density === 'tablet' ? 48 : 58;
  return (
    <div style={{
      width, height, flexShrink: 0,
      display: 'flex', alignItems: 'center',
      padding: '0 16px',
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13,
        color: empty ? T.white30 : SENTIMENT_COLOR[sentiment],
      }}>
        {empty ? '—' : value}
      </span>
    </div>
  );
}

// ─── CellStatus ───────────────────────────────────────────────────────────────

export interface CellStatusProps {
  display?: StatusDisplay;
  progress?: number;
  density?: Density;
  width: number;
}

function StatusPill({ color, label, dot }: { color: string; label: string; dot?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '0 8px', height: 20, borderRadius: 999,
      background: `${color}26`,
      border: `1px solid ${color}66`,
      flexShrink: 0,
    }}>
      {dot
        ? <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
        : <IconCheck size={12} color={color} />
      }
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
        color, whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  );
}

export function CellStatus({
  display = 'empty', progress = 72, density = 'desktop', width,
}: CellStatusProps) {
  const height = density === 'tablet' ? 48 : 58;
  const isMobile = density === 'mobile';
  const percentColor = progress === 0 ? T.danger : T.amber;
  const trackWidth = width - 32;

  return (
    <div style={{
      width, height, flexShrink: 0,
      display: 'flex', alignItems: 'center',
      justifyContent: display === 'complete' && isMobile ? 'center' : 'flex-start',
      padding: '0 16px',
    }}>
      {display === 'complete' && !isMobile && (
        <StatusPill color={T.success} label="Complete" />
      )}
      {display === 'complete' && isMobile && (
        <IconCheck size={16} color={T.success} />
      )}
      {display === 'in-progress' && !isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: percentColor }}>
            {progress}%
          </span>
          <div style={{
            width: trackWidth, height: 3, borderRadius: 2,
            background: T.white10, overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
              height: '100%', background: percentColor,
              borderRadius: 2, transition: 'width 300ms ease',
            }} />
          </div>
        </div>
      )}
      {display === 'in-progress' && isMobile && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: percentColor }}>
          {progress}%
        </span>
      )}
      {display === 'incomplete' && !isMobile && (
        <StatusPill color={T.danger} label="Incomplete Data" dot />
      )}
      {(display === 'empty' || (display === 'incomplete' && isMobile)) && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.white30 }}>—</span>
      )}
    </div>
  );
}

// ─── CellHealth ───────────────────────────────────────────────────────────────

export interface CellHealthProps {
  sentiment?: HealthSentiment;
  empty?: boolean;
  width: number;
  density?: Density;
}

export function CellHealth({ sentiment = 'good', empty = false, width, density = 'desktop' }: CellHealthProps) {
  const height = density === 'tablet' ? 48 : 58;
  return (
    <div style={{
      width, height, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {empty
        ? <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.white30 }}>—</span>
        : <IconFace sentiment={sentiment} />
      }
    </div>
  );
}

// ─── CellAction ───────────────────────────────────────────────────────────────

export interface CellActionProps {
  action?: ActionType;
  width: number;
  density?: Density;
  onClick?: () => void;
}

export function CellAction({ action = 'download', width, density = 'desktop', onClick }: CellActionProps) {
  const height = density === 'tablet' ? 48 : 58;
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      width, height, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? T.white08 : 'transparent',
          border: 'none', borderRadius: 6, cursor: 'pointer',
          transition: 'background 120ms ease',
        }}
      >
        {action === 'download' && <IconDownload color={hovered ? T.white88 : T.white60} />}
        {action === 'open'     && <IconOpen     color={hovered ? T.white88 : T.white60} />}
        {action === 'view'     && <IconView     color={hovered ? T.white88 : T.white60} />}
      </button>
    </div>
  );
}

// ─── HeaderCell ───────────────────────────────────────────────────────────────

export interface HeaderCellProps {
  label: string;
  sort?: SortDir;
  align?: Align;
  width: number;
  density?: Density;
  onSort?: () => void;
}

export function HeaderCell({
  label, sort = 'none', align = 'left', width, density = 'desktop', onSort,
}: HeaderCellProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onSort}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width, height: 40, flexShrink: 0,
        display: 'flex', alignItems: 'center',
        justifyContent: align === 'center' ? 'center' : 'space-between',
        padding: '0 16px',
        background: hovered ? T.white06 : 'transparent',
        cursor: onSort ? 'pointer' : 'default',
        transition: 'background 120ms ease',
        userSelect: 'none',
      }}
    >
      {align === 'left' ? (
        <>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
            color: hovered ? T.white88 : 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase', letterSpacing: '0.06em', flex: 1,
          }}>
            {label}
          </span>
          {sort !== undefined && <IconSort dir={sort} />}
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
            color: hovered ? T.white88 : 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {label}
          </span>
          {sort !== undefined && <IconSort dir={sort} />}
        </div>
      )}
    </div>
  );
}

// ─── RowBase ──────────────────────────────────────────────────────────────────
//
// Generic stateful row container. No columns baked in — drop cells inside.
// Use this as the foundation for any table that isn't the org dashboard.

export interface RowBaseProps {
  state?: RowState;
  theme?: Theme;
  density?: Density;
  children?: React.ReactNode;
  skeletonWidths?: number[];
  onClick?: () => void;
}

export function RowBase({
  state = 'default', theme = 'tonal', density = 'desktop',
  children, skeletonWidths = [], onClick,
}: RowBaseProps) {
  const [hovered, setHovered] = useState(false);
  const height = density === 'tablet' ? 48 : 58;
  const isInteractiveHover = hovered && state !== 'loading';

  let bg = 'transparent';
  if (state === 'selected') {
    bg = T.selectedBg;
  } else if (isInteractiveHover && state !== 'empty') {
    bg = theme === 'tonal' ? T.hoverTonal : T.hoverGrey;
  } else if (state === 'hover') {
    bg = theme === 'tonal' ? T.hoverTonal : T.hoverGrey;
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center',
        height,
        background: bg,
        borderBottom: `0.5px solid ${T.rowDivider}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 120ms ease',
        overflow: 'hidden',
      }}
    >
      {state === 'selected' && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 3, background: T.selectedAccent,
        }} />
      )}
      {state === 'loading' ? (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {skeletonWidths.map((w, i) => (
            <div key={i} style={{
              width: w, display: 'flex', alignItems: 'center',
              justifyContent: 'flex-start', padding: '0 16px', flexShrink: 0,
            }}>
              <Skeleton width={Math.min(w - 32, 90)} />
            </div>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// ─── RowDivider ───────────────────────────────────────────────────────────────

export interface RowDividerProps { width: number }

export function RowDivider({ width }: RowDividerProps) {
  return <div style={{ width, height: 1, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />;
}

// ─── RowSectionDivider ────────────────────────────────────────────────────────

export interface RowSectionDividerProps {
  label?: string;
  expanded?: boolean;
  density?: Density;
  width: number;
  onToggle?: () => void;
}

export function RowSectionDivider({
  label = '2 INCOMPLETE', expanded = true, density = 'desktop', width, onToggle,
}: RowSectionDividerProps) {
  const [hovered, setHovered] = useState(false);
  const indent = density === 'desktop' ? 40 : 32;

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width, height: 28, flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 8,
        paddingLeft: indent, paddingRight: 16,
        background: hovered ? T.white06 : T.sectionBg,
        borderTop: `0.5px solid ${T.sectionBorder}`,
        borderBottom: `0.5px solid ${T.sectionBorder}`,
        cursor: 'pointer', transition: 'background 120ms ease',
        userSelect: 'none',
      }}
    >
      <IconChevron
        direction={expanded ? 'down' : 'right'}
        size={14}
        color={hovered ? 'rgba(255,255,255,0.7)' : T.white30}
      />
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em', color: T.labelMuted,
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── RowEmptyState ────────────────────────────────────────────────────────────

export interface RowEmptyStateProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  showSecondary?: boolean;
  density?: Density;
  width: number;
}

export function RowEmptyState({
  primaryLabel = 'No items for this period',
  secondaryLabel = 'Try a different date range or filter',
  showSecondary = true,
  density = 'desktop',
  width,
}: RowEmptyStateProps) {
  const height = density === 'mobile' ? 96 : 120;
  return (
    <div style={{
      width, height, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <IconEmpty />
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
        {primaryLabel}
      </span>
      {showSecondary && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.white30 }}>
          {secondaryLabel}
        </span>
      )}
    </div>
  );
}
