import { AiOutlineHome } from 'react-icons/ai';
import { IoChevronForward } from 'react-icons/io5';
import classNames from 'classnames';
import { Color, BreadcrumbNavItem } from 'types/common';
import AnimatedLink from './AnimateLink';

interface BreadcrumbProps {
  navItems: BreadcrumbNavItem[];
  className?: string;
  linkColor?: Color;
}

const Breadcrumb = ({
  navItems,
  className,
  linkColor = 'secondary',
}: BreadcrumbProps) => {
  if (!navItems || navItems.length === 0) {
    return null;
  }

  return (
    <nav className={classNames('flex mb-4', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2 md:space-x-4">
        {navItems.slice(0, navItems.length - 1).map((breadcrumb) => (
          <li key={breadcrumb.id} className="inline-flex items-center">
            <AnimatedLink
              href={breadcrumb.link}
              color={linkColor}
              className="capitalize"
            >
              <div className="flex items-center">
                {breadcrumb.title.toLowerCase() === 'home' ? (
                  <AiOutlineHome className="text-lg me-2 -translate-y-0.5" />
                ) : (
                  <IoChevronForward className="text-lg me-2 -translate-y-0.5" />
                )}
                <span>{breadcrumb.title}</span>
              </div>
            </AnimatedLink>
          </li>
        ))}
        <li className="flex items-center">
          <div className="flex items-center space-x-2 md:space-x-4 text-gray-500 capitalize leading-none">
            <IoChevronForward className="text-lg me-2" />
            <span>{navItems[navItems.length - 1].title}</span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
