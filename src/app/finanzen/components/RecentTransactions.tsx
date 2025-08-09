'use client';

import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Account, Transaction } from '../types';

export interface RecentTransactionsProps {
  accounts: Account[];
  page?: number; // 1-based Tab-Index aus der URL
}

function formatMoney(n: number, locale = 'en-US', currency = 'USD') {
  return n.toLocaleString(locale, { style: 'currency', currency });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function RecentTransactions({
  accounts,
  page = 1,
}: RecentTransactionsProps) {
  const router = useRouter();
  const search = useSearchParams();

  const tabIndex = Math.min(Math.max(page - 1, 0), accounts.length - 1);
  const active = accounts[tabIndex];

  const handleTab = (_: any, newIndex: number) => {
    const params = new URLSearchParams(search.toString());
    params.set('page', String(newIndex + 1));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 4,
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 1, pb: 1 }}
      >
        <Typography variant="h6">Recent Transactions</Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push('/finanzen/transactions')}
        >
          View all
        </Button>
      </Stack>

      {/* Tabs centered like screenshot */}
      <Tabs
        value={tabIndex}
        onChange={handleTab}
        centered
        sx={{ mb: 1 }}
        TabIndicatorProps={{ sx: { height: 3, borderRadius: 2 } }}
      >
        {accounts.map((a) => (
          <Tab key={a.id} label={a.name} />
        ))}
      </Tabs>

      {/* Account header strip */}
      <Box
        sx={{
          bgcolor: 'rgba(25,118,210,0.06)',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          💳
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {active.name}
          </Typography>
          <Typography variant="body2" color="primary">
            {formatMoney(active.amount)}
          </Typography>
        </Box>
        {active.type && (
          <Chip
            size="small"
            label={active.type}
            sx={{ textTransform: 'capitalize' }}
          />
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Table */}
      <Table size="small" sx={{ '& th, & td': { whiteSpace: 'nowrap' } }}>
        <TableHead>
          <TableRow>
            <TableCell>Transaction</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Channel</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {active.transactions.map((tx: Transaction) => (
            <TableRow key={tx.id} hover sx={{ bgcolor: 'transparent' }}>
              <TableCell>{tx.merchant}</TableCell>
              <TableCell
                sx={{
                  fontWeight: 600,
                  color: tx.amount < 0 ? 'error.main' : 'success.main',
                }}
              >
                {tx.amount < 0 ? '-' : ''}
                {formatMoney(Math.abs(tx.amount))}
              </TableCell>
              <TableCell>
                <Chip
                  size="small"
                  variant="outlined"
                  color={
                    tx.status === 'Success'
                      ? 'success'
                      : tx.status === 'Processing'
                        ? 'default'
                        : 'error'
                  }
                  label={tx.status}
                  icon={
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background:
                          tx.status === 'Success'
                            ? '#2e7d32'
                            : tx.status === 'Processing'
                              ? '#9e9e9e'
                              : '#d32f2f',
                      }}
                    />
                  }
                />
              </TableCell>
              <TableCell>{formatDate(tx.date)}</TableCell>
              <TableCell>{tx.channel}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={tx.category}
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.light',
                    color: 'primary.main',
                    bgcolor: 'primary.50',
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
