import React, { useState, useRef, useEffect } from 'react';
import { DropdownTrigger, TriggerType, TriggerMode, TriggerState } from './DropdownTrigger';
import { DropdownMenu, MenuType, MenuItemData } from './DropdownMenu';
import { ItemRow, ItemRowType, ItemRowState, CheckboxPosition, ItemRowTheme } from './ItemRow';

// ─── Tokens ────────────────────────────────────────────────────────────────────

const T = {
  bg: '#0A0A0F',
  surface: '#181818',
  surfaceElevated: '#1C1C26',
  border: 'rgba(255,255,255,0.07)',
  textPrimary: 'rgba(255,255,255,0.88)',
  textSecondary: 'rgba(255,255,255,0.5)',
  purple: '#BB86FC',
};

// ─── Section wrapper ───────────────────────────────────────────────────────────

const Section: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <section style={{ marginBottom: 80 }}>
    <div style={{ marginBottom: 32 }}>
      <h2
        style={{
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          fontWeight: 600,
          color: T.textPrimary,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: '6px 0 0',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: T.textSecondary,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </section>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span
    style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: 11,
      fontWeight: 500,
      color: T.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }}
  >
    {children}
  </span>
);

const DemoCard: React.FC<{ children: React.ReactNode; minHeight?: number }> = ({
  children,
  minHeight,
}) => (
  <div
    style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 12,
      padding: 24,
      minHeight,
    }}
  >
    {children}
  </div>
);

// ─── Sample data ───────────────────────────────────────────────────────────────

const CATEGORY_ITEMS: MenuItemData[] = [
  { id: 'food', label: 'Food', count: 48 },
  { id: 'drinks', label: 'Drinks', count: 32 },
  { id: 'beer', label: 'Beer', count: 18 },
  { id: 'wine', label: 'Wine', count: 24 },
  { id: 'spirits', label: 'Spirits', count: 15 },
  { id: 'sodas', label: 'Sodas', count: 8 },
];

const LOCATION_ITEMS: MenuItemData[] = [
  { id: 'oslo', label: 'Oslo — Grünerløkka', count: 4 },
  { id: 'bergen', label: 'Bergen — Bryggen', count: 3 },
  { id: 'stavanger', label: 'Stavanger — Sentrum', count: 2 },
  { id: 'trondheim', label: 'Trondheim — Midtbyen', count: 5 },
  { id: 'tromsoe', label: 'Tromsø — Storgata', count: 1 },
];

const PERIOD_ITEMS: MenuItemData[] = [
  { id: 'this-month', label: 'This month' },
  { id: 'last-month', label: 'Last month' },
  { id: 'last-3m', label: 'Last 3 months' },
  { id: 'last-6m', label: 'Last 6 months' },
  { id: 'this-year', label: 'This year' },
  { id: 'custom', label: 'Custom range' },
];

const ARTICLE_ITEMS: MenuItemData[] = [
  { id: 'salmon', label: 'Atlantic Salmon' },
  { id: 'beef', label: 'Beef Tenderloin' },
  { id: 'chicken', label: 'Chicken Breast' },
  { id: 'pork', label: 'Pork Belly' },
  { id: 'pasta', label: 'Fresh Pasta' },
  { id: 'truffle', label: 'Black Truffle' },
  { id: 'butter', label: 'Cultured Butter' },
  { id: 'cream', label: 'Heavy Cream' },
  { id: 'wine-r', label: 'Red Wine (cooking)' },
];

// ─── Section 1: Trigger showcase ──────────────────────────────────────────────

const TRIGGER_TYPES: TriggerType[] = ['Category', 'Location', 'Calendar'];
const TRIGGER_STATES: TriggerState[] = ['rest', 'active'];
const TRIGGER_MODES: TriggerMode[] = ['with-label', 'icon-only'];

const TriggerShowcase: React.FC = () => (
  <Section
    title="dropdown.trigger"
    subtitle="12 variants — type × state × mode"
  >
    <DemoCard>
      <div style={{ display: 'grid', rowGap: 32 }}>
        {TRIGGER_MODES.map((mode) => (
          <div key={mode}>
            <div style={{ marginBottom: 16 }}>
              <Label>mode: {mode}</Label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 24 }}>
              {TRIGGER_TYPES.map((type) =>
                TRIGGER_STATES.map((state) => (
                  <div key={`${type}-${state}-${mode}`} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <Label>
                      {type} / {state}
                    </Label>
                    <DropdownTrigger
                      type={type}
                      state={state}
                      mode={mode}
                      locationCount={type === 'Location' && state === 'active' ? 3 : undefined}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </DemoCard>
  </Section>
);

// ─── Section 2: Menu showcase ──────────────────────────────────────────────────

const MENU_TYPES: { type: MenuType; label: string; items: MenuItemData[] }[] = [
  { type: 'multi-select filter', label: 'multi-select filter', items: CATEGORY_ITEMS },
  { type: 'multi-select location', label: 'multi-select location', items: LOCATION_ITEMS },
  { type: 'list', label: 'list', items: PERIOD_ITEMS },
  { type: 'multi-select articles', label: 'multi-select articles', items: ARTICLE_ITEMS },
];

const MenuShowcase: React.FC = () => {
  const [selections, setSelections] = useState<Record<string, Set<string>>>({
    'multi-select filter': new Set(['food', 'drinks']),
    'multi-select location': new Set(['oslo', 'bergen']),
    'list': new Set(),
    'multi-select articles': new Set(['salmon', 'beef']),
  });

  const toggle = (menuType: string, id: string) => {
    setSelections((prev) => {
      const next = new Set(prev[menuType]);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { ...prev, [menuType]: next };
    });
  };

  const deselectAll = (menuType: string) => {
    setSelections((prev) => ({ ...prev, [menuType]: new Set() }));
  };

  return (
    <Section
      title="dropdown.menu"
      subtitle="4 variants — interactive item rows"
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        {MENU_TYPES.map(({ type, label, items }) => (
          <div key={type} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Label>{label}</Label>
            <DropdownMenu
              type={type}
              items={items}
              selectedIds={selections[type]}
              onToggle={(id) => toggle(type, id)}
              onDeselectAll={() => deselectAll(type)}
              onSelectItem={(id) => {
                setSelections((prev) => ({ ...prev, [type]: new Set([id]) }));
              }}
            />
          </div>
        ))}
      </div>
    </Section>
  );
};

// ─── Section 3: item.row variants ─────────────────────────────────────────────

const ROW_TYPES: ItemRowType[] = ['Category', 'Location', 'List Item', 'Date period'];
const ROW_STATES: ItemRowState[] = ['default', 'hover', 'selected', 'disabled'];
const ROW_CHECKBOXES: CheckboxPosition[] = ['leading', 'trailing', 'none'];

const ItemRowShowcase: React.FC = () => {
  const [theme, setTheme] = useState<ItemRowTheme>('tonal');

  return (
    <Section
      title="item.row"
      subtitle="40 variants — type × state × checkbox × indented × theme"
    >
      <div style={{ marginBottom: 20, display: 'flex', gap: 8 }}>
        {(['tonal', 'grey'] as ItemRowTheme[]).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 12,
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: 6,
              border: `1px solid ${theme === t ? T.purple : T.border}`,
              background: theme === t ? 'rgba(187,134,252,0.12)' : 'transparent',
              color: theme === t ? T.purple : T.textSecondary,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <DemoCard>
        <div style={{ display: 'grid', gap: 32 }}>
          {ROW_TYPES.map((type) => (
            <div key={type}>
              <div style={{ marginBottom: 12 }}>
                <Label>type: {type}</Label>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 16,
                }}
              >
                {ROW_STATES.map((state) =>
                  ROW_CHECKBOXES.map((checkbox) => {
                    const key = `${type}-${state}-${checkbox}`;
                    const isChecked = state === 'selected';
                    return (
                      <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <Label>
                          {state} / {checkbox}
                        </Label>
                        <div
                          style={{
                            background: '#0F0F12',
                            borderRadius: 6,
                            overflow: 'hidden',
                            width: 220,
                          }}
                        >
                          <ItemRow
                            type={type}
                            state={state}
                            checkbox={checkbox}
                            theme={theme}
                            label={type === 'Date period' ? 'This month' : type === 'Location' ? 'Oslo — Grünerløkka' : type}
                            count={type === 'Category' ? 24 : undefined}
                            checked={isChecked}
                          />
                          {type === 'Category' && (
                            <ItemRow
                              type={type}
                              state={state}
                              checkbox={checkbox}
                              theme={theme}
                              label="Sub-category"
                              indented
                              checked={isChecked}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </DemoCard>
    </Section>
  );
};

// ─── Section 4: Composed dropdown ─────────────────────────────────────────────

interface ComposedState {
  open: string | null;
  categorySelection: Set<string>;
  locationSelection: Set<string>;
  period: string | null;
}

const ComposedDropdown: React.FC = () => {
  const [state, setState] = useState<ComposedState>({
    open: null,
    categorySelection: new Set(['food']),
    locationSelection: new Set(['oslo', 'bergen']),
    period: 'this-month',
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = (key: string) => {
    setState((prev) => ({ ...prev, open: prev.open === key ? null : key }));
  };

  const close = () => setState((prev) => ({ ...prev, open: null }));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const activePeriod = PERIOD_ITEMS.find((p) => p.id === state.period)?.label ?? 'This month';

  return (
    <Section
      title="Composed dropdown"
      subtitle="Click triggers to open/close menus — one open at a time"
    >
      <DemoCard minHeight={380}>
        <div ref={containerRef} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Category trigger + menu */}
          <div style={{ position: 'relative' }}>
            <DropdownTrigger
              type="Category"
              state={state.open === 'category' || state.categorySelection.size > 0 ? 'active' : 'rest'}
              label={
                state.categorySelection.size === 0
                  ? 'Category'
                  : state.categorySelection.size === 1
                  ? [...state.categorySelection][0]
                  : `${state.categorySelection.size} categories`
              }
              onClick={() => toggleOpen('category')}
            />
            {state.open === 'category' && (
              <div style={{ position: 'absolute', top: 40, left: 0, zIndex: 100 }}>
                <DropdownMenu
                  type="multi-select filter"
                  items={CATEGORY_ITEMS}
                  selectedIds={state.categorySelection}
                  onToggle={(id) =>
                    setState((prev) => {
                      const next = new Set(prev.categorySelection);
                      if (next.has(id)) next.delete(id);
                      else next.add(id);
                      return { ...prev, categorySelection: next };
                    })
                  }
                  onDeselectAll={() =>
                    setState((prev) => ({ ...prev, categorySelection: new Set() }))
                  }
                />
              </div>
            )}
          </div>

          {/* Location trigger + menu */}
          <div style={{ position: 'relative' }}>
            <DropdownTrigger
              type="Location"
              state={state.open === 'location' || state.locationSelection.size > 0 ? 'active' : 'rest'}
              label={
                state.locationSelection.size === 0
                  ? 'All locations'
                  : `${state.locationSelection.size} locations`
              }
              locationCount={state.locationSelection.size}
              onClick={() => toggleOpen('location')}
            />
            {state.open === 'location' && (
              <div style={{ position: 'absolute', top: 40, left: 0, zIndex: 100 }}>
                <DropdownMenu
                  type="multi-select location"
                  items={LOCATION_ITEMS}
                  selectedIds={state.locationSelection}
                  onToggle={(id) =>
                    setState((prev) => {
                      const next = new Set(prev.locationSelection);
                      if (next.has(id)) next.delete(id);
                      else next.add(id);
                      return { ...prev, locationSelection: next };
                    })
                  }
                  onDeselectAll={() =>
                    setState((prev) => ({ ...prev, locationSelection: new Set() }))
                  }
                />
              </div>
            )}
          </div>

          {/* Calendar trigger + menu */}
          <div style={{ position: 'relative' }}>
            <DropdownTrigger
              type="Calendar"
              state={state.open === 'calendar' ? 'active' : 'rest'}
              label={activePeriod}
              onClick={() => toggleOpen('calendar')}
            />
            {state.open === 'calendar' && (
              <div style={{ position: 'absolute', top: 40, left: 0, zIndex: 100 }}>
                <DropdownMenu
                  type="list"
                  items={PERIOD_ITEMS}
                  onSelectItem={(id) => {
                    setState((prev) => ({ ...prev, period: id }));
                    close();
                  }}
                />
              </div>
            )}
          </div>

          {/* Icon-only triggers */}
          <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
            {(['Category', 'Location', 'Calendar'] as const).map((type) => (
              <DropdownTrigger
                key={`icon-${type}`}
                type={type}
                mode="icon-only"
                state="rest"
              />
            ))}
          </div>
        </div>

        {/* Current state readout */}
        <div
          style={{
            marginTop: 32,
            padding: 16,
            background: '#0A0A0F',
            borderRadius: 8,
            border: `1px solid ${T.border}`,
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: T.textSecondary,
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: T.textPrimary, display: 'block', marginBottom: 6 }}>
            Current selection
          </strong>
          <div>
            <span style={{ color: T.purple }}>Categories:</span>{' '}
            {state.categorySelection.size === 0
              ? 'none'
              : [...state.categorySelection].join(', ')}
          </div>
          <div>
            <span style={{ color: T.purple }}>Locations:</span>{' '}
            {state.locationSelection.size === 0
              ? 'all'
              : LOCATION_ITEMS.filter((l) => state.locationSelection.has(l.id))
                  .map((l) => l.label)
                  .join(', ')}
          </div>
          <div>
            <span style={{ color: T.purple }}>Period:</span> {activePeriod}
          </div>
        </div>
      </DemoCard>
    </Section>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: T.bg,
        color: T.textPrimary,
        padding: '64px 48px',
        boxSizing: 'border-box',
      }}
    >
      {/* Page header */}
      <header style={{ marginBottom: 72 }}>
        <p
          style={{
            margin: '0 0 8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: T.purple,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Stockifi Design System
        </p>
        <h1
          style={{
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            fontSize: 28,
            fontWeight: 600,
            color: T.textPrimary,
          }}
        >
          Dropdown Component System
        </h1>
        <p
          style={{
            margin: '10px 0 0',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            color: T.textSecondary,
            maxWidth: 560,
            lineHeight: 1.6,
          }}
        >
          Three coordinated components: <code style={{ color: T.purple }}>dropdown.trigger</code>,{' '}
          <code style={{ color: T.purple }}>dropdown.menu</code>, and{' '}
          <code style={{ color: T.purple }}>item.row</code>. 12 trigger variants, 4 menu types, 40
          row variants.
        </p>
      </header>

      <TriggerShowcase />
      <MenuShowcase />
      <ItemRowShowcase />
      <ComposedDropdown />
    </div>
  );
}
