import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartProduct } from "types/products";

interface CartState {
  items: CartProduct[];
  coupon: string;
  couponDiscount: number;

  addItem: (product: CartProduct) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;

  applyCoupon: (code: string) => void;

  subtotal: () => number;
  total: (shipping: number) => number;

  syncCart: () => Promise<void>;
  setCart: (items: CartProduct[]) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: "",
      couponDiscount: 0,

      setCart: (items) => set({ items }),

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return { items: [...state.items, product] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      applyCoupon: (code) => {
        const subtotal = get().subtotal();

        if (code === "SAVE10") {
          set({ coupon: code, couponDiscount: subtotal * 0.1 });
        } else if (code === "SAVE20") {
          set({ coupon: code, couponDiscount: subtotal * 0.2 });
        } else {
          set({ coupon: "", couponDiscount: 0 });
        }
      },

      subtotal: () => {
        return get().items.reduce(
          (sum, item) =>
            sum +
            item.price *
              item.quantity *
              (1 - (item.discountPercentage ?? 0) / 100),
          0
        );
      },

      total: (shipping) => {
        const subtotal = get().subtotal();
        const discount = get().couponDiscount;

        return subtotal - discount + shipping;
      },

      syncCart: async () => {
        const { items, coupon } = get();
        console.log(items, coupon);
        /*

        await fetch("/api/cart/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            coupon,
          }),
        });
        */
      },

      clearCart: () => set({ items: [], coupon: "", couponDiscount: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);