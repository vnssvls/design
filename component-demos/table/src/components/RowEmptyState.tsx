import React from 'react';
import { T, Density } from '../tokens';

export interface RowEmptyStateProps {
  primaryLabel?: string;
  secondaryLabel?: string;
  showSecondary?: boolean;
  density?: Density;
}

export function RowEmptyState({
  primaryLabel = 'No items for this period',
  secondaryLabel = 'Try a different date range or filter',
  showSecondary = true,
  density = 'desktop',
}: RowEmptyStateProps) {
  const height = density === 'mobile' ? 96 : 120;
  return (
    <div style={{
      width: '100%', height, flexShrink: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
        {primaryLabel}
      </span>
      {showSecondary && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: T.white30 }}>
          {secondaryLabel}
        </span>
      )}
    </div>
  );
}
