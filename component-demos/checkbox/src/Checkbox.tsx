import React from 'react';
import { tokens } from './tokens';

export type CheckboxState = 'unselected' | 'selected' | 'selected-no fill';
export type CheckboxSize = 'small' | 'medium' | 'large';

export interface CheckboxProps {
  state?: CheckboxState;
  size?: CheckboxSize;
  onChange?: (next: CheckboxState) => void;
}

const SIZE_PX: Record<CheckboxSize, number> = {
  small:  16,
  medium: 20,
  large:  24,
};

const CHECKMARK_SIZE: Record<CheckboxSize, { w: number; h: number }> = {
  small:  { w: 8,  h: 5.5  },
  medium: { w: 10, h: 6.875 },
  large:  { w: 12, h: 8.25  },
};

function CheckIcon({ size, color }: { size: CheckboxSize; color: string }) {
  const { w, h } = CHECKMARK_SIZE[size];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <polyline
        points={`1,${h * 0.55} ${w * 0.38},${h - 1} ${w - 1},1`}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Checkbox({ state = 'unselected', size = 'medium', onChange }: CheckboxProps) {
  const px = SIZE_PX[size];
  const radius = Math.round(px * 0.2);
  const isSelected = state === 'selected' || state === 'selected-no fill';
  const hasFill = state === 'selected';

  const bg = hasFill ? tokens.primary : 'transparent';
  const strokeColor = hasFill ? tokens.primary : state === 'unselected' ? tokens.muted : 'transparent';
  const checkColor = hasFill ? '#171213' : tokens.primary;

  function handleClick() {
    if (!onChange) return;
    if (state === 'unselected') onChange('selected');
    else if (state === 'selected') onChange('unselected');
    else onChange('unselected');
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: px,
        height: px,
        borderRadius: radius,
        background: bg,
        border: `1.5px solid ${strokeColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onChange ? 'pointer' : 'default',
        flexShrink: 0,
        boxSizing: 'border-box',
        transition: 'background 0.1s, border-color 0.1s',
      }}
    >
      {isSelected && <CheckIcon size={size} color={checkColor} />}
    </div>
  );
}
