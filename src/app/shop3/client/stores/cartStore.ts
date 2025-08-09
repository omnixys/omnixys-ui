import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CartStoreActionsType, CartStoreStateType } from '../types';

type Store = CartStoreStateType &
  CartStoreActionsType & {
    // optionale Extra-Actions
    increment: (product: any) => void;
    decrement: (product: any) => void;
    setQuantity: (product: any, qty: number) => void;
    setHasHydrated: (v: boolean) => void;
  };

const isClient = typeof window !== 'undefined';

const useCartStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      hasHydrated: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      addToCart: (product) =>
        set((state) => {
          const idx = state.cart.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor,
          );

          if (idx !== -1) {
            const updated = [...state.cart];
            const qty = product.quantity ?? 1;
            updated[idx] = {
              ...updated[idx],
              quantity: (updated[idx].quantity ?? 0) + qty,
            };
            return { cart: updated };
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity ?? 1,
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
              },
            ],
          };
        }),

      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedColor === product.selectedColor
              ),
          ),
        })),

      clearCart: () => set({ cart: [] }),

      increment: (product) =>
        set((state) => {
          const updated = state.cart.map((p) =>
            p.id === product.id &&
            p.selectedSize === product.selectedSize &&
            p.selectedColor === product.selectedColor
              ? { ...p, quantity: (p.quantity ?? 0) + 1 }
              : p,
          );
          return { cart: updated };
        }),

      decrement: (product) =>
        set((state) => {
          const updated = state.cart.map((p) =>
            p.id === product.id &&
            p.selectedSize === product.selectedSize &&
            p.selectedColor === product.selectedColor
              ? { ...p, quantity: Math.max((p.quantity ?? 1) - 1, 1) }
              : p,
          );
          return { cart: updated };
        }),

      setQuantity: (product, qty) =>
        set((state) => {
          const q = Math.max(1, Math.floor(qty || 1));
          const updated = state.cart.map((p) =>
            p.id === product.id &&
            p.selectedSize === product.selectedSize &&
            p.selectedColor === product.selectedColor
              ? { ...p, quantity: q }
              : p,
          );
          return { cart: updated };
        }),
    }),
    {
      name: 'cart',
      // ✅ SSR-sicher: greife nur im Client auf localStorage zu
      storage: createJSONStorage(() =>
        isClient ? localStorage : (undefined as unknown as Storage),
      ),
      // ✅ Flag sauber über set() setzen
      onRehydrateStorage: () => {
        return () => {
          // läuft NACH dem Rehydratisieren
          // set() kommt aus der Closure
          // (nicht direkt state mutieren)
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          (set as any)({ hasHydrated: true });
        };
      },
      // optional: nur relevante Felder persistieren
      partialize: (state) => ({ cart: state.cart }),
      // optional: Versionierung & Migrationen
      version: 1,
      migrate: (persistedState, version) => {
        // zukünftige Migrationen
        return persistedState as any;
      },
    },
  ),
);

export default useCartStore;
