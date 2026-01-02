import { FaRegHeart, FaRegEye } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import image1 from 'assets/images/products/1.png';
import { Product } from 'types/products';
import AnimatedLink from 'components/base/AnimateLink';
import Button from 'components/base/Buttons';
import Rating from 'components/base/Rating';
import { currencyFormat } from '../../helpers/utils';

interface ProductCardProps {
  productItem: Product;
}

const ProductCard = ({ productItem }: ProductCardProps) => {
  return (
    <div className="group">
      <Link
        href={`#!`}
        className="min-h-62.5 bg-neutral-200 flex justify-center items-center w-full p-4 relative z-0 rounded-md mb-4"
      >
        <div className="w-47.5 h-45 relative">
          <Image
            src={productItem.imageUrl ?? image1}
            alt={productItem.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute right-3 top-3 z-10">
          <Button
            shape="circle"
            size="small"
            className="mb-2 bg-neutral-50 hover:bg-neutral-300 text-primary p-1"
          >
            <FaRegHeart className="text-xl" />
          </Button>
          <Button
            shape="circle"
            size="small"
            className="mb-2 bg-neutral-50 hover:bg-neutral-300 text-primary"
          >
            <FaRegEye className="text-xl" />
          </Button>
        </div>
        <div className="absolute left-3 top-3 z-10">
          {productItem.isNew && (
            <div className="bg-success-500 text-secondary-50 font-medium text-sm mb-2 px-2 py-1 rounded-sm">
              New
            </div>
          )}
          {productItem.discount && (
            <div className="bg-danger-500 text-secondary-50 font-medium text-sm px-2 py-1 rounded-sm">
              -{productItem.discount}%
            </div>
          )}
        </div>
        <div className="h-0 w-full absolute bottom-0 left-0 group-hover:h-10.5 group-hover:rounded-b-md transition-all duration-200 ease-linear overflow-hidden">
          <Button className="py-2 w-full bg-secondary-800 text-secondary-50 hover:bg-secondary-900">
            Add to cart
          </Button>
        </div>
      </Link>
      <div className="px-1">
        <AnimatedLink
          href="#!"
          className="mb-2 text-secondary-700 hover:text-secondary-900 font-medium"
          color="bg-secondary-900"
        >
          <span className="line-clamp-1">{productItem.title}</span>
        </AnimatedLink>
        <div className="flex gap-3 items-center">
          <p className="text-primary-500 font-medium">
            {currencyFormat(productItem.currentPrice, {
              maximumFractionDigits: 1,
            })}
          </p>
          {productItem.previousPrice && (
            <p className="line-through text-secondary-600 font-medium">
              {currencyFormat(productItem.previousPrice, { maximumFractionDigits: 1 })}
            </p>
          )}
        </div>
        {productItem.rating && (
          <div className="mt-4 flex items-center gap-2">
            <Rating
              rating={productItem.rating}
              size="large"
              step={0.5}
              className="text-warning-400 pointer-events-none"
            />
            <span className='text-secondary-800 text-sm'>({productItem.totalReviews})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
