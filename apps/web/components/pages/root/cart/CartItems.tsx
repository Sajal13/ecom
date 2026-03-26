'use client';

import { SubmitEvent, useEffect, useState } from 'react';
import { useCartStore } from 'lib/zustand/cartStore';
import { CartItem } from 'types/products';
import Button from 'components/base/Buttons';
import TextField from 'components/base/TextField';
import CartCard from 'components/cards/CartCard';
import CartTotalCard from 'components/cards/CartTotalCard';

interface CartItemsProps {
  cartProducts: CartItem[];
}

const CartItems = ({ cartProducts }: CartItemsProps) => {
  const {
    items,
    removeItem,
    updateQuantity,
    applyCoupon,
    coupon,
    subtotal,
    total,
    syncCart,
    setCart
  } = useCartStore();

  const [couponValue, setCouponValue] = useState(coupon);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    syncCart();
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponValue);
    setCouponValue('')
  }

  useEffect(() => {
    setCart(cartProducts[0].products)
  }, [cartProducts])

  return (
    <div>
      {/* Header */}
      <div className="lg:grid md:grid-cols-5 gap-6 md:gap-10 px-10 py-6 hidden mb-10 shadow-lg rounded-md">
        <p className="font-medium">Product</p>
        <p className="font-medium text-center">Price</p>
        <p className="font-medium text-center">Quantity</p>
        <p className="font-medium text-center">Discount</p>
        <p className="font-medium text-end">Subtotal</p>
      </div>

      <form onSubmit={handleSubmit}>
        {items.map((product) => (
          <CartCard
            key={product.id}
            product={product}
            onClick={() => removeItem(product.id)}
            onQuantityChange={(qty) => updateQuantity(product.id, qty)}
          />
        ))}

        <div className="flex justify-between items-center flex-col sm:flex-row gap-4 mb-10">
          <Button
            variant="outlined"
            color="secondary"
            className="min-w-55"
            type="button"
          >
            Return To Shop
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            className="min-w-55"
            type="submit"
          >
            Update Cart
          </Button>
        </div>
      </form>

      {/* Coupon Section */}
      <div className="lg:flex lg:justify-between lg:gap-20">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <TextField
            name="coupon"
            placeholder="Coupon Code"
            value={couponValue}
            onChange={(e) => setCouponValue(e.target.value)}
          />

          <Button
            variant="filled"
            color="primary"
            size="small"
            type="button"
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </Button>
        </div>

        <CartTotalCard
          currentCart={cartProducts[0].id}
          amount={total(cartProducts[0].shippingCost ?? 0)}
          subtotal={subtotal()}
          shippingCost={cartProducts[0].shippingCost ?? 0}
        />
      </div>
    </div>
  );
};

export default CartItems;
