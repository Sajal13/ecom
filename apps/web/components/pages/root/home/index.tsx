import { getProducts } from 'actions/products';
import { Suspense } from 'react';
import HeroSlider from './HeroSlider';

const HomeContainer = async () => {
  const [products] = await Promise.all([getProducts({ limit: 6 })]);
  return <section className="py-10 md:py-16 lg:py-20 container px-6">
    <Suspense fallback={<div className='h-96 md:h-125 w-full bg-neutral-500 rounded-md' />}>
      <HeroSlider products={products.products} />
    </Suspense>
  </section>;
};

export default HomeContainer;
