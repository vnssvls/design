import React from 'react';
import { T, Density, Sentiment, SENTIMENT_COLOR, cellSize } from '../tokens';

export interface CellMetricProps {
  value?: string;
  sentiment?: Sentiment;
  empty?: boolean;
  width: number;
  density?: Density;
  /** Flex shorthand (e.g. '1 0 100px'). When provided, cell grows to fill container. */
  flex?: string;
}

export function CellMetric({
  value = '22.5%', sentiment = 'neutral', empty = false, width, density = 'desktop', flex,
}: CellMetricProps) {
  const height = density === 'tablet' ? 48 : 58;
  return (
    <div style={{
      ...cellSize(width, flex), height,
      display: 'flex', alignItems: 'center',
      padding: '0 16px',
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 13,
        color: empty ? T.white30 : SENTIMENT_COLOR[sentiment],
      }}>
        {empty ? '—' : value}
      </span>
    </div>
  );
}
