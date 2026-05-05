import React, { useState } from 'react';
import { T, Density } from '../tokens';
import { IconChevron, IconWarning } from '../icons';

export interface RowSectionDividerProps {
  label?: string;
  expanded?: boolean;
  density?: Density;
  /** Called when the row is clicked to toggle expanded/collapsed. */
  onToggle?: () => void;
  /** When true, renders an orange warning icon before the label. */
  showWarning?: boolean;
}

export function RowSectionDivider({
  label = '2 INCOMPLETE', expanded = true, density = 'desktop',
  onToggle, showWarning = false,
}: RowSectionDividerProps) {
  const [hovered, setHovered] = useState(false);
  const indent = density === 'desktop' ? 40 : 32;

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', height: 28, flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 6,
        paddingLeft: indent, paddingRight: 16,
        background: hovered ? T.white06 : T.sectionBg,
        borderTop: `0.5px solid ${T.sectionBorder}`,
        borderBottom: `0.5px solid ${T.sectionBorder}`,
        cursor: 'pointer', transition: 'background 120ms ease',
        userSelect: 'none',
      }}
    >
      <IconChevron
        direction={expanded ? 'down' : 'right'}
        size={14}
        color={hovered ? 'rgba(255,255,255,0.7)' : T.white30}
      />
      {showWarning && <IconWarning size={14} color={T.warning} />}
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em', color: T.labelMuted,
      }}>
        {label}
      </span>
    </div>
  );
}
