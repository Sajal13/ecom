import { getCartItems } from 'actions/products';

const BillingHighlights = async () => {
  const [cardItems] = await Promise.all([getCartItems({userId: 33})]);
  return (
    <>
      <p>hel</p>
    </>
  );
};

export default BillingHighlights;
