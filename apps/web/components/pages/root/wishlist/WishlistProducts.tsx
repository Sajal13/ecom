'use client';

import { useRef, useEffect } from 'react';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { NavigationOptions } from 'swiper/types';
import { Product } from 'types/products';
import Button from 'components/base/Buttons';
import Swiper from 'components/base/Swiper';
import WishlistCard from 'components/cards/WishlistCard';

interface WishlistProductsProps {
  wishlistProduct: Product[];
}

const WishlistProducts = ({ wishlistProduct }: WishlistProductsProps) => {
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (swiperRef.current) {
          if (swiperRef.current.params.navigation) {
            const navigation = swiperRef.current.params
              .navigation as NavigationOptions;
            navigation.prevEl = navigationPrevRef.current;
            navigation.nextEl = navigationNextRef.current;
          }

          swiperRef.current.navigation?.destroy();
          swiperRef.current.navigation?.init();
          swiperRef.current.navigation?.update();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const handleSwiperInit = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    if (swiper.params.navigation) {
      const navigation = swiper.params.navigation as NavigationOptions;
      navigation.prevEl = navigationPrevRef.current;
      navigation.nextEl = navigationNextRef.current;
    }
    swiper.navigation?.init();
    swiper.navigation?.update();
  };

  return (
    <div className="relative mb-10 md:mb-14 lg:mb-16">
      <div className="swiper-nav">
        <Button
          ref={navigationPrevRef}
          size="small"
          shape="circle"
          variant="filled"
          className="p-2 absolute -left-5 top-1/2 -translate-y-1/2 z-20"
        >
          <IoChevronBackSharp size={16} />
        </Button>
        <Button
          ref={navigationNextRef}
          size="small"
          shape="circle"
          variant="filled"
          className="p-2 absolute -right-5 top-1/2 -translate-y-1/2 z-20"
        >
          <IoChevronForwardSharp size={16} />
        </Button>
      </div>
      <Swiper
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        modules={[Pagination, Autoplay, Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={true}
        breakpoints={{
          375: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        grabCursor={true}
        freeMode={true}
        onBeforeInit={handleSwiperInit}
        onResize={(swiper) => {
          swiper.navigation?.update();
        }}
      >
        {wishlistProduct.map((item) => (
          <SwiperSlide key={item.id}>
            <WishlistCard productItem={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WishlistProducts;
