'use client';

import React, { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { RiCloseLargeFill } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import Logo_Dark from 'assets/images/logo/logo_dark.png';
import Logo_Light from 'assets/images/logo/logo_light.png';
import classNames from 'classnames';
import Button from 'components/base/Buttons';
import LoadingAnimation from '../LoadingAnimation';
import MobileNav from './ButtonGroup';
import ButtonGroup from './ButtonGroup';
import NavItems from './NavItems';
import { FaCartShopping } from 'react-icons/fa6';

const MainNav = () => {
  const [alpha, setAlpha] = useState(0);
  const [shadow, setShadow] = useState('shadow-none');
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 300;

      // Calculate alpha between 0 and 1
      let newAlpha = scrollTop / maxScroll;
      if (newAlpha > 1) newAlpha = 1;
      if (newAlpha < 0) newAlpha = 0;
      setAlpha(newAlpha);

      if (scrollTop > 30) {
        setShadow('shadow-xs');
      } else {
        setShadow('shadow-none');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-neutral-50 h-screen w-screen flex justify-center items-center">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <>
      <header
        className={classNames(
          'sticky top-0 left-0 z-30 backdrop-blur-md transition-all duration-300',
          shadow,
        )}
        style={{
          backgroundColor: `rgba(var(--background-rgb), ${alpha})`,
        }}
      >
        <nav className="h-20 flex items-center justify-between px-6">
          <Link href="/">
            <Image
              src={theme === 'dark' ? Logo_Dark : Logo_Light}
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
          <div className="max-lg:hidden">
            <NavItems />
          </div>
          <ButtonGroup className="max-lg:hidden" />
          <div className="flex gap-2 items-center lg:hidden">
            <Button size="small" color="secondary" className="lg:hidden">
              <FaCartShopping className="text-xl" />
            </Button>
            <Button size="small" color="secondary" onClick={() => setMobileNavOpen(true)}>
              <RxHamburgerMenu className="text-xl" />
            </Button>
          </div>
        </nav>
      </header>
      <div
        className={classNames(
          'fixed left-0 top-0 h-screen transition-all duration-300 ease-linear bg-neutral-50 z-50',
          {
            'w-full sm:w-94 lg:w-0 lg:-translate-x-100': isMobileNavOpen,
            'w-0 -translate-x-100': !isMobileNavOpen,
          },
        )}
      >
        <div className="p-6 md:px-10 h-full flex flex-col">
          <div className="flex justify-end mb-6">
            <Button size="small" color="secondary" onClick={() => setMobileNavOpen(false)}>
              <RiCloseLargeFill className="text-xl" />
            </Button>
          </div>
          <NavItems />
          <ButtonGroup />
        </div>
      </div>
      <div
        className={classNames(
          'fixed inset-0 h-screen bg-neutral-800/20 z-40 backdrop-blur-[1px] transition-all duration-200 ease-in',
          {
            'w-full': isMobileNavOpen,
            'w-0': !isMobileNavOpen,
          },
        )}
      />
    </>
  );
};

export default MainNav;
