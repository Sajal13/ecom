import BreadcrumbContainer from 'components/common/BreadcrumbContainer';
import Highlights from 'components/common/Highlights';
import Clients from './Clients';
import Info from './Info';
import OurStory from './OurStory';

const AboutContainer = () => {
  return (
    <section className="">
      <BreadcrumbContainer />
      <OurStory />
      <Info />
      <Clients />
      <Highlights />
    </section>
  );
};

export default AboutContainer;
