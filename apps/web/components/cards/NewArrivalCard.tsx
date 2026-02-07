import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Product } from 'types/products';

interface NewArrivalCardProps {
  product: Product;
  className?: string;
}

const NewArrivalCard = ({ product, className }: NewArrivalCardProps) => {
  return (
    <div
      className={twMerge(
        'bg-black bg-contain bg-no-repeat flex flex-col justify-end h-full',
        className,
      )}
      style={{
        backgroundImage: `url('${product.thumbnail}')`,
        backgroundPosition: 'bottom center',
      }}
    >
      <div className="min-h-37 bg-linear-to-b from-white/80 via-white/50 to-white/30 flex items-end p-4">
        <p className="text-white font-medium">hello</p>
      </div>
    </div>
  );
};

export default NewArrivalCard;
