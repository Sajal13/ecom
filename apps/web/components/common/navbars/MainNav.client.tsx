'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { RiCloseLargeFill } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import classNames from 'classnames';
import { useNavbar } from 'lib/zustand/useNavbar';
import { Category } from 'types/products';
import Button from 'components/base/Buttons';
import Logo from 'components/common/Logo';
import LoadingAnimation from '../LoadingAnimation';
import ButtonGroup from './ButtonGroup';
import NavItems from './NavItems';
import ResizableNavbar from './ResizableNavbar';
import ThemeTogglerButton from './ThemeTogglerButton';

interface MainNavProps {
  categories: Category[];
}

const MAX_SCROLL = 300;

const MainNav = ({ categories }: MainNavProps) => {
  const { isMobileNavOpen, openMobileNav, closeMobileNav } = useNavbar();
  const [alpha, setAlpha] = useState(0);
  const [mounted, setMounted] = useState(false);

  /* ---------------- Scroll Background Effect ---------------- */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const nextAlpha = Math.min(scrollTop / MAX_SCROLL, 1);
        setAlpha(nextAlpha);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasShadow = alpha > 0.1;

  /* ---------------- Render ---------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return (
    <>
      <header
        className={classNames(
          'sticky top-0 left-0 z-30 backdrop-blur-md transition-all duration-300',
          {
            'shadow-xs': hasShadow,
            'shadow-none': !hasShadow,
          },
        )}
        style={{
          backgroundColor: `rgba(var(--background-rgb), ${alpha})`,
        }}
      >
        <nav className="h-20 container px-6 flex items-center justify-between">
          {/* Logo */}
          <Suspense fallback={<LoadingAnimation />}>
            <Logo />
          </Suspense>

          {/* Desktop Nav */}
          <div className="max-lg:hidden">
            <NavItems />
          </div>

          <ButtonGroup className="max-lg:hidden" />

          {/* Mobile Actions */}
          <div className="flex gap-2 items-center lg:hidden">
            <Button size="small" color="secondary">
              <FaCartShopping className="text-xl" />
            </Button>

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
          'fixed inset-y-0 left-0 z-50 bg-neutral-50 transition-transform duration-300 ease-out',
          {
            'translate-x-0 w-full sm:w-94': isMobileNavOpen,
            '-translate-x-full w-94': !isMobileNavOpen,
          },
        )}
      >
        <div className="p-6 md:px-10 h-full flex flex-col">
          <div className="flex justify-end mb-6">
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

      {/* ---------------- Overlay ---------------- */}
      {isMobileNavOpen && (
        <div
          onClick={closeMobileNav}
          className="fixed inset-0 z-40 bg-neutral-800/20 backdrop-blur-[1px]"
        />
      )}
    </>
  );
};

export default MainNav;
