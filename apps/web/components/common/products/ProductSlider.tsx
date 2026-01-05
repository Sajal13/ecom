'use client';

import React, { PropsWithChildren, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import classNames from 'classnames';
import { Duration } from 'dayjs/plugin/duration';
import { Navigation, Pagination } from 'swiper/modules';
import { NavigationOptions } from 'swiper/types';
import Button from 'components/base/Buttons';
import Swiper from 'components/base/Swiper';
import CountDown from '../CountDown';

interface ProductSliderProps {
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
  productPerSlide?: number;
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
  productPerSlide,
  children,
}: PropsWithChildren<ProductSliderProps>) => {
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {subTitle && (
        <div className="flex items-center gap-2.5 mb-2.5 md:mb-3 lg:mb-4">
          <div className="w-5 h-8 bg-primary-500 rounded-md" />
          <p className={classNames('font-medium flex-1 text-primary-500', subTitleClassName)}>
            {subTitle}
          </p>
        </div>
      )}
      <div className="flex justify-between items-center mb-7 md:mb-9 lg:mb-10">
        <div
          className={classNames({
            'flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-20': showCountdown,
          })}
        >
          <h3 className={classNames('text-2xl md:text-3xl lg:text-4xl', titleClassName)}>
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
                'rounded-full swiper-button-prev p-2 bg-neutral-200 text-neutral-900 md:text-lg lg:text-2xl',
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
                'rounded-full swiper-button-next p-2 bg-neutral-200 text-neutral-900 md:text-lg lg:text-2xl',
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
        loop={false}
        slidesPerView={productPerSlide ?? 4}
        spaceBetween={16}
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        breakpoints={{
          375: {
            slidesPerView: 1
          },
          560: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4.3
          }
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.prevEl = navigationPrevRef.current;
            navigation.nextEl = navigationNextRef.current;
          }
        }}
      >
        {children}
      </Swiper>
    </>
  );
};

export default ProductSlider;
