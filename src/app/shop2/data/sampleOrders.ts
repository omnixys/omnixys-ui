export type SampleOrder = {
  _id: string;
  buyerEmail: string;
  subtotal: number;
  status: 'FULFILLED' | 'PENDING' | 'CANCELED' | string;
  createdAt?: string; // ISO
};

export const sampleOrders: SampleOrder[] = [
  {
    _id: 'ord_12345',
    buyerEmail: 'lama@example.com',
    subtotal: 129.9,
    status: 'FULFILLED',
    createdAt: '2025-07-30T10:00:00Z',
  },
  {
    _id: 'ord_98765',
    buyerEmail: 'lama@example.com',
    subtotal: 59.0,
    status: 'PENDING',
    createdAt: '2025-08-01T09:30:00Z',
  },
];
