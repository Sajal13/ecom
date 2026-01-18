'use client';

import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('./LocationMap'), { ssr: false });

const LocationMapContainer = () => {
  return <LocationMap />;
};

export default LocationMapContainer;
