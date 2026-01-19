'use client';

import { FaArrowRight } from 'react-icons/fa6';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { Product } from 'types/products';
import AnimatedLink from 'components/base/AnimateLink';
import Swiper from 'components/base/Swiper';

interface HeroSliderProps {
  products: Product[];
}

const HeroSlider = ({ products }: HeroSliderProps) => {
  console.log(products);
  return (
    <div className="w-full">
      <Swiper
        pagination={true}
        loop={true}
        grabCursor={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={16}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        className="bg-secondary-50 rounded-md"
        paginationClassName="top-[93%] mt-0"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="min-h-86 bg-secondary-50 grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 md:gap-6 py-10 px-6 md:py-12 md:px-8 rounded-md">
              <div>
                <p className='text-sm mb-8'>New Arrival ❤️</p>
                <h4 className="text-2xl md:text-3xl mb-4 max-w-md">
                  {product.title}
                </h4>
                <AnimatedLink href="#!" color="secondary">
                  <div className="flex items-center gap-3">
                    <span>Shop Now</span>
                    <FaArrowRight className="text-2xl" />
                  </div>
                </AnimatedLink>
              </div>
              <div className="w-full h-75 relative overflow-hidden">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="rounded-md object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
