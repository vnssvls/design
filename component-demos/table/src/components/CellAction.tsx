import React, { useState } from 'react';
import { T, Density, ActionType, cellSize } from '../tokens';
import { IconDownload, IconOpen, IconView } from '../icons';

export interface CellActionProps {
  action?: ActionType;
  width: number;
  density?: Density;
  onClick?: () => void;
  /** Flex shorthand. When provided, cell grows to fill container. */
  flex?: string;
}

export function CellAction({
  action = 'download', width, density = 'desktop', onClick, flex,
}: CellActionProps) {
  const height = density === 'tablet' ? 48 : 58;
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      ...cellSize(width, flex), height,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 28, height: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? T.white08 : 'transparent',
          border: 'none', borderRadius: 6, cursor: 'pointer',
          transition: 'background 120ms ease',
        }}
      >
        {action === 'download' && <IconDownload color={hovered ? T.white88 : T.white60} />}
        {action === 'open'     && <IconOpen     color={hovered ? T.white88 : T.white60} />}
        {action === 'view'     && <IconView     color={hovered ? T.white88 : T.white60} />}
      </button>
    </div>
  );
}
