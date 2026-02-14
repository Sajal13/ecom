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
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 lg:gap-10">
          <div>
            <NewArrivalCard
              product={newArrivalProducts[0]}
              className="min-h-80 lg:min-h-120 h-full"
            />
          </div>
          <div className="grow">
            <div className="row-span-1 mb-6 lg:mb-10">
              <NewArrivalCard
                product={newArrivalProducts[1]}
                className="min-h-65 h-full"
                textClass="max-w-85"
                backgroundPosition="bottom right"
              />
            </div>
            <div className="row-span-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
              {newArrivalProducts.slice(2).map((item) => (
                <NewArrivalCard key={item.id} product={item} className="min-h-65 h-full" />
              ))}
            </div>
          </div>
        </div>
      </ProductList>
    </section>
  );
};

export default NewArrival;
