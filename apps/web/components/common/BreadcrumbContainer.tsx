'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbNavItem, Color } from 'types/common';
import Breadcrumb from 'components/base/Breadcrumb';

interface BreadcrumbContainerProps {
  className?: string;
  linkColor?: Color;
}

const BreadcrumbContainer = ({
  className,
  linkColor,
}: BreadcrumbContainerProps) => {
  const pathName = usePathname();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    BreadcrumbNavItem[] | null
  >([]);

  useEffect(() => {
    const newPathName = pathName.split('/');
    const navItems: BreadcrumbNavItem[] = newPathName.map((path, index) => {
      return {
        id: index,
        title:
          newPathName[index] === ''
            ? 'Home'
            : newPathName[index].charAt(0).toUpperCase() +
              newPathName[index].slice(1),
        link: '/' + newPathName.slice(1, index + 1).join('/'),
      };
    });
    setBreadcrumbItems(navItems);
  }, [pathName]);
  return (
    <>
      {breadcrumbItems && breadcrumbItems.length > 0 && (
        <Breadcrumb
          navItems={breadcrumbItems}
          className={className}
          linkColor={linkColor}
        />
      )}
    </>
  );
};

export default BreadcrumbContainer;
