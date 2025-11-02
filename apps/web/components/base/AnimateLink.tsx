import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  position?: 'left' | 'center' | 'right';
  color?: string;
}

export default function AnimatedLink({
  href,
  children,
  className,
  position = 'left',
  color = 'bg-primary-50'
}: AnimatedLinkProps) {
  const underlineBaseClass = 'absolute -bottom-1 h-[1px] w-0 transition-all duration-300 ease-out rounded-xl'
  const underlinePosition = {
    left: 'left-0 group-hover:w-full',
    center:
      'left-1/2 -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 group-hover:w-full',
    right: 'right-0 group-hover:w-full'
  }[position];

  const baseClass = 'group relative inline-block font-bold text-primary-700 hover:text-primary-darker transition-colors duration-300';
  
  const linkClass = twMerge(baseClass, className);
  const underlineClass = twMerge(underlineBaseClass, underlinePosition, color); 
  return (
    <Link
      href={href}
      className={linkClass}
    >
      {children}
      <span
        aria-hidden="true"
        className={underlineClass}
      />
    </Link>
  );
}