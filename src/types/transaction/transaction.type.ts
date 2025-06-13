export type Transaction = {
  id: string;
  type: TransactionType;
  currencyType: CurrencyType;
  amount: number;
  sender: string;
  receiver: string;
  created: string;
};

export type TransactionSearchCriteria = {
  username?: string;
  sender?: string;
  receiver?: string;
  type?: TransactionType;
};

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  INCOME = 'INCOME',
  REFUND = 'REFUND',
  PAYMENT = 'PAYMENT',
}

export enum CurrencyType {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  CHF = 'CHF',
  JPY = 'JPY',
  CNY = 'CNY',
  GHS = 'GHS',
}
