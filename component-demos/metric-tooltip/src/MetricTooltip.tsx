import React from 'react';
import { tokens } from './tokens';

export type Theme = 'Tonal' | 'Grey';
export type CaretPosition = 'top' | 'bottom' | 'left' | 'right';

export interface MetricTooltipProps {
  title: string;
  description: string;
  formula?: string;
  watchNote?: string;
  theme?: Theme;
  showCaret?: boolean;
  caretPosition?: CaretPosition;
  showFormula?: boolean;
  showWatchNote?: boolean;
  style?: React.CSSProperties;
}

const THEME_TOKENS: Record<Theme, {
  bg: string;
  border: string;
  codeBlockBg: string;
  caretOuter: string;
  caretInner: string;
}> = {
  Tonal: {
    bg: '#0f0f12',
    border: '#17131b',
    codeBlockBg: 'rgba(155,126,189,0.15)',
    caretOuter: '#17131b',
    caretInner: '#0f0f12',
  },
  Grey: {
    bg: '#181818',
    border: '#212121',
    codeBlockBg: '#424242',
    caretOuter: '#212121',
    caretInner: '#181818',
  },
};

function Caret({ position, themeTokens }: { position: CaretPosition; themeTokens: typeof THEME_TOKENS['Tonal'] }) {
  const { caretOuter, caretInner } = themeTokens;
  const s = 8; // outer size
  const si = 7; // inner size

  const outerStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = { position: 'absolute', width: 0, height: 0, border: 'none' };
    switch (position) {
      case 'top':    return { ...base, borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderBottom: `${s}px solid ${caretOuter}`, top: -s, left: '50%', transform: 'translateX(-50%)' };
      case 'bottom': return { ...base, borderLeft: `${s}px solid transparent`, borderRight: `${s}px solid transparent`, borderTop: `${s}px solid ${caretOuter}`, bottom: -s, left: '50%', transform: 'translateX(-50%)' };
      case 'left':   return { ...base, borderTop: `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderRight: `${s}px solid ${caretOuter}`, left: -s, top: '50%', transform: 'translateY(-50%)' };
      case 'right':  return { ...base, borderTop: `${s}px solid transparent`, borderBottom: `${s}px solid transparent`, borderLeft: `${s}px solid ${caretOuter}`, right: -s, top: '50%', transform: 'translateY(-50%)' };
    }
  };

  const innerStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = { position: 'absolute', width: 0, height: 0, border: 'none' };
    switch (position) {
      case 'top':    return { ...base, borderLeft: `${si}px solid transparent`, borderRight: `${si}px solid transparent`, borderBottom: `${si}px solid ${caretInner}`, top: -(si - 2), left: '50%', transform: 'translateX(-50%)' };
      case 'bottom': return { ...base, borderLeft: `${si}px solid transparent`, borderRight: `${si}px solid transparent`, borderTop: `${si}px solid ${caretInner}`, bottom: -(si - 2), left: '50%', transform: 'translateX(-50%)' };
      case 'left':   return { ...base, borderTop: `${si}px solid transparent`, borderBottom: `${si}px solid transparent`, borderRight: `${si}px solid ${caretInner}`, left: -(si - 2), top: '50%', transform: 'translateY(-50%)' };
      case 'right':  return { ...base, borderTop: `${si}px solid transparent`, borderBottom: `${si}px solid transparent`, borderLeft: `${si}px solid ${caretInner}`, right: -(si - 2), top: '50%', transform: 'translateY(-50%)' };
    }
  };

  return (
    <>
      <div style={outerStyle()} />
      <div style={innerStyle()} />
    </>
  );
}

export function MetricTooltip({
  title,
  description,
  formula,
  watchNote,
  theme = 'Tonal',
  showCaret = true,
  caretPosition = 'top',
  showFormula = true,
  showWatchNote = true,
  style,
}: MetricTooltipProps) {
  const t = THEME_TOKENS[theme];
  const hasFormula = showFormula && !!formula;
  const hasWatchNote = showWatchNote && !!watchNote;

  return (
    <div style={{
      position: 'relative',
      width: 320,
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: 10,
      boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.5), 0px 8px 10px -6px rgba(0,0,0,0.4)',
      padding: '16px 16px 0',
      boxSizing: 'border-box',
      fontFamily: tokens.fontFamily,
      overflow: 'visible',
      ...style,
    }}>
      {showCaret && <Caret position={caretPosition} themeTokens={t} />}

      <p style={{ margin: 0, fontWeight: 600, fontSize: 14, lineHeight: '20px', color: '#fff', marginBottom: 8 }}>
        {title}
      </p>

      <p style={{ margin: 0, fontWeight: 400, fontSize: 12, lineHeight: '19.5px', color: 'rgba(255,255,255,0.8)', marginBottom: hasFormula || hasWatchNote ? 12 : 16 }}>
        {description}
      </p>

      {hasFormula && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 9, paddingBottom: hasWatchNote ? 0 : 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 12, lineHeight: '16px', color: '#fff' }}>Formula:</p>
          <div style={{ background: t.codeBlockBg, borderRadius: 4, padding: '4px 8px', height: 24, boxSizing: 'border-box', overflow: 'hidden' }}>
            <p style={{ margin: 0, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, lineHeight: '16px', color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap' }}>
              {formula}
            </p>
          </div>
        </div>
      )}

      {hasWatchNote && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 9, paddingBottom: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontWeight: 500, fontSize: 12, lineHeight: '16px', color: '#fff' }}>When to watch:</p>
          <p style={{ margin: 0, fontWeight: 400, fontSize: 12, lineHeight: '19.5px', color: 'rgba(255,255,255,0.8)' }}>
            {watchNote}
          </p>
        </div>
      )}
    </div>
  );
}
