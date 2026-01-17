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

// Define the type for the component props
interface ResizableNavProps {
  navItems: Category[];
}

const ResizableNavbar = ({ navItems }: ResizableNavProps) => {
  const pathname = usePathname();
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const moreBtnRef = useRef<HTMLLIElement | null>(null);
  const navItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const dropdownItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Function to dynamically show/hide nav items based on container width
  const updateItems = useCallback(() => {
    // If refs are not available, exit early
    if (!containerRef.current || !moreBtnRef.current) {
      return;
    }

    // Reset all items to visible and hide the dropdown button for recalculation
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
    const gapWidth = 20; // Tailwind's `gap-5` is 20px

    // Iterate through nav items to determine which ones fit
    for (let i = 0; i < navItemsRef.current.length; i++) {
      const navItem = navItemsRef.current[i];
      if (navItem) {
        const newTotalWidth =
          totalVisibleWidth + navItem.clientWidth + gapWidth + 30;

        // The check should be: does `newTotalWidth` + `moreBtnWidth` fit inside the container?
        if (newTotalWidth + moreBtnWidth > containerWidth) {
          // If not, this item and all subsequent items need to be moved
          // into the dropdown.
          moreBtnRef.current.style.display = 'block';
          for (let j = i; j < navItemsRef.current.length; j++) {
            const itemToHide = navItemsRef.current[j];
            const dropdownItemToShow = dropdownItemsRef.current[j];
            if (itemToHide) itemToHide.style.display = 'none';
            if (dropdownItemToShow) dropdownItemToShow.style.display = 'block';
          }
          break; // Exit the loop once the dropdown is needed
        } else {
          // This item fits, so update the total visible width
          totalVisibleWidth = newTotalWidth;
        }
      }
    }
  }, []);

  // Use `useLayoutEffect` to run the sizing logic before the browser paints
  useLayoutEffect(() => {
    updateItems();
  }, [updateItems]);

  // Add a resize listener to re-run the sizing logic whenever the window changes size
  useLayoutEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateItems();
      }, 100); // Debounce the resize event for performance
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [updateItems]);

  // This is the new useEffect hook that fixes the issue.
  // It calls `updateItems` whenever the dropdown is toggled.
  useEffect(() => {
    if (isMoreDropdownOpen) {
      updateItems();
    }
  }, [isMoreDropdownOpen, updateItems]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='container'>
      <div
        className="relative flex justify-between items-center w-full max-w-screen"
        ref={containerRef}
      >
        {/* This ul holds the main navigation links */}
        <ul className="flex items-center gap-3 sm:gap-5">
          {navItems.map((item, index) => (
            <li
              key={item.slug}
              ref={(el: HTMLLIElement) => {
                navItemsRef.current[index] = el;
              }}
              className="relative group py-1.5"
            >
              <AnimatedLink
                href={`/category/${item.slug}`}
                color={
                  pathname.startsWith(`/category/${item.slug}`)
                    ? 'success'
                    : 'secondary'
                }
                className={classNames('font-normal text-nowrap', {
                  'font-medium text-success-600!': pathname.startsWith(
                    `/category/${item.slug}`,
                  ),
                })}
              >
                {item.name.slice(0, 90)}
              </AnimatedLink>

              {/* {item.subCategories && (
              <ul className="absolute hidden group-hover:block left-auto top-8 w-50 bg-neutral-100 rounded-lg border border-neutral-200 shadow py-2">
                {item.subCategories.map((sub) => (
                  <li
                    key={sub.id}
                    className={classNames(
                      'block py-2 px-4 text-sm text-primary hover:bg-neutral-300',
                      {
                        'font-medium text-green-600!':
                          isClient && pathname === `/category/${item.slug}/${sub.slug}`,
                      },
                    )}
                  >
                    <Link href={`/category/${item.slug}/${sub.slug}`}>{sub.name}</Link>
                  </li>
                ))}
              </ul>
            )} */}
            </li>
          ))}

          {/* This li contains the "More" dropdown button and menu */}
          <li
            ref={moreBtnRef}
            className="relative"
            // The `style` attribute is used here to dynamically hide/show the button
            style={{ display: 'none' }}
          >
            <Button
              onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
              className="px-0 py-2 items-center gap-2 text-secondary-800 hover:text-secondary-900 font-normal transition-colors hover:bg-transparent duration-200 focus:outline-none"
            >
              More
              <FaAngleDown
                className={`text-sm transform transition-transform duration-200 ${
                  isMoreDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </Button>

            {/* Dropdown Menu */}
            {isMoreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-neutral-100 border border-neutral-200 rounded-md shadow-lg py-1 z-20 max-h-125 overflow-y-auto overflow-x-hidden">
                {navItems.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`category/${item.slug}`}
                    ref={(el: HTMLAnchorElement) => {
                      dropdownItemsRef.current[index] = el;
                    }}
                    style={{ display: 'none' }}
                    className={`block px-4 py-2 sm:py-3 text-primary hover:bg-neutral-300  ${
                      pathname === `/category/${item.slug}`
                        ? 'bg-info-200 text-info-600 font-semibold'
                        : ''
                    }`}
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
