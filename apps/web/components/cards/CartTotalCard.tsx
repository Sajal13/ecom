import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { currencyFormat } from 'helpers/utils';
import Button from 'components/base/Buttons';

interface CartTotalCardProps {
  subTotal: number;
  shippingCost: number;
  className?: string;
}

const CartTotalCard = ({
  subTotal,
  shippingCost,
  className,
}: CartTotalCardProps) => {
  return (
    <div
      className={classNames(
        'px-6 py-8 border border-secondary-600 rounded-md',
        className,
      )}
    >
      <h6 className="mb-3">Cart Total</h6>
      <div className="py-4 flex justify-between items-center border-b border-b-neutral-500">
        <p>SubTotal</p>
        <p>{currencyFormat(subTotal, { maximumFractionDigits: 1 })}</p>
      </div>
      <div className="py-4 flex justify-between items-center border-b border-b-neutral-500">
        <p>Shipping</p>
        <p>
          {shippingCost === 0
            ? 'Free'
            : currencyFormat(subTotal, { maximumFractionDigits: 1 })}
        </p>
      </div>
      <div className="py-4 flex justify-between items-center mb-6">
        <p>Total</p>
        <p>
          {currencyFormat(
            shippingCost > 0 ? subTotal + shippingCost : subTotal,
            { maximumFractionDigits: 1 },
          )}
        </p>
      </div>
      <div className="flex justify-center">
        <Link href="/checkout">
          <Button variant="filled" color="primary">
            Proceed To Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartTotalCard;
