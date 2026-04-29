import React from 'react';
import { MetricTooltip } from './MetricTooltip';

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

const WASTAGE = {
  title: 'Wastage %',
  description: 'The cost of ingredients recorded as waste during the selected period, as a percentage of revenue.',
  formula: 'Total Waste Cost / Revenue',
  watchNote: 'High wastage often signals over-ordering, poor rotation, or prep inefficiency.',
};

const UNDEFINED_SALES = {
  title: 'Undefined Sales %',
  description: 'Revenue from items sold that have no matching recipe, so their ingredient cost cannot be tracked.',
  watchNote: 'High undefined sales means your recipe library is incomplete. Missing recipes create blind spots in COGS.',
};

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 24 }}>
        {label}
      </p>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ background: '#0A0A0F', minHeight: '100vh', padding: '48px 48px 80px', boxSizing: 'border-box' }}>
      <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 22, color: '#fff', marginBottom: 8 }}>MetricTooltip</h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 56 }}>
        Node 795:59 — Contextual tooltip for metric cards
      </p>

      <Section label="Full variant — all sections">
        <MetricTooltip {...THEORETICAL} showCaret caretPosition="top" />
        <MetricTooltip {...VARIANCE} showCaret caretPosition="top" />
        <MetricTooltip {...WASTAGE} showCaret caretPosition="top" />
      </Section>

      <Section label="No formula (watch note only)">
        <MetricTooltip {...UNDEFINED_SALES} showCaret caretPosition="top" showFormula={false} />
        <MetricTooltip {...THEORETICAL} showCaret caretPosition="top" showFormula={false} />
      </Section>

      <Section label="Description only — no formula, no watch note">
        <MetricTooltip
          title="Stock Count"
          description="The last completed stock count for this location. Used to calculate actual consumption against theoretical usage."
          showFormula={false}
          showWatchNote={false}
          showCaret
          caretPosition="top"
        />
        <MetricTooltip
          title="Revenue"
          description="Total POS revenue for the selected period. Only visible when a POS integration is active."
          showFormula={false}
          showWatchNote={false}
          showCaret
          caretPosition="top"
        />
      </Section>

      <Section label="Caret positions">
        <div style={{ padding: 24, display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ paddingTop: 16 }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter', marginBottom: 12 }}>caretPosition="top"</p>
            <MetricTooltip title="Theoretical COGS %" description="The ideal cost of goods sold with no waste or errors." showFormula={false} showWatchNote={false} showCaret caretPosition="top" />
          </div>
          <div style={{ paddingBottom: 16 }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter', marginBottom: 12 }}>caretPosition="bottom"</p>
            <MetricTooltip title="Theoretical COGS %" description="The ideal cost of goods sold with no waste or errors." showFormula={false} showWatchNote={false} showCaret caretPosition="bottom" />
          </div>
          <div style={{ paddingLeft: 24 }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter', marginBottom: 12 }}>caretPosition="left"</p>
            <MetricTooltip title="Theoretical COGS %" description="The ideal cost of goods sold with no waste or errors." showFormula={false} showWatchNote={false} showCaret caretPosition="left" />
          </div>
          <div style={{ paddingRight: 24 }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontFamily: 'Inter', marginBottom: 12 }}>caretPosition="right"</p>
            <MetricTooltip title="Theoretical COGS %" description="The ideal cost of goods sold with no waste or errors." showFormula={false} showWatchNote={false} showCaret caretPosition="right" />
          </div>
        </div>
      </Section>

      <Section label="No caret">
        <MetricTooltip {...THEORETICAL} showCaret={false} />
        <MetricTooltip {...UNDEFINED_SALES} showCaret={false} showFormula={false} />
      </Section>
    </div>
  );
}
