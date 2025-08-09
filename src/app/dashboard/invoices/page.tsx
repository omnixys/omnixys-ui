'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../components/Header';
import { tokens } from '../components/tokens';
import { mockDataInvoices } from '../data/mockData';

export interface InvoiceRow {
  id: number;
  name: string;
  phone: string;
  email: string;
  cost: number;
  date: string; // ISO/Plain
}

const currency = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export default function Invoices() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef<InvoiceRow>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 140,
      cellClassName: 'name-column--cell',
    },
    { field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 140 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {currency.format(params.row.cost)}
        </Typography>
      ),
    },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 140 },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: 'none' },
          '& .name-column--cell': { color: colors.greenAccent[300] },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid<InvoiceRow>
          checkboxSelection
          rows={mockDataInvoices as InvoiceRow[]}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
