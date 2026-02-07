import { Product } from 'types/products';
import ProductCard from 'components/cards/ProductCard';
import ProductList from 'components/common/products/ProductList';

interface BestSellingProductsProps {
  bestSellingProducts: Product[];
}

const BestSellingProducts = ({
  bestSellingProducts,
}: BestSellingProductsProps) => {
  return (
    <section className="py-14 md:py-20 lg:py-30">
      <ProductList
        subTitle="This Month"
        title="Best Selling Products"
        url="/"
        buttonText="View All"
        variant="filled"
        color="danger"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 lg:gap-12 xl:gap-16">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} productItem={product} />
          ))}
        </div>
      </ProductList>
    </section>
  );
};

export default BestSellingProducts;
