import Breadcrumb from 'components/base/Breadcrumb';
import HeroSlider from './HeroSlider';
import { BreadcrumbNavItem } from 'types/common';

const navItems: BreadcrumbNavItem[] = [
  {
    id: 1,
    title: 'Home',
    link: '/'
  },
  {
    id: 2,
    title: 'About',
    link: '#'
  }
]

const HomeContainer = () => {
  return (
    <>
      <p>All products</p>

      <Breadcrumb navItems={navItems} />
      <HeroSlider />
    </>
  );
};

export default HomeContainer;
