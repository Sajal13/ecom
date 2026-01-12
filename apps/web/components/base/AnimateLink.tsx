import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { Color } from 'types/common';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  position?: 'left' | 'center' | 'right';
  color?: Color | 'white';
}

export default function AnimatedLink({
  href,
  children,
  className,
  position = 'left',
  color = 'neutral',
}: AnimatedLinkProps) {
  const underlineBaseClass =
    'absolute -bottom-1 h-[1px] w-0 transition-all duration-300 ease-out rounded-xl';
  const underlinePosition = {
    left: 'left-0 group-hover:w-full',
    center:
      'left-1/2 -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 group-hover:w-full',
    right: 'right-0 group-hover:w-full',
  }[position];

  const underlineColorClass: Record<Color | 'white', string> = {
    primary: 'bg-primary-800',
    secondary: 'bg-secondary-800',
    warning: 'bg-warning-800',
    success: 'bg-success-800',
    neutral: 'bg-neutral-800',
    info: 'bg-info-800',
    white: 'bg-white',
  };

  const linkColorClass: Record<Color | 'white', string> = {
    primary: 'text-primary-700 hover:text-primary-900',
    secondary: 'text-secondary-700 hover:text-secondary-900',
    warning: 'text-warning-700 hover:text-warning-900',
    success: 'text-success-700 hover:text-success-900',
    neutral: 'text-neutral-700 hover:text-neutral-900',
    info: 'text-info-700 hover:text-info-900',
    white: 'text-white hover:text-neutral-200',
  };

  const baseClass =
    'group relative inline-block font-medium transition-colors duration-300';

  const linkClass = twMerge(baseClass, linkColorClass[color], className);
  const underlineClass = twMerge(
    underlineBaseClass,
    underlinePosition,
    underlineColorClass[color],
  );
  return (
    <Link href={href} className={linkClass}>
      {children}
      <span aria-hidden="true" className={underlineClass} />
    </Link>
  );
}
