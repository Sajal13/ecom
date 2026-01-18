import { LuPhone, LuMail } from 'react-icons/lu';
import AnimatedLink from 'components/base/AnimateLink';

const ContactInfo = () => {
  return (
    <div className="xl:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
        <div className='bg-neutral-50 drop-shadow-xl drop-shadow-secondary-500/10 px-6 md:px-9 py-8 md:py-10 rounded-md'>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary-500 w-10 h-10 rounded-full p-3 text-xl text-neutral-50 flex items-center justify-center">
              <LuPhone />
            </div>
            <p className="font-medium">Call To Us</p>
          </div>
          <p className="text-sm mb-4">
            We are available 24/7, 7 days a week.
          </p>
          <p className="text-sm">
            Phone:
            <AnimatedLink
              href="tel:+1234567890"
              className="ms-2"
              color="secondary"
            >
              +1 234 567 890
            </AnimatedLink>
          </p>
        </div>
        <div className='bg-neutral-50 drop-shadow-xl drop-shadow-secondary-500/10 px-6 md:px-9 py-8 md:py-10 rounded-md'>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary-500 w-10 h-10 rounded-full p-3 text-xl text-neutral-50 flex items-center justify-center">
              <LuMail />
            </div>
            <p className="font-medium">Write To Us</p>
          </div>
          <p className="text-sm mb-4">
            Fill out our form and we will contact you within 24 hours.
          </p>
          <p className="text-sm mb-4">
            Email:
            <AnimatedLink
              href="mailto:contact@example.com"
              className="ms-2"
              color="secondary"
            >
              contact@example.com
            </AnimatedLink>
          </p>
          <p className="text-sm mb-4">
            Email:
            <AnimatedLink
              href="mailto:support@example.com"
              className="ms-2"
              color="secondary"
            >
              support@example.com
            </AnimatedLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
