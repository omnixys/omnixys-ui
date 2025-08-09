'use client';
// Pfad: context/AppContext.tsx
// Vorgaben: TypeScript + MUI-Stack (keine Tailwind hier relevant)

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { productsDummyData, userDummyData } from '../assets/assets';

// ---------- Types ----------
export type Product = {
  _id: string;
  name: string;
  description?: string;
  image: string[];
  offerPrice: number;
  rating?: number;
  [key: string]: unknown;
};

export type UserData =
  | {
      id: string | number;
      name: string;
      email?: string;
      [key: string]: unknown;
    }
  | false;

export type CartItems = Record<string, number>; // key: productId, value: qty

export type AppContextValue = {
  currency: string;
  router: ReturnType<typeof useRouter>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  fetchUserData: () => Promise<void>;
  products: Product[];
  fetchProductData: () => Promise<void>;
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string) => Promise<void> | void;
  updateCartQuantity: (
    itemId: string,
    quantity: number,
  ) => Promise<void> | void;
  getCartCount: () => number;
  getCartAmount: () => number;
};

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

export const useAppContext = (): AppContextValue => {
  const ctx = React.useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return ctx;
};

// ---------- Provider ----------
export function AppContextProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  const currency = process.env.NEXT_PUBLIC_CURRENCY ?? '€';
  const router = useRouter();

  const [products, setProducts] = React.useState<Product[]>([]);
  const [userData, setUserData] = React.useState<UserData>(false);
  const [isSeller, setIsSeller] = React.useState<boolean>(true);
  const [cartItems, setCartItems] = React.useState<CartItems>({});

  const fetchProductData = React.useCallback(async () => {
    // Hier könntest du später einen echten API-Call einbauen
    setProducts(productsDummyData as Product[]);
  }, []);

  const fetchUserData = React.useCallback(async () => {
    setUserData(userDummyData as UserData);
  }, []);

  const addToCart = React.useCallback(async (itemId: string) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev) as CartItems;
      cartData[itemId] = (cartData[itemId] ?? 0) + 1;
      return cartData;
    });
  }, []);

  const updateCartQuantity = React.useCallback(
    async (itemId: string, quantity: number) => {
      setCartItems((prev) => {
        const cartData = structuredClone(prev) as CartItems;
        if (quantity === 0) {
          delete cartData[itemId];
        } else {
          cartData[itemId] = quantity;
        }
        return cartData;
      });
    },
    [],
  );

  const getCartCount = React.useCallback((): number => {
    let totalCount = 0;
    for (const id in cartItems) {
      const qty = cartItems[id];
      if (qty > 0) totalCount += qty;
    }
    return totalCount;
  }, [cartItems]);

  const getCartAmount = React.useCallback((): number => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const itemInfo = products.find((p) => p._id === id);
      const qty = cartItems[id] ?? 0;
      if (itemInfo && qty > 0) {
        totalAmount += itemInfo.offerPrice * qty;
      }
    }
    // auf 2 Nachkommastellen runden, aber number behalten
    return Math.round(totalAmount * 100) / 100;
  }, [cartItems, products]);

  React.useEffect(() => {
    void fetchProductData();
  }, [fetchProductData]);

  React.useEffect(() => {
    void fetchUserData();
  }, [fetchUserData]);

  const value = React.useMemo<AppContextValue>(
    () => ({
      currency,
      router,
      isSeller,
      setIsSeller,
      userData,
      fetchUserData,
      products,
      fetchProductData,
      cartItems,
      setCartItems,
      addToCart,
      updateCartQuantity,
      getCartCount,
      getCartAmount,
    }),
    [
      currency,
      router,
      isSeller,
      userData,
      fetchUserData,
      products,
      fetchProductData,
      cartItems,
      addToCart,
      updateCartQuantity,
      getCartCount,
      getCartAmount,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
