'use client';

import { products } from 'data/product';
import ProductCard from 'components/cards/ProductCard';
import ProductSlider from 'components/common/products/ProductSlider';
import { SwiperSlide } from 'swiper/react';

const HomeContainer = () => {
  return (
    <>
      <p>All products</p>
      <ProductSlider title='Today’s' subTitle='Flash Sales'>
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard productItem={product} />
          </SwiperSlide>
        ))}
      </ProductSlider>
    </>
  );
};

export default HomeContainer;
