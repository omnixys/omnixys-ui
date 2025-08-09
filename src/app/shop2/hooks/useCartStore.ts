import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { findProductById } from '../data/sampleProducts';
import type { Cart, CartItem, CartTotals } from '../types/cart';

// kleine ID-Hilfe (ohne Extra-Dependency)
const newId = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

type CartState = {
  cart: Cart;
  isLoading: boolean;
  counter: number; // Anzahl Positionen (line items)
  totals: CartTotals;

  // API
  getCart: () => void;
  addItem: (
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => void;
  removeItem: (itemId: string) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};

function computeTotals(cart: Cart): CartTotals {
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const items = cart.length;
  const quantity = cart.reduce((s, i) => s + i.quantity, 0);
  return { subtotal, items, quantity };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      isLoading: false,
      counter: 0,
      totals: { subtotal: 0, items: 0, quantity: 0 },

      getCart: () => {
        // Persist kümmert sich ums Laden; hier nur Kennzahlen nachziehen
        const cart = get().cart;
        set({
          counter: cart.length,
          totals: computeTotals(cart),
          isLoading: false,
        });
      },

      addItem: (productId, variantId, quantity) => {
        set({ isLoading: true });
        const cart = [...get().cart];

        // gleicher Artikel (Produkt+Variante) -> Menge erhöhen
        const existing = cart.find(
          (i) =>
            i.productId === productId &&
            (i.variantId || null) === (variantId || null),
        );

        if (existing) {
          existing.quantity += quantity;
        } else {
          // Produktinfos aus Dummy-Daten ziehen
          const p = findProductById(productId);
          const price = p?.price?.discountedPrice ?? p?.price?.price ?? 0;
          const name = p?.name ?? 'Produkt';
          const image = p?.media?.mainMedia?.image?.url ?? '/product.png';

          const item: CartItem = {
            id: newId(),
            productId,
            variantId: variantId || null,
            name,
            image,
            price,
            quantity: Math.max(1, quantity),
          };
          cart.push(item);
        }

        set({
          cart,
          counter: cart.length,
          totals: computeTotals(cart),
          isLoading: false,
        });
      },

      removeItem: (itemId) => {
        set({ isLoading: true });
        const cart = get().cart.filter((i) => i.id !== itemId);
        set({
          cart,
          counter: cart.length,
          totals: computeTotals(cart),
          isLoading: false,
        });
      },

      setQuantity: (itemId, quantity) => {
        const q = Math.max(1, quantity);
        const cart = get().cart.map((i) =>
          i.id === itemId ? { ...i, quantity: q } : i,
        );
        set({
          cart,
          counter: cart.length,
          totals: computeTotals(cart),
        });
      },

      clearCart: () => {
        set({
          cart: [],
          counter: 0,
          totals: { subtotal: 0, items: 0, quantity: 0 },
        });
      },
    }),
    {
      name: 'cart-store', // key in localStorage
      partialize: (state) => ({ cart: state.cart }), // nur das Nötige persistieren
      onRehydrateStorage: () => (state) => {
        // Nach Rehydrate Kennzahlen neu berechnen
        if (!state) return;
        const cart = state.cart || [];
        state.counter = cart.length;
        state.totals = computeTotals(cart);
      },
    },
  ),
);
