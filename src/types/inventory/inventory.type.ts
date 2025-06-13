export type InventoryStatus =
  | 'AVAILABLE'
  | 'OUT_OF_STOCK'
  | 'RESERVED'
  | 'DISCONTINUED';

export interface InventoryType {
  id: string;
  version: number;
  sku_code: string;
  quantity: number;
  unit_price: number;
  status: InventoryStatus;
  product_id: string;
  product_name?: string; // kann z. B. „unbekannt“ sein
  created: string;
  updated: string;
}
