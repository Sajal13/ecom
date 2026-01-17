import BreadcrumbContainer from 'components/common/BreadcrumbContainer';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactContainer = () => {
  return (
    <section className="py-10 md:py-16 lg:py-20 container">
      <BreadcrumbContainer className="mb-6 md:mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactContainer;
