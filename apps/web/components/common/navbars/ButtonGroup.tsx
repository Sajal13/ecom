'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import Link from 'next/link';
import classNames from 'classnames';

import { dropdownItems } from 'data/common';
import Button from 'components/base/Buttons';
import ThemeTogglerButton from './ThemeTogglerButton';

interface ButtonGroupProps {
  className?: string;
  isMobileNavOpen?: boolean;
  setMobileNavOpen?: Dispatch<SetStateAction<boolean>>;
}

const ButtonGroup = ({ className }: ButtonGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* -----------------------------
   Close dropdown on outside click
  ------------------------------*/
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
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
        className
      )}
    >
      <Button size="small" shape="circle" color="secondary">
        <FaRegHeart className="text-xl" />
      </Button>

      <Button
        size="small"
        shape="circle"
        color="secondary"
        className="max-lg:hidden"
      >
        <FaCartShopping className="text-xl" />
      </Button>

      <div className="max-lg:hidden">
        <ThemeTogglerButton />
      </div>

      {/* USER DROPDOWN */}
      <div
        ref={wrapperRef}
        className="relative group"
        onMouseEnter={() => window.innerWidth >= 1024 && setIsOpen(true)}
        onMouseLeave={() => window.innerWidth >= 1024 && setIsOpen(false)}
      >
        <Button
          size="small"
          shape="circle"
          color="secondary"
          onClick={() => window.innerWidth < 1024 && setIsOpen((p) => !p)}
        >
          <FaUser className="text-xl" />
        </Button>

        <AvatarDropdown isOpen={isOpen} />
      </div>
    </div>
  );
};

export default ButtonGroup;

const AvatarDropdown = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        absolute right-0 top-10 z-50 mt-2 w-64 rounded-xl px-5 py-4 lg:group-hover:block bg-neutral-50
        backdrop-blur-md shadow-lg max-lg:bottom-12 max-lg:top-auto before:content-[''] before:h-5 before:w-40  
        before:bg-transparent before:-z-10 before:absolute before:-top-4 before:right-0
      "
    >
      <ul className="flex flex-col gap-4">
        {dropdownItems.map((item) => (
          <li key={item.id}>
            <Link
              href={item.url}
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
