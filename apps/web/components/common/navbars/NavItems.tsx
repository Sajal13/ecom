import { mainNavItems } from 'data/common';
import AnimatedLink from 'components/base/AnimateLink';

const NavItems = () => {
  return (
    <ul className="lg:flex lg:items-center lg:gap-4">
      {mainNavItems.map((navItem) => (
        <li key={navItem.id} className="py-2 px-4">
          <AnimatedLink
            href={navItem.url}
            className="text-lg  text-secondary-500 font-medium"
            color="bg-secondary-500"
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
