import { getProducts } from 'actions/products';
import { Product } from 'types/products';
import ProductCard from 'components/cards/ProductCard';
import { Suspense } from 'react';

const HeroSlider = async () => {
  const data = await getProducts({ limit: 10 });
  const products: Product[] = data.products;

  return (
    <>
      <Suspense>
        {products.map((product) => (
          <ProductCard key={product.id} productItem={product} />
        ))}
      </Suspense>
    </>
  );
};

export default HeroSlider;
