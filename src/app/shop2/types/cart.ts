export type CartItem = {
  id: string; // interne Zeilen-ID
  productId: string;
  variantId?: string | null;
  name: string;
  image?: string | null;
  price: number; // Einzelpreis (EUR)
  quantity: number; // Anzahl
};

export type Cart = CartItem[];

export type CartTotals = {
  subtotal: number; // Summe der (price * quantity)
  items: number; // Anzahl unterschiedlicher Positionen
  quantity: number; // Gesamtanzahl aller Stücke
};
