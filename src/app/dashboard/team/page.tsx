'use client';

import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Header from '../components/Header';
import { tokens } from '../components/tokens';
import { mockDataTeam } from '../data/mockData';

type Access = 'admin' | 'manager' | 'user';

export interface TeamRow {
  id: number;
  name: string;
  age: number;
  phone: string;
  email: string;
  access: Access;
}

export default function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef<TeamRow>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 150,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      width: 100,
    },
    { field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    {
      field: 'access',
      headerName: 'Access Level',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        const access = params.row.access;
        const bg =
          access === 'admin'
            ? colors.greenAccent[600]
            : access === 'manager'
              ? colors.greenAccent[700]
              : colors.greenAccent[700];

        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={bg}
            borderRadius="4px"
          >
            {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
            {access === 'manager' && <SecurityOutlinedIcon />}
            {access === 'user' && <LockOpenOutlinedIcon />}
            <Typography
              color={colors.grey[100]}
              sx={{ ml: '5px', textTransform: 'capitalize' }}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
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
        <DataGrid<TeamRow>
          checkboxSelection
          rows={mockDataTeam as TeamRow[]}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
