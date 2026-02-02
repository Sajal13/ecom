'use client';

import { IoPhonePortraitOutline } from 'react-icons/io5';
import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import classNames from 'classnames';
import { Category } from 'types/products';
import InfoCard from 'components/cards/InfoCard';
import ProductSlider from 'components/common/products/ProductSlider';

interface BrowseByCategoryProps {
  categories: Category[];
}

const BrowseByCategory = ({ categories }: BrowseByCategoryProps) => {
  return (
    <section className="py-14 md:py-20 lg:py-30">
      <ProductSlider
        title="Browse By Category"
        subTitle="Categories"
        breakpoints={{
          0: { slidesPerView: 2 },
          560: { slidesPerView: 3 },
          768: { slidesPerView: 3.5 },
          1200: { slidesPerView: 5.3 },
          1400: { slidesPerView: 6 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link href="/category">
              <InfoCard border size="small">
                <div className="text-center flex flex-col items-center justify-center">
                  <div
                    className={classNames(`  text-secondary-800
                      group-hover:text-secondary-50 flex items-center justify-center text-4xl mb-4`)}
                  >
                    <IoPhonePortraitOutline className="" size={56} />
                  </div>
                  <p className="text-secondary-900 group-hover:text-secondary-50 text-sm line-clamp-1">
                    {category.name.length > 14 ? `${category.name.slice(0, 14)}...` : category.name}
                  </p>
                </div>
              </InfoCard>
            </Link>
          </SwiperSlide>
        ))}
      </ProductSlider>
    </section>
  );
};

export default BrowseByCategory;
