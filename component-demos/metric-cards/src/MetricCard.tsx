import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type MCType       = 'cogs' | 'wastage' | 'undefined-sales' | 'variance';
export type MCState      = 'default' | 'warning' | 'danger' | 'null';
export type MCTheme      = 'tonal' | 'grey';
export type MCBreakpoint = 'desktop' | 'mobile';

export interface MetricCardProps {
  type?:       MCType;
  state?:      MCState;
  theme?:      MCTheme;
  breakpoint?: MCBreakpoint;
  value?:      string;
  label?:      string;
}

export type PlaygroundState = 'default' | 'null' | 'scenario';

export interface MetricCardPlaygroundProps {
  state?:         PlaygroundState;
  revenueValue?:  string;
  cogsValue?:     string;
  profitValue?:   string;
}

// ─── Tokens ───────────────────────────────────────────────────────────────────

const TONAL_BG      = '#17131B';
const TONAL_NULL_BG = '#0F0F12';
const GREY_BG       = '#181818';

const LABEL_COLOR   = '#CACACA';
const VALUE_COLOR   = 'rgba(255,255,255,0.88)';
const NULL_COLOR    = 'rgba(255,255,255,0.35)';
const BORDER        = 'rgba(255,255,255,0.07)';
const PURPLE        = '#BB86FC';
const WARNING       = '#FF863B';
const DANGER        = '#BA4C4E';
const SUCCESS       = '#6BC497';

const PLAYGROUND_DEFAULT_BG  = '#181818';
const PLAYGROUND_SCENARIO_BG = '#1C1C26';

const TYPE_LABELS: Record<MCType, string> = {
  cogs:             'COGS',
  wastage:          'Wastage',
  'undefined-sales':'Undefined Sales',
  variance:         'Variance',
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconVariance({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 28 28" fill="none">
      <path d="M14 26.25C10.7511 26.25 7.63526 24.9594 5.33794 22.6621C3.04062 20.3647 1.75 17.2489 1.75 14C1.75 10.7511 3.04062 7.63526 5.33794 5.33794C7.63526 3.04062 10.7511 1.75 14 1.75C17.2489 1.75 20.3647 3.04062 22.6621 5.33794C24.9594 7.63526 26.25 10.7511 26.25 14C26.25 17.2489 24.9594 20.3647 22.6621 22.6621C20.3647 24.9594 17.2489 26.25 14 26.25ZM14 28C17.713 28 21.274 26.525 23.8995 23.8995C26.525 21.274 28 17.713 28 14C28 10.287 26.525 6.72601 23.8995 4.1005C21.274 1.475 17.713 0 14 0C10.287 0 6.72601 1.475 4.1005 4.1005C1.475 6.72601 0 10.287 0 14C0 17.713 1.475 21.274 4.1005 23.8995C6.72601 26.525 10.287 28 14 28Z" fill={color}/>
      <path d="M14 22.75C11.6794 22.75 9.45376 21.8281 7.81282 20.1872C6.17187 18.5462 5.25 16.3206 5.25 14C5.25 11.6794 6.17187 9.45376 7.81282 7.81282C9.45376 6.17187 11.6794 5.25 14 5.25C16.3206 5.25 18.5462 6.17187 20.1872 7.81282C21.8281 9.45376 22.75 11.6794 22.75 14C22.75 16.3206 21.8281 18.5462 20.1872 20.1872C18.5462 21.8281 16.3206 22.75 14 22.75ZM14 24.5C15.3789 24.5 16.7443 24.2284 18.0182 23.7007C19.2921 23.1731 20.4496 22.3996 21.4246 21.4246C22.3996 20.4496 23.1731 19.2921 23.7007 18.0182C24.2284 16.7443 24.5 15.3789 24.5 14C24.5 12.6211 24.2284 11.2557 23.7007 9.98182C23.1731 8.7079 22.3996 7.55039 21.4246 6.57538C20.4496 5.60036 19.2921 4.82694 18.0182 4.29926C16.7443 3.77159 15.3789 3.5 14 3.5C11.2152 3.5 8.54451 4.60625 6.57538 6.57538C4.60625 8.54451 3.5 11.2152 3.5 14C3.5 16.7848 4.60625 19.4555 6.57538 21.4246C8.54451 23.3938 11.2152 24.5 14 24.5Z" fill={color}/>
      <path d="M14 19.25C12.6076 19.25 11.2723 18.6969 10.2877 17.7123C9.30312 16.7277 8.75 15.3924 8.75 14C8.75 12.6076 9.30312 11.2723 10.2877 10.2877C11.2723 9.30312 12.6076 8.75 14 8.75C15.3924 8.75 16.7277 9.30312 17.7123 10.2877C18.6969 11.2723 19.25 12.6076 19.25 14C19.25 15.3924 18.6969 16.7277 17.7123 17.7123C16.7277 18.6969 15.3924 19.25 14 19.25ZM14 21C15.8565 21 17.637 20.2625 18.9497 18.9497C20.2625 17.637 21 15.8565 21 14C21 12.1435 20.2625 10.363 18.9497 9.05025C17.637 7.7375 15.8565 7 14 7C12.1435 7 10.363 7.7375 9.05025 9.05025C7.7375 10.363 7 12.1435 7 14C7 15.8565 7.7375 17.637 9.05025 18.9497C10.363 20.2625 12.1435 21 14 21Z" fill={color}/>
      <path d="M16.625 14C16.625 14.6962 16.3484 15.3639 15.8562 15.8562C15.3639 16.3484 14.6962 16.625 14 16.625C13.3038 16.625 12.6361 16.3484 12.1438 15.8562C11.6516 15.3639 11.375 14.6962 11.375 14C11.375 13.3038 11.6516 12.6361 12.1438 12.1438C12.6361 11.6516 13.3038 11.375 14 11.375C14.6962 11.375 15.3639 11.6516 15.8562 12.1438C16.3484 12.6361 16.625 13.3038 16.625 14Z" fill={color}/>
    </svg>
  );
}

function IconUndefinedSales({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 28 28" fill="none">
      <path d="M21.458 6.54206C20.8821 5.96609 20.1015 5.64168 19.287 5.63982C18.4725 5.63797 17.6904 5.95882 17.1119 6.53216L15.8348 7.87085C15.7166 8.00154 15.5733 8.10722 15.4135 8.18165C15.2538 8.25608 15.0807 8.29776 14.9046 8.30423C14.7284 8.3107 14.5528 8.28183 14.388 8.21931C14.2232 8.1568 14.0725 8.06191 13.945 7.94025C13.8175 7.81859 13.7156 7.67262 13.6454 7.51095C13.5752 7.34928 13.538 7.17518 13.5362 6.99893C13.5344 6.82268 13.5678 6.64784 13.6346 6.48474C13.7015 6.32163 13.8003 6.17356 13.9252 6.04926L15.21 4.69736L15.232 4.67536C16.3047 3.60265 17.7597 3 19.2767 3C20.7938 3 22.2487 3.60265 23.3214 4.67536C24.3941 5.74808 24.9968 7.203 24.9968 8.72005C24.9968 10.2371 24.3941 11.692 23.3214 12.7647L23.2994 12.7867L21.9475 14.0748C21.6924 14.3057 21.3572 14.4279 21.0133 14.4152C20.6695 14.4026 20.3442 14.2562 20.1067 14.0072C19.8692 13.7583 19.7383 13.4264 19.7419 13.0823C19.7455 12.7383 19.8833 12.4092 20.1259 12.1652L21.4646 10.8881C22.0384 10.3101 22.3598 9.52823 22.3586 8.71374C22.3574 7.89924 22.0335 7.1184 21.458 6.54206ZM12.1652 20.1292L10.8881 21.4679C10.3105 22.0456 9.52706 22.3701 8.71015 22.3701C7.89325 22.3701 7.1098 22.0456 6.53216 21.4679C5.95452 20.8903 5.63 20.1068 5.63 19.2899C5.63 18.473 5.95452 17.6896 6.53216 17.1119L7.87085 15.8348C8.11351 15.5909 8.25131 15.2618 8.25491 14.9177C8.25851 14.5737 8.12762 14.2418 7.89011 13.9928C7.65261 13.7439 7.32728 13.5975 6.98343 13.5848C6.63957 13.5722 6.30438 13.6944 6.04926 13.9252L4.69736 15.21L4.67536 15.232C3.60265 16.3047 3 17.7597 3 19.2767C3 20.7938 3.60265 22.2487 4.67536 23.3214C5.74808 24.3941 7.203 24.9968 8.72005 24.9968C10.2371 24.9968 11.692 24.3941 12.7647 23.3214L12.7867 23.2994L14.0748 21.9475C14.1998 21.8232 14.2986 21.6751 14.3654 21.512C14.4322 21.3489 14.4657 21.1741 14.4639 20.9978C14.462 20.8216 14.4249 20.6475 14.3547 20.4858C14.2845 20.3242 14.1826 20.1782 14.0551 20.0565C13.9275 19.9349 13.7769 19.84 13.6121 19.7775C13.4473 19.7149 13.2717 19.6861 13.0955 19.6925C12.9194 19.699 12.7463 19.7407 12.5865 19.8151C12.4268 19.8895 12.2835 19.9952 12.1652 20.1259V20.1292ZM23.68 16.2H21.04C20.6899 16.2 20.3542 16.3391 20.1066 16.5866C19.8591 16.8342 19.72 17.1699 19.72 17.52C19.72 17.8701 19.8591 18.2059 20.1066 18.4534C20.3542 18.7009 20.6899 18.84 21.04 18.84H23.68C24.0301 18.84 24.3658 18.7009 24.6134 18.4534C24.8609 18.2059 25 17.8701 25 17.52C25 17.1699 24.8609 16.8342 24.6134 16.5866C24.3658 16.3391 24.0301 16.2 23.68 16.2ZM4.32007 11.8H6.96006C7.31014 11.8 7.64589 11.661 7.89344 11.4134C8.14098 11.1659 8.28005 10.8301 8.28005 10.48C8.28005 10.13 8.14098 9.79422 7.89344 9.54667C7.64589 9.29912 7.31014 9.16005 6.96006 9.16005H4.32007C3.96998 9.16005 3.63423 9.29912 3.38669 9.54667C3.13914 9.79422 3.00007 10.13 3.00007 10.48C3.00007 10.8301 3.13914 11.1659 3.38669 11.4134C3.63423 11.661 3.96998 11.8 4.32007 11.8ZM17.52 19.72C17.1699 19.72 16.8342 19.8591 16.5866 20.1066C16.3391 20.3542 16.2 20.6899 16.2 21.04V23.68C16.2 24.0301 16.3391 24.3658 16.5866 24.6134C16.8342 24.8609 17.1699 25 17.52 25C17.8701 25 18.2059 24.8609 18.4534 24.6134C18.7009 24.3658 18.84 24.0301 18.84 23.68V21.04C18.84 20.6899 18.7009 20.3542 18.4534 20.1066C18.2059 19.8591 17.8701 19.72 17.52 19.72ZM10.48 8.28005C10.8301 8.28005 11.1659 8.14098 11.4134 7.89344C11.661 7.64589 11.8 7.31014 11.8 6.96006V4.32007C11.8 3.96998 11.661 3.63423 11.4134 3.38669C11.1659 3.13914 10.8301 3.00007 10.48 3.00007C10.13 3.00007 9.79422 3.13914 9.54667 3.38669C9.29912 3.63423 9.16005 3.96998 9.16005 4.32007V6.96006C9.16005 7.31014 9.29912 7.64589 9.54667 7.89344C9.79422 8.14098 10.13 8.28005 10.48 8.28005Z" fill={color}/>
    </svg>
  );
}

function IconWastage({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 28 28" fill="none">
      <path d="M14.5 28C20.2995 28 25 24.5 25 18.375C25 15.75 24.125 11.375 20.625 7.875C21.0625 10.5 18.4375 11.375 18.4375 11.375C19.75 7 16.25 0.875 11 0C11.6248 3.5 11.875 7 7.5 10.5C5.3125 12.25 4 15.2758 4 18.375C4 24.5 8.7005 28 14.5 28ZM14.5 26.25C11.6003 26.25 9.25 24.5 9.25 21.4375C9.25 20.125 9.6875 17.9375 11.4375 16.1875C11.2188 17.5 12.75 18.375 12.75 18.375C12.0938 16.1875 13.625 12.6875 16.25 12.25C15.9368 14 15.8125 15.75 18 17.5C19.0938 18.375 19.75 19.887 19.75 21.4375C19.75 24.5 17.3997 26.25 14.5 26.25Z" fill={color}/>
    </svg>
  );
}

function IconCOGS({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 28 28" fill="none">
      <path d="M23 7.86538C23 10.5523 18.7463 12.7308 13.5 12.7308C8.2537 12.7308 4 10.5523 4 7.86538M23 7.86538C23 5.17851 18.7463 3 13.5 3C8.2537 3 4 5.17851 4 7.86538M23 7.86538V21.1346C23 23.8215 18.7463 26 13.5 26C8.2537 26 4 23.8215 4 21.1346V7.86538M23 7.86538V12.2885M4 7.86538V12.2885M23 12.2885V16.7115C23 19.3984 18.7463 21.5769 13.5 21.5769C8.2537 21.5769 4 19.3984 4 16.7115V12.2885M23 12.2885C23 14.9753 18.7463 17.1538 13.5 17.1538C8.2537 17.1538 4 14.9753 4 12.2885" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconTrendUp({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 12L12 4M12 4H6M12 4V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconProfit({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 28 28" fill="none">
      <path d="M23 7.86538C23 10.5523 18.7463 12.7308 13.5 12.7308C8.2537 12.7308 4 10.5523 4 7.86538M23 7.86538C23 5.17851 18.7463 3 13.5 3C8.2537 3 4 5.17851 4 7.86538M23 7.86538V21.1346C23 23.8215 18.7463 26 13.5 26C8.2537 26 4 23.8215 4 21.1346V7.86538M23 7.86538V12.2885M4 7.86538V12.2885M23 12.2885V16.7115C23 19.3984 18.7463 21.5769 13.5 21.5769C8.2537 21.5769 4 19.3984 4 16.7115V12.2885M23 12.2885C23 14.9753 18.7463 17.1538 13.5 17.1538C8.2537 17.1538 4 14.9753 4 12.2885" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Icon resolver ─────────────────────────────────────────────────────────────

function getIconColor(type: MCType, state: MCState): string {
  if (state === 'null') return 'rgba(255,255,255,0.25)';
  if (state === 'warning') return WARNING;
  if (state === 'danger') return DANGER;
  // default state — type-specific
  switch (type) {
    case 'wastage':          return WARNING;
    case 'undefined-sales':  return DANGER;
    default:                 return PURPLE;
  }
}

function MetricIcon({ type, state }: { type: MCType; state: MCState }) {
  const color = getIconColor(type, state);
  switch (type) {
    case 'variance':         return <IconVariance color={color} />;
    case 'wastage':          return <IconWastage color={color} />;
    case 'undefined-sales':  return <IconUndefinedSales color={color} />;
    case 'cogs':             return <IconCOGS color={color} />;
  }
}

// ─── MetricCard (standard) ────────────────────────────────────────────────────

export function MetricCard({
  type        = 'variance',
  state       = 'default',
  theme       = 'tonal',
  breakpoint  = 'desktop',
  value,
  label,
}: MetricCardProps) {
  const isNull   = state === 'null';
  const isMobile = breakpoint === 'mobile';

  const bg =
    theme === 'grey'
      ? GREY_BG
      : isNull
        ? TONAL_NULL_BG
        : TONAL_BG;

  const displayValue = isNull ? '—' : (value ?? '22.5%');
  const displayLabel = label ?? TYPE_LABELS[type];

  const valueColor  = isNull ? NULL_COLOR : VALUE_COLOR;
  const valueFontSz = isMobile ? 14 : 20;
  const cardW       = 161;
  const cardH       = isMobile ? 61 : 101;
  const labelFontSz = isMobile ? 10 : 11;

  return (
    <div style={{
      width: cardW, height: cardH,
      background: bg,
      border: `1px solid ${BORDER}`,
      borderRadius: 12,
      padding: isMobile ? '10px 12px' : '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      {/* Icon + label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <MetricIcon type={type} state={state} />
        <span style={{
          fontSize: labelFontSz,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          color: LABEL_COLOR,
          letterSpacing: '0.02em',
        }}>
          {displayLabel}
        </span>
      </div>

      {/* Value */}
      <span style={{
        fontSize: valueFontSz,
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        color: valueColor,
        letterSpacing: '-0.01em',
        height: 20,
        lineHeight: '20px',
        display: 'block',
      }}>
        {displayValue}
      </span>
    </div>
  );
}

// ─── MetricCard.playground ────────────────────────────────────────────────────

interface PlaygroundCardData {
  label:    string;
  value:    string;
  icon:     React.ReactNode;
}

export function MetricCardPlayground({
  state         = 'default',
  revenueValue  = '€48,200',
  cogsValue     = '28.4%',
  profitValue   = '€34,600',
}: MetricCardPlaygroundProps) {
  const isNull     = state === 'null';
  const isScenario = state === 'scenario';

  const bg   = isScenario ? PLAYGROUND_SCENARIO_BG : PLAYGROUND_DEFAULT_BG;
  const cardW = isScenario ? 323 : 245;
  const cardH = isScenario ? 62 : 59;

  const cards: PlaygroundCardData[] = [
    {
      label: 'Revenue',
      value: isNull ? '—' : revenueValue,
      icon:  <IconTrendUp color={isNull ? 'rgba(255,255,255,0.25)' : SUCCESS} size={20} />,
    },
    {
      label: 'COGS',
      value: isNull ? '—' : cogsValue,
      icon:  <IconCOGS color={isNull ? 'rgba(255,255,255,0.25)' : PURPLE} />,
    },
    {
      label: 'Profit',
      value: isNull ? '—' : profitValue,
      icon:  <IconProfit color={isNull ? 'rgba(255,255,255,0.25)' : PURPLE} />,
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {cards.map(card => (
        <div
          key={card.label}
          style={{
            width: cardW, height: cardH,
            background: bg,
            border: `1px solid ${BORDER}`,
            borderRadius: 10,
            padding: '8px 12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {/* Icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {card.icon}
            <span style={{
              fontSize: 10,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              color: LABEL_COLOR,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {card.label}
            </span>
          </div>

          {/* Value row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              fontSize: isScenario ? 16 : 18,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: isNull ? NULL_COLOR : VALUE_COLOR,
              letterSpacing: '-0.01em',
            }}>
              {card.value}
            </span>

            {isScenario && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                {/* Delta pill placeholder */}
                <span style={{
                  fontSize: 11,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  color: SUCCESS,
                  background: 'rgba(107,196,151,0.12)',
                  borderRadius: 4,
                  padding: '2px 6px',
                }}>
                  +2.1%
                </span>
                {/* Reset pill */}
                <button style={{
                  height: 20,
                  padding: '0 8px',
                  borderRadius: 40,
                  background: '#707070',
                  border: 'none',
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 10,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}>
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
