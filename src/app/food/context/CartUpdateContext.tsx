"use client";

import { createContext } from "react";

export interface CartUpdateContextType {
  updateCart: boolean;
  setUpdateCart: (value: boolean) => void;
}

export const CartUpdateContext = createContext<CartUpdateContextType | null>(null);
