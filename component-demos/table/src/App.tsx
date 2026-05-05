import React, { useState } from 'react';
import {
  T,
  Density, Theme, RowState, Sentiment, SortDir, StatusDisplay, HealthSentiment, ActionType,
  CellText, CellMetric, CellStatus, CellHealth, CellAction,
  HeaderCell, RowBase, RowDivider, RowSectionDivider, RowEmptyState,
} from './TableSystem';

// ─── Demo primitives ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 11, fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.5)',
      textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16,
    }}>
      {children}
    </div>
  );
}

function Card({ children, style: s }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.rowDivider}`,
      borderRadius: 12, padding: 24, ...s,
    }}>
      {children}
    </div>
  );
}

function ToggleBtn({ active, onClick, children }: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px', borderRadius: 6,
      border: `1px solid ${active ? T.purple : T.rowDivider}`,
      background: active ? 'rgba(187,134,252,0.12)' : 'transparent',
      color: active ? T.purple : T.white60,
      fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
      transition: 'all 120ms ease',
    }}>
      {children}
    </button>
  );
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        fontSize: 12, color: T.white60, fontFamily: 'Inter, sans-serif', minWidth: 88,
      }}>
        {label}
      </span>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      color: T.white88, fontSize: 15, fontWeight: 600,
      fontFamily: 'Inter, sans-serif', margin: '0 0 16px',
    }}>
      {children}
    </h2>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '48px 0' }} />;
}

// ─── Column definitions ───────────────────────────────────────────────────────
//
// These are example column sets for the live table demo.
// In your implementation, define columns to match your data model.

interface ColDef {
  key: string;
  label: string;
  width: number;
  align: 'left' | 'center';
  sort: SortDir;
}

const COLS_DESKTOP: ColDef[] = [
  { key: 'name',     label: 'Name',     width: 220, align: 'left',   sort: 'none' },
  { key: 'value',    label: 'Value',    width: 100, align: 'left',   sort: 'asc'  },
  { key: 'category', label: 'Category', width: 120, align: 'left',   sort: 'none' },
  { key: 'status',   label: 'Status',   width: 160, align: 'left',   sort: 'none' },
  { key: 'health',   label: 'Health',   width: 90,  align: 'center', sort: 'none' },
  { key: 'action',   label: '',         width: 72,  align: 'center', sort: 'none' },
];

// Tablet drops the Category column
const COLS_TABLET: ColDef[] = COLS_DESKTOP.filter(c => c.key !== 'category').map(c =>
  c.key === 'name' ? { ...c, width: 200 } : c
);

// ─── Demo data ────────────────────────────────────────────────────────────────

interface RowData {
  id: number;
  name: string;
  value: string;
  sentiment: Sentiment;
  category: string;
  status: StatusDisplay;
  progress: number;
  health: HealthSentiment;
  action: ActionType;
}

const DATA_ROWS: RowData[] = [
  { id: 1, name: 'Alpha Studio',   value: '22.5%', sentiment: 'positive', category: 'Type A', status: 'complete',    progress: 100, health: 'good',    action: 'download' },
  { id: 2, name: 'Beta Works',     value: '18.2%', sentiment: 'warning',  category: 'Type B', status: 'in-progress', progress: 65,  health: 'warning', action: 'view'     },
  { id: 3, name: 'Gamma Co',       value: '-4.1%', sentiment: 'negative', category: 'Type A', status: 'in-progress', progress: 0,   health: 'bad',     action: 'download' },
  { id: 4, name: 'Delta Lab',      value: '31.0%', sentiment: 'positive', category: 'Type C', status: 'complete',    progress: 100, health: 'good',    action: 'open'     },
];

const EMPTY_ROWS: RowData[] = [
  { id: 5, name: 'Epsilon Ltd',    value: '',      sentiment: 'neutral',  category: 'Type B', status: 'empty', progress: 0, health: 'bad', action: 'view' },
  { id: 6, name: 'Zeta Group',     value: '',      sentiment: 'neutral',  category: 'Type A', status: 'empty', progress: 0, health: 'bad', action: 'view' },
];

// ─── Table components ─────────────────────────────────────────────────────────

function TableHeader({ cols, theme, density }: { cols: ColDef[]; theme: Theme; density: Density }) {
  const bg = theme === 'grey' ? T.surfaceGrey : T.headerTonal;
  const totalWidth = cols.reduce((s, c) => s + c.width, 0);
  return (
    <div style={{
      display: 'flex', background: bg,
      width: totalWidth,
      borderBottom: '0.5px solid rgba(255,255,255,0.1)',
    }}>
      {cols.map(col => (
        <HeaderCell
          key={col.key}
          label={col.label}
          sort={col.sort}
          align={col.align}
          width={col.width}
          density={density}
        />
      ))}
    </div>
  );
}

function TableDataRow({
  row, cols, rowState, theme, density,
}: {
  row: RowData;
  cols: ColDef[];
  rowState: RowState;
  theme: Theme;
  density: Density;
}) {
  const isEmpty = rowState === 'empty';
  const skeletonWidths = cols.map(c => c.width);

  return (
    <RowBase state={rowState} theme={theme} density={density} skeletonWidths={skeletonWidths}>
      {cols.map(col => {
        if (col.key === 'name')     return <CellText    key="name"   value={row.name}   empty={isEmpty} width={col.width} density={density} />;
        if (col.key === 'value')    return <CellMetric  key="value"  value={row.value}  sentiment={isEmpty ? 'neutral' : row.sentiment} empty={isEmpty || !row.value} width={col.width} density={density} />;
        if (col.key === 'category') return <CellText    key="cat"    value={row.category} empty={isEmpty} width={col.width} density={density} />;
        if (col.key === 'status')   return <CellStatus  key="status" display={isEmpty ? 'empty' : row.status} progress={row.progress} density={density} width={col.width} />;
        if (col.key === 'health')   return <CellHealth  key="health" sentiment={row.health} empty={isEmpty} width={col.width} density={density} />;
        if (col.key === 'action')   return <CellAction  key="action" action={row.action} width={col.width} density={density} />;
        return null;
      })}
    </RowBase>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  // Live table controls
  const [theme,        setTheme]        = useState<Theme>('tonal');
  const [density,      setDensity]      = useState<Density>('desktop');
  const [showEmpty,    setShowEmpty]    = useState(true);
  const [sectionOpen,  setSectionOpen]  = useState(true);
  const [rowStates,    setRowStates]    = useState<Record<number, RowState>>({ 1: 'default', 2: 'default', 3: 'default', 4: 'default' });

  // Cell section controls
  const [cellDensity,  setCellDensity]  = useState<Density>('desktop');
  const [testProgress, setTestProgress] = useState(65);

  const cols = density === 'tablet' ? COLS_TABLET : COLS_DESKTOP;
  const tableWidth = cols.reduce((s, c) => s + c.width, 0);
  const tableBg = theme === 'grey' ? T.surfaceGrey : T.headerTonal;

  function cycleRowState(id: number) {
    const order: RowState[] = ['default', 'hover', 'selected', 'loading', 'empty'];
    setRowStates(prev => {
      const current = prev[id] ?? 'default';
      const next = order[(order.indexOf(current) + 1) % order.length];
      return { ...prev, [id]: next };
    });
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', padding: '40px 40px 80px', fontFamily: 'Inter, sans-serif' }}>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0%   { opacity: 0.5; }
          50%  { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <h1 style={{ color: T.white88, fontSize: 22, fontWeight: 600, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
          Table System
        </h1>
        <p style={{ color: T.white60, fontSize: 13, marginBottom: 48, fontFamily: 'Inter, sans-serif' }}>
          Composable table building blocks. Cells + RowBase + header = any table, any column set.
        </p>

        {/* ══════ LIVE TABLE ══════ */}
        <H2>Live table</H2>
        <p style={{ color: T.white60, fontSize: 13, marginBottom: 24, fontFamily: 'Inter, sans-serif', marginTop: -8 }}>
          Click a row to cycle its state. All controls apply to the whole table.
        </p>

        {/* Controls */}
        <Card style={{ marginBottom: 16 }}>
          <SectionLabel>Controls</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ControlRow label="theme">
              {(['tonal', 'grey'] as Theme[]).map(t => (
                <ToggleBtn key={t} active={theme === t} onClick={() => setTheme(t)}>{t}</ToggleBtn>
              ))}
            </ControlRow>
            <ControlRow label="density">
              {(['desktop', 'tablet'] as Density[]).map(d => (
                <ToggleBtn key={d} active={density === d} onClick={() => setDensity(d)}>{d}</ToggleBtn>
              ))}
            </ControlRow>
            <ControlRow label="empty section">
              <ToggleBtn active={showEmpty} onClick={() => setShowEmpty(v => !v)}>
                {showEmpty ? 'visible' : 'hidden'}
              </ToggleBtn>
              <ToggleBtn active={sectionOpen} onClick={() => setSectionOpen(v => !v)}>
                section {sectionOpen ? 'expanded' : 'collapsed'}
              </ToggleBtn>
            </ControlRow>
            <ControlRow label="row states">
              <span style={{ fontSize: 12, color: T.white30, fontFamily: 'Inter, sans-serif' }}>
                Click any row below to cycle: default → hover → selected → loading → empty
              </span>
            </ControlRow>
          </div>
        </Card>

        {/* Table preview */}
        <div style={{
          background: tableBg, borderRadius: 12,
          border: `1px solid ${T.rowDivider}`,
          overflow: 'auto', marginBottom: 48,
        }}>
          <TableHeader cols={cols} theme={theme} density={density} />
          {DATA_ROWS.map(row => (
            <TableDataRow
              key={row.id}
              row={row}
              cols={cols}
              rowState={rowStates[row.id] ?? 'default'}
              theme={theme}
              density={density}
            />
          ))}
          {showEmpty && (
            <>
              <RowDivider width={tableWidth} />
              <RowSectionDivider
                label={`${EMPTY_ROWS.length} no data`}
                expanded={sectionOpen}
                density={density}
                width={tableWidth}
                onToggle={() => setSectionOpen(v => !v)}
              />
              {sectionOpen && EMPTY_ROWS.map(row => (
                <TableDataRow
                  key={row.id}
                  row={row}
                  cols={cols}
                  rowState="empty"
                  theme={theme}
                  density={density}
                />
              ))}
            </>
          )}
        </div>

        <Divider />

        {/* ══════ CELLS ══════ */}
        <H2>Cells</H2>

        <div style={{ marginBottom: 16 }}>
          <ControlRow label="density">
            {(['desktop', 'tablet', 'mobile'] as Density[]).map(d => (
              <ToggleBtn key={d} active={cellDensity === d} onClick={() => setCellDensity(d)}>{d}</ToggleBtn>
            ))}
          </ControlRow>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* CellText */}
          <Card>
            <SectionLabel>CellText — align × empty</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: tableBg }}>
              {(['left', 'center'] as const).map(align =>
                [false, true].map(empty => (
                  <div key={`${align}-${empty}`} style={{ display: 'flex', alignItems: 'center', borderBottom: `0.5px solid ${T.rowDivider}` }}>
                    <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 90, padding: '0 12px' }}>
                      {align}, {empty ? 'empty' : 'value'}
                    </span>
                    <CellText value="Sample text" align={align} empty={empty} width={160} density={cellDensity} />
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* CellMetric */}
          <Card>
            <SectionLabel>CellMetric — sentiment × empty</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: tableBg }}>
              {(['neutral', 'positive', 'negative', 'warning'] as const).map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', borderBottom: `0.5px solid ${T.rowDivider}` }}>
                  <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 90, padding: '0 12px' }}>{s}</span>
                  <CellMetric value="22.5%" sentiment={s} width={120} density={cellDensity} />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 90, padding: '0 12px' }}>empty</span>
                <CellMetric value="22.5%" empty width={120} density={cellDensity} />
              </div>
            </div>
          </Card>

          {/* CellStatus */}
          <Card>
            <SectionLabel>CellStatus — display × density</SectionLabel>
            <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: T.white60, fontFamily: 'Inter, sans-serif' }}>
                in-progress %:
              </span>
              <input
                type="range" min={0} max={100}
                value={testProgress}
                onChange={e => setTestProgress(Number(e.target.value))}
                style={{ width: 120, accentColor: T.purple }}
              />
              <span style={{ fontSize: 12, color: T.white88, fontFamily: 'Inter, sans-serif', minWidth: 32 }}>
                {testProgress}%
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, background: tableBg }}>
              {(['complete', 'in-progress', 'incomplete', 'empty'] as StatusDisplay[]).map(d => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', borderBottom: `0.5px solid ${T.rowDivider}` }}>
                  <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 90, padding: '0 12px' }}>{d}</span>
                  <CellStatus display={d} progress={d === 'in-progress' ? testProgress : 100} density={cellDensity} width={180} />
                </div>
              ))}
            </div>
            {cellDensity === 'desktop' && testProgress === 0 && (
              <p style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', marginTop: 8 }}>
                0% renders in danger red — code-level logic, no separate variant.
              </p>
            )}
          </Card>

          {/* CellHealth + CellAction */}
          <Card>
            <SectionLabel>CellHealth — sentiment</SectionLabel>
            <div style={{ display: 'flex', gap: 0, background: tableBg, marginBottom: 16 }}>
              {(['good', 'warning', 'bad'] as HealthSentiment[]).map(s => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0' }}>
                  <CellHealth sentiment={s} width={80} density={cellDensity} />
                  <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif' }}>{s}</span>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0' }}>
                <CellHealth sentiment="good" empty width={80} density={cellDensity} />
                <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif' }}>empty</span>
              </div>
            </div>

            <SectionLabel>CellAction — action</SectionLabel>
            <div style={{ display: 'flex', gap: 0, background: tableBg }}>
              {(['download', 'open', 'view'] as ActionType[]).map(a => (
                <div key={a} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0' }}>
                  <CellAction action={a} width={72} density={cellDensity} />
                  <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif' }}>{a}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

        <Divider />

        {/* ══════ HEADER CELL ══════ */}
        <H2>HeaderCell — sort × align × hover</H2>
        <p style={{ color: T.white60, fontSize: 13, marginBottom: 16, fontFamily: 'Inter, sans-serif', marginTop: -8 }}>
          Hover any cell to see the state change.
        </p>

        <Card style={{ marginBottom: 48 }}>
          <div style={{ background: T.headerTonal, borderRadius: 8, overflow: 'hidden' }}>
            {(['none', 'asc', 'desc'] as SortDir[]).map(sort => (
              <div key={sort} style={{ display: 'flex', borderBottom: `0.5px solid ${T.rowDivider}` }}>
                <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 56, padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                  sort={sort}
                </span>
                <HeaderCell label="Column" sort={sort} align="left"   width={160} />
                <HeaderCell label="Column" sort={sort} align="center" width={120} />
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', marginTop: 12, marginBottom: 0 }}>
            Left column: align=left. Right column: align=center. Hover each cell to see hover state.
          </p>
        </Card>

        <Divider />

        {/* ══════ ROW STATES ══════ */}
        <H2>Row states</H2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>

          {/* RowBase states */}
          <Card>
            <SectionLabel>RowBase — all states (tonal)</SectionLabel>
            <div style={{ background: T.headerTonal, borderRadius: 8, overflow: 'hidden' }}>
              {(['default', 'hover', 'selected', 'loading', 'empty'] as RowState[]).map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 72, padding: '0 12px', flexShrink: 0 }}>
                    {s}
                  </span>
                  <RowBase state={s} theme="tonal" density="desktop" skeletonWidths={[160, 120, 120, 80]}>
                    <CellText value="Row content" width={160} />
                    <CellMetric value="22.5%" sentiment="positive" width={120} />
                    <CellText value="Type A" width={120} />
                    <CellHealth sentiment="good" width={80} />
                  </RowBase>
                </div>
              ))}
            </div>
          </Card>

          {/* Theme comparison */}
          <Card>
            <SectionLabel>RowBase — theme comparison (hover state)</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(['tonal', 'grey'] as Theme[]).map(th => (
                <div key={th}>
                  <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', display: 'block', marginBottom: 4 }}>
                    theme={th}
                  </span>
                  <div style={{ background: th === 'grey' ? T.surfaceGrey : T.headerTonal, borderRadius: 8, overflow: 'hidden' }}>
                    {(['default', 'hover', 'selected'] as RowState[]).map(s => (
                      <RowBase key={s} state={s} theme={th} density="desktop">
                        <CellText value="Row content" width={160} />
                        <CellMetric value="22.5%" sentiment="positive" width={120} />
                        <CellHealth sentiment="good" width={80} />
                      </RowBase>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Section divider + empty state */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          <Card>
            <SectionLabel>RowSectionDivider — expanded / collapsed</SectionLabel>
            <div style={{ background: T.headerTonal, borderRadius: 8, overflow: 'hidden' }}>
              <RowSectionDivider label="3 no data" expanded={true}  density="desktop" width={440} />
              <RowSectionDivider label="3 no data" expanded={false} density="desktop" width={440} />
              <RowDivider width={440} />
              <RowSectionDivider label="2 incomplete" expanded={true} density="tablet" width={440} />
            </div>
          </Card>
          <Card>
            <SectionLabel>RowEmptyState — density variants</SectionLabel>
            <div style={{ background: T.headerTonal, borderRadius: 8, overflow: 'hidden' }}>
              {(['desktop', 'tablet', 'mobile'] as Density[]).map(d => (
                <div key={d} style={{ borderBottom: `0.5px solid ${T.rowDivider}` }}>
                  <div style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', padding: '8px 16px' }}>density={d}</div>
                  <RowEmptyState density={d} width={440} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Divider />

        {/* ══════ COMPOSITION GUIDE ══════ */}
        <H2>Composition guide — building a custom table</H2>
        <p style={{ color: T.white60, fontSize: 13, marginBottom: 8, fontFamily: 'Inter, sans-serif', marginTop: -8 }}>
          Use <code style={{ color: T.purple, fontFamily: 'monospace', fontSize: 12 }}>RowBase</code> + cell
          components to build any table with any column set. No org-dashboard columns baked in.
          Define your columns, pick your cells, set widths at the instance level.
        </p>
        <p style={{ color: T.white30, fontSize: 12, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
          Example below: 4-column product table using Name, Price, Change, and Action.
        </p>

        <Card>
          <SectionLabel>4-column custom table (RowBase composition)</SectionLabel>

          {/* Custom table */}
          <div style={{
            background: T.headerTonal, borderRadius: 8, overflow: 'hidden',
            border: `1px solid ${T.rowDivider}`, marginBottom: 20,
          }}>
            {/* Header */}
            <div style={{ display: 'flex', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}>
              <HeaderCell label="Product"  sort="none" align="left"   width={240} />
              <HeaderCell label="Price"    sort="asc"  align="left"   width={100} />
              <HeaderCell label="Change"   sort="none" align="left"   width={120} />
              <HeaderCell label=""         sort="none" align="center" width={72}  />
            </div>

            {/* Data rows — each is RowBase + cells dropped in */}
            <RowBase state="default" theme="tonal" density="desktop">
              <CellText   value="Dark Roast Blend"   width={240} />
              <CellMetric value="€12.40"  sentiment="neutral"  width={100} />
              <CellMetric value="+3.2%"   sentiment="positive" width={120} />
              <CellAction action="view"   width={72} />
            </RowBase>
            <RowBase state="default" theme="tonal" density="desktop">
              <CellText   value="House Red Wine"     width={240} />
              <CellMetric value="€18.90"  sentiment="neutral"  width={100} />
              <CellMetric value="-1.5%"   sentiment="negative" width={120} />
              <CellAction action="view"   width={72} />
            </RowBase>
            <RowBase state="selected" theme="tonal" density="desktop">
              <CellText   value="Chicken Breast"     width={240} />
              <CellMetric value="€8.20"   sentiment="neutral"  width={100} />
              <CellMetric value="+12.1%"  sentiment="warning"  width={120} />
              <CellAction action="download" width={72} />
            </RowBase>
            <RowBase state="default" theme="tonal" density="desktop">
              <CellText   value="Fresh Basil"        width={240} />
              <CellMetric value="€2.10"   sentiment="neutral"  width={100} />
              <CellMetric value="+0.8%"   sentiment="positive" width={120} />
              <CellAction action="view"   width={72} />
            </RowBase>
          </div>

          {/* Code snippet */}
          <div style={{
            background: '#0F0F12', borderRadius: 8, padding: 20,
            fontFamily: 'monospace', fontSize: 12, color: T.white60,
            lineHeight: 1.7, overflow: 'auto',
          }}>
            <pre style={{ margin: 0 }}>{`// Any column set — RowBase handles state, you compose the cells
<RowBase state="default" theme="tonal" density="desktop">
  <CellText   value="Dark Roast Blend"  width={240} />
  <CellMetric value="€12.40"  sentiment="neutral"  width={100} />
  <CellMetric value="+3.2%"   sentiment="positive" width={120} />
  <CellAction action="view"              width={72}  />
</RowBase>

// Selected row — same API, RowBase handles the purple accent
<RowBase state="selected" theme="tonal" density="desktop">
  ...cells...
</RowBase>

// Loading row — pass column widths, RowBase renders skeletons
<RowBase state="loading" theme="tonal" density="desktop"
  skeletonWidths={[240, 100, 120, 72]}>
</RowBase>`}
            </pre>
          </div>
        </Card>

      </div>
    </div>
  );
}
