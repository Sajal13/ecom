import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Color, Size } from 'components/base/Buttons';

interface InfoCardProps {
  color?: Color;
  size?: Size | 'full';
  border?: boolean;
  className?: string;
}

const InfoCard = ({
  color = 'neutral',
  size = 'medium',
  border = false,
  className,
  children,
}: PropsWithChildren<InfoCardProps>) => {
  const baseClass = `flex items-center justify-center transition-all group 
  duration-200 ease-linear`;

  const sizeClass: Record<Size | 'full', string> = {
    small: `w-full min-h-36.25 p-4 rounded-sm`,
    medium: `w-full min-h-65 p-6 rounded-md`,
    large: `w-full min-h-79 p-6 rounded-lg`,
    full: `w-full h-full p-6 rounded-md`,
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
