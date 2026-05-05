import React from 'react';
import { T, Density, HealthSentiment, cellSize } from '../tokens';
import { IconFace } from '../icons';

export interface CellHealthProps {
  sentiment?: HealthSentiment;
  empty?: boolean;
  width: number;
  density?: Density;
  /** Flex shorthand. When provided, cell grows to fill container. */
  flex?: string;
}

export function CellHealth({
  sentiment = 'good', empty = false, width, density = 'desktop', flex,
}: CellHealthProps) {
  const height = density === 'tablet' ? 48 : 58;
  return (
    <div style={{
      ...cellSize(width, flex), height,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {empty
        ? <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.white30 }}>—</span>
        : <IconFace sentiment={sentiment} />
      }
    </div>
  );
}
