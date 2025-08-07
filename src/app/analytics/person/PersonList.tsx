// src/components/PersonList.tsx
'use client';

import { Box, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import CustomerDataGrid from '../../../components/person/customer/CustomerDataGrid';
import EmployeeDataGrid from '../../../components/person/employee/EmployeeDataGrid';

interface PersonListProps {
  type: 'CUSTOMER' | 'EMPLOYEE';
}

export default function PersonList({ type }: PersonListProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Box textAlign="center" py={4}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!session?.access_token) {
    return <Box py={4}>Kein Token verfügbar.</Box>;
  }

  return (
    <>
      <Box hidden={type !== 'CUSTOMER'}>
        <CustomerDataGrid token={session.access_token} />
      </Box>
      <Box hidden={type !== 'EMPLOYEE'}>
        <EmployeeDataGrid token={session.access_token} />
      </Box>
    </>
  );
}
