import React from 'react';
import { MetricTooltip, Theme } from './MetricTooltip';

const THEORETICAL = {
  title: 'Theoretical COGS %',
  description: 'The ideal cost of goods sold based on perfect inventory management — no waste, theft, or errors.',
  formula: '(Sales - Gross Profit) / Sales',
  watchNote: 'Compare this to your Actual COGS to find your known and unknown inefficiencies.',
};

const VARIANCE = {
  title: 'Variance',
  description: 'The difference between your Planned COGS and your Actual COGS for the selected period.',
  formula: 'Planned COGS % - Actual COGS %',
  watchNote: 'A negative variance means you are spending more than planned. Investigate portion control and waste.',
};

const UNDEFINED_SALES = {
  title: 'Undefined Sales %',
  description: 'Revenue from items sold that have no matching recipe — ingredient cost cannot be tracked.',
  watchNote: 'High undefined sales means your recipe library is incomplete. Missing recipes create blind spots in COGS.',
};

const STOCK_COUNT = {
  title: 'Stock Count',
  description: 'The last completed stock count for this location. Used to calculate actual vs. theoretical consumption.',
};

function Label({ text }: { text: string }) {
  return (
    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, margin: '0 0 20px' }}>
      {text}
    </p>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' as const, alignItems: 'flex-start', marginBottom: 56 }}>{children}</div>;
}

function ThemeBlock({ theme }: { theme: Theme }) {
  const bg = theme === 'Tonal' ? '#0A0A0F' : '#2a2a2a';
  return (
    <div style={{ background: bg, padding: 24, borderRadius: 12, display: 'flex', gap: 32, flexWrap: 'wrap' as const, alignItems: 'flex-start' }}>
      <MetricTooltip {...THEORETICAL} theme={theme} caretPosition="top" />
      <MetricTooltip {...VARIANCE} theme={theme} caretPosition="top" />
      <MetricTooltip {...UNDEFINED_SALES} theme={theme} caretPosition="top" showFormula={false} />
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', padding: '48px 48px 80px', boxSizing: 'border-box' as const }}>
      <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 22, color: '#fff', margin: '0 0 4px' }}>MetricTooltip</h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 56px' }}>
        Node 1777:5721 · 8 variants · theme × caretPosition
      </p>

      <Label text="theme=Tonal" />
      <ThemeBlock theme="Tonal" />

      <Label text="theme=Grey" />
      <ThemeBlock theme="Grey" />

      <Label text="caretPosition — all 4 directions (Tonal)" />
      <Row>
        {(['top', 'bottom', 'left', 'right'] as const).map(pos => (
          <div key={pos} style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Inter', textAlign: 'center' as const }}>{pos}</span>
            <div style={{ padding: pos === 'top' ? '12px 0 0' : pos === 'bottom' ? '0 0 12px' : pos === 'left' ? '0 0 0 12px' : '0 12px 0 0' }}>
              <MetricTooltip
                title="Theoretical COGS %"
                description="The ideal cost of goods sold with no waste or errors."
                theme="Tonal"
                caretPosition={pos}
                showFormula={false}
                showWatchNote={false}
              />
            </div>
          </div>
        ))}
      </Row>

      <Label text="showFormula + showWatchNote booleans" />
      <Row>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Inter' }}>both true (default)</span>
          <MetricTooltip {...THEORETICAL} theme="Tonal" showCaret={false} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Inter' }}>showFormula=false</span>
          <MetricTooltip {...THEORETICAL} theme="Tonal" showFormula={false} showCaret={false} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Inter' }}>showWatchNote=false</span>
          <MetricTooltip {...THEORETICAL} theme="Tonal" showWatchNote={false} showCaret={false} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontFamily: 'Inter' }}>description only</span>
          <MetricTooltip {...STOCK_COUNT} theme="Tonal" showFormula={false} showWatchNote={false} showCaret={false} />
        </div>
      </Row>

      <Label text="showCaret=false" />
      <Row>
        <MetricTooltip {...THEORETICAL} theme="Tonal" showCaret={false} />
        <MetricTooltip {...VARIANCE} theme="Grey" showCaret={false} />
      </Row>
    </div>
  );
}
