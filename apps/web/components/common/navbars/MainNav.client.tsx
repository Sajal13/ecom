'use client';

import { Suspense, useEffect, useState } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { RiCloseLargeFill } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import classNames from 'classnames';
import { useNavbar } from 'lib/zustand/useNavbar';
import { Category } from 'types/products';
import Button from 'components/base/Buttons';
import Logo from 'components/common/Logo';
import ButtonGroup from './ButtonGroup';
import NavItems from './NavItems';
import Skeleton from './Skeleton';
import ThemeTogglerButton from './ThemeTogglerButton';

const ResizableNavbar = dynamic(() => import('./ResizableNavbar'), {
  ssr: false,
  loading: () => <Skeleton />,
});

const MAX_SCROLL = 300;

interface MainNavProps {
  categories: Category[];
}

export default function MainNav({ categories }: MainNavProps) {
  const isMobileNavOpen = useNavbar((s) => s.isMobileNavOpen);
  const openMobileNav = useNavbar((s) => s.openMobileNav);
  const closeMobileNav = useNavbar((s) => s.closeMobileNav);

  const [alpha, setAlpha] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const nextAlpha = Math.min(scrollTop / MAX_SCROLL, 1);
      setAlpha((prev) =>
        Math.abs(prev - nextAlpha) < 0.05 ? prev : nextAlpha,
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileNavOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMobileNavOpen]);

  return (
    <>
      <header
        className={classNames(
          'sticky top-0 z-30 backdrop-blur-md transition-all duration-100 ease-linear',
          {
            'shadow-md': alpha > 0.1,
          },
        )}
        style={{
          backgroundColor: `rgba(var(--background-rgb), ${alpha})`,
        }}
      >
        <nav className="h-20 container px-6 flex items-center justify-between">
          <Logo />

          {/* Desktop */}
          <div className="hidden lg:flex-1 lg:flex items-center lg:justify-between gap-6">
            <NavItems className="lg:flex-1 lg:justify-center" />
            <ButtonGroup />
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden gap-2 items-center">
            <Link href="/cart">
              <Button size="small" color="secondary">
                <FaCartShopping className="text-xl" />
              </Button>
            </Link>

            <ThemeTogglerButton />

            <Button
              size="small"
              color="secondary"
              onClick={openMobileNav}
              aria-label="Open menu"
            >
              <RxHamburgerMenu className="text-xl" />
            </Button>
          </div>
        </nav>

        <ResizableNavbar navItems={categories} />
      </header>

      {/* ---------------- Mobile Drawer ---------------- */}
      <aside
        className={classNames(
          'fixed inset-y-0 left-0 z-50 bg-neutral-50 transition-all duration-300 ease-out',
          {
            'translate-x-0 w-full sm:w-94': isMobileNavOpen,
            '-translate-x-full w-94': !isMobileNavOpen,
          },
        )}
      >
        <div className="p-6 md:px-10 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <Logo />
            <Button
              size="small"
              color="secondary"
              onClick={closeMobileNav}
              aria-label="Close menu"
            >
              <RiCloseLargeFill className="text-xl" />
            </Button>
          </div>

          <NavItems />
          <ButtonGroup />
        </div>
      </aside>

      {isMobileNavOpen && (
        <div
          onClick={closeMobileNav}
          className="fixed inset-0 z-40 bg-neutral-800/20 backdrop-blur-[1px]"
        />
      )}
    </>
  );
}
