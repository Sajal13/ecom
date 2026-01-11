import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Color, Size } from 'components/base/Buttons';

interface InfoCardProps {
  color: Color;
  size?: Size;
  border?: boolean;
  className?: string;
}

const InfoCard = ({
  color,
  size = 'medium',
  border = false,
  className,
  children,
}: PropsWithChildren<InfoCardProps>) => {
  const baseClass = `flex items-center justify-center transition-all 
  duration-200 ease-linear`;

  const sizeClass: Record<Size, string> = {
    small: `min-w-42.5 min-h-36.25 px-4 py-3 rounded-sm`,
    medium: `min-w-67.5 min-h-65 py-8 px-9 rounded-md`,
    large: `min-w-80 min-h-79 py-10 px-11 rounded-lg`,
  };

  const colorClass: Record<Color | 'neutral', string> = {
    primary:
      'bg-primary-200 text-secondary-800 border-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-100',
    secondary:
      'bg-secondary-200 text-secondary-800 border-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-100',
    danger:
      'bg-danger-100 text-secondary-800 border-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-100',
    success:
      'bg-success-100 text-secondary-800 border-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-100',
    warning:
      'bg-warning-100 text-secondary-800 border-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-100',
    info: 'bg-info-100 text-secondary-800 border-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-100',
    neutral:
      'bg-neutral-100 text-secondary-800 border-neutral-400 hover:bg-primary-500 hover:border-primary-500 hover:text-secondary-100',
  };

  const cardClass = twMerge(
    baseClass,
    sizeClass[size],
    colorClass[color],
    classNames({ border: border, 'border-0': !border }),
    className,
  );
  return <div className={cardClass}>{children}</div>;
};

export default InfoCard;
