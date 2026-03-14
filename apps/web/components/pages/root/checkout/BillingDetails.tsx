'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  billingDetailsSchema,
  BillingDetailsSchemaType,
} from 'lib/schemas/billingDetails';
import BillingDetailsForm from './BillingDetailsForm';
import BillingPaidMethod from './BillingPaidMethod';

const BillingDetails = () => {
  const method = useForm<BillingDetailsSchemaType>({
    resolver: zodResolver(billingDetailsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      town: '',
      zip: '',
      saveInfo: false,
      paymentMethod: 'cod',
    },
  });
  const { handleSubmit, reset } = method;

  const onSubmit = (data: BillingDetailsSchemaType) => {
    console.log(data);
    reset();
  };
  return (
    <FormProvider {...method}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20"
      >
        <BillingDetailsForm />
        <BillingPaidMethod />
      </form>
    </FormProvider>
  );
};

export default BillingDetails;
