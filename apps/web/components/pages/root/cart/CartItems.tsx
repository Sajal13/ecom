import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { currencyFormat } from 'helpers/utils';
import { CartItem } from 'types/products';
import Button from 'components/base/Buttons';
import CartCard from 'components/cards/CartCard';

interface CartItemsProps {
  cartProducts: CartItem[];
}

const CartItems = ({ cartProducts }: CartItemsProps) => {
  return (
    <div className="">
      <div className="lg:grid md:grid-cols-5 gap-6 md:gap-10 px-10 py-6 hidden mb-10 shadow-lg rounded-md">
        <p className="font-medium">Product</p>
        <p className="font-medium text-center">Price</p>
        <p className="font-medium text-center">Quantity</p>
        <p className="font-medium text-center">Discount</p>
        <p className="font-medium text-end">Subtotal</p>
      </div>
      {cartProducts[0].products.map((product) => (
        <CartCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default CartItems;
