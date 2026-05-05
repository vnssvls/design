import React, { useState, useRef } from 'react';
import { T, Density, Theme, RowState, Sentiment, SortDir, StatusDisplay, HealthSentiment, ActionType } from './tokens';
import {
  CellText, CellMetric, CellStatus, CellHealth, CellAction,
  HeaderCell, RowBase, RowDivider, RowSectionDivider, RowEmptyState,
} from './components';

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

// ─── ShowcaseCard ─────────────────────────────────────────────────────────────
//
// Storybook-style variant viewer. Each variant has a label, a preview node,
// and a code string. Clicking a variant tab switches the preview and code panel.
// The code panel is collapsible.

interface ShowcaseVariant {
  label: string;
  preview: React.ReactNode;
  code: string;
}

function ShowcaseCard({ title, variants, previewBg }: {
  title: string;
  variants: ShowcaseVariant[];
  previewBg?: string;
}) {
  const [active, setActive] = useState(0);
  const [codeOpen, setCodeOpen] = useState(false);

  const v = variants[active];

  return (
    <Card>
      <SectionLabel>{title}</SectionLabel>

      {/* Variant tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {variants.map((vv, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setCodeOpen(false); }}
            style={{
              padding: '4px 10px', borderRadius: 4,
              border: `1px solid ${i === active ? T.purple : T.rowDivider}`,
              background: i === active ? 'rgba(187,134,252,0.1)' : 'transparent',
              color: i === active ? T.purple : T.white60,
              fontSize: 11, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
              transition: 'all 120ms ease',
            }}
          >
            {vv.label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div style={{
        background: previewBg ?? T.headerTonal, borderRadius: 8,
        padding: 16, marginBottom: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 58,
      }}>
        {v.preview}
      </div>

      {/* Code toggle */}
      <button
        onClick={() => setCodeOpen(o => !o)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          color: T.white30, fontSize: 11, fontFamily: 'Inter, sans-serif',
          display: 'flex', alignItems: 'center', gap: 4,
        }}
      >
        <span style={{ transform: codeOpen ? 'rotate(90deg)' : 'none', display: 'inline-block', transition: 'transform 120ms ease' }}>▶</span>
        {codeOpen ? 'hide code' : 'show code'}
      </button>

      {codeOpen && (
        <div style={{
          marginTop: 10,
          background: '#0F0F12', borderRadius: 8, padding: 16,
          fontFamily: 'monospace', fontSize: 12, color: T.white60,
          lineHeight: 1.7, overflow: 'auto',
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{v.code}</pre>
        </div>
      )}
    </Card>
  );
}

// ─── Column definitions ───────────────────────────────────────────────────────
//
// sortable: true = clicking the header cycles none → asc → desc → none
// resizable: true = drag handle appears at right edge of header cell

interface ColDef {
  key: string;
  label: string;
  width: number;
  minWidth?: number; // minimum resize width — based on widest cell content
  align: 'left' | 'center';
  sortable?: boolean;
  resizable?: boolean;
  grow?: boolean;
}

const COLS_DESKTOP: ColDef[] = [
  { key: 'name',     label: 'Name',     width: 220, minWidth: 120, align: 'left',   sortable: true,  resizable: true,  grow: true  },
  { key: 'value',    label: 'Value',    width: 100, minWidth: 80,  align: 'left',   sortable: true,  resizable: true,  grow: true  },
  { key: 'category', label: 'Category', width: 120, minWidth: 80,  align: 'left',   sortable: false, resizable: true,  grow: true  },
  { key: 'status',   label: 'Status',   width: 160, minWidth: 140, align: 'left',   sortable: false, resizable: true,  grow: true  },
  { key: 'health',   label: 'Health',   width: 90,                 align: 'center', sortable: false, resizable: false, grow: false },
  { key: 'action',   label: '',         width: 72,                 align: 'center', sortable: false, resizable: false, grow: false },
];

// When resizable is on, fixed pixel widths are needed so drag produces exact sizes.
// When off, growable columns flex to fill the container.
function colFlex(col: ColDef, isResizable: boolean): string {
  if (isResizable || col.grow === false) return `0 0 ${col.width}px`;
  return `1 0 ${col.width}px`;
}

const COLS_TABLET: ColDef[] = COLS_DESKTOP
  .filter(c => c.key !== 'category')
  .map(c => c.key === 'name' ? { ...c, width: 200 } : c);

// ─── Demo data ────────────────────────────────────────────────────────────────

interface RowData {
  id: number;
  name: string;
  value: string;
  valueSortKey: number;
  sentiment: Sentiment;
  category: string;
  status: StatusDisplay;
  progress: number;
  health: HealthSentiment;
  action: ActionType;
}

const DATA_ROWS: RowData[] = [
  { id: 1, name: 'Alpha Studio', value: '22.5%', valueSortKey: 22.5, sentiment: 'positive', category: 'Type A', status: 'complete',    progress: 100, health: 'good',    action: 'download' },
  { id: 2, name: 'Beta Works',   value: '18.2%', valueSortKey: 18.2, sentiment: 'warning',  category: 'Type B', status: 'in-progress', progress: 65,  health: 'warning', action: 'view'     },
  { id: 3, name: 'Gamma Co',     value: '-4.1%', valueSortKey: -4.1, sentiment: 'negative', category: 'Type A', status: 'in-progress', progress: 0,   health: 'bad',     action: 'download' },
  { id: 4, name: 'Delta Lab',    value: '31.0%', valueSortKey: 31.0, sentiment: 'positive', category: 'Type C', status: 'complete',    progress: 100, health: 'good',    action: 'open'     },
];

const EMPTY_ROWS: RowData[] = [
  { id: 5, name: 'Epsilon Ltd',  value: '', valueSortKey: 0, sentiment: 'neutral', category: 'Type B', status: 'incomplete', progress: 0, health: 'bad', action: 'view' },
  { id: 6, name: 'Zeta Group',   value: '', valueSortKey: 0, sentiment: 'neutral', category: 'Type A', status: 'incomplete', progress: 0, health: 'bad', action: 'view' },
];

// ─── Sort helpers ─────────────────────────────────────────────────────────────

function sortRows(rows: RowData[], key: string, dir: SortDir): RowData[] {
  if (dir === 'none' || !key) return rows;
  return [...rows].sort((a, b) => {
    let va: string | number = key === 'value' ? (a as any).valueSortKey : (a as any)[key] ?? '';
    let vb: string | number = key === 'value' ? (b as any).valueSortKey : (b as any)[key] ?? '';
    const cmp = typeof va === 'number' && typeof vb === 'number'
      ? va - vb
      : String(va).localeCompare(String(vb));
    return dir === 'asc' ? cmp : -cmp;
  });
}

// ─── Table components ─────────────────────────────────────────────────────────

function TableHeader({
  cols, theme, density, sortKey, sortDir, onSort, resizable, onResizeStart,
}: {
  cols: ColDef[];
  theme: Theme;
  density: Density;
  sortKey?: string | null;
  sortDir?: SortDir;
  onSort?: (key: string) => void;
  resizable?: boolean;
  onResizeStart?: (key: string, e: React.MouseEvent) => void;
}) {
  const bg = theme === 'grey' ? T.surfaceGrey : T.headerTonal;
  return (
    <div style={{
      display: 'flex', background: bg,
      width: '100%',
      borderBottom: '0.5px solid rgba(255,255,255,0.1)',
    }}>
      {cols.map(col => (
        <HeaderCell
          key={col.key}
          label={col.label}
          sort={col.sortable ? (col.key === sortKey ? (sortDir ?? 'none') : 'none') : undefined}
          align={col.align}
          width={col.width}
          density={density}
          flex={colFlex(col, resizable ?? false)}
          onSort={col.sortable ? () => onSort?.(col.key) : undefined}
          onResizeStart={
            resizable && col.resizable && onResizeStart
              ? (e) => onResizeStart(col.key, e)
              : undefined
          }
        />
      ))}
    </div>
  );
}

function TableDataRow({
  row, cols, rowState, theme, density, resizable,
}: {
  row: RowData;
  cols: ColDef[];
  rowState: RowState;
  theme: Theme;
  density: Density;
  resizable?: boolean;
}) {
  const isEmpty = rowState === 'empty';
  const skeletonWidths = cols.map(c => c.width);

  return (
    <RowBase state={rowState} theme={theme} density={density} skeletonWidths={skeletonWidths}>
      {cols.map(col => {
        const flex = colFlex(col, resizable ?? false);
        if (col.key === 'name')     return <CellText    key="name"   value={row.name}   empty={isEmpty} width={col.width} density={density} flex={flex} />;
        if (col.key === 'value')    return <CellMetric  key="value"  value={row.value}  sentiment={isEmpty ? 'neutral' : row.sentiment} empty={isEmpty || !row.value} width={col.width} density={density} flex={flex} />;
        if (col.key === 'category') return <CellText    key="cat"    value={row.category} empty={isEmpty} width={col.width} density={density} flex={flex} />;
        if (col.key === 'status')   return <CellStatus  key="status" display={isEmpty ? 'empty' : row.status} progress={row.progress} density={density} width={col.width} flex={flex} />;
        if (col.key === 'health')   return <CellHealth  key="health" sentiment={row.health} empty={isEmpty} width={col.width} density={density} flex={flex} />;
        if (col.key === 'action')   return <CellAction  key="action" action={row.action} width={col.width} density={density} flex={flex} />;
        return null;
      })}
    </RowBase>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  // Live table controls
  const [theme,       setTheme]       = useState<Theme>('tonal');
  const [density,     setDensity]     = useState<Density>('desktop');
  const [showEmpty,   setShowEmpty]   = useState(true);
  const [sectionOpen, setSectionOpen] = useState(true);
  const [rowStates,   setRowStates]   = useState<Record<number, RowState>>(
    { 1: 'default', 2: 'default', 3: 'default', 4: 'default' }
  );

  // Sort
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('none');

  // Resizable columns
  const [resizable,  setResizable]  = useState(false);
  const [colWidths,  setColWidths]  = useState<Record<string, number>>(
    Object.fromEntries(COLS_DESKTOP.map(c => [c.key, c.width]))
  );
  const dragRef = useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  // Cell section controls
  const [cellDensity,  setCellDensity]  = useState<Density>('desktop');
  const [testProgress, setTestProgress] = useState(65);

  // Derive cols with dynamic widths
  const baseCols = density === 'tablet' ? COLS_TABLET : COLS_DESKTOP;
  const cols = baseCols.map(c => ({ ...c, width: colWidths[c.key] ?? c.width }));
  const tableBg = theme === 'grey' ? T.surfaceGrey : T.grey2;

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else {
      const next: SortDir = sortDir === 'asc' ? 'desc' : sortDir === 'desc' ? 'none' : 'asc';
      setSortDir(next);
      if (next === 'none') setSortKey(null);
    }
  }

  function handleResizeStart(key: string, e: React.MouseEvent) {
    e.preventDefault();
    const startWidth = colWidths[key] ?? 100;
    const col = COLS_DESKTOP.find(c => c.key === key);
    const minWidth = col?.minWidth ?? 60;
    dragRef.current = { key, startX: e.clientX, startWidth };

    function onMove(ev: MouseEvent) {
      if (!dragRef.current) return;
      const newWidth = Math.max(minWidth, dragRef.current.startWidth + ev.clientX - dragRef.current.startX);
      setColWidths(prev => ({ ...prev, [dragRef.current!.key]: newWidth }));
    }

    function onUp() {
      dragRef.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  function cycleRowState(id: number) {
    const order: RowState[] = ['default', 'hover', 'selected', 'loading', 'empty'];
    setRowStates(prev => {
      const current = prev[id] ?? 'default';
      const next = order[(order.indexOf(current) + 1) % order.length];
      return { ...prev, [id]: next };
    });
  }

  const sortedData = sortRows(DATA_ROWS, sortKey ?? '', sortDir);

  return (
    <div style={{ background: T.bg, minHeight: '100vh', padding: '40px 40px 80px', fontFamily: 'Inter, sans-serif' }}>

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
          Click a row to cycle its state. Click a sortable column header to sort. Enable resizable to drag column widths.
        </p>

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
            <ControlRow label="resizable">
              <ToggleBtn active={resizable} onClick={() => setResizable(v => !v)}>
                {resizable ? 'on' : 'off'}
              </ToggleBtn>
              {resizable && (
                <button
                  onClick={() => setColWidths(Object.fromEntries(COLS_DESKTOP.map(c => [c.key, c.width])))}
                  style={{
                    padding: '5px 12px', borderRadius: 6, border: `1px solid ${T.rowDivider}`,
                    background: 'transparent', color: T.white30,
                    fontSize: 12, fontFamily: 'Inter, sans-serif', cursor: 'pointer',
                  }}
                >
                  reset widths
                </button>
              )}
            </ControlRow>
            <ControlRow label="row states">
              <span style={{ fontSize: 12, color: T.white30, fontFamily: 'Inter, sans-serif' }}>
                Click any data row to cycle: default → hover → selected → loading → empty
              </span>
            </ControlRow>
          </div>
        </Card>

        {resizable && (
          <p style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', marginBottom: 8, marginTop: -8 }}>
            Drag the handle at the right edge of Name, Value, Category, or Status headers to resize.
            Min widths: Name 120px · Value 80px · Category 80px · Status 140px.
          </p>
        )}

        <div style={{
          background: tableBg, borderRadius: 12,
          border: `1px solid ${T.rowDivider}`,
          overflowX: 'auto', marginBottom: 48,
        }}>
          <TableHeader
            cols={cols}
            theme={theme}
            density={density}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
            resizable={resizable}
            onResizeStart={handleResizeStart}
          />
          {sortedData.map(row => (
            <TableDataRow
              key={row.id}
              row={row}
              cols={cols}
              rowState={rowStates[row.id] ?? 'default'}
              theme={theme}
              density={density}
              resizable={resizable}
            />
          ))}
          {showEmpty && (
            <>
              <RowDivider />
              <RowSectionDivider
                label={`${EMPTY_ROWS.length} incomplete`}
                expanded={sectionOpen}
                density={density}
                showWarning={true}
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
                  resizable={resizable}
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
          <ShowcaseCard
            title="CellText — align × empty"
            variants={[
              {
                label: 'left, value',
                preview: <CellText value="Sample text" align="left" width={200} density={cellDensity} />,
                code: `<CellText value="Sample text" align="left" width={200} density="${cellDensity}" />`,
              },
              {
                label: 'center, value',
                preview: <CellText value="Sample text" align="center" width={200} density={cellDensity} />,
                code: `<CellText value="Sample text" align="center" width={200} density="${cellDensity}" />`,
              },
              {
                label: 'left, empty',
                preview: <CellText value="Sample text" align="left" empty width={200} density={cellDensity} />,
                code: `<CellText value="Sample text" align="left" empty width={200} density="${cellDensity}" />\n// empty=true renders an em dash regardless of value`,
              },
              {
                label: 'flex grow',
                preview: (
                  <div style={{ width: '100%', display: 'flex' }}>
                    <CellText value="Grows to fill" align="left" width={120} density={cellDensity} flex="1 0 120px" />
                  </div>
                ),
                code: `// flex prop switches from fixed-width to growable\n<CellText value="Grows to fill" align="left" width={120} flex="1 0 120px" density="${cellDensity}" />`,
              },
            ]}
          />

          {/* CellMetric */}
          <ShowcaseCard
            title="CellMetric — sentiment × empty"
            variants={[
              {
                label: 'positive',
                preview: <CellMetric value="22.5%" sentiment="positive" width={160} density={cellDensity} />,
                code: `<CellMetric value="22.5%" sentiment="positive" width={160} density="${cellDensity}" />`,
              },
              {
                label: 'negative',
                preview: <CellMetric value="-4.1%" sentiment="negative" width={160} density={cellDensity} />,
                code: `<CellMetric value="-4.1%" sentiment="negative" width={160} density="${cellDensity}" />`,
              },
              {
                label: 'warning',
                preview: <CellMetric value="18.2%" sentiment="warning" width={160} density={cellDensity} />,
                code: `<CellMetric value="18.2%" sentiment="warning" width={160} density="${cellDensity}" />`,
              },
              {
                label: 'neutral',
                preview: <CellMetric value="€12.40" sentiment="neutral" width={160} density={cellDensity} />,
                code: `<CellMetric value="€12.40" sentiment="neutral" width={160} density="${cellDensity}" />`,
              },
              {
                label: 'empty',
                preview: <CellMetric value="22.5%" empty width={160} density={cellDensity} />,
                code: `// empty=true renders an em dash, ignores value\n<CellMetric value="22.5%" empty width={160} density="${cellDensity}" />`,
              },
            ]}
          />

          {/* CellStatus */}
          <ShowcaseCard
            title="CellStatus — display × density"
            variants={[
              {
                label: 'complete',
                preview: <CellStatus display="complete" progress={100} density={cellDensity} width={200} />,
                code: `<CellStatus display="complete" progress={100} density="${cellDensity}" width={200} />`,
              },
              {
                label: 'in-progress 65%',
                preview: <CellStatus display="in-progress" progress={65} density={cellDensity} width={200} />,
                code: `<CellStatus display="in-progress" progress={65} density="${cellDensity}" width={200} />`,
              },
              {
                label: 'in-progress 0%',
                preview: <CellStatus display="in-progress" progress={0} density={cellDensity} width={200} />,
                code: `// 0% renders in danger red — no count started yet\n<CellStatus display="in-progress" progress={0} density="${cellDensity}" width={200} />`,
              },
              {
                label: 'incomplete',
                preview: <CellStatus display="incomplete" progress={0} density={cellDensity} width={200} />,
                code: `// incomplete: dot + text only, no pill bg\n<CellStatus display="incomplete" progress={0} density="${cellDensity}" width={200} />`,
              },
              {
                label: 'empty',
                preview: <CellStatus display="empty" progress={0} density={cellDensity} width={200} />,
                code: `// empty: em dash\n<CellStatus display="empty" progress={0} density="${cellDensity}" width={200} />`,
              },
            ]}
          />

          {/* CellHealth + CellAction */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ShowcaseCard
              title="CellHealth — sentiment"
              variants={[
                {
                  label: 'good',
                  preview: <CellHealth sentiment="good" width={90} density={cellDensity} />,
                  code: `<CellHealth sentiment="good" width={90} density="${cellDensity}" />`,
                },
                {
                  label: 'warning',
                  preview: <CellHealth sentiment="warning" width={90} density={cellDensity} />,
                  code: `<CellHealth sentiment="warning" width={90} density="${cellDensity}" />`,
                },
                {
                  label: 'bad',
                  preview: <CellHealth sentiment="bad" width={90} density={cellDensity} />,
                  code: `<CellHealth sentiment="bad" width={90} density="${cellDensity}" />`,
                },
                {
                  label: 'empty',
                  preview: <CellHealth sentiment="good" empty width={90} density={cellDensity} />,
                  code: `<CellHealth sentiment="good" empty width={90} density="${cellDensity}" />`,
                },
              ]}
            />
            <ShowcaseCard
              title="CellAction — action"
              variants={[
                {
                  label: 'download',
                  preview: <CellAction action="download" width={72} density={cellDensity} />,
                  code: `<CellAction action="download" width={72} density="${cellDensity}" />`,
                },
                {
                  label: 'open',
                  preview: <CellAction action="open" width={72} density={cellDensity} />,
                  code: `<CellAction action="open" width={72} density="${cellDensity}" />`,
                },
                {
                  label: 'view',
                  preview: <CellAction action="view" width={72} density={cellDensity} />,
                  code: `<CellAction action="view" width={72} density="${cellDensity}" />`,
                },
              ]}
            />
          </div>

        </div>

        <Divider />

        {/* ══════ HEADER CELL ══════ */}
        <H2>HeaderCell — sort × align × hover</H2>
        <p style={{ color: T.white60, fontSize: 13, marginBottom: 16, fontFamily: 'Inter, sans-serif', marginTop: -8 }}>
          Hover any cell to see the state change. Sortable columns show the sort icon on hover.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          <ShowcaseCard
            title="HeaderCell — sort direction"
            variants={[
              {
                label: 'sort=none',
                preview: (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <HeaderCell label="Column" sort="none" align="left" width={200} onSort={() => {}} />
                  </div>
                ),
                code: `// sort=none: icon visible but inactive\n<HeaderCell label="Column" sort="none" align="left" width={200} onSort={() => {}} />`,
              },
              {
                label: 'sort=asc',
                preview: (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <HeaderCell label="Column" sort="asc" align="left" width={200} onSort={() => {}} />
                  </div>
                ),
                code: `<HeaderCell label="Column" sort="asc" align="left" width={200} onSort={() => handleSort('key')} />`,
              },
              {
                label: 'sort=desc',
                preview: (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <HeaderCell label="Column" sort="desc" align="left" width={200} onSort={() => {}} />
                  </div>
                ),
                code: `<HeaderCell label="Column" sort="desc" align="left" width={200} onSort={() => handleSort('key')} />`,
              },
              {
                label: 'not sortable',
                preview: (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <HeaderCell label="Column" align="left" width={200} />
                  </div>
                ),
                code: `// omit sort prop entirely to hide the sort icon\n<HeaderCell label="Column" align="left" width={200} />`,
              },
              {
                label: 'center align',
                preview: (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <HeaderCell label="Health" sort="none" align="center" width={200} onSort={() => {}} />
                  </div>
                ),
                code: `<HeaderCell label="Health" sort="none" align="center" width={200} onSort={() => {}} />`,
              },
              {
                label: 'resizable',
                preview: (
                  <div style={{ display: 'flex', width: '100%' }}>
                    <HeaderCell label="Name" sort="none" align="left" width={200} onSort={() => {}} onResizeStart={() => {}} />
                  </div>
                ),
                code: `// onResizeStart presence renders the 8px drag handle at right edge\n<HeaderCell label="Name" sort="none" align="left" width={220}\n  onSort={() => handleSort('name')}\n  onResizeStart={(e) => handleResizeStart('name', e)} />`,
              },
            ]}
          />

          <ShowcaseCard
            title="HeaderCell — all sort states side by side"
            previewBg={T.headerTonal}
            variants={[
              {
                label: 'left align',
                preview: (
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {(['none', 'asc', 'desc'] as SortDir[]).map(sort => (
                      <div key={sort} style={{ display: 'flex', borderBottom: `0.5px solid ${T.rowDivider}` }}>
                        <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 56, padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                          {sort}
                        </span>
                        <HeaderCell label="Column" sort={sort} align="left" width={160} onSort={() => {}} />
                      </div>
                    ))}
                  </div>
                ),
                code: `{(['none', 'asc', 'desc'] as SortDir[]).map(sort => (\n  <HeaderCell key={sort} label="Column" sort={sort} align="left"\n    width={160} onSort={() => handleSort('key')} />\n))}`,
              },
              {
                label: 'center align',
                preview: (
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {(['none', 'asc', 'desc'] as SortDir[]).map(sort => (
                      <div key={sort} style={{ display: 'flex', borderBottom: `0.5px solid ${T.rowDivider}` }}>
                        <span style={{ fontSize: 11, color: T.white30, fontFamily: 'Inter, sans-serif', minWidth: 56, padding: '0 12px', display: 'flex', alignItems: 'center' }}>
                          {sort}
                        </span>
                        <HeaderCell label="Column" sort={sort} align="center" width={160} onSort={() => {}} />
                      </div>
                    ))}
                  </div>
                ),
                code: `{(['none', 'asc', 'desc'] as SortDir[]).map(sort => (\n  <HeaderCell key={sort} label="Column" sort={sort} align="center"\n    width={160} onSort={() => handleSort('key')} />\n))}`,
              },
            ]}
          />
        </div>

        <Divider />

        {/* ══════ ROW STATES ══════ */}
        <H2>Row states</H2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>

          <ShowcaseCard
            title="RowBase — states (tonal)"
            previewBg={T.headerTonal}
            variants={([
              ['default',  'tonal'],
              ['hover',    'tonal'],
              ['selected', 'tonal'],
              ['loading',  'tonal'],
              ['empty',    'tonal'],
            ] as [RowState, Theme][]).map(([s, th]) => ({
              label: s,
              preview: (
                <RowBase state={s} theme={th as Theme} density="desktop" skeletonWidths={[160, 120, 80]}>
                  <CellText value="Row content" width={160} />
                  <CellMetric value="22.5%" sentiment="positive" width={120} />
                  <CellHealth sentiment="good" width={80} />
                </RowBase>
              ),
              code: `<RowBase state="${s}" theme="tonal" density="desktop"\n  skeletonWidths={[160, 120, 80]}>\n  <CellText value="Row content" width={160} />\n  <CellMetric value="22.5%" sentiment="positive" width={120} />\n  <CellHealth sentiment="good" width={80} />\n</RowBase>`,
            }))}
          />

          <ShowcaseCard
            title="RowBase — theme comparison"
            variants={([
              ['tonal', 'default'],
              ['tonal', 'hover'],
              ['tonal', 'selected'],
              ['grey',  'default'],
              ['grey',  'hover'],
              ['grey',  'selected'],
            ] as [Theme, RowState][]).map(([th, s]) => ({
              label: `${th} / ${s}`,
              preview: (
                <div style={{ background: th === 'grey' ? T.surfaceGrey : T.headerTonal, width: '100%', borderRadius: 6, overflow: 'hidden' }}>
                  <RowBase state={s} theme={th} density="desktop">
                    <CellText value="Row content" width={160} />
                    <CellMetric value="22.5%" sentiment="positive" width={120} />
                    <CellHealth sentiment="good" width={80} />
                  </RowBase>
                </div>
              ),
              code: `<RowBase state="${s}" theme="${th}" density="desktop">\n  <CellText value="Row content" width={160} />\n  <CellMetric value="22.5%" sentiment="positive" width={120} />\n  <CellHealth sentiment="good" width={80} />\n</RowBase>`,
            }))}
          />

        </div>

        {/* Section divider + empty state */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 48 }}>
          <ShowcaseCard
            title="RowSectionDivider"
            previewBg={T.headerTonal}
            variants={[
              {
                label: 'expanded',
                preview: <RowSectionDivider label="3 no data" expanded={true} density="desktop" />,
                code: `<RowSectionDivider label="3 no data" expanded={true} density="desktop" onToggle={() => setOpen(v => !v)} />`,
              },
              {
                label: 'collapsed',
                preview: <RowSectionDivider label="3 no data" expanded={false} density="desktop" />,
                code: `<RowSectionDivider label="3 no data" expanded={false} density="desktop" onToggle={() => setOpen(v => !v)} />`,
              },
              {
                label: 'warning',
                preview: <RowSectionDivider label="2 incomplete" expanded={true} density="desktop" showWarning={true} />,
                code: `// showWarning renders an orange warning icon before the label\n<RowSectionDivider label="2 incomplete" expanded={true} density="desktop"\n  showWarning={true} onToggle={() => setOpen(v => !v)} />`,
              },
              {
                label: 'tablet',
                preview: <RowSectionDivider label="2 incomplete" expanded={true} density="tablet" showWarning={true} />,
                code: `// tablet: 32px left indent (vs 40px on desktop)\n<RowSectionDivider label="2 incomplete" expanded={true} density="tablet"\n  showWarning={true} onToggle={() => setOpen(v => !v)} />`,
              },
            ]}
          />
          <ShowcaseCard
            title="RowEmptyState — density variants"
            previewBg={T.headerTonal}
            variants={(['desktop', 'tablet', 'mobile'] as Density[]).map(d => ({
              label: d,
              preview: <RowEmptyState density={d} />,
              code: `<RowEmptyState density="${d}" />\n\n// Custom labels:\n<RowEmptyState density="${d}"\n  primaryLabel="No locations for this period"\n  secondaryLabel="Try a different date range or filter"\n  showSecondary={true} />`,
            }))}
          />
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

          <div style={{
            background: T.headerTonal, borderRadius: 8, overflow: 'hidden',
            border: `1px solid ${T.rowDivider}`, marginBottom: 20,
          }}>
            <div style={{ display: 'flex', borderBottom: '0.5px solid rgba(255,255,255,0.1)' }}>
              <HeaderCell label="Product" sort="none" align="left"   width={240} />
              <HeaderCell label="Price"   sort="asc"  align="left"   width={100} onSort={() => {}} />
              <HeaderCell label="Change"  sort="none" align="left"   width={120} onSort={() => {}} />
              <HeaderCell label=""        sort="none" align="center" width={72}  />
            </div>
            <RowBase state="default" theme="tonal" density="desktop">
              <CellText   value="Dark Roast Blend" width={240} />
              <CellMetric value="€12.40" sentiment="neutral"  width={100} />
              <CellMetric value="+3.2%"  sentiment="positive" width={120} />
              <CellAction action="view"  width={72} />
            </RowBase>
            <RowBase state="default" theme="tonal" density="desktop">
              <CellText   value="House Red Wine"   width={240} />
              <CellMetric value="€18.90" sentiment="neutral"  width={100} />
              <CellMetric value="-1.5%"  sentiment="negative" width={120} />
              <CellAction action="view"  width={72} />
            </RowBase>
            <RowBase state="selected" theme="tonal" density="desktop">
              <CellText   value="Chicken Breast"   width={240} />
              <CellMetric value="€8.20"  sentiment="neutral"  width={100} />
              <CellMetric value="+12.1%" sentiment="warning"  width={120} />
              <CellAction action="download" width={72} />
            </RowBase>
            <RowBase state="default" theme="tonal" density="desktop">
              <CellText   value="Fresh Basil"      width={240} />
              <CellMetric value="€2.10"  sentiment="neutral"  width={100} />
              <CellMetric value="+0.8%"  sentiment="positive" width={120} />
              <CellAction action="view"  width={72} />
            </RowBase>
          </div>

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

// Sortable column header — onSort fires when the header is clicked
<HeaderCell label="Price" sort="asc" align="left" width={100}
  onSort={() => handleSort('price')} />

// Resizable column header — onResizeStart enables the drag handle
<HeaderCell label="Name" sort="none" align="left" width={220}
  onResizeStart={(e) => handleResizeStart('name', e)} />

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
