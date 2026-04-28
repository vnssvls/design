import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type TriggerType = 'Category' | 'Location' | 'Calendar';
export type TriggerState = 'rest' | 'active';
export type TriggerMode = 'with-label' | 'icon-only';

export interface DropdownTriggerProps {
  type: TriggerType;
  state?: TriggerState;
  mode?: TriggerMode;
  label?: string;
  locationCount?: number;
  onClick?: () => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconCategory = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
    <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconLocation = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="5" r="1.25" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="2.5" width="12" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M1 6h12" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4.5 1v3M9.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICON_MAP: Record<TriggerType, React.FC> = {
  Category: IconCategory,
  Location: IconLocation,
  Calendar: IconCalendar,
};

const DEFAULT_LABELS: Record<TriggerType, string> = {
  Category: 'Category',
  Location: 'All locations',
  Calendar: 'This month',
};

// ─── Component ────────────────────────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.06)',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    transition: 'background 0.15s, border-color 0.15s',
    boxSizing: 'border-box',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 18,
    height: 18,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 999,
    background: 'rgba(255,255,255,0.88)',
    color: '#0A0A0F',
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 1,
  },
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  type,
  state = 'rest',
  mode = 'with-label',
  label,
  locationCount,
  onClick,
}) => {
  const isActive = state === 'active';
  const isIconOnly = mode === 'icon-only';
  const Icon = ICON_MAP[type];
  const displayLabel = label ?? DEFAULT_LABELS[type];

  const triggerStyle: React.CSSProperties = {
    ...styles.trigger,
    background: isActive ? '#17131B' : '#0A0A0A',
    color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)',
    width: isIconOnly ? 34 : undefined,
    paddingLeft: isIconOnly ? 0 : 10,
    paddingRight: isIconOnly ? 0 : 10,
    justifyContent: isIconOnly ? 'center' : 'flex-start',
  };

  return (
    <button style={triggerStyle} onClick={onClick} type="button">
      <Icon />
      {!isIconOnly && <span style={{ flex: 1 }}>{displayLabel}</span>}
      {!isIconOnly && type === 'Location' && locationCount !== undefined && locationCount > 0 && (
        <span style={styles.badge}>{locationCount}</span>
      )}
      {!isIconOnly && <IconChevronDown />}
    </button>
  );
};
