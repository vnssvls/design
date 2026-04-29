import React from 'react';

export type ToastType = 'Info' | 'Success' | 'Warning' | 'Error';
export type ToastMode = 'Light' | 'Dark';

export interface ToastNotifProps {
  type?: ToastType;
  mode?: ToastMode;
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showIcon?: boolean;
  showClose?: boolean;
  onClose?: () => void;
}

const ICON_COLOR: Record<ToastType, string> = {
  Info:    '#4781C4',
  Success: '#0C9D61',
  Warning: '#FF863B',
  Error:   '#BA4C4E',
};

const SHADOW_LIGHT = '0px 4px 8px rgba(0,0,0,0.07)';
const SHADOW_DARK  = '0px 4px 8px rgba(0,0,0,0.28)';

const BG_LIGHT = '#FCFBFB';
const BG_DARK  = '#181818';

// Info icon — rotated exclamation (ⓘ)
const InfoIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <rect x="9.25" y="5.5" width="1.5" height="1.5" rx="0.75" fill={color} />
    <rect x="9.25" y="8.5" width="1.5" height="5" rx="0.75" fill={color} />
  </svg>
);

// Check icon
const CheckIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <path d="M6.5 10l2.5 2.5 4.5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Warning icon — triangle with !
const WarningIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3L17.5 16.5H2.5L10 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="9.25" y="8" width="1.5" height="4" rx="0.75" fill={color} />
    <rect x="9.25" y="13" width="1.5" height="1.5" rx="0.75" fill={color} />
  </svg>
);

// Cross icon
const CrossIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" />
    <path d="M7 7l6 6M13 7l-6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const StatusIcon: React.FC<{ type: ToastType }> = ({ type }) => {
  const color = ICON_COLOR[type];
  if (type === 'Info')    return <InfoIcon color={color} />;
  if (type === 'Success') return <CheckIcon color={color} />;
  if (type === 'Warning') return <WarningIcon color={color} />;
  return <CrossIcon color={color} />;
};

const CloseIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1l8 8M9 1L1 9" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
  </svg>
);

export const ToastNotif: React.FC<ToastNotifProps> = ({
  type = 'Info',
  mode = 'Light',
  title = 'Info/Success/Warning title',
  subtitle = 'Short and clear additional description.',
  showTitle = true,
  showSubtitle = true,
  showIcon = true,
  showClose = true,
  onClose,
}) => {
  const isDark = mode === 'Dark';

  const bg = isDark ? BG_DARK : BG_LIGHT;
  const shadow = isDark ? SHADOW_DARK : SHADOW_LIGHT;
  const titleColor = isDark ? 'rgba(255,255,255,1)' : '#111827';
  const subtitleColor = isDark ? 'rgba(255,255,255,0.6)' : '#4B4B4B';
  const closeColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: 360,
        padding: '14px 16px',
        borderRadius: 16,
        backgroundColor: bg,
        boxShadow: shadow,
        flexShrink: 0,
      }}
    >
      {showIcon && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <StatusIcon type={type} />
        </div>
      )}

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {showTitle && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '20px',
            color: titleColor,
          }}>
            {title}
          </p>
        )}
        {showSubtitle && (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '18px',
            color: subtitleColor,
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {showClose && (
        <button
          onClick={onClose}
          style={{
            flexShrink: 0,
            alignSelf: 'flex-start',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CloseIcon color={closeColor} />
        </button>
      )}
    </div>
  );
};
