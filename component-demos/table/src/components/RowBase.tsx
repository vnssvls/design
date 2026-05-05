import React, { useState } from 'react';
import { T, RowState, Theme, Density } from '../tokens';

function Skeleton({ width, height = 12 }: { width: number; height?: number }) {
  return (
    <div style={{
      width, height, borderRadius: 4,
      background: T.skeleton,
      animation: 'shimmer 1.5s ease-in-out infinite',
    }} />
  );
}

export interface RowBaseProps {
  state?: RowState;
  theme?: Theme;
  density?: Density;
  children?: React.ReactNode;
  /**
   * Column widths used to render skeleton placeholders in loading state.
   * One number per column (same order as your cells).
   */
  skeletonWidths?: number[];
  onClick?: () => void;
}

export function RowBase({
  state = 'default', theme = 'tonal', density = 'desktop',
  children, skeletonWidths = [], onClick,
}: RowBaseProps) {
  const [hovered, setHovered] = useState(false);
  const height = density === 'tablet' ? 48 : 58;
  const isInteractiveHover = hovered && state !== 'loading';

  let bg = 'transparent';
  if (state === 'selected') {
    bg = T.selectedBg;
  } else if (isInteractiveHover && state !== 'empty') {
    bg = theme === 'tonal' ? T.hoverTonal : T.hoverGrey;
  } else if (state === 'hover') {
    bg = theme === 'tonal' ? T.hoverTonal : T.hoverGrey;
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center',
        height,
        background: bg,
        borderBottom: `0.5px solid ${T.rowDivider}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background 120ms ease',
        overflow: 'hidden',
      }}
    >
      {state === 'selected' && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 3, background: T.selectedAccent,
        }} />
      )}
      {state === 'loading' ? (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {skeletonWidths.map((w, i) => (
            <div key={i} style={{
              width: w, display: 'flex', alignItems: 'center',
              justifyContent: 'flex-start', padding: '0 16px', flexShrink: 0,
            }}>
              <Skeleton width={Math.min(w - 32, 90)} />
            </div>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
