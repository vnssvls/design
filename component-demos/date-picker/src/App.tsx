import { useState } from 'react';
import {
  CalendarNav, CalendarMonth,
  PickerTrigger,
  PickerPanelCustomRange, PickerPanelMonthOnly, PickerPanelWithPresets, PickerPanelPeriod,
} from './DatePicker';

const T = {
  bg:       '#0A0A0F',
  bgGrey:   '#212121',
  surface:  '#0F0F12',
  surface3: '#1C1C26',
  primary25:'rgba(187,134,252,0.25)',
  primary:  '#BB86FC',
  textPrim: 'rgba(255,255,255,0.88)',
  textMut:  '#9898B0',
  border:   'rgba(255,255,255,0.07)',
  warning:  '#FF863B',
} as const;

// Dates that have missing sales data — shown with orange dot in calendar
const MISSING_DATES = new Set(['2026-03-05', '2026-03-06', '2026-04-12', '2026-04-13', '2026-04-20']);

type PanelTab = 'custom-range' | 'month-only' | 'with-presets' | 'period';
type Theme = 'tonal' | 'grey';

const PANEL_TABS: PanelTab[] = ['custom-range', 'month-only', 'with-presets', 'period'];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.textMut, marginBottom: 20 }}>
      {children}
    </div>
  );
}

function PreviewCard({ children, gap = 16, bg }: { children: React.ReactNode; gap?: number; bg?: string }) {
  return (
    <div style={{ background: bg ?? T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: 24, display: 'inline-flex', alignItems: 'flex-start', gap, flexWrap: 'wrap' }}>
      {children}
    </div>
  );
}

function ColLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, color: T.textMut, fontWeight: 500, marginBottom: 8 }}>{children}</div>;
}

function ThemeToggle({ value, onChange }: { value: Theme; onChange: (t: Theme) => void }) {
  return (
    <div style={{ display: 'flex', gap: 4, background: T.surface3, borderRadius: 8, padding: 3, width: 'fit-content' }}>
      {(['tonal', 'grey'] as Theme[]).map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          padding: '4px 12px', fontSize: 11, fontWeight: 500, border: 'none', borderRadius: 5, cursor: 'pointer',
          background: value === t ? T.primary25 : 'transparent',
          color: value === t ? T.textPrim : T.textMut,
          fontFamily: 'Inter, sans-serif',
          textTransform: 'capitalize',
        }}>
          {t}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [panelTab, setPanelTab] = useState<PanelTab>('custom-range');
  const [theme, setTheme] = useState<Theme>('tonal');

  const pageBg = theme === 'tonal' ? T.bg : T.bgGrey;
  const cardBg = theme === 'tonal' ? T.surface : '#2A2A36';

  const switchToCustomRange = () => setPanelTab('custom-range');

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 32px 80px', fontFamily: 'Inter, sans-serif', color: T.textPrim, background: pageBg, minHeight: '100vh' }}>
      <div style={{ marginBottom: 56 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Date Selection System</h1>
        <p style={{ fontSize: 13, color: T.textMut, lineHeight: 1.5 }}>Composable date picker built from Calendar primitives. All panels share the same CalendarMonth and CalendarDay atoms.</p>
      </div>

      {/* ── Calendar / Nav ── */}
      <div style={{ marginBottom: 64 }}>
        <SectionLabel>Calendar / Nav</SectionLabel>
        <PreviewCard gap={24} bg={cardBg}>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <SectionLabel>Calendar / Month — Interactive</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: T.textMut }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.warning, display: 'inline-block' }} />
            Missing sales days
          </div>
        </div>
        <PreviewCard bg={cardBg}>
          <CalendarMonth
            initYear={2026} initMonth={2}
            rangeStart="2026-03-03" rangeEnd="2026-03-14"
            missingDates={MISSING_DATES}
          />
        </PreviewCard>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '0 0 48px' }} />

      {/* ── picker.trigger ── */}
      <div style={{ marginBottom: 64 }}>
        <SectionLabel>picker.trigger — Variants</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {(['tonal', 'grey'] as const).map(th => (
            <PreviewCard key={th} gap={12} bg={th === 'tonal' ? T.bg : T.bgGrey}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
                <ColLabel>{th}</ColLabel>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <div><ColLabel>calendar · rest</ColLabel><PickerTrigger type="calendar" theme={th} /></div>
                  <div><ColLabel>calendar · filled</ColLabel><PickerTrigger type="calendar" active theme={th} /></div>
                  <div><ColLabel>period · rest</ColLabel><PickerTrigger type="period" theme={th} /></div>
                  <div><ColLabel>period · filled</ColLabel><PickerTrigger type="period" active theme={th} /></div>
                  <div><ColLabel>icon-only</ColLabel><PickerTrigger type="calendar" mode="icon-only" theme={th} /></div>
                </div>
              </div>
            </PreviewCard>
          ))}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: `1px solid ${T.border}`, margin: '0 0 48px' }} />

      {/* ── picker.panel ── */}
      <div style={{ marginBottom: 64 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <SectionLabel>picker.panel — Variants</SectionLabel>
          <ThemeToggle value={theme} onChange={setTheme} />
        </div>

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

        {panelTab === 'custom-range'  && <PickerPanelCustomRange missingDates={MISSING_DATES} theme={theme} />}
        {panelTab === 'month-only'    && <PickerPanelMonthOnly missingDates={MISSING_DATES} theme={theme} />}
        {panelTab === 'with-presets'  && <PickerPanelWithPresets missingDates={MISSING_DATES} theme={theme} />}
        {panelTab === 'period'        && <PickerPanelPeriod onSwitchToCustom={switchToCustomRange} theme={theme} />}
      </div>
    </div>
  );
}
