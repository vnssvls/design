import React from 'react';
import { T, Density, StatusDisplay, cellSize } from '../tokens';
import { IconCheck } from '../icons';

export interface CellStatusProps {
  display?: StatusDisplay;
  /** Progress percentage 0–100. Only used when display='in-progress'. */
  progress?: number;
  density?: Density;
  width: number;
  /** Flex shorthand (e.g. '1 0 160px'). When provided, cell grows to fill container. */
  flex?: string;
}

export function CellStatus({
  display = 'empty', progress = 72, density = 'desktop', width, flex,
}: CellStatusProps) {
  const height = density === 'tablet' ? 48 : 58;
  const isMobile = density === 'mobile';
  const percentColor = progress === 0 ? T.danger : T.warning;

  return (
    <div style={{
      ...cellSize(width, flex), height,
      display: 'flex', alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 16px',
    }}>
      {/* complete — desktop/tablet: pill with checkmark */}
      {display === 'complete' && !isMobile && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '0 8px', height: 20, borderRadius: 999,
          background: `${T.success}26`, border: `1px solid ${T.success}66`, flexShrink: 0,
        }}>
          <IconCheck size={12} color={T.success} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500, color: T.success }}>
            Complete
          </span>
        </div>
      )}
      {/* complete — mobile: checkmark icon only */}
      {display === 'complete' && isMobile && (
        <IconCheck size={16} color={T.success} />
      )}
      {/* in-progress — desktop/tablet: % text + bar */}
      {display === 'in-progress' && !isMobile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: percentColor }}>
            {progress}%
          </span>
          <div style={{ width: '100%', height: 3, borderRadius: 2, background: T.white10, overflow: 'hidden' }}>
            <div style={{
              width: `${Math.max(0, Math.min(100, progress))}%`,
              height: '100%', background: percentColor,
              borderRadius: 2, transition: 'width 300ms ease',
            }} />
          </div>
        </div>
      )}
      {/* in-progress — mobile: % text only */}
      {display === 'in-progress' && isMobile && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: percentColor }}>
          {progress}%
        </span>
      )}
      {/* incomplete — desktop/tablet: dot + label, no bg/border */}
      {display === 'incomplete' && !isMobile && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: T.danger, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 500,
            color: T.danger, whiteSpace: 'nowrap',
          }}>
            Incomplete Data
          </span>
        </div>
      )}
      {/* empty or incomplete-mobile: em dash */}
      {(display === 'empty' || (display === 'incomplete' && isMobile)) && (
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: T.white30 }}>—</span>
      )}
    </div>
  );
}
