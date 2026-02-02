import { Suspense } from 'react';
import { getCategories, getProducts } from 'actions/products';
import FlashSales from './FlashSales';
import HeroSlider from './HeroSlider';
import BrowseByCategory from './BrowseByCategory';

const HomeContainer = async () => {
  const [products, flashSlashItems, categories] = await Promise.all([
    getProducts({ limit: 6 }),
    getProducts({ limit: 10, skip: 6 }),
    getCategories(),
  ]);
  return (
    <section className="py-10 md:py-16 lg:py-20 container px-6">
      <Suspense
        fallback={
          <div className="h-96 md:h-125 w-full bg-neutral-500 rounded-md" />
        }
      >
        <HeroSlider products={products.products} />
        <FlashSales flashSlashItems={flashSlashItems.products} />
        <hr className="text-neutral-400" />
        <BrowseByCategory categories={categories} />
      </Suspense>
    </section>
  );
};

export default HomeContainer;
