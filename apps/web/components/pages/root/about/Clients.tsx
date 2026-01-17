'use client';

import { SwiperSlide } from 'swiper/react';
import { clients } from 'data/pages/about';
import { Autoplay, Pagination } from 'swiper/modules';
import Swiper from 'components/base/Swiper';
import ClientCard from 'components/cards/ClientCard';

const Clients = () => {
  return (
    <div className="py-10 md:py-14 lg:py-16 container">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={16}
        slidesPerView={3}
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
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        freeMode={true}
      >
        {clients.map((client) => (
          <SwiperSlide key={client.id}>
            <ClientCard key={client.id} client={client} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Clients;
