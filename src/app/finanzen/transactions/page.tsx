'use client';

import {
  Box,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { AccountDatas } from '../page';

// ---- bring deine Accounts mit Transaktionen rein ----
// Falls du die Daten schon in app/finanzen/data o.ä. hast: anpassen!

type TxStatus = 'Success' | 'Processing' | 'Failed';
type TxChannel = 'In Store' | 'Online' | 'ATM';

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  status: TxStatus;
  date: string; // ISO
  channel: TxChannel;
  category: string;
}

interface Account {
  id: string;
  name: string;
  amount: number;
  type?: string;
  transactions: Transaction[];
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

export default function TransactionsAllPage() {
  const router = useRouter();
  const params = useSearchParams();
  const accountFilter = params.get('account'); // account id oder 'all'

  const accounts = AccountDatas as unknown as Account[]; // <- sicherstellen, dass hier Transaktionen drin sind

  // Flatten: alle Transaktionen aller Konten
  const rows = useMemo(() => {
    const filtered =
      accountFilter && accountFilter !== 'all'
        ? accounts.filter((a) => a.id === accountFilter)
        : accounts;

    return filtered.flatMap((acc) =>
      acc.transactions.map((tx) => ({
        id: tx.id,
        account: acc.name,
        merchant: tx.merchant,
        amount: tx.amount,
        status: tx.status,
        date: tx.date,
        channel: tx.channel,
        category: tx.category,
      })),
    );
  }, [accounts, accountFilter]);

  const columns: GridColDef[] = [
    { field: 'account', headerName: 'Account', flex: 1, minWidth: 140 },
    { field: 'merchant', headerName: 'Transaction', flex: 1.3, minWidth: 160 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
      type: 'number',
      renderCell: (p: GridRenderCellParams<number>) => (
        <Typography
          fontWeight={600}
          color={p.value! < 0 ? 'error.main' : 'success.main'}
        >
          {p.value! < 0 ? '-' : ''}
          {formatMoney(Math.abs(p.value!))}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (p: GridRenderCellParams<string>) => {
        const s = p.value as TxStatus;
        const color =
          s === 'Success'
            ? 'success'
            : s === 'Processing'
              ? 'default'
              : 'error';
        const dot =
          s === 'Success'
            ? '#2e7d32'
            : s === 'Processing'
              ? '#9e9e9e'
              : '#d32f2f';
        return (
          <Chip
            size="small"
            variant="outlined"
            color={color}
            label={s}
            icon={
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: dot,
                }}
              />
            }
          />
        );
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      valueFormatter: (p) => formatDate(String(p.value)),
    },
    { field: 'channel', headerName: 'Channel', width: 120 },
    {
      field: 'category',
      headerName: 'Category',
      width: 160,
      renderCell: (p) => (
        <Chip
          size="small"
          label={String(p.value)}
          variant="outlined"
          sx={{
            borderColor: 'primary.light',
            color: 'primary.main',
            bgcolor: 'primary.50',
          }}
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper
        elevation={0}
        sx={{
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
        >
          <Typography variant="h5">All Transactions</Typography>
          {/* Account Filter wie "View all" → all */}
          <TextField
            select
            size="small"
            label="Account"
            value={accountFilter ?? 'all'}
            onChange={(e) => {
              const v = e.target.value;
              const q = new URLSearchParams(params.toString());
              if (v === 'all') q.delete('account');
              else q.set('account', v);
              router.replace(`?${q.toString()}`, { scroll: false });
            }}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All accounts</MenuItem>
            {accounts.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ height: 560, bgcolor: '#fff', borderRadius: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
              sorting: { sortModel: [{ field: 'date', sort: 'desc' }] },
            }}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': { bgcolor: 'background.default' },
              '& .MuiDataGrid-row:hover': { bgcolor: 'action.hover' },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
}
