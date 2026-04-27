import React from 'react';

export type ToggleSize  = 'mobile' | 'desktop-sm' | 'desktop-lg';
export type ToggleState = 'unchecked' | 'checked' | 'disabled-unchecked' | 'disabled-checked';

export interface ToggleSwitchProps {
  size?: ToggleSize;
  slim?: boolean;
  state?: ToggleState;
  label?: string;
  hint?: string;
  showLabel?: boolean;
  showHint?: boolean;
  onChange?: (checked: boolean) => void;
}

// tokens
const purple700 = '#BB86FC';
const trackUnchecked = '#2E2E3A';
const white = '#FFFFFF';
const textMuted = '#9898B0';

const TRACK: Record<ToggleSize, { w: number; h: number; r: number }> = {
  'mobile':     { w: 52, h: 28, r: 14 },
  'desktop-lg': { w: 52, h: 28, r: 14 },
  'desktop-sm': { w: 36, h: 20, r: 10 },
};

const SLIM_TRACK: Record<ToggleSize, { w: number; h: number; r: number }> = {
  'mobile':     { w: 40, h: 18, r: 9 },
  'desktop-lg': { w: 40, h: 18, r: 9 },
  'desktop-sm': { w: 30, h: 12, r: 6 },
};

const THUMB: Record<ToggleSize, { size: number }> = {
  'mobile':     { size: 24 },
  'desktop-lg': { size: 24 },
  'desktop-sm': { size: 16 },
};

const SLIM_THUMB: Record<ToggleSize, { size: number }> = {
  'mobile':     { size: 14 },
  'desktop-lg': { size: 14 },
  'desktop-sm': { size: 8 },
};

const LABEL_FONT: Record<ToggleSize, number> = {
  'mobile': 14,
  'desktop-lg': 14,
  'desktop-sm': 12,
};

export function ToggleSwitch({
  size = 'desktop-sm',
  slim = false,
  state = 'unchecked',
  label = 'Label',
  hint = 'Hint text',
  showLabel = true,
  showHint = true,
  onChange,
}: ToggleSwitchProps) {
  const isChecked  = state === 'checked' || state === 'disabled-checked';
  const isDisabled = state === 'disabled-unchecked' || state === 'disabled-checked';

  const track = slim ? SLIM_TRACK[size] : TRACK[size];
  const thumb = slim ? SLIM_THUMB[size] : THUMB[size];
  const fontSize = LABEL_FONT[size];
  const padding = 2;
  const thumbTravel = track.w - thumb.size - padding * 2;

  const handleClick = () => {
    if (isDisabled || !onChange) return;
    onChange(!isChecked);
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        opacity: isDisabled ? 0.4 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}
      onClick={handleClick}
    >
      {/* Track */}
      <div
        style={{
          position: 'relative',
          width: track.w,
          height: track.h,
          borderRadius: track.r,
          background: isChecked ? purple700 : trackUnchecked,
          flexShrink: 0,
          transition: 'background 150ms ease',
        }}
      >
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            top: padding,
            left: padding,
            width: thumb.size,
            height: thumb.size,
            borderRadius: '50%',
            background: white,
            transform: isChecked ? `translateX(${thumbTravel}px)` : 'translateX(0)',
            transition: 'transform 150ms ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      </div>

      {/* Text group */}
      {(showLabel || showHint) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {showLabel && (
            <span style={{ fontSize, color: white, lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>
              {label}
            </span>
          )}
          {showHint && (
            <span style={{ fontSize: fontSize - 1, color: textMuted, lineHeight: 1.3, fontFamily: 'Inter, sans-serif' }}>
              {hint}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
