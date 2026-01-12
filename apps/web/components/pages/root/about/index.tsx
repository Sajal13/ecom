import { BreadcrumbNavItem } from 'types/common';
import Breadcrumb from 'components/base/Breadcrumb';
import OurStory from './OurStory';

const navItems: BreadcrumbNavItem[] = [
  {
    id: 1,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    title: 'About',
    link: '',
  },
];

const AboutContainer = () => {
  return (
    <div className="py-10 md:py-16 lg:py-20 container px-6 relative">
      <Breadcrumb navItems={navItems} className='mb-6 md:mb-10' />
      <OurStory />
    </div>
  );
};

export default AboutContainer;
