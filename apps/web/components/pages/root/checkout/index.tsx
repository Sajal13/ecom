import React from 'react';
import BreadcrumbContainer from 'components/common/BreadcrumbContainer';
import BillingDetails from './BillingDetails';

const CheckoutContainer = () => {
  return (
    <section>
      <BreadcrumbContainer className='mb-10 md:mb-14 lg:mb-20' />
      <h3 className='mb-6 md:mb-9 lg:mb-12'> Billing Details</h3>
      <BillingDetails />
    </section>
  );
};

export default CheckoutContainer;
