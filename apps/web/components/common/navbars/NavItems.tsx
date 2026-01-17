import { mainNavItems } from 'data/common';
import { useNavbar } from 'lib/zustand/useNavbar';
import AnimatedLink from 'components/base/AnimateLink';

const NavItems = () => {
  const { closeMobileNav } = useNavbar();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeMobileNav();
    }
  };
  return (
    <ul className="lg:flex lg:items-center lg:gap-4">
      {mainNavItems.map((navItem) => (
        <li key={navItem.id} className="py-2 px-4" onClick={handleLinkClick}>
          <AnimatedLink
            href={navItem.url}
            className="text-lg "
            color="secondary"
            position="center"
          >
            {navItem.label}
          </AnimatedLink>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
