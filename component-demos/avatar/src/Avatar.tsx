import React from 'react';

export type AvatarType = 'placeholder' | 'name' | 'brand' | 'image';
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface AvatarProps {
  type?: AvatarType;
  size?: AvatarSize;
  active?: boolean;
  letter?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const CIRCLE_DIAMETER: Record<AvatarSize, number> = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
  xxl: 72,
};

const FONT_SIZE: Record<AvatarSize, number> = {
  sm: 10,
  md: 13,
  lg: 16,
  xl: 24,
  xxl: 30,
};

const ICON_SIZE: Record<AvatarSize, number> = {
  sm: 14,
  md: 20,
  lg: 24,
  xl: 34,
  xxl: 44,
};

const COLORS = {
  neutralBg: '#1C1C26',
  imageBg: '#2E2E3A',
  brandBg: '#E1C9FF',
  brandText: '#4F3174',
  ring: '#BB86FC',
  white88: 'rgba(255,255,255,0.88)',
} as const;

const PersonIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    style={{ display: 'block', flexShrink: 0 }}
  >
    <path
      fill={COLORS.white88}
      d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
    />
  </svg>
);

export const Avatar: React.FC<AvatarProps> = ({
  type = 'placeholder',
  size = 'md',
  active = false,
  letter = 'A',
  imageSrc,
  imageAlt = '',
}) => {
  const d = CIRCLE_DIAMETER[size];
  const frameSize = d + 8;
  const ringD = d + 4;

  const circBg =
    type === 'brand' ? COLORS.brandBg :
    type === 'image' ? COLORS.imageBg :
    COLORS.neutralBg;

  return (
    <div
      style={{
        position: 'relative',
        width: frameSize,
        height: frameSize,
        flexShrink: 0,
      }}
    >
      {active && (
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: 2,
            width: ringD,
            height: ringD,
            borderRadius: '50%',
            border: `2px solid ${COLORS.ring}`,
            boxSizing: 'border-box',
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          width: d,
          height: d,
          borderRadius: '50%',
          backgroundColor: circBg,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {type === 'placeholder' && (
          <PersonIcon size={ICON_SIZE[size]} />
        )}

        {(type === 'name' || type === 'brand') && (
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: FONT_SIZE[size],
              color: type === 'brand' ? COLORS.brandText : COLORS.white88,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {(letter[0] ?? 'A').toUpperCase()}
          </span>
        )}

        {type === 'image' && imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  );
};
