import React from 'react';
import { ItemRow } from './ItemRow';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MenuType =
  | 'multi-select filter'
  | 'multi-select location'
  | 'list'
  | 'multi-select articles';

export interface MenuItemData {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  type: MenuType;
  items: MenuItemData[];
  selectedIds?: Set<string>;
  onToggle?: (id: string) => void;
  onDeselectAll?: () => void;
  onClearAll?: () => void;
  onSelectItem?: (id: string) => void;
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const menuStyle: React.CSSProperties = {
  width: 222,
  background: '#0F0F12',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 8,
  boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 12px',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
};

const headerLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const footerStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderTop: '1px solid rgba(255,255,255,0.06)',
};

const footerButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  fontSize: 12,
  fontWeight: 500,
  color: 'rgba(255,255,255,0.5)',
  transition: 'color 0.12s',
};

const itemListStyle: React.CSSProperties = {
  maxHeight: 240,
  overflowY: 'auto',
};

// ─── Multi-select filter (leading checkbox) ───────────────────────────────────

const MultiSelectFilter: React.FC<DropdownMenuProps> = ({
  items,
  selectedIds = new Set(),
  onToggle,
  onDeselectAll,
}) => {
  const selectedCount = selectedIds.size;

  return (
    <div style={menuStyle}>
      <div style={headerStyle}>
        <span style={headerLabelStyle}>
          {selectedCount > 0 ? `${selectedCount} selected` : 'Select'}
        </span>
        <FooterButton label="Deselect all" onClick={onDeselectAll} />
      </div>
      <div style={itemListStyle}>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            type="Category"
            label={item.label}
            count={item.count}
            checkbox="leading"
            checked={selectedIds.has(item.id)}
            state={item.disabled ? 'disabled' : 'default'}
            theme="tonal"
            onClick={() => onToggle?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Multi-select location (trailing checkbox) ────────────────────────────────

const MultiSelectLocation: React.FC<DropdownMenuProps> = ({
  items,
  selectedIds = new Set(),
  onToggle,
  onDeselectAll,
}) => {
  const noneSelected = selectedIds.size === 0;

  return (
    <div style={menuStyle}>
      <div style={headerStyle}>
        <span style={headerLabelStyle}>
          {noneSelected ? 'None selected' : `${selectedIds.size} selected`}
        </span>
        <FooterButton label="Deselect all" onClick={onDeselectAll} />
      </div>
      <div style={itemListStyle}>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            type="Location"
            label={item.label}
            count={item.count}
            checkbox="trailing"
            checked={selectedIds.has(item.id)}
            state={item.disabled ? 'disabled' : 'default'}
            theme="grey"
            onClick={() => onToggle?.(item.id)}
          />
        ))}
      </div>
      <div style={footerStyle}>
        <FooterButton label="Clear all" onClick={onDeselectAll} />
      </div>
    </div>
  );
};

// ─── List (no checkboxes, hover highlight only) ────────────────────────────────

const ListMenu: React.FC<DropdownMenuProps> = ({ items, onSelectItem }) => (
  <div style={menuStyle}>
    <div style={itemListStyle}>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          type="List Item"
          label={item.label}
          checkbox="none"
          state={item.disabled ? 'disabled' : 'default'}
          theme="grey"
          onClick={() => onSelectItem?.(item.id)}
        />
      ))}
    </div>
  </div>
);

// ─── Multi-select articles (leading checkbox, larger list) ─────────────────────

const MultiSelectArticles: React.FC<DropdownMenuProps> = ({
  items,
  selectedIds = new Set(),
  onToggle,
  onDeselectAll,
}) => {
  const selectedCount = selectedIds.size;

  return (
    <div style={menuStyle}>
      <div style={headerStyle}>
        <span style={headerLabelStyle}>
          {selectedCount > 0 ? `${selectedCount} selected` : 'Select articles'}
        </span>
        <FooterButton label="Deselect all" onClick={onDeselectAll} />
      </div>
      <div style={{ ...itemListStyle, maxHeight: 320 }}>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            type="Category"
            label={item.label}
            checkbox="leading"
            checked={selectedIds.has(item.id)}
            state={item.disabled ? 'disabled' : 'default'}
            theme="tonal"
            onClick={() => onToggle?.(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Footer button helper ─────────────────────────────────────────────────────

const FooterButton: React.FC<{ label: string; onClick?: () => void }> = ({ label, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      style={{ ...footerButtonStyle, color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="button"
    >
      {label}
    </button>
  );
};

// ─── Main export ──────────────────────────────────────────────────────────────

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  switch (props.type) {
    case 'multi-select filter':
      return <MultiSelectFilter {...props} />;
    case 'multi-select location':
      return <MultiSelectLocation {...props} />;
    case 'list':
      return <ListMenu {...props} />;
    case 'multi-select articles':
      return <MultiSelectArticles {...props} />;
    default:
      return null;
  }
};
