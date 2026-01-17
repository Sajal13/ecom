'use client';

import React, { PropsWithChildren, useRef } from 'react';
import {
  Swiper as ReactSwiper,
  SwiperProps as ReactSwiperProps,
} from 'swiper/react';
import classNames from 'classnames';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { PaginationOptions } from 'swiper/types';

interface SwiperProps extends ReactSwiperProps {
  navigationPosition?: React.CSSProperties;
  paginationClassName?: string;
  centeredSlides?: boolean;
  nextButtonClassName?: string;
  prevButtonClassName?: string;
  className?: string;
}

const Swiper = ({
  pagination = false,
  centeredSlides,
  paginationClassName,
  children,
  className,
  ...rest
}: PropsWithChildren<SwiperProps>) => {
  const paginationRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={classNames(
        'swiper-theme-container w-full h-full relative',
        className,
      )}
    >
      {pagination && (
        <div
          ref={paginationRef}
          className={classNames(
            `custom-swiper-pagination absolute top-full left-1/2 -translate-x-1/2 
            rounded-full flex justify-center items-center gap-2 cursor-pointer z-10 mt-10`,
            paginationClassName,
          )}
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
            pagination.clickable = true;
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
