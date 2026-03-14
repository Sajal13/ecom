import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { currencyFormat } from 'helpers/utils';
import { CartItem } from 'types/products';
import Button from 'components/base/Buttons';
import CartCard from 'components/cards/CartCard';
import TextField from 'components/base/TextField';
import CartTotalCard from 'components/cards/CartTotalCard';

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
      <form className='mb-10 md:mb-14 lg:mb-20'>
        {cartProducts[0].products.map((product) => (
          <CartCard product={product} key={product.id} />
        ))}
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
          <Button variant="outlined" color="secondary" className="min-w-55" type="button">
            Return To Shop
          </Button>
          <Button variant="outlined" color="secondary" className="min-w-55" type="submit">
            Update Cart
          </Button>
        </div>
      </form>
      <div className='lg:flex lg:justify-between lg:gap-20'>
        <div className='flex flex-col sm:flex-row gap-4 items-start mb-10 md:mb-14 lg:mb-0'>
          <TextField name='coupon' placeholder='Coupon Code' />
          <Button variant="filled" color="primary" size="small" className='px-8 max-sm:w-full'>Apply Coupon</Button>
        </div>
        <CartTotalCard subTotal={100} shippingCost={0} />
      </div>
    </div>
  );
};

export default CartItems;
