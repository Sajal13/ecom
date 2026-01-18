'use client';

import { FaRegHeart, FaRegEye } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import image1 from 'assets/images/products/1.webp';
import { currencyFormat, calculatePrice, reviewSummary } from 'helpers/utils';
import { Product } from 'types/products';
import AnimatedLink from 'components/base/AnimateLink';
import Button from 'components/base/Buttons';
import Rating from 'components/base/Rating';

interface ProductCardProps {
  productItem: Product;
}

const ProductCard = ({ productItem }: ProductCardProps) => {
  const { originalPrice, discountPercentage, discountedPrice } = calculatePrice(
    productItem.price,
    productItem.discountPercentage || 0,
  );
  const { totalReviewCount, averageRating } = reviewSummary(productItem.reviews || []);

  const handleWhitelistClick = () => {
    console.log('whitelist button clicked....');
  };

  const handleQuickViewClick = () => {
    console.log('quick view button clicked');
  };

  const handleAddToCartClick = () => {
    console.log('Add button clicked..');
  };

  return (
    <div className="group">
      <div className="min-h-62.5 bg-neutral-200 w-full flex justify-center items-center p-4 relative z-0 rounded-md mb-4">
        <Link href="#!" className='w-full flex justify-center items-center'>
          <div className="w-47.5 h-45 relative">
            <Image
              src={productItem.thumbnail ?? image1}
              alt={productItem.title}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </Link>
        <div className="absolute right-3 top-3 z-10">
          <Button
            shape="circle"
            size="small"
            className="mb-2 bg-neutral-50 hover:bg-neutral-300 text-primary p-1"
            onClick={handleWhitelistClick}
          >
            <FaRegHeart className="text-xl" />
          </Button>
          <Button
            shape="circle"
            size="small"
            className="mb-2 bg-neutral-50 hover:bg-neutral-300 text-primary"
            onClick={handleQuickViewClick}
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
          {discountPercentage > 0 && (
            <div className="bg-danger-500 text-secondary-50 font-medium text-sm px-2 py-1 rounded-sm">
              -{discountPercentage}%
            </div>
          )}
        </div>
        <div className="h-0 w-full absolute bottom-0 left-0 group-hover:h-14 group-hover:rounded-b-md transition-all duration-200 ease-linear overflow-hidden">
          <Button
            onClick={handleAddToCartClick}
            className="py-2 w-full bg-secondary-800 text-secondary-50 hover:bg-secondary-900"
          >
            Add to cart
          </Button>
        </div>
      </div>
      <div className="px-1">
        <AnimatedLink
          href="#!"
          className="mb-2"
          color="secondary"
        >
          <span className="line-clamp-1">{productItem.title}</span>
        </AnimatedLink>
        <div className="flex gap-3 items-center">
          <p className="text-primary-500 font-medium">
            {currencyFormat(discountedPrice, {
              maximumFractionDigits: 1,
            })}
          </p>
          {originalPrice && (
            <p className="line-through text-secondary-600 font-medium">
              {currencyFormat(originalPrice, { maximumFractionDigits: 1 })}
            </p>
          )}
        </div>
        {productItem.rating && (
          <div className="mt-4 flex items-center gap-2">
            <Rating
              rating={averageRating}
              size="large"
              step={0.5}
              className="text-warning-400 pointer-events-none"
            />
            <span className="text-secondary-800 text-sm">({totalReviewCount})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
