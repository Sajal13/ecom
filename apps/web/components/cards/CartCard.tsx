'use client';

import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';
import classNames from 'classnames';
import { currencyFormat } from 'helpers/utils';
import { CartProduct } from 'types/products';
import AnimatedLink from 'components/base/AnimateLink';
import Button from 'components/base/Buttons';
import TextField from 'components/base/TextField';

interface CartCardProps {
  product: CartProduct;
  onClick: () => void;
  onQuantityChange: (quantity: number) => void;
}

const CartCard = ({ product, onClick, onQuantityChange }: CartCardProps) => {
  return (
    <div className="group grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 px-4 lg:px-10 py-6 shadow-lg mb-10 last:mb-0 relative overflow-hidden">
      <div className="flex items-center gap-5">
        <p className="font-medium lg:hidden min-w-20">Product:</p>
        <div className="flex items-center gap-5 group relative">
          <div className="w-14 h-14 relative">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-contain"
            />
          </div>
          <AnimatedLink
            href={`/product-details/${product.id}`}
            className="text-sm line-clamp-1"
            data-tooltip-target="tooltip-light"
          >
            {product.title}
          </AnimatedLink>
          {product.title.length > 20 && (
            <div className="absolute hidden bottom-full z-20 text-nowrap sm:inline-block px-3 py-2 text-sm font-medium  bg-neutral-200 rounded-md shadow-xs transition-all duration-200 opacity-0 group-hover:opacity-100">
              {product.title}
            </div>
          )}
        </div>
      </div>
      <div className="flex lg:justify-center lg:items-center gap-5">
        <p className="font-medium lg:hidden min-w-20">Price: </p>
        <div className="flex items-center gap-2">
          <p className={classNames('text-secondary-600 font-medium')}>
            {currencyFormat(product.price, { maximumFractionDigits: 1 })}
          </p>
        </div>
      </div>
      <div className="flex lg:justify-center items-center">
        <p className="font-medium lg:hidden min-w-20 me-5">Quantity: </p>
        <TextField
          type="number"
          value={product.quantity}
          onChange={(e) =>
            onQuantityChange(Number(e.target.value))
          }
          className="lg:max-w-16 pe-2"
          rootClassName="justify-center"
        />
      </div>
      {product.discountPercentage && (
        <div className="flex items-center lg:justify-center">
          <p className="font-medium lg:hidden min-w-20 me-5">Discount: </p>
          <p>{product.discountPercentage}%</p>
        </div>
      )}
      <div className="flex items-center lg:justify-end">
        <p className="font-medium lg:hidden min-w-20 me-5">SubTotal: </p>
        <p className="font-semibold">
          {currencyFormat(
            product.discountedTotal ? product.discountedTotal : product.total,
            {
              maximumFractionDigits: 1,
            },
          )}
        </p>
      </div>
      <div className="absolute right-5 lg:-right-16 max-xl:bottom-5 lg:top-1/2 lg:-translate-y-1/2 group-hover:right-5 transition-all duration-500">
        <Button
          variant='filled'
          color="danger"
          size='small'
          onClick={onClick}
        >
          <RiDeleteBin6Line size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
