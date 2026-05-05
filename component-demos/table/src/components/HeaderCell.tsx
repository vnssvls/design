import React, { useState } from 'react';
import { T, SortDir, Align, cellSize } from '../tokens';
import { IconSort } from '../icons';

export interface HeaderCellProps {
  label: string;
  /** Sort direction. Omit entirely for non-sortable columns (no icon rendered). */
  sort?: SortDir;
  align?: Align;
  width: number;
  density?: Density;
  /** Called when header is clicked. Presence implies the column is sortable. */
  onSort?: () => void;
  /** Called on mousedown of the resize handle. Presence renders the drag handle. */
  onResizeStart?: (e: React.MouseEvent) => void;
  /** Flex shorthand (e.g. '1 0 220px'). When provided, cell grows to fill container. */
  flex?: string;
}

// Density is unused at render time (header height is always 40px) but kept for
// API symmetry — callers can pass density without special-casing this component.
type Density = 'desktop' | 'tablet' | 'mobile';

export function HeaderCell({
  label, sort, align = 'left', width, onSort, onResizeStart, flex,
}: HeaderCellProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onSort}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cellSize(width, flex),
        position: 'relative',
        height: 40,
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
            textTransform: 'uppercase', letterSpacing: '0.06em',
            flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
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
      {onResizeStart && (
        <div
          onMouseDown={e => { e.stopPropagation(); onResizeStart(e); }}
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: 8, cursor: 'col-resize',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ width: 2, height: 16, borderRadius: 1, background: 'rgba(255,255,255,0.2)' }} />
        </div>
      )}
    </div>
  );
}
