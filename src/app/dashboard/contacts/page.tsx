'use client'

import { Box, useTheme } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import Header from '../components/Header'
import { tokens } from '../components/tokens'
import { mockDataContacts } from '../data/mockData'

export interface ContactRow {
  id: number
  registrarId: string
  name: string
  age: number
  phone: string
  email: string
  address: string
  city: string
  zipCode: string
}

export default function Contacts() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns: GridColDef<ContactRow>[] = [
    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 80 },
    { field: 'registrarId', headerName: 'Registrar ID', minWidth: 140 },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 160, cellClassName: 'name-column--cell' },
    { field: 'age', headerName: 'Age', type: 'number', headerAlign: 'left', align: 'left', width: 100 },
    { field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'address', headerName: 'Address', flex: 1, minWidth: 200 },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 120 },
    { field: 'zipCode', headerName: 'Zip Code', flex: 1, minWidth: 120 },
  ]

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': { border: 'none' },
          '& .MuiDataGrid-cell': { borderBottom: 'none' },
          '& .name-column--cell': { color: colors.greenAccent[300] },
          '& .MuiDataGrid-columnHeaders': { backgroundColor: colors.blueAccent[700], borderBottom: 'none' },
          '& .MuiDataGrid-virtualScroller': { backgroundColor: colors.primary[400] },
          '& .MuiDataGrid-footerContainer': { borderTop: 'none', backgroundColor: colors.blueAccent[700] },
          '& .MuiCheckbox-root': { color: `${colors.greenAccent[200]} !important` },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': { color: `${colors.grey[100]} !important` },
        }}
      >
        <DataGrid<ContactRow>
          rows={mockDataContacts as ContactRow[]}
          columns={columns}
          // MUI X v6+
          slots={{ toolbar: GridToolbar }}
          // Falls du v5 nutzt, ersetze die Zeile oben durch:
          // components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}
