import React from 'react';

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { productId } = await params;
  console.log(productId);
  return <div>Product no: {productId}</div>;
};

export default Page;
