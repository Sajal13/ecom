'use client';

import { useCheckoutItem } from "lib/zustand/useCheckoutItem";
import { Suspense } from "react";
import Image from "next/image";
import { currencyFormat } from "helpers/utils";


const BillingHighlights = () => {
  const { currentItem } = useCheckoutItem();

  return (
    <Suspense>
      <div className="space-y-4 md:space-y-6 lg:space-y-8 mb-4 md:mb-6 lg:mb-8">
        {currentItem?.products.map((product) => (
          <div key={product.id} className="flex items-center gap-6">
            <div>
              <Image
                src={product.thumbnail}
                alt="thumb"
                height={54}
                width={54}
                className="bg-neutral-50"
              />
            </div>
            <div className="flex-1 flex justify-between items-center gap-6">
              <p className="text-sm font-medium">{product.title}</p>
              <p className="text-sm font-medium">
                {currencyFormat(
                  product.discountedTotal ? product.discountedTotal : product.total,
                  {
                    maximumFractionDigits: 1,
                  }
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
};

export default BillingHighlights;
