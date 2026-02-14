import React, { Suspense } from 'react';
import { getProducts } from 'actions/products';
import Button from 'components/base/Buttons';
import JustForYou from './JustForYou';
import WishlistProducts from './WishlistProducts';

const WishlistContainer = async () => {
  const [wishListProducts, justForYou] = await Promise.all([
    getProducts({ limit: 10 }),
    getProducts({ limit: 10 }),
  ]);
  return (
    <section>
      <div className="sm:flex sm:flex-row sm:justify-between sm:items-center gap-6 mb-10 md:mb-14 lg:mb-16">
        <h4 className="mb-6 sm:mb-0">WishList (4)</h4>
        <Button variant="outlined" color="secondary">
          Move All to Cart
        </Button>
      </div>
      <Suspense>
        <WishlistProducts wishlistProduct={wishListProducts.products} />
        <JustForYou products={justForYou.products} />
      </Suspense>
    </section>
  );
};

export default WishlistContainer;
