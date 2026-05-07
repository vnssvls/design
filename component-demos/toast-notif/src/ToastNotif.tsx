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

// Matches icons/svg/status/check.svg
const CheckIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 10.625L9.375 12.5L12.5 8.125M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Matches icons/svg/status/warning.svg
const WarningIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 7.5V10.625M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10ZM10 13.125H10.0067V13.1317H10V13.125Z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Info = warning rotated 180° (matches Figma — ⓘ is an inverted !)
const InfoIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
    <path d="M10 7.5V10.625M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10ZM10 13.125H10.0067V13.1317H10V13.125Z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Matches icons/svg/status/cross.svg
const CrossIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.125 8.125L11.875 11.875M11.875 8.125L8.125 11.875M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10Z" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
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

  const bg           = isDark ? BG_DARK : BG_LIGHT;
  const shadow       = isDark ? SHADOW_DARK : SHADOW_LIGHT;
  const titleColor   = isDark ? 'rgba(255,255,255,1)' : '#111827';
  const subtitleColor = isDark ? 'rgba(255,255,255,0.6)' : '#4B4B4B';
  const closeColor   = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';

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
            margin: 0,
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
            margin: 0,
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
