import React from 'react';
import { getCartItems } from 'actions/products';
import BreadcrumbContainer from 'components/common/BreadcrumbContainer';
import CartItems from './CartItems';

const CartContainer = async () => {
  const [cartItems] = await Promise.all([getCartItems({ userId: 33})]);

  console.log(cartItems);
  return (
    <section>
      <BreadcrumbContainer />
      <CartItems cartProducts={cartItems.carts} />
    </section>
  );
};

export default CartContainer;
