import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';
import { Product } from 'types/products';
import AnimatedLink from 'components/base/AnimateLink';
import classNames from 'classnames';

interface NewArrivalCardProps {
  product: Product;
  className?: string;
  backgroundPosition?: string;
  textClass?: string;
}

const NewArrivalCard = ({
  product,
  className,
  backgroundPosition = 'bottom center',
  textClass
}: NewArrivalCardProps) => {
  return (
    <div
      className={twMerge(
        `bg-black bg-contain bg-no-repeat flex flex-col justify-end h-full group 
        transition-all duration-500 ease-linear rounded-md overflow-hidden 
      `,
        className,
      )}
      style={{
        backgroundImage: `url('${product.thumbnail}')`,
        backgroundPosition: backgroundPosition,
      }}
    >
      <div className={classNames(`backdrop-blur-[1px] flex items-end px-4 py-6 
        transition-all duration-500 ease-in-out`, textClass)}>
        <div className="w-full">
          <h5 className="text-white font-medium mb-2">{product.title}</h5>
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-42 group-hover:opacity-100 transition-all duration-500 ease-in-out pb-2">
            <p className="text-white line-clamp-2 mb-4">
              {product.description}
            </p>
            <AnimatedLink
              color="white"
              href="/"
              className="inline-flex items-center gap-2"
            >
              Shop Now
              <BsArrowRight className="text-white" />
            </AnimatedLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalCard;
