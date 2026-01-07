
import { getProducts } from 'actions/products';
import ProductCard from 'components/cards/ProductCard';
import { Product } from 'types/products';


const HeroSlider = async () => {
  const data  = await getProducts({ limit: 10}); 
  const products: Product[] = data.products;
  
  console.log(products)

  console.log(data);
  return (
    <>
      {products.map(product => (
        <ProductCard key={product.id} productItem={product} />
      ))}
    </>
  )
}

export default HeroSlider