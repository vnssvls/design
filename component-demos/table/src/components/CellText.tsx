import React from 'react';
import { T, Density, Align, cellSize } from '../tokens';

export interface CellTextProps {
  value?: string;
  align?: Align;
  empty?: boolean;
  width: number;
  density?: Density;
  /** Flex shorthand (e.g. '1 0 220px'). When provided, cell grows to fill container. */
  flex?: string;
}

export function CellText({
  value = 'Text', align = 'left', empty = false, width, density = 'desktop', flex,
}: CellTextProps) {
  const height = density === 'tablet' ? 48 : 58;
  return (
    <div style={{
      ...cellSize(width, flex), height,
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
