'use client';

import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Category } from 'types/products';

const ITEM_WIDTH = 115;
const MORE_WIDTH = 60;

interface ResizableNavbarProps {
  navItems: Category[];
}

export default function ResizableNavbar({ navItems }: ResizableNavbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const [visible, setVisible] = useState<Category[]>([]);
  const [overflow, setOverflow] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);

  /* -----------------------------
     Calculate visible items
  ------------------------------*/
  const calculate = () => {
    if (!ref.current) return;

    const width = ref.current.offsetWidth;

    if (width === 0) return; // prevent early calculation

    const max = Math.max(0, Math.floor((width - MORE_WIDTH) / ITEM_WIDTH));

    setVisible(navItems.slice(0, max));
    setOverflow(navItems.slice(max));
  };

  /* -----------------------------
     ResizeObserver (BEST way)
  ------------------------------*/
  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver(() => {
      calculate();
    });

    observer.observe(ref.current);

    // initial run
    calculate();

    return () => observer.disconnect();
  }, [navItems]);

  /* -----------------------------
     Active states
  ------------------------------*/
  const isActive = (slug: string) => pathname.startsWith(`/category/${slug}`);

  const isMoreActive = overflow.some((item) =>
    pathname.startsWith(`/category/${item.slug}`),
  );

  /* Click outside dropdown close */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* -----------------------------
     Render
  ------------------------------*/
  return (
    <div className="container px-6 py-4 h-14">
      <div ref={ref} className="flex gap-4 relative items-center">
        {/* Visible Items */}
        {visible.map((item) => (
          <Link
            key={item.slug}
            href={`/category/${item.slug}`}
            className={classNames('whitespace-nowrap', {
              'text-success-600': isActive(item.slug),
            })}
          >
            {item.name}
          </Link>
        ))}

        {/* More Dropdown */}
        {overflow.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((p) => !p)}
              className={classNames('flex items-center gap-1', {
                'text-success-600': isMoreActive || open,
              })}
            >
              More{' '}
              <FaAngleDown
                className={classNames(
                  'transition-transform duration-300 ease-linear',
                  {
                    'rotate-180': open,
                  },
                )}
              />
            </button>

            {open && (
              <div className="absolute mt-2 w-56 top-8 right-0 bg-white shadow-md rounded-md z-20 max-h-80 overflow-y-auto">
                {overflow.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/category/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className={classNames('block px-4 py-2 hover:bg-gray-100', {
                      'text-success-600': isActive(item.slug),
                    })}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
