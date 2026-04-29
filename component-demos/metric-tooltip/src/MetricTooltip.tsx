import React from 'react';
import { tokens } from './tokens';

export type CaretPosition = 'top' | 'bottom' | 'left' | 'right';

export interface MetricTooltipProps {
  title: string;
  description: string;
  formula?: string;
  watchNote?: string;
  showCaret?: boolean;
  caretPosition?: CaretPosition;
  caretOffset?: number; // px from start edge (left for top/bottom, top for left/right)
  showFormula?: boolean;
  showWatchNote?: boolean;
  style?: React.CSSProperties;
}

// CSS triangle via border trick — fixed: outer uses tooltip border color, inner uses tooltip bg
function Caret({ position }: { position: CaretPosition }) {
  const size = 8;
  const innerSize = 7;
  const tooltipBorder = 'rgba(155,126,189,0.3)';
  const tooltipBg = '#0f0f12';

  const outerStyle = (pos: CaretPosition): React.CSSProperties => {
    const base: React.CSSProperties = { position: 'absolute', width: 0, height: 0, border: 'none' };
    switch (pos) {
      case 'top':    return { ...base, borderLeft: `${size}px solid transparent`, borderRight: `${size}px solid transparent`, borderBottom: `${size}px solid ${tooltipBorder}`, top: -size, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom': return { ...base, borderLeft: `${size}px solid transparent`, borderRight: `${size}px solid transparent`, borderTop: `${size}px solid ${tooltipBorder}`, bottom: -size, left: '50%', transform: 'translateX(-50%)' };
      case 'left':   return { ...base, borderTop: `${size}px solid transparent`, borderBottom: `${size}px solid transparent`, borderRight: `${size}px solid ${tooltipBorder}`, left: -size, top: '50%', transform: 'translateY(-50%)' };
      case 'right':  return { ...base, borderTop: `${size}px solid transparent`, borderBottom: `${size}px solid transparent`, borderLeft: `${size}px solid ${tooltipBorder}`, right: -size, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  const innerStyle = (pos: CaretPosition): React.CSSProperties => {
    const base: React.CSSProperties = { position: 'absolute', width: 0, height: 0, border: 'none' };
    switch (pos) {
      case 'top':    return { ...base, borderLeft: `${innerSize}px solid transparent`, borderRight: `${innerSize}px solid transparent`, borderBottom: `${innerSize}px solid ${tooltipBg}`, top: -innerSize + 2, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom': return { ...base, borderLeft: `${innerSize}px solid transparent`, borderRight: `${innerSize}px solid transparent`, borderTop: `${innerSize}px solid ${tooltipBg}`, bottom: -innerSize + 2, left: '50%', transform: 'translateX(-50%)' };
      case 'left':   return { ...base, borderTop: `${innerSize}px solid transparent`, borderBottom: `${innerSize}px solid transparent`, borderRight: `${innerSize}px solid ${tooltipBg}`, left: -innerSize + 2, top: '50%', transform: 'translateY(-50%)' };
      case 'right':  return { ...base, borderTop: `${innerSize}px solid transparent`, borderBottom: `${innerSize}px solid transparent`, borderLeft: `${innerSize}px solid ${tooltipBg}`, right: -innerSize + 2, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  return (
    <>
      <div style={outerStyle(position)} />
      <div style={innerStyle(position)} />
    </>
  );
}

export function MetricTooltip({
  title,
  description,
  formula,
  watchNote,
  showCaret = true,
  caretPosition = 'top',
  showFormula = true,
  showWatchNote = true,
  style,
}: MetricTooltipProps) {
  const hasFormula = showFormula && !!formula;
  const hasWatchNote = showWatchNote && !!watchNote;

  return (
    <div style={{
      position: 'relative',
      width: 320,
      background: '#0f0f12',
      border: '1px solid rgba(155,126,189,0.3)',
      borderRadius: 10,
      boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.5), 0px 8px 10px -6px rgba(0,0,0,0.4)',
      padding: '16px 16px 0',
      boxSizing: 'border-box',
      fontFamily: tokens.fontFamily,
      ...style,
    }}>
      {showCaret && <Caret position={caretPosition} />}

      {/* Title */}
      <p style={{
        margin: 0,
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        color: '#fff',
        marginBottom: 8,
      }}>
        {title}
      </p>

      {/* Description */}
      <p style={{
        margin: 0,
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '19.5px',
        color: 'rgba(255,255,255,0.7)',
        marginBottom: hasFormula || hasWatchNote ? 12 : 16,
      }}>
        {description}
      </p>

      {/* Formula section */}
      {hasFormula && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 9,
          paddingBottom: hasWatchNote ? 0 : 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 12, lineHeight: '16px', color: '#fff' }}>
            Formula:
          </p>
          <div style={{
            background: tokens.bgGreyHeader,
            borderRadius: 4,
            padding: '4px 8px',
            height: 24,
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}>
            <p style={{
              margin: 0,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              lineHeight: '16px',
              color: 'rgba(255,255,255,0.8)',
              whiteSpace: 'nowrap',
            }}>
              {formula}
            </p>
          </div>
        </div>
      )}

      {/* Watch note section */}
      {hasWatchNote && (
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: 9,
          paddingBottom: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 12, lineHeight: '16px', color: '#fff' }}>
            When to watch:
          </p>
          <p style={{
            margin: 0,
            fontWeight: 400,
            fontSize: 12,
            lineHeight: '19.5px',
            color: 'rgba(255,255,255,0.7)',
          }}>
            {watchNote}
          </p>
        </div>
      )}

      {/* bottom padding when no sections have their own */}
      {!hasFormula && !hasWatchNote && <div style={{ height: 0 }} />}
    </div>
  );
}
