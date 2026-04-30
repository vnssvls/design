import { useState } from 'react';

// ── Tokens ────────────────────────────────────────────────────────────────────
const T = {
  bg:          '#0A0A0F',
  surface:     '#0F0F12',
  surfacePurp: '#17131B',
  surface3:    '#1C1C26',
  panelBg:     '#212121',
  primary:     '#BB86FC',
  primary8:    'rgba(187,134,252,0.08)',
  primary10:   'rgba(187,134,252,0.10)',
  primary25:   'rgba(187,134,252,0.25)',
  primaryDark: '#0A0A0F',
  textPrimary: 'rgba(255,255,255,0.88)',
  textSec:     'rgba(255,255,255,0.60)',
  textMuted:   '#9898B0',
  border:      'rgba(255,255,255,0.07)',
  borderMed:   'rgba(255,255,255,0.12)',
  warning:     '#FF863B',
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────────
export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function formatDateKey(iso: string | null): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
}

export function orderRange(a: string, b: string): [string, string] {
  return a <= b ? [a, b] : [b, a];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getMondayOffset(year: number, month: number): number {
  return (new Date(year, month, 1).getDay() + 6) % 7;
}

function buildCells(year: number, month: number): Array<number | null> {
  const offset = getMondayOffset(year, month);
  const total = getDaysInMonth(year, month);
  const cells: Array<number | null> = Array(offset).fill(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

type DayState = 'default' | 'hover' | 'active-start' | 'active-end' | 'active-solo' | 'range' | 'today' | 'disabled' | 'hidden';

function getDayState(
  day: number | null,
  year: number,
  month: number,
  rangeStart: string | null,
  rangeEnd: string | null,
  hoverDate: string | null,
): DayState {
  if (!day) return 'hidden';
  const key = toDateKey(year, month, day);
  const now = new Date();
  const isToday = now.getFullYear() === year && now.getMonth() === month && now.getDate() === day;

  if (rangeStart && rangeEnd) {
    if (key === rangeStart) return 'active-start';
    if (key === rangeEnd) return 'active-end';
    if (key > rangeStart && key < rangeEnd) return 'range';
  } else if (rangeStart) {
    if (key === rangeStart) {
      return hoverDate && hoverDate > rangeStart ? 'active-start' : 'active-solo';
    }
    if (hoverDate && hoverDate > rangeStart) {
      if (key === hoverDate) return 'active-end';
      if (key > rangeStart && key < hoverDate) return 'range';
    }
  }
  return isToday ? 'today' : 'default';
}

function navigateMonth(year: number, month: number, dir: 'prev' | 'next') {
  if (dir === 'prev') return month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
  return month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];

// ── Styled helpers ────────────────────────────────────────────────────────────
// colIndex: 0=Mon … 6=Sun. Used to round row-boundary edges of the range strip.
const dayStyle = (state: DayState, colIndex: number): React.CSSProperties => {
  const isFirstCol = colIndex === 0;
  const isLastCol  = colIndex === 6;

  const base: React.CSSProperties = {
    width: 34, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, cursor: state === 'disabled' || state === 'hidden' ? 'not-allowed' : 'pointer',
    border: 'none', background: 'transparent', color: T.textPrimary, fontFamily: 'Inter, sans-serif',
    position: 'relative', visibility: state === 'hidden' ? 'hidden' : 'visible',
    opacity: state === 'disabled' ? 0.4 : 1, padding: 0,
  };

  // Range strip: flat sides except at row boundaries (caps the strip visually)
  if (state === 'range') {
    return {
      ...base, background: T.primary10,
      borderTopLeftRadius:    isFirstCol ? 6 : 0,
      borderBottomLeftRadius: isFirstCol ? 6 : 0,
      borderTopRightRadius:   isLastCol  ? 6 : 0,
      borderBottomRightRadius: isLastCol ? 6 : 0,
    };
  }

  // Active start: left pill cap, right flat (connects to range strip); fully round if at row end
  if (state === 'active-start') {
    return {
      ...base, background: T.primary, color: T.primaryDark, fontWeight: 600,
      borderTopLeftRadius: 6, borderBottomLeftRadius: 6,
      borderTopRightRadius:    isLastCol ? 6 : 0,
      borderBottomRightRadius: isLastCol ? 6 : 0,
    };
  }

  // Active end: right pill cap, left flat (connects to range strip); fully round if at row start
  if (state === 'active-end') {
    return {
      ...base, background: T.primary, color: T.primaryDark, fontWeight: 600,
      borderTopRightRadius: 6, borderBottomRightRadius: 6,
      borderTopLeftRadius:    isFirstCol ? 6 : 0,
      borderBottomLeftRadius: isFirstCol ? 6 : 0,
    };
  }

  // Solo active (start selected, no range yet)
  if (state === 'active-solo') return { ...base, background: T.primary, color: T.primaryDark, fontWeight: 600, borderRadius: 6 };

  if (state === 'hover') return { ...base, background: T.primary8, borderRadius: 6 };
  if (state === 'today') return { ...base, color: T.primary, fontWeight: 600, borderRadius: 6 };
  return { ...base, borderRadius: 6 };
};

// ── Calendar / Nav ────────────────────────────────────────────────────────────
interface CalendarNavProps {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
}

export function CalendarNav({ label, onPrev, onNext, prevDisabled = false }: CalendarNavProps) {
  const arrowStyle = (disabled: boolean): React.CSSProperties => ({
    width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: 'none', borderRadius: 6, background: 'transparent', color: T.textPrimary,
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.3 : 1,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', height: 36 }}>
      <button style={arrowStyle(prevDisabled)} onClick={onPrev} disabled={prevDisabled} aria-label="Previous month">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <span style={{ fontSize: 13, fontWeight: 600, color: T.textPrimary }}>{label}</span>
      <button style={arrowStyle(false)} onClick={onNext} aria-label="Next month">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

// ── Calendar / Month ──────────────────────────────────────────────────────────
interface CalendarMonthProps {
  initYear?: number;
  initMonth?: number;
  rangeStart?: string | null;
  rangeEnd?: string | null;
  hoverDate?: string | null;
  onDayClick?: (key: string) => void;
  onDayHover?: (key: string | null) => void;
  prevDisabled?: boolean;
  missingDates?: Set<string>;
}

export function CalendarMonth({
  initYear = 2026, initMonth = 2,
  rangeStart = null, rangeEnd = null, hoverDate = null,
  onDayClick, onDayHover, prevDisabled = false,
  missingDates,
}: CalendarMonthProps) {
  const [year, setYear] = useState(initYear);
  const [month, setMonth] = useState(initMonth);
  const cells = buildCells(year, month);

  const navigate = (dir: 'prev' | 'next') => {
    const next = navigateMonth(year, month, dir);
    setYear(next.year);
    setMonth(next.month);
  };

  return (
    <div style={{ width: 269, padding: '0 12px 12px' }}>
      <CalendarNav
        label={`${MONTH_NAMES[month]} ${year}`}
        onPrev={() => navigate('prev')}
        onNext={() => navigate('next')}
        prevDisabled={prevDisabled}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 34px)', marginBottom: 4 }}>
        {WEEKDAYS.map(d => (
          <div key={d} style={{ height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 34px)', rowGap: 2 }}>
        {cells.map((day, i) => {
          const colIndex = i % 7;
          const state = getDayState(day, year, month, rangeStart, rangeEnd, hoverDate);
          const key = day ? toDateKey(year, month, day) : `empty-${i}`;
          return (
            <button
              key={key}
              style={dayStyle(state, colIndex)}
              onClick={() => day && onDayClick?.(toDateKey(year, month, day))}
              onMouseEnter={() => day && onDayHover?.(toDateKey(year, month, day))}
              onMouseLeave={() => onDayHover?.(null)}
              tabIndex={!day ? -1 : 0}
            >
              {day ?? null}
              {(state === 'today' || (day && missingDates?.has(toDateKey(year, month, day)))) && (
                <span style={{
                  position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)',
                  width: 4, height: 4, borderRadius: '50%',
                  background: (day && missingDates?.has(toDateKey(year, month, day))) ? T.warning : T.primary,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Picker Header ─────────────────────────────────────────────────────────────
interface PickerHeaderProps {
  rangeStart?: string | null;
  rangeEnd?: string | null;
  label?: string | null;
  showIndicator?: boolean;
}

export function PickerHeader({ rangeStart, rangeEnd, label, showIndicator = false }: PickerHeaderProps) {
  const rangeText = label
    ? label
    : rangeStart && rangeEnd
      ? `${formatDateKey(rangeStart)} → ${formatDateKey(rangeEnd)}`
      : rangeStart
        ? `${formatDateKey(rangeStart)} → ...`
        : 'Select a date range';

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: 35, borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: T.textSec }}>
        <span>Range:</span>
        <strong style={{ color: T.textPrimary, fontWeight: 500 }}>{rangeText}</strong>
      </div>
      {showIndicator && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: T.textMuted }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: T.warning }} />
          <span>Missing Sales Days</span>
        </div>
      )}
    </div>
  );
}

// ── Shared footer ─────────────────────────────────────────────────────────────
const PANEL_BG: Record<'tonal' | 'grey', string> = { tonal: '#0F0F12', grey: '#212121' };
const TRIGGER_BG: Record<'tonal' | 'grey', { rest: string; filled: string }> = {
  tonal: { rest: '#0A0A0F', filled: '#17131B' },
  grey:  { rest: '#212121', filled: '#1C1C26' },
};

function panelStyle(theme: 'tonal' | 'grey' = 'grey'): React.CSSProperties {
  return {
    background: PANEL_BG[theme], border: `1px solid ${T.border}`, borderRadius: 12,
    overflow: 'hidden', display: 'inline-flex', flexDirection: 'column',
  };
}

const vDividerStyle: React.CSSProperties = { width: 1, background: T.border, flexShrink: 0 };
const hDividerStyle: React.CSSProperties = { height: 1, background: T.border, flexShrink: 0 };

function FooterBtn({ children, onClick, disabled, variant = 'ghost' }: {
  children: React.ReactNode; onClick?: () => void; disabled?: boolean; variant?: 'ghost' | 'white';
}) {
  const isWhite = variant === 'white';
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '0 16px', height: 30, fontSize: 13, fontWeight: isWhite ? 600 : 500,
      color: isWhite ? '#0A0A0F' : T.textPrimary,
      background: isWhite ? '#FCFBFB' : 'transparent',
      border: 'none', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.35 : 1, fontFamily: 'Inter, sans-serif',
    }}>
      {children}
    </button>
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderTop: `1px solid ${T.border}`, gap: 8, flexShrink: 0 }}>
      {children}
    </div>
  );
}

function FooterActions({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>{children}</div>;
}

// ── picker.panel type=custom-range ────────────────────────────────────────────
export function PickerPanelCustomRange({ showIndicator = true, missingDates, theme = 'grey' }: { showIndicator?: boolean; missingDates?: Set<string>; theme?: 'tonal' | 'grey' }) {
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [applied, setApplied] = useState({ start: '2026-03-03', end: '2026-03-14' });

  const selectDate = (key: string) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(key); setRangeEnd(null);
    } else {
      const [s, e] = orderRange(rangeStart, key);
      setRangeStart(s); setRangeEnd(e);
    }
  };

  const apply = () => { if (rangeStart && rangeEnd) { setApplied({ start: rangeStart, end: rangeEnd }); setRangeStart(null); setRangeEnd(null); } };
  const reset = () => { setRangeStart(null); setRangeEnd(null); };

  const displayStart = rangeStart || applied.start;
  const displayEnd = rangeEnd || (rangeStart ? null : applied.end);

  return (
    <div style={panelStyle(theme)}>
      <PickerHeader rangeStart={displayStart} rangeEnd={displayEnd} showIndicator={showIndicator} />
      <div style={{ display: 'flex' }}>
        <CalendarMonth initYear={2026} initMonth={2} rangeStart={displayStart} rangeEnd={displayEnd} hoverDate={hover} onDayClick={selectDate} onDayHover={setHover} missingDates={missingDates} />
        <div style={vDividerStyle} />
        <CalendarMonth initYear={2026} initMonth={3} rangeStart={displayStart} rangeEnd={displayEnd} hoverDate={hover} onDayClick={selectDate} onDayHover={setHover} missingDates={missingDates} />
      </div>
      <Footer>
        <FooterBtn onClick={reset}>Reset</FooterBtn>
        <FooterActions>
          <FooterBtn onClick={reset}>Cancel</FooterBtn>
          <FooterBtn variant="white" onClick={apply} disabled={!(rangeStart && rangeEnd)}>Apply</FooterBtn>
        </FooterActions>
      </Footer>
    </div>
  );
}

// ── picker.panel type=month-only ──────────────────────────────────────────────
export function PickerPanelMonthOnly({ missingDates, theme = 'grey' }: { missingDates?: Set<string>; theme?: 'tonal' | 'grey' } = {}) {
  const [pending, setPending] = useState<{ start: string | null; end: string | null }>({ start: null, end: null });
  const [applied, setApplied] = useState({ start: '2026-03-03', end: '2026-03-14' });
  const [hover, setHover] = useState<string | null>(null);

  const selectDate = (key: string) => {
    if (!pending.start || pending.end) { setPending({ start: key, end: null }); }
    else { const [s, e] = orderRange(pending.start, key); setPending({ start: s, end: e }); }
  };

  const apply = () => { if (pending.start && pending.end) { setApplied({ start: pending.start, end: pending.end }); setPending({ start: null, end: null }); } };
  const cancel = () => setPending({ start: null, end: null });

  const displayStart = pending.start || applied.start;
  const displayEnd = pending.end || (pending.start ? null : applied.end);

  return (
    <div style={panelStyle(theme)}>
      <PickerHeader rangeStart={displayStart} rangeEnd={displayEnd} />
      <CalendarMonth initYear={2026} initMonth={2} rangeStart={displayStart} rangeEnd={displayEnd} hoverDate={hover} onDayClick={selectDate} onDayHover={setHover} missingDates={missingDates} />
      <Footer>
        <FooterActions>
          <FooterBtn onClick={cancel}>Cancel</FooterBtn>
          <FooterBtn variant="white" onClick={apply} disabled={!(pending.start && pending.end)}>Apply</FooterBtn>
        </FooterActions>
      </Footer>
    </div>
  );
}

// ── picker.panel type=with-presets ────────────────────────────────────────────
const PRESETS = [
  { label: 'Today',        start: '2026-04-29', end: '2026-04-29' },
  { label: 'Yesterday',    start: '2026-04-28', end: '2026-04-28' },
  { label: 'Last 7 days',  start: '2026-04-22', end: '2026-04-29' },
  { label: 'Last 30 days', start: '2026-03-30', end: '2026-04-29' },
  { label: 'This month',   start: '2026-04-01', end: '2026-04-29' },
  { label: 'Last month',   start: '2026-03-01', end: '2026-03-31' },
  { label: 'YTD',          start: '2026-01-01', end: '2026-04-29' },
] as const;

export function PickerPanelWithPresets({ showIndicator = true, missingDates, theme = 'grey' }: { showIndicator?: boolean; missingDates?: Set<string>; theme?: 'tonal' | 'grey' }) {
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [applied, setApplied] = useState({ start: '2026-03-03', end: '2026-03-14' });
  const [pending, setPending] = useState<{ start: string | null; end: string | null }>({ start: null, end: null });
  const [hover, setHover] = useState<string | null>(null);

  const selectPreset = (p: typeof PRESETS[number]) => {
    setActivePreset(p.label); setPending({ start: null, end: null });
    setApplied({ start: p.start, end: p.end });
  };

  const selectDate = (key: string) => {
    setActivePreset(null);
    if (!pending.start || pending.end) { setPending({ start: key, end: null }); }
    else { const [s, e] = orderRange(pending.start, key); setPending({ start: s, end: e }); }
  };

  const apply = () => { if (pending.start && pending.end) { setApplied({ start: pending.start, end: pending.end }); } setPending({ start: null, end: null }); };
  const cancel = () => { setActivePreset(null); setPending({ start: null, end: null }); };

  const displayStart = pending.start || applied.start;
  const displayEnd = pending.end || (pending.start ? null : applied.end);

  return (
    <div style={panelStyle(theme)}>
      <PickerHeader rangeStart={displayStart} rangeEnd={displayEnd} showIndicator={showIndicator} />
      <div style={{ display: 'flex', height: 300 }}>
        <div style={{ width: 208, display: 'flex', flexDirection: 'column', padding: '8px 0', flexShrink: 0 }}>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => selectPreset(p)} style={{
              padding: '10px 16px', fontSize: 13, color: activePreset === p.label ? T.primary : T.textPrimary,
              background: activePreset === p.label ? T.primary10 : 'transparent', border: 'none',
              textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>
              {p.label}
            </button>
          ))}
        </div>
        <div style={vDividerStyle} />
        <CalendarMonth initYear={2026} initMonth={2} rangeStart={displayStart} rangeEnd={displayEnd} hoverDate={hover} onDayClick={selectDate} onDayHover={setHover} missingDates={missingDates} />
      </div>
      <Footer>
        <FooterActions>
          <FooterBtn onClick={cancel}>Cancel</FooterBtn>
          <FooterBtn variant="white" onClick={apply} disabled={!(pending.start && pending.end) && !activePreset}>Apply</FooterBtn>
        </FooterActions>
      </Footer>
    </div>
  );
}

// ── picker.panel type=period ──────────────────────────────────────────────────
const PERIOD_MONTHS = ['Jan 1-31','Feb 1-28','Mar 1-31','Apr 1-30','May 1-31','Jun 1-30','Jul 1-31','Aug 1-31','Sep 1-30','Oct 1-31','Nov 1-30','Dec 1-31'];
const PERIOD_YEARS = ['2026','2025','2024','2023'];

export function PickerPanelPeriod({ onSwitchToCustom, showIndicator = true, theme = 'grey' }: { onSwitchToCustom?: () => void; showIndicator?: boolean; theme?: 'tonal' | 'grey' }) {
  const [selectedMonth, setSelectedMonth] = useState('Mar 1-31');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [applied, setApplied] = useState({ month: 'Mar 1-31', year: '2026' });

  const apply = () => setApplied({ month: selectedMonth, year: selectedYear });

  return (
    <div style={panelStyle(theme)}>
      <PickerHeader label={`${applied.month} ${applied.year}`} showIndicator={showIndicator} />
      <div style={{ display: 'flex', height: 340, overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {PERIOD_MONTHS.map(m => (
            <button key={m} onClick={() => setSelectedMonth(m)} style={{
              display: 'block', width: '100%', padding: '10px 16px', fontSize: 13, textAlign: 'left',
              color: selectedMonth === m ? T.primary : T.textPrimary, background: selectedMonth === m ? T.primary10 : 'transparent',
              border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
            }}>
              {m} {selectedYear}
            </button>
          ))}
        </div>
        <div style={vDividerStyle} />
        <div style={{ width: 160, padding: '8px 0', flexShrink: 0 }}>
          {PERIOD_YEARS.map(y => (
            <button key={y} onClick={() => setSelectedYear(y)} style={{
              display: 'block', width: '100%', padding: '10px 16px', fontSize: 13, textAlign: 'left',
              color: selectedYear === y ? T.primary : T.textPrimary, background: selectedYear === y ? T.primary10 : 'transparent',
              border: 'none', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>
              {y}
            </button>
          ))}
        </div>
      </div>
      <div style={hDividerStyle} />
      <Footer>
        <FooterBtn onClick={onSwitchToCustom}>Custom range</FooterBtn>
        <FooterActions>
          <FooterBtn>Cancel</FooterBtn>
          <FooterBtn variant="white" onClick={apply}>Apply</FooterBtn>
        </FooterActions>
      </Footer>
    </div>
  );
}

// ── picker.trigger ────────────────────────────────────────────────────────────
type TriggerType = 'calendar' | 'period';
type TriggerMode = 'with-label' | 'icon-only';

interface PickerTriggerProps {
  type?: TriggerType;
  mode?: TriggerMode;
  value?: string;
  active?: boolean;
  filterCount?: number | null;
  theme?: 'tonal' | 'grey';
}

export function PickerTrigger({ type = 'calendar', mode = 'with-label', value, active = false, filterCount = null, theme = 'tonal' }: PickerTriggerProps) {
  const label = 'Mar 3 – Mar 14, 2026';
  const displayValue = value ?? label;
  const bg = active ? TRIGGER_BG[theme].filled : TRIGGER_BG[theme].rest;

  const iconPath = <><rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M2 7H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M5 2V4M11 2V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></>;

  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, height: 36, padding: '0 12px',
      background: bg, border: `1px solid ${T.border}`, borderRadius: 8,
      cursor: 'pointer', fontSize: 13, color: T.textSec, fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{iconPath}</svg>
      {mode === 'with-label' && (
        <>
          <span style={{ color: active ? T.textPrimary : T.textSec, fontWeight: active ? 500 : 400 }}>{displayValue}</span>
          {filterCount !== null && (
            <span style={{ background: 'rgba(255,255,255,0.9)', color: T.primaryDark, fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '0 6px', height: 18, display: 'flex', alignItems: 'center' }}>{filterCount}</span>
          )}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </>
      )}
    </button>
  );
}
