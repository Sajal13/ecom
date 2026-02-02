'use client';

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react';
import { FaAngleDown } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Category } from 'types/products';
import AnimatedLink from 'components/base/AnimateLink';
import Button from 'components/base/Buttons';

interface ResizableNavProps {
  navItems: Category[];
}

const ResizableNavbar = ({ navItems }: ResizableNavProps) => {
  const pathname = usePathname();
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMoreSlugActive, setIsMoreSlugActive] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const moreBtnRef = useRef<HTMLLIElement | null>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const dropdownItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const updateItems = useCallback(() => {
    if (!containerRef.current || !moreBtnRef.current) {
      return;
    }

    // Reset all items to default state
    moreBtnRef.current.style.display = 'none';
    navItemsRef.current.forEach((item) => {
      if (item) item.style.display = 'list-item';
    });
    dropdownItemsRef.current.forEach((item) => {
      if (item) item.style.display = 'none';
    });

    const containerWidth = containerRef.current.clientWidth;
    const moreBtnWidth = moreBtnRef.current.clientWidth;
    let totalVisibleWidth = 0;
    const gapWidth = 20;
    let hasActiveDropdownItem = false;

    // Determine which items fit in the navbar
    for (let i = 0; i < navItemsRef.current.length; i++) {
      const navItem = navItemsRef.current[i];
      if (!navItem) continue;

      const newTotalWidth =
        totalVisibleWidth + navItem.clientWidth + gapWidth + 4;

      // Check if this item (plus More button) exceeds container width
      if (newTotalWidth + moreBtnWidth > containerWidth) {
        // Show More button and move remaining items to dropdown
        moreBtnRef.current.style.display = 'block';

        for (let j = i; j < navItemsRef.current.length; j++) {
          const itemToHide = navItemsRef.current[j];
          const dropdownItemToShow = dropdownItemsRef.current[j];

          if (itemToHide) itemToHide.style.display = 'none';
          if (dropdownItemToShow) dropdownItemToShow.style.display = 'block';

          // Check if the active page is in the dropdown
          const itemSlug = navItems[j].slug;
          if (pathname.startsWith(`/category/${itemSlug}`)) {
            hasActiveDropdownItem = true;
          }
        }
        break;
      } else {
        totalVisibleWidth = newTotalWidth;
      }
    }

    // Update More button active state
    setIsMoreSlugActive(hasActiveDropdownItem);
  }, [navItems, pathname]);

  // Run sizing logic before browser paint
  useLayoutEffect(() => {
    updateItems();
  }, [updateItems]);

  // Handle window resize with debouncing
  useLayoutEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateItems();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [updateItems]);

  // Recalculate when dropdown state changes
  useEffect(() => {
    if (isMoreDropdownOpen) {
      updateItems();
    }
  }, [isMoreDropdownOpen, updateItems]);

  const handleDropdownItemClick = () => {
    setIsMoreDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsMoreDropdownOpen((prev) => !prev);
  };

  const isNavItemActive = (slug: string) => {
    return pathname.startsWith(`/category/${slug}`);
  };

  return (
    <div className="container px-6">
      <div
        className="relative flex justify-between items-center w-full max-w-screen"
        ref={containerRef}
      >
        <ul className="flex items-center gap-3 sm:gap-5">
          {/* Main Navigation Items */}
          {navItems.map((item, index) => (
            <li
              key={item.slug}
              ref={(el) => {
                navItemsRef.current[index] = el;
              }}
              className="relative group py-1.5"
            >
              <AnimatedLink
                href={`/category/${item.slug}`}
                color={isNavItemActive(item.slug) ? 'success' : 'secondary'}
                className={classNames(
                  'text-nowrap duration-50 hover:text-success-600 font-normal',
                  {
                    'text-success-600': isNavItemActive(item.slug),
                  },
                )}
              >
                {item.name.slice(0, 90)}
              </AnimatedLink>
            </li>
          ))}

          {/* More Dropdown Button */}
          <li ref={moreBtnRef} className="relative" style={{ display: 'none' }}>
            <Button
              onClick={toggleDropdown}
              className={classNames(
                'px-0 py-2 items-center gap-2 font-normal transition-colors hover:bg-transparent duration-200 focus:outline-none',
                {
                  'text-success-600': isMoreDropdownOpen || isMoreSlugActive,
                  'text-secondary-800 hover:text-success-600':
                    !isMoreDropdownOpen && !isMoreSlugActive,
                },
              )}
            >
              More
              <FaAngleDown
                className={classNames(
                  'text-sm transform transition-transform duration-200',
                  {
                    'rotate-180': isMoreDropdownOpen,
                  },
                )}
              />
            </Button>

            {/* Dropdown Menu */}
            {isMoreDropdownOpen && (
              <div className="absolute -right-5 mt-2 w-60 bg-neutral-100 border border-neutral-200 rounded-md shadow-lg py-1 z-20 max-h-125 overflow-y-auto overflow-x-hidden">
                {navItems.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/category/${item.slug}`}
                    ref={(el) => {
                      dropdownItemsRef.current[index] = el;
                    }}
                    style={{ display: 'none' }}
                    className={classNames(
                      'block px-4 py-2 sm:py-3 text-primary hover:bg-neutral-300',
                      {
                        'bg-info-200 text-success-600': isNavItemActive(
                          item.slug,
                        ),
                      },
                    )}
                    onClick={handleDropdownItemClick}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResizableNavbar;
