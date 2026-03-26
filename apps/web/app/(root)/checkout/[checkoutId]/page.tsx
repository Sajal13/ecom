import React from 'react';
import CheckoutContainer from 'components/pages/root/checkout';

interface Props {
  params: Promise<{checkoutId: string}>
}

const page = async ({ params }: Props) => {
  const { checkoutId } = await params;

  return <CheckoutContainer />;
};

export default page;
