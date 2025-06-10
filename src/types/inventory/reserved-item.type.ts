export interface ReserveInventoryItemInput {
    inventory_id: string;
    quantity: number;
    customer_id: string;
}

export interface ReserveInventoryItemType {
    id?: string;
    version: number;
    quantity: number;
    customer_id: string;
    inventory_id: string;
    created: string;
    updated: string;
}
  