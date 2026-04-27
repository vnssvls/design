import React, { useState } from 'react';
import { tokens } from './tokens';

export type DrawerType =
  | 'drawer.SalesDays'
  | 'drawer.SavedReports.list'
  | 'drawer.SavedReports.empty'
  | 'drawer.UndefinedSales'
  | 'drawer.RecipeDetail'
  | 'drawer.AffectedItems';

export type DrawerSize = 'small' | 'medium' | 'large';
export type DrawerTheme = 'Grey' | 'Tonal';

interface DrawerProps {
  type: DrawerType;
  size: DrawerSize;
  theme: DrawerTheme;
}

const SIZE_MAP: Record<DrawerSize, number> = {
  small: 340,
  medium: 400,
  large: 500,
};

const s: Record<string, React.CSSProperties> = {
  shell: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    fontFamily: tokens.fontFamily,
    borderLeft: `1px solid ${tokens.border}`,
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '20px 20px 16px',
    flexShrink: 0,
  },
  headerText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '15px',
    fontWeight: '600',
    color: tokens.textPrimary,
    margin: 0,
  },
  subtitle: {
    fontSize: tokens.fontSizeSm,
    color: tokens.textSecondary,
    margin: 0,
  },
  closeBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: 'none',
    background: tokens.closeButtonBg,
    color: 'rgba(255,255,255,0.50)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    flexShrink: 0,
  },
  divider: {
    height: '1px',
    background: tokens.border,
    flexShrink: 0,
  },
  body: {
    flex: 1,
    overflowY: 'auto',
    padding: '0',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: `1px solid ${tokens.border}`,
  },
  rowLabel: {
    fontSize: tokens.fontSizeSm,
    color: tokens.textPrimary,
  },
  rowSub: {
    fontSize: tokens.fontSizeXs,
    color: tokens.textSecondary,
    marginTop: '2px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  badge: {
    fontSize: '11px',
    fontWeight: '500',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: tokens.textMuted,
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    padding: '12px 20px 8px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    height: '100%',
    padding: '40px 20px',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '32px',
    opacity: 0.3,
  },
  emptyText: {
    fontSize: tokens.fontSizeSm,
    color: tokens.textSecondary,
  },
  reportRow: {
    padding: '12px 20px',
    borderBottom: `1px solid ${tokens.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  reportMeta: {
    flex: 1,
    minWidth: 0,
  },
  reportTitle: {
    fontSize: tokens.fontSizeSm,
    color: tokens.textPrimary,
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  reportSub: {
    fontSize: '12px',
    color: tokens.textSecondary,
    marginTop: '2px',
  },
  reportActions: {
    display: 'flex',
    gap: '4px',
    flexShrink: 0,
  },
  iconBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    border: 'none',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.50)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  },
  footer: {
    padding: '12px 20px',
    borderTop: `1px solid ${tokens.border}`,
    flexShrink: 0,
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
  },
  totalLabel: {
    fontSize: tokens.fontSizeSm,
    color: tokens.textSecondary,
  },
  totalValue: {
    fontSize: tokens.fontSizeSm,
    fontWeight: '600',
    color: tokens.textPrimary,
  },
};

// --- Content per type ---

function SalesDaysContent() {
  const days = [
    { date: 'Apr 1', day: 'Tuesday' },
    { date: 'Apr 8', day: 'Tuesday' },
    { date: 'Apr 15', day: 'Tuesday' },
    { date: 'Apr 22', day: 'Tuesday' },
  ];
  return (
    <>
      {days.map(d => (
        <div key={d.date} style={s.row}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ ...s.dot, background: tokens.warning }} />
            <div>
              <div style={s.rowLabel}>{d.date}</div>
              <div style={s.rowSub}>{d.day}</div>
            </div>
          </div>
          <span style={{ fontSize: tokens.fontSizeXs, color: tokens.warning }}>Missing</span>
        </div>
      ))}
    </>
  );
}

function SavedReportsListContent() {
  const reports = [
    { title: 'Q1 2026 Full Report', meta: '14 items · Jan 1 – Mar 31 2026' },
    { title: 'March Cost Variance', meta: '8 items · Mar 1–31 2026' },
    { title: 'Food Category Deep Dive', meta: '22 items · Feb 1–28 2026' },
  ];
  return (
    <>
      {reports.map(r => (
        <div key={r.title} style={s.reportRow}>
          <div style={s.reportMeta}>
            <div style={s.reportTitle}>{r.title}</div>
            <div style={s.reportSub}>{r.meta}</div>
          </div>
          <div style={s.reportActions}>
            <button style={s.iconBtn} title="Load">↗</button>
            <button style={s.iconBtn} title="Rename">✎</button>
            <button style={{ ...s.iconBtn, color: tokens.error }} title="Delete">✕</button>
          </div>
        </div>
      ))}
    </>
  );
}

function SavedReportsEmptyContent() {
  return (
    <div style={s.emptyState}>
      <div style={s.emptyIcon}>📋</div>
      <div style={s.emptyText}>No saved reports yet.</div>
    </div>
  );
}

function UndefinedSalesContent() {
  const items = [
    { name: 'Table Service — Misc', contribution: '4.2%', amount: '€312' },
    { name: 'Bar Tab — Unnamed', contribution: '2.8%', amount: '€208' },
    { name: 'Event Booking Deposit', contribution: '1.9%', amount: '€141' },
    { name: 'Staff Meal Credit', contribution: '0.9%', amount: '€67' },
  ];
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px 6px' }}>
        <span style={{ ...s.sectionLabel, padding: 0 }}>Item</span>
        <span style={{ ...s.sectionLabel, padding: 0 }}>Contribution</span>
      </div>
      {items.map(item => (
        <div key={item.name} style={s.row}>
          <div>
            <div style={s.rowLabel}>{item.name}</div>
            <div style={s.rowSub}>{item.amount}</div>
          </div>
          <span style={{ ...s.badge, background: tokens.errorBg, color: tokens.error }}>
            {item.contribution}
          </span>
        </div>
      ))}
      <div style={{ ...s.totalRow, borderTop: `1px solid ${tokens.border}`, marginTop: '4px' }}>
        <span style={s.totalLabel}>Total undefined</span>
        <span style={s.totalValue}>9.8%</span>
      </div>
    </>
  );
}

function RecipeDetailContent() {
  const ingredients = [
    { name: 'Chicken Thigh', unit: '180g', cost: '€1.44', pct: '28%' },
    { name: 'Soy Sauce', unit: '20ml', cost: '€0.18', pct: '3.5%' },
    { name: 'Sesame Oil', unit: '5ml', cost: '€0.22', pct: '4.3%' },
    { name: 'Spring Onion', unit: '15g', cost: '€0.09', pct: '1.8%' },
    { name: 'Rice', unit: '200g', cost: '€0.40', pct: '7.8%' },
  ];
  return (
    <>
      <div style={{ padding: '16px 20px 8px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span style={{ ...s.badge, background: 'rgba(126,198,232,0.12)', color: '#7EC6E8' }}>Menu Item</span>
          <span style={{ ...s.badge, background: 'rgba(255,255,255,0.06)', color: tokens.textSecondary }}>Main Course</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '11px', color: tokens.textMuted, marginBottom: '2px' }}>RECIPE COGS</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: tokens.textPrimary }}>€5.14</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: tokens.textMuted, marginBottom: '2px' }}>COGS %</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: tokens.success }}>24.5%</div>
          </div>
        </div>
      </div>
      <div style={s.divider} />
      <div style={s.sectionLabel}>Ingredients</div>
      {ingredients.map(ing => (
        <div key={ing.name} style={s.row}>
          <div>
            <div style={s.rowLabel}>{ing.name}</div>
            <div style={s.rowSub}>{ing.unit}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={s.rowLabel}>{ing.cost}</div>
            <div style={s.rowSub}>{ing.pct}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function AffectedItemsContent() {
  const menuItems = [
    { name: 'Karaage Bowl', impact: '+€0.32', newCogs: '26.1%', color: tokens.error },
    { name: 'Chicken Ramen', impact: '+€0.28', newCogs: '24.8%', color: tokens.error },
    { name: 'Gyoza Set', impact: '+€0.11', newCogs: '22.3%', color: tokens.warning },
  ];
  const posButtons = [
    { name: 'KARAAGE BOWL', impact: '+€0.32' },
    { name: 'CHICKEN RAMEN LG', impact: '+€0.28' },
  ];
  return (
    <>
      <div style={s.sectionLabel}>Menu Items ({menuItems.length})</div>
      {menuItems.map(item => (
        <div key={item.name} style={s.row}>
          <div style={s.rowLabel}>{item.name}</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: tokens.fontSizeSm, color: item.color, fontWeight: '500' }}>{item.impact}</div>
            <div style={s.rowSub}>{item.newCogs} new COGS</div>
          </div>
        </div>
      ))}
      <div style={{ ...s.divider, margin: '8px 0 0' }} />
      <div style={s.sectionLabel}>POS Buttons ({posButtons.length})</div>
      {posButtons.map(btn => (
        <div key={btn.name} style={s.row}>
          <div style={s.rowLabel}>{btn.name}</div>
          <span style={{ fontSize: tokens.fontSizeSm, color: tokens.error, fontWeight: '500' }}>{btn.impact}</span>
        </div>
      ))}
    </>
  );
}

const DRAWER_META: Record<DrawerType, { title: string; subtitle: string }> = {
  'drawer.SalesDays': { title: 'Missing Sales Days', subtitle: 'Apr 1–30 2026' },
  'drawer.SavedReports.list': { title: 'Saved Reports', subtitle: '3 reports' },
  'drawer.SavedReports.empty': { title: 'Saved Reports', subtitle: 'No reports saved' },
  'drawer.UndefinedSales': { title: 'Undefined Sales', subtitle: 'Costs are unknown' },
  'drawer.RecipeDetail': { title: 'Karaage Bowl', subtitle: 'Recipe detail' },
  'drawer.AffectedItems': { title: 'Affected Menu Items and POS Buttons', subtitle: 'Chicken Thigh price change' },
};

function DrawerContent({ type }: { type: DrawerType }) {
  switch (type) {
    case 'drawer.SalesDays': return <SalesDaysContent />;
    case 'drawer.SavedReports.list': return <SavedReportsListContent />;
    case 'drawer.SavedReports.empty': return <SavedReportsEmptyContent />;
    case 'drawer.UndefinedSales': return <UndefinedSalesContent />;
    case 'drawer.RecipeDetail': return <RecipeDetailContent />;
    case 'drawer.AffectedItems': return <AffectedItemsContent />;
  }
}

export function Drawer({ type, size, theme }: DrawerProps) {
  const width = SIZE_MAP[size];
  const bg = theme === 'Tonal' ? tokens.bgTonal : '#2A2A2A';
  const headerBg = theme === 'Tonal' ? tokens.bgGreyHeaderTonal : tokens.bgGreyHeader;
  const meta = DRAWER_META[type];

  return (
    <div style={{ ...s.shell, width, backgroundColor: bg }}>
      <div style={{ ...s.header, backgroundColor: headerBg }}>
        <div style={s.headerText}>
          <h2 style={s.title}>{meta.title}</h2>
          <p style={s.subtitle}>{meta.subtitle}</p>
        </div>
        <button style={s.closeBtn}>✕</button>
      </div>
      <div style={s.divider} />
      <div style={s.body}>
        <DrawerContent type={type} />
      </div>
    </div>
  );
}
