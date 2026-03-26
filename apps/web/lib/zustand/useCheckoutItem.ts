import { CartItem } from 'types/products';
import { create } from 'zustand';

interface CheckoutItem {
  currentItem: CartItem | null;
  setCurrentItem: (item: CartItem) => void;
}

export const useCheckoutItem = create<CheckoutItem>((set) => ({
  currentItem: null,
  setCurrentItem: (item) => set({ currentItem: item }),
}));
