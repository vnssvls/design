import { useState } from 'react';
import {
  CalendarNav, CalendarMonth,
  PickerTrigger,
  PickerPanelCustomRange, PickerPanelMonthOnly, PickerPanelWithPresets, PickerPanelPeriod,
} from './DatePicker';

const T = {
  bg:       '#0A0A0F',
  surface:  '#0F0F12',
  surface3: '#1C1C26',
  primary25:'rgba(187,134,252,0.25)',
  textPrim: 'rgba(255,255,255,0.88)',
  textMut:  '#9898B0',
  border:   'rgba(255,255,255,0.07)',
} as const;

type PanelTab = 'custom-range' | 'month-only' | 'with-presets' | 'period';
const PANEL_TABS: PanelTab[] = ['custom-range', 'month-only', 'with-presets', 'period'];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.textMut, marginBottom: 20 }}>
      {children}
    </div>
  );
}

function PreviewCard({ children, gap = 16 }: { children: React.ReactNode; gap?: number }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, display: 'inline-flex', alignItems: 'flex-start', gap, flexWrap: 'wrap' }}>
      {children}
    </div>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: T.textMut, fontWeight: 500, marginBottom: 8 }}>{children}</div>;
}

export default function App() {
  const [panelTab, setPanelTab] = useState<PanelTab>('custom-range');

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 32px 80px', fontFamily: 'Inter, sans-serif', color: T.textPrim, background: T.bg, minHeight: '100vh' }}>
      <div style={{ marginBottom: 56 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Date Selection System</h1>
        <p style={{ fontSize: 13, color: T.textMut, lineHeight: 1.5 }}>Composable date picker built from Calendar primitives. All panels share the same CalendarMonth and CalendarDay atoms.</p>
      </div>

      {/* ── Calendar / Nav ── */}
      <div style={{ marginBottom: 64 }}>
        <SectionLabel>Calendar / Nav</SectionLabel>
        <PreviewCard gap={24}>
          <div>
            <ColLabel>default</ColLabel>
            <div style={{ width: 269 }}><CalendarNav label="March 2026" onPrev={() => {}} onNext={() => {}} /></div>
          </div>
          <div>
            <ColLabel>prevDisabled</ColLabel>
            <div style={{ width: 269 }}><CalendarNav label="January 2026" onPrev={() => {}} onNext={() => {}} prevDisabled /></div>
          </div>
        </PreviewCard>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '0 0 48px' }} />

      {/* ── Calendar / Month ── */}
      <div style={{ marginBottom: 64 }}>
        <SectionLabel>Calendar / Month — Interactive</SectionLabel>
        <PreviewCard>
          <CalendarMonth initYear={2026} initMonth={2} rangeStart="2026-03-03" rangeEnd="2026-03-14" />
        </PreviewCard>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '0 0 48px' }} />

      {/* ── picker.trigger ── */}
      <div style={{ marginBottom: 64 }}>
        <SectionLabel>picker.trigger — Variants</SectionLabel>
        <PreviewCard gap={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div><ColLabel>calendar · rest</ColLabel><PickerTrigger type="calendar" /></div>
              <div><ColLabel>calendar · active</ColLabel><PickerTrigger type="calendar" active /></div>
              <div><ColLabel>calendar · icon-only</ColLabel><PickerTrigger type="calendar" mode="icon-only" /></div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <div><ColLabel>location · rest</ColLabel><PickerTrigger type="location" /></div>
              <div><ColLabel>location · active · count</ColLabel><PickerTrigger type="location" value="3 selected" active filterCount={3} /></div>
            </div>
          </div>
        </PreviewCard>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '0 0 48px' }} />

      {/* ── picker.panel ── */}
      <div style={{ marginBottom: 64 }}>
        <SectionLabel>picker.panel — Variants</SectionLabel>

        {/* Tab nav */}
        <div style={{ display: 'flex', gap: 4, background: T.surface3, borderRadius: 10, padding: 4, marginBottom: 24, width: 'fit-content' }}>
          {PANEL_TABS.map(t => (
            <button key={t} onClick={() => setPanelTab(t)} style={{
              padding: '6px 14px', fontSize: 12, fontWeight: 500, border: 'none', borderRadius: 7, cursor: 'pointer',
              background: panelTab === t ? T.primary25 : 'transparent',
              color: panelTab === t ? T.textPrim : T.textMut,
              fontFamily: 'Inter, sans-serif',
            }}>
              {t}
            </button>
          ))}
        </div>

        {panelTab === 'custom-range'  && <PickerPanelCustomRange />}
        {panelTab === 'month-only'    && <PickerPanelMonthOnly />}
        {panelTab === 'with-presets'  && <PickerPanelWithPresets />}
        {panelTab === 'period'        && <PickerPanelPeriod onSwitchToCustom={() => setPanelTab('custom-range')} />}
      </div>
    </div>
  );
}
