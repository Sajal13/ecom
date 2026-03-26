'use client';

import { mainNavItems } from 'data/common';
import { useNavbar } from 'lib/zustand/useNavbar';
import AnimatedLink from 'components/base/AnimateLink';
import { twMerge } from 'tailwind-merge';

interface NavItemsProps {
  className?: string;
}

const NavItems = ({ className }: NavItemsProps) => {
  const closeMobileNav = useNavbar((s) => s.closeMobileNav);

  return (
    <ul className={twMerge("lg:flex lg:items-center lg:gap-4", className)}>
      {mainNavItems.map((navItem) => (
        <li key={navItem.id} className="py-2 px-4" onClick={closeMobileNav}>
          <AnimatedLink
            href={navItem.url}
            className="text-lg"
            color="secondary"
            position="center"
          >
            {navItem.label}
          </AnimatedLink>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;