import React from 'react';
import { Product } from 'types/products';
import NewArrivalCard from 'components/cards/NewArrivalCard';
import ProductList from 'components/common/products/ProductList';

interface NewArrivalProps {
  newArrivalProducts: Product[];
}

const NewArrival = ({ newArrivalProducts }: NewArrivalProps) => {
  return (
    <section className="py-14 md:py-20 lg:py-30">
      <ProductList
        subTitle="FeaturedThis Month"
        title="New Arrival"
        showButton={false}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 md:gap-10">
          <NewArrivalCard
            product={newArrivalProducts[0]}
            className="min-h-80"
          />
        </div>
      </ProductList>
    </section>
  );
};

export default NewArrival;
