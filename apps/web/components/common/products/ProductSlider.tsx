'use client';

import React, { PropsWithChildren, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { SwiperProps } from 'swiper/react';
import classNames from 'classnames';
import { Duration } from 'dayjs/plugin/duration';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { NavigationOptions } from 'swiper/types';
import Button from 'components/base/Buttons';
import Swiper from 'components/base/Swiper';
import CountDown from '../CountDown';

interface ProductSliderProps extends SwiperProps {
  title: string;
  titleClassName?: string;
  subTitle?: string;
  subTitleClassName?: string;
  navigation?: boolean;
  navigationPosition?: React.CSSProperties;
  nextButtonClassName?: string;
  prevButtonClassName?: string;
  showCountdown?: boolean;
  timeDuration?: Duration;
}

const ProductSlider = ({
  title,
  titleClassName,
  subTitle,
  subTitleClassName,
  navigation = true,
  navigationPosition,
  nextButtonClassName,
  prevButtonClassName,
  showCountdown = false,
  timeDuration,
  children,
  ...rest
}: PropsWithChildren<ProductSliderProps>) => {
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
    <>
      {subTitle && (
        <div className="flex items-center gap-2.5 mb-2.5 md:mb-3 lg:mb-4">
          <div className="w-5 h-8 bg-primary-500 rounded-md" />
          <p
            className={classNames(
              'font-medium flex-1 text-primary-500',
              subTitleClassName,
            )}
          >
            {subTitle}
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-between items-end lg:items-center gap-4 mb-7 md:mb-9 lg:mb-10">
        <div
          className={classNames({
            'flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-10 xl:gap-20':
              showCountdown,
          })}
        >
          <h3
            className={classNames(
              'text-2xl md:text-3xl lg:text-4xl',
              titleClassName,
            )}
          >
            {title}
          </h3>
          {showCountdown && <CountDown timeDuration={timeDuration} />}
        </div>

        {/* Navigation Buttons */}
        {navigation && (
          <div className="swiper-nav flex gap-2 items-center">
            <Button
              ref={navigationPrevRef}
              shape="circle"
              size="large"
              className={classNames(
                'rounded-full swiper-button-prev p-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 md:text-lg lg:text-2xl',
                prevButtonClassName,
              )}
              style={navigationPosition}
            >
              <FaArrowLeft />
            </Button>
            <Button
              ref={navigationNextRef}
              shape="circle"
              size="large"
              className={classNames(
                'rounded-full swiper-button-next p-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-900 md:text-lg lg:text-2xl',
                nextButtonClassName,
              )}
              style={navigationPosition}
            >
              <FaArrowRight />
            </Button>
          </div>
        )}
      </div>

      <Swiper
        loop={true}
        slidesPerView={4}
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={handleSwiperInit}
        onResize={(swiper) => {
          swiper.navigation?.update();
        }}
        {...rest}
      >
        {children}
      </Swiper>
    </>
  );
};

export default ProductSlider;
