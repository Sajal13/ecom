import Link from 'next/link';
import classNames from 'classnames';
import { currencyFormat } from 'helpers/utils';
import Button from 'components/base/Buttons';

interface CartTotalCardProps {
  currentCart: number;
  subtotal: number;
  amount: number;
  shippingCost: number;
  className?: string;
}

const CartTotalCard = ({
  currentCart,
  subtotal,
  amount,
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

      <div className="py-4 flex justify-between border-b">
        <p>SubTotal</p>
        <p>{currencyFormat(subtotal)}</p>
      </div>

      <div className="py-4 flex justify-between border-b">
        <p>Shipping</p>
        <p>{shippingCost === 0 ? 'Free' : currencyFormat(shippingCost)}</p>
      </div>

      <div className="py-4 flex justify-between mb-6">
        <p>Total</p>
        <p>{currencyFormat(amount)}</p>
      </div>

      <div className="flex justify-center">
        <Link href={`/checkout/${currentCart}`}>
          <Button variant="filled" color="primary">
            Proceed To Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartTotalCard;
