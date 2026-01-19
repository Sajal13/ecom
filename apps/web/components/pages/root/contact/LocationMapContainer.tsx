'use client';

import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 lg:h-125 w-full bg-neutral-100 rounded-md animate-pulse" />
  ),
});

const LocationMapContainer = () => {
  return <LocationMap />;
};

export default LocationMapContainer;
