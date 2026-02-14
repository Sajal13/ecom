'use client';

import { SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { Product } from 'types/products';
import Button from 'components/base/Buttons';
import ProductCard from 'components/cards/ProductCard';
import ProductSliderWithoutTitle from 'components/common/products/ProductSliderWithoutTitle';

interface JustForYouProps {
  products: Product[];
}

const JustForYou = ({ products }: JustForYouProps) => {
  return (
    <div className="pt-8 md:pt-10 lg:pt-16">
      <div className="flex justify-between items-center gap-2 mb-10 md:mb-16 lg:mb-20">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-8 bg-primary-500 rounded-md" />
          <p className={classNames('font-medium flex-1 text-primary-500')}>
            Just For You
          </p>
        </div>
        <Button variant="outlined" color="secondary">
          See All
        </Button>
      </div>
      <ProductSliderWithoutTitle pagination={false}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard productItem={product} />
          </SwiperSlide>
        ))}
      </ProductSliderWithoutTitle>
    </div>
  );
};

export default JustForYou;
