import React, { useState } from 'react';

export type InputFieldState = 'default' | 'focus' | 'filled' | 'error';

export interface InputFieldProps {
  state?: InputFieldState;
  value?: string;
  placeholder?: string;
  counter?: string;
  showCounter?: boolean;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
}

const BG: Record<InputFieldState, string> = {
  default: 'rgba(255,255,255,0.05)',
  focus:   '#1c1c1c',
  filled:  '#1c1c1c',
  error:   'rgba(188,52,54,0.05)',
};

const BORDER: Record<InputFieldState, string> = {
  default: 'rgba(255,255,255,0.12)',
  focus:   'rgba(187,134,252,0.5)',
  filled:  'rgba(255,255,255,0.4)',
  error:   'rgba(186,76,78,0.7)',
};

const TEXT_COLOR: Record<InputFieldState, string> = {
  default: 'rgba(255,255,255,0.88)',
  focus:   'rgba(255,255,255,0.88)',
  filled:  'rgba(255,255,255,0.88)',
  error:   'rgba(255,255,255,0.88)',
};

const PLACEHOLDER_COLOR: Record<InputFieldState, string> = {
  default: 'rgba(255,255,255,0.3)',
  focus:   'rgba(255,255,255,0.22)',
  filled:  'rgba(255,255,255,0.3)',
  error:   'rgba(255,255,255,0.3)',
};

export const InputField: React.FC<InputFieldProps> = ({
  state: controlledState,
  value: controlledValue,
  placeholder = 'e.g. Placeholder text',
  counter,
  showCounter = false,
  errorMessage,
  onChange,
  onFocus,
  onBlur,
  maxLength,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [focused, setFocused] = useState(false);

  const isControlled = controlledState !== undefined;
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const derivedState: InputFieldState = isControlled
    ? controlledState!
    : focused
      ? 'focus'
      : value.length > 0
        ? 'filled'
        : 'default';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleFocus = () => {
    if (!isControlled) setFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    if (!isControlled) setFocused(false);
    onBlur?.();
  };

  const displayCounter = counter ?? (maxLength ? `${value.length} / ${maxLength}` : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: 40,
          padding: '0 12px',
          borderRadius: 8,
          border: `1px solid ${BORDER[derivedState]}`,
          background: BG[derivedState],
          transition: 'border-color 0.15s, background 0.15s',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <input
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: TEXT_COLOR[derivedState],
            caretColor: '#BB86FC',
          }}
        />
        {showCounter && displayCounter && (
          <span style={{
            flexShrink: 0,
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            color: 'rgba(255,255,255,0.28)',
            whiteSpace: 'nowrap',
          }}>
            {displayCounter}
          </span>
        )}
      </div>
      {derivedState === 'error' && errorMessage && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 12,
          color: '#BA4C4E',
          margin: 0,
        }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};
