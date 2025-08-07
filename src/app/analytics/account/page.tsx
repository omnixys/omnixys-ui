// Pfad: src/app/analytics/account/page.tsx

'use client';

import {
  Box,
  Container,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import AccountForm from '../../../components/account/AccountForm';
import AccountList from '../../../components/account/AccountList';
import { AccountType } from '../../../types/account.type';

const TABS: { label: string; type?: AccountType }[] = [
  { label: 'Girokonten', type: 'CHECKING' },
  { label: 'Sparkonten', type: 'SAVINGS' },
  { label: 'Kreditkonten', type: 'CREDIT' },
  { label: 'Festgeldkonten', type: 'DEPOSIT' },
  { label: 'Investmentkonten', type: 'INVESTMENT' },
  { label: 'Darlehen', type: 'LOAN' },
  { label: 'Geschäftskonten', type: 'BUSINESS' },
  { label: 'Gemeinschaftskonten', type: 'JOINT' },
  { label: 'Neues Konto' }, // keine `type`-Angabe → Formular
];

const AccountManagementPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Bankkonten verwalten
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ mb: 2 }}
      >
        {TABS.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      <Paper elevation={3} sx={{ p: 3 }}>
        {TABS[activeTab].type ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Übersicht aller {TABS[activeTab].label}
            </Typography>
            <AccountList type={TABS[activeTab].type!} />
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" gutterBottom>
              Neues Bankkonto erstellen
            </Typography>
            <Divider sx={{ my: 2 }} />
            <AccountForm />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AccountManagementPage;
