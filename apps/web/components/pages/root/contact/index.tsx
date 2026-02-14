import { Suspense } from 'react';
import BreadcrumbContainer from 'components/common/BreadcrumbContainer';
import Highlights from 'components/common/Highlights';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import LocationMapContainer from './LocationMapContainer';

const ContactContainer = () => {
  return (
    <section className="">
      <BreadcrumbContainer />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
        <ContactInfo />
        <ContactForm />
      </div>
      <Suspense fallback={<div className="h-96 lg:h-125 w-full bg-neutral-100 rounded-md animate-pulse" />}>
        <LocationMapContainer />
      </Suspense>
      <Highlights />
    </section>
  );
};

export default ContactContainer;
