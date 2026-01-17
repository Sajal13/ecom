'use client';

import { useEffect, useRef, useState } from 'react';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import Link from 'next/link';
import classNames from 'classnames';
import { dropdownItems } from 'data/common';
import { useNavbar } from 'lib/zustand/useNavbar';
import Button from 'components/base/Buttons';
import ThemeTogglerButton from './ThemeTogglerButton';

/* -----------------------------
  Helpers
------------------------------*/
const isDesktop = () =>
  typeof window !== 'undefined' && window.innerWidth >= 1024;

/* -----------------------------
  Button Group
------------------------------*/
interface ButtonGroupProps {
  className?: string;
}

const ButtonGroup = ({ className }: ButtonGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { closeMobileNav } = useNavbar();

  /* -----------------------------
     Handlers
  ------------------------------*/
  const handleUserButtonClick = () => {
    if (!isDesktop()) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    if (!isDesktop()) {
      closeMobileNav();
    }
  };

  /* -----------------------------
     Close dropdown on outside click
  ------------------------------*/
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={classNames(
        'max-lg:mt-auto flex gap-3 justify-between lg:justify-end items-center',
        className,
      )}
    >
      {/* Wishlist */}
      <Link href="/wishlist" onClick={handleLinkClick}>
        <Button size="small" shape="circle" color="secondary">
          <FaRegHeart className="text-xl" />
        </Button>
      </Link>

      {/* Cart */}
      <Link href="/cart" onClick={handleLinkClick}>
        <Button
          size="small"
          shape="circle"
          color="secondary"
          className="max-lg:hidden"
        >
          <FaCartShopping className="text-xl" />
        </Button>
      </Link>

      {/* Theme toggle (desktop only) */}
      <div className="max-lg:hidden">
        <ThemeTogglerButton />
      </div>

      {/* User Dropdown */}
      <div ref={wrapperRef} className="relative group">
        <Button
          size="small"
          shape="circle"
          color="secondary"
          onClick={handleUserButtonClick}
        >
          <FaUser className="text-xl" />
        </Button>

        <AvatarDropdown isOpen={isOpen} onLinkClick={handleLinkClick} />
      </div>
    </div>
  );
};

export default ButtonGroup;

/* -----------------------------
  Avatar Dropdown
------------------------------*/
interface AvatarDropdownProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

const AvatarDropdown = ({ isOpen, onLinkClick }: AvatarDropdownProps) => {
  return (
    <div
      className={classNames(
        `
        absolute right-0 top-10 z-50 mt-2 w-64 rounded-xl px-5 py-4 max-lg:bottom-12 max-lg:top-auto
        bg-neutral-50 shadow-lg backdrop-blur-md  before:content-[''] before:h-5 before:w-40  
        before:bg-transparent before:-z-10 before:absolute before:-top-4 before:right-0 
        transition-all duration-150
        `,
        {
          'lg:opacity-0 lg:invisible lg:pointer-events-none': true,
          'lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:pointer-events-auto': true,
          'max-lg:opacity-100 max-lg:visible max-lg:pointer-events-auto':
            isOpen,
          'max-lg:opacity-0 max-lg:invisible max-lg:pointer-events-none':
            !isOpen,
        },
      )}
    >
      <ul className="flex flex-col gap-4">
        {dropdownItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url}
              onClick={onLinkClick}
              className="
                flex items-center text-sm text-secondary-600
                hover:text-secondary-800 transition
              "
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
