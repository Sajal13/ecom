'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import { Product } from 'types/products';
import Button from 'components/base/Buttons';
import CountDown from 'components/common/CountDown';

interface BannerProps {
  highlightedItem: Product;
}

const Banner = ({ highlightedItem }: BannerProps) => {
  return (
    <section className="py-8 md:py-12 lg:py-14 px-6 md:px-10 lg:px-12 bg-black grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8 xl:gap-12">
      <div>
        <p className="text-success-500 mb-4 md:mb-6 lg:mb-8 capitalize">
          {highlightedItem.category}
        </p>
        <h2 className="text-white mb-4 md:mb-6 lg:mb-8">
          {highlightedItem.title}
        </h2>
        <CountDown
          shape="circle"
          rootClass="mb-6 md:mb-8 lg:mb-10"
          timeDuration={dayjs.duration({
            days: 5,
            hours: 23,
            minutes: 59,
            seconds: 35,
          })}
        />
        <Button variant="filled" color="success">
          Buy Now
        </Button>
      </div>
      <div className="relative w-full h-105">
        <Image
          src={highlightedItem.thumbnail}
          alt={highlightedItem.title}
          fill
          loading="eager"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="drop-shadow-2xl drop-shadow-white/30 rounded-md object-contain"
        />
      </div>
    </section>
  );
};

export default Banner;
