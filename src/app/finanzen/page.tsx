'use client';
import { Box } from '@mui/material';
import HeaderBox from './components/HeaderBox';
import RecentTransactions from './components/RecentTransactions';
import TotalBalanceBox from './components/TotalBalanceBox';
import DebtOverviewBox from './components/DebtOverviewBox';
import MonthlySpendingBox from './components/MonthlySpendingBox';
import UpcomingPaymentsBox from './components/UpcomingPaymentsBox';
import DashboardCardGrid from './components/DashboardCardGrid';

export type TxStatus = 'Success' | 'Processing' | 'Failed';
export type TxChannel = 'In Store' | 'Online' | 'ATM';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number; // + = Gutschrift, - = Belastung
  status: TxStatus;
  date: string; // ISO string
  channel: TxChannel;
  category: string;
}

export interface Account {
  id: string;
  name: string;
  amount: number; // current balance
  type?: string; // e.g. "checking"
  transactions: Transaction[];
}
export const AccountDatas: Account[] = [
  {
    id: 'acc1',
    name: 'Plaid Checking',
    amount: 110.0,
    type: 'checking',
    transactions: [
      {
        id: 't1',
        merchant: 'SparkFun',
        amount: 89.4,
        status: 'Processing',
        date: '2019-09-17T00:00:00Z',
        channel: 'In Store',
        category: 'Food and Drink',
      },
      {
        id: 't2',
        merchant: 'Uber 072515 SFPOOL',
        amount: 6.33,
        status: 'Success',
        date: '2019-09-04T00:00:00Z',
        channel: 'Online',
        category: 'Travel',
      },
      {
        id: 't3',
        merchant: 'Uber 063015 SFPOOL',
        amount: 5.4,
        status: 'Success',
        date: '2019-08-22T00:00:00Z',
        channel: 'Online',
        category: 'Travel',
      },
      {
        id: 't4',
        merchant: 'United Airlines',
        amount: -500.0,
        status: 'Success',
        date: '2019-08-20T00:00:00Z',
        channel: 'In Store',
        category: 'Travel',
      },
      {
        id: 't5',
        merchant: 'McDonalds',
        amount: 12.0,
        status: 'Success',
        date: '2019-08-19T00:00:00Z',
        channel: 'In Store',
        category: 'Food and Drink',
      },
    ],
  },
  {
    id: 'acc2',
    name: 'Savings',
    amount: 1140.35,
    type: 'savings',
    transactions: [
      {
        id: 't6',
        merchant: 'Interest',
        amount: 2.15,
        status: 'Success',
        date: '2019-09-01T00:00:00Z',
        channel: 'Online',
        category: 'Income',
      },
    ],
  },
];


const sampleDebts = [
  { creditor: 'Max Mustermann', amount: 150.5 },
  { creditor: 'Bank of Germany', amount: 1200 },
  { creditor: 'Amazon Bestellung', amount: 89.99 },
];


const spendingCategories = [
  { name: 'Food', amount: 320 },
  { name: 'Travel', amount: 150 },
  { name: 'Shopping', amount: 200 },
];

const upcomingPayments = [
  { title: 'Rent', dueDate: '2025-08-15', amount: 800 },
  { title: 'Car Loan', dueDate: '2025-08-20', amount: 250 },
  { title: 'Electricity Bill', dueDate: '2025-08-22', amount: 75 },
];

export default function BankingDashboard({
  searchParams: { id, page },
}: SearchParamsProps) {
  const currentTab = Number((page as string) || 1);
  const totalDebt = sampleDebts.reduce((sum, d) => sum + d.amount, 0);

  return (
    <Box p={4}>
      <HeaderBox
        user="admin"
        type="greeting"
        title="Willkommen"
          subtext="Access and manage your account and transactions effeciently."
      />

      {/* 📌 Karten-Bereich mit Grid + Carousel */}
      <DashboardCardGrid>
        <TotalBalanceBox accounts={AccountDatas} totalCurrentBalance={1250.35} />
        <DebtOverviewBox debts={sampleDebts} totalDebt={totalDebt} />
        <MonthlySpendingBox categories={spendingCategories} totalSpending={670} />
        <UpcomingPaymentsBox payments={upcomingPayments} />
      </DashboardCardGrid>
      
      <RecentTransactions accounts={AccountDatas} page={currentTab} />
    </Box>
  );
}
