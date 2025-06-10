export type AccountType =
    | 'SAVINGS'
    | 'CHECKING'
    | 'CREDIT'
    | 'DEPOSIT'
    | 'INVESTMENT'
    | 'LOAN'
    | 'BUSINESS'
    | 'JOINT';

export type AccountStatusType =
    | 'ACTIVE'
    | 'BLOCKED'
    | 'CLOSED'
    | 'SUSPENDED'
    | 'FROZEN';

export interface Account {
    id: string;
    version: number;
    balance: number;
    rateOfInterest: number;
    category: AccountType;
    state: AccountStatusType;
    overdraftLimit: number;
    transactionLimit: number;
    created: string;
    updated: string;
    userId: string;
    username: string;
}
