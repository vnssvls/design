import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ItemRowType = 'Category' | 'Location' | 'List Item' | 'Date period';
export type ItemRowState = 'default' | 'hover' | 'selected' | 'disabled';
export type CheckboxPosition = 'leading' | 'trailing' | 'none';
export type ItemRowTheme = 'tonal' | 'grey';

export interface ItemRowProps {
  type?: ItemRowType;
  state?: ItemRowState;
  checkbox?: CheckboxPosition;
  indented?: boolean;
  theme?: ItemRowTheme;
  label: string;
  count?: number;
  checked?: boolean;
  onClick?: () => void;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

const CheckboxIcon: React.FC<{ checked: boolean; disabled?: boolean }> = ({ checked, disabled }) => {
  const borderColor = checked
    ? '#BB86FC'
    : disabled
    ? 'rgba(255,255,255,0.2)'
    : 'rgba(255,255,255,0.3)';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        borderRadius: 4,
        border: `1.5px solid ${borderColor}`,
        background: checked ? '#BB86FC' : 'transparent',
        flexShrink: 0,
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l3 3 5-6" stroke="#0A0A0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
};

// Date period selected state: checkmark only, no box (matches Figma "selected-no fill")
const CheckmarkOnly: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
    <path
      d="M7.5 10.625L9.375 12.5L12.5 8.125"
      stroke="#BB86FC"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const ItemRow: React.FC<ItemRowProps> = ({
  type = 'List Item',
  state = 'default',
  checkbox = 'none',
  indented = false,
  theme = 'tonal',
  label,
  count,
  checked = false,
  onClick,
}) => {
  const [hovered, setHovered] = React.useState(false);

  const isDisabled = state === 'disabled';
  const isSelected = state === 'selected' || checked;
  const isHovered = state === 'hover' || hovered;

  const tonalHoverBg = 'rgba(155,126,189,0.1)';
  const tonalDefaultBg = 'rgba(155,126,189,0.06)';
  const greyHoverBg = 'rgba(255,255,255,0.06)';
  const greyDefaultBg = 'transparent';

  let bg = 'transparent';
  if (!isDisabled) {
    if (theme === 'tonal') {
      bg = isSelected || isHovered ? tonalHoverBg : tonalDefaultBg;
    } else {
      bg = isHovered ? greyHoverBg : greyDefaultBg;
    }
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    height: 40,
    width: '100%',
    paddingLeft: indented ? 28 : 12,
    paddingRight: 12,
    background: bg,
    opacity: isDisabled ? 0.4 : 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    fontWeight: 400,
    color: 'rgba(255,255,255,1)',
    boxSizing: 'border-box',
    transition: 'background 0.12s',
    userSelect: 'none',
  };

  const handleClick = () => {
    if (!isDisabled && onClick) onClick();
  };

  return (
    <div
      style={rowStyle}
      onClick={handleClick}
      onMouseEnter={() => !isDisabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="option"
      aria-selected={isSelected}
      aria-disabled={isDisabled}
    >
      {checkbox === 'leading' && <CheckboxIcon checked={isSelected} disabled={isDisabled} />}

      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {label}
      </span>

      {count !== undefined && (
        <span style={{ color: '#9898B0', fontSize: 12, flexShrink: 0 }}>{count}</span>
      )}

      {checkbox === 'trailing' && (
        type === 'Date period'
          ? (isSelected ? <CheckmarkOnly /> : null)
          : <CheckboxIcon checked={isSelected} disabled={isDisabled} />
      )}
    </div>
  );
};
