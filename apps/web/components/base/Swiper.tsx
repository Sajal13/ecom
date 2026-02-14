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
import { twMerge } from 'tailwind-merge';

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
  modules = [],
  onBeforeInit,
  ...rest
}: PropsWithChildren<SwiperProps>) => {
  const paginationRef = useRef<HTMLDivElement | null>(null);

  const paginationClass = twMerge(
    'custom-swiper-pagination',
    'absolute',
    'top-full',
    'left-1/2',
    '-translate-x-1/2',
    'rounded-full',
    'flex',
    'justify-center',
    'items-center',
    'gap-2',
    'cursor-pointer',
    'z-10',
    'mt-10',
    paginationClassName,
  );

  // Determine if pagination should be shown
  const showPagination = pagination !== false;

  // Build pagination config
  const paginationConfig = showPagination
    ? {
        el: paginationRef.current,
        clickable: typeof pagination === 'object' ? pagination.clickable : true,
        ...(typeof pagination === 'object' ? pagination : {}),
      }
    : false;

  const handleBeforeInit = (swiper: any) => {
    // Call the parent's onBeforeInit first (for navigation setup)
    if (onBeforeInit) {
      onBeforeInit(swiper);
    }

    // Then set up pagination
    if (swiper.params.pagination && paginationRef.current) {
      const paginationParams = swiper.params.pagination as PaginationOptions;
      paginationParams.el = paginationRef.current;
      paginationParams.clickable = true;
    }
  };

  return (
    <div
      className={classNames(
        'swiper-theme-container w-full h-full relative',
        className,
      )}
    >
      {showPagination && (
        <div ref={paginationRef} className={paginationClass}></div>
      )}
      <ReactSwiper
        loop={true}
        centeredSlides={centeredSlides}
        modules={modules}
        pagination={paginationConfig}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        onBeforeInit={handleBeforeInit}
        {...rest}
      >
        {children}
      </ReactSwiper>
    </div>
  );
};

export default Swiper;
