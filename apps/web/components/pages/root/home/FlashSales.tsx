'use client';

import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Product } from 'types/products';
import Button from 'components/base/Buttons';
import ProductCard from 'components/cards/ProductCard';
import ProductSlider from 'components/common/products/ProductSlider';

interface FlashSalesProps {
  flashSlashItems: Product[];
}

const FlashSales = ({ flashSlashItems }: FlashSalesProps) => {
  return (
    <section className="py-14 md:py-20 lg:py-30">
      <div className="mb-8 md:mb-11 lg:mb-15">
        <ProductSlider
          subTitle="Today's"
          title="Flash Sales"
          showCountdown={true}
          breakpoints={{
            0: { slidesPerView: 1.4 },
            560: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 4.3 },
          }}
        >
          {flashSlashItems.map((flashItem) => (
            <SwiperSlide key={flashItem.id}>
              <ProductCard productItem={flashItem} />
            </SwiperSlide>
          ))}
        </ProductSlider>
      </div>
      <div className='flex justify-center'>
        <Link href="/">
          <Button variant="filled" color="danger">
            VIew All Products
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FlashSales;
