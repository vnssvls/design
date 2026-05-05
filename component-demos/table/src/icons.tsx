import React from 'react';
import { T, SortDir, HealthSentiment } from './tokens';

export function IconCheck({ size = 16, color = T.success }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevron({
  direction, size = 12, color = T.white60,
}: { direction: 'right' | 'down'; size?: number; color?: string }) {
  const d = direction === 'right' ? 'M5 4L9 8L5 12' : 'M4 6L8 10L12 6';
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSort({ dir }: { dir: SortDir }) {
  if (dir === 'asc') return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <path d="M6 3L9 7H3L6 3Z" fill={T.white88} />
    </svg>
  );
  if (dir === 'desc') return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <path d="M6 9L3 5H9L6 9Z" fill={T.white88} />
    </svg>
  );
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <path d="M6 2L8.5 5.5H3.5L6 2Z" fill={T.white30} />
      <path d="M6 10L3.5 6.5H8.5L6 10Z" fill={T.white30} />
    </svg>
  );
}

export function IconFace({ sentiment }: { sentiment: HealthSentiment }) {
  const color = sentiment === 'good' ? T.success : sentiment === 'warning' ? T.warning : T.danger;
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1" fill={color} />
      <circle cx="15" cy="10" r="1" fill={color} />
      {sentiment === 'good' && (
        <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      )}
      {sentiment === 'warning' && (
        <path d="M8.5 15H15.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      )}
      {sentiment === 'bad' && (
        <path d="M8 16C8 16 9.5 14 12 14C14.5 14 16 16 16 16"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function IconDownload({ color = T.white60 }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M8 3V10M8 10L5 7M8 10L11 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconOpen({ color = T.white60 }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M9 4H12V7M12 4L7.5 8.5M5 4H4C3.45 4 3 4.45 3 5V12C3 12.55 3.45 13 4 13H11C11.55 13 12 12.55 12 12V11"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconView({ color = T.white60 }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <path d="M1.5 8C1.5 8 4 3.5 8 3.5C12 3.5 14.5 8 14.5 8C14.5 8 12 12.5 8 12.5C4 12.5 1.5 8 1.5 8Z"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function IconWarning({ size = 14, color = T.warning }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5" />
      <path d="M8 5V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.75" fill={color} />
    </svg>
  );
}
