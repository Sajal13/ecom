import { BreadcrumbNavItem } from 'types/common';
import BreadcrumbContainer from 'components/common/BreadcrumbContainer';
import Highlights from 'components/common/Highlights';
import Clients from './Clients';
import Info from './Info';
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
    <section className="py-10 md:py-16 lg:py-20 container">
      <BreadcrumbContainer className="mb-6 md:mb-10" />
      <OurStory />
      <Info />
      <Clients />
      <Highlights />
    </section>
  );
};

export default AboutContainer;
