import { Suspense } from 'react';
import {
  getCategories,
  getHighlightedItem,
  getProducts,
} from 'actions/products';
import Banner from './Banner';
import BestSellingProducts from './BestSellingProducts';
import BrowseByCategory from './BrowseByCategory';
import Explore from './Explore';
import FlashSales from './FlashSales';
import HeroSlider from './HeroSlider';
import NewArrival from './NewArrival';

const HomeContainer = async () => {
  const [
    products,
    flashSlashItems,
    categories,
    bestSelling,
    highlightedItem,
    allProducts,
    newArrival
  ] = await Promise.all([
    getProducts({ limit: 6 }),
    getProducts({ limit: 10, skip: 6 }),
    getCategories(),
    getProducts({ limit: 12, skip: 16 }),
    getHighlightedItem(),
    getProducts({ limit: 20 }),
    getProducts({ limit: 4})
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
        <hr className="text-neutral-400" />
        <BestSellingProducts bestSellingProducts={bestSelling.products} />
        <Banner highlightedItem={highlightedItem} />
        <Explore products={allProducts.products} />
        <NewArrival newArrivalProducts={newArrival.products} />
      </Suspense>
    </section>
  );
};

export default HomeContainer;
