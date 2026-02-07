'use client';

import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Product } from 'types/products';
import Button from 'components/base/Buttons';
import ProductCard from 'components/cards/ProductCard';
import ProductSlider from 'components/common/products/ProductSlider';

interface ExploreProps {
  products: Product[];
}

const Explore = ({ products }: ExploreProps) => {
  return (
    <section className="py-14 md:py-20 lg:py-30">
      <div className="mb-8 md:mb-11 lg:mb-15">
        <ProductSlider
          title="Explore Our Products"
          subTitle="Our Products"
          breakpoints={{
            0: { slidesPerView: 2 },
            560: { slidesPerView: 3 },
            768: { slidesPerView: 3.5 },
            1200: { slidesPerView: 4.4 },
            1400: { slidesPerView: 6 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard productItem={product} />
            </SwiperSlide>
          ))}
        </ProductSlider>
      </div>
      <div className="flex justify-center">
        <Link href="/">
          <Button variant="filled" color="danger">
            VIew All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Explore;
