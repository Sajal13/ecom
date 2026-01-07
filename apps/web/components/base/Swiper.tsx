'use client';

import React, { PropsWithChildren, useRef } from 'react';
import { Swiper as ReactSwiper, SwiperProps as ReactSwiperProps } from 'swiper/react';
import classNames from 'classnames';
import 'swiper/css';
import { PaginationOptions } from 'swiper/types';
import { Pagination } from 'swiper/modules';

interface SwiperProps extends ReactSwiperProps {
  navigationPosition?: React.CSSProperties;
  centeredSlides?: boolean;
  nextButtonClassName?: string;
  prevButtonClassName?: string;
  className?: string;
}

const Swiper = ({
  pagination = false,
  centeredSlides,
  children,
  className,
  ...rest
}: PropsWithChildren<SwiperProps>) => {
  const paginationRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className={classNames('swiper-theme-container w-full h-full relative', className)}>
      {pagination && (
        <div
          ref={paginationRef}
          className="custom-swiper-pagination absolute top-full left-0 w-full flex justify-center gap-2"
        ></div>
      )}
      <ReactSwiper
        loop={true}
        centeredSlides={centeredSlides}
        modules={[Pagination]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.pagination) {
            const pagination = swiper.params.pagination as PaginationOptions;
            pagination.el = paginationRef.current;
          }
        }}
        {...rest}
      >
        {children}
      </ReactSwiper>
    </div>
  );
};

export default Swiper;
