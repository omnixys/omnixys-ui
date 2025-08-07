// Pfad: src/app/analytics/account/components/AccountForm.tsx

'use client';

import { gql, useMutation } from '@apollo/client';
import { Box, Button, MenuItem, Snackbar, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import getApolloClient from '../../lib/apolloClient';
import { AccountType } from '../../types/account.type';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input)
  }
`;

interface CreateAccountInput {
  category: AccountType;
  username: string;
  userId: string;
  transactionLimit: number;
}

const AccountForm = () => {
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const [input, setInput] = useState<CreateAccountInput>({
    category: 'CHECKING',
    username: '',
    userId: '',
    transactionLimit: 0,
  });
  const [open, setOpen] = useState(false);

  const [createAccount] = useMutation(CREATE_ACCOUNT_MUTATION, { client });

  const handleSubmit = async () => {
    await createAccount({ variables: { input } });
    setOpen(true);
    setInput({
      category: 'CHECKING',
      username: '',
      userId: '',
      transactionLimit: 0,
    });
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        select
        label="Kontoart"
        value={input.category}
        onChange={(e) =>
          setInput({ ...input, category: e.target.value as AccountType })
        }
        required
      >
        {[
          'CHECKING',
          'SAVINGS',
          'CREDIT',
          'DEPOSIT',
          'INVESTMENT',
          'LOAN',
          'BUSINESS',
          'JOINT',
        ].map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Benutzername"
        value={input.username}
        onChange={(e) => setInput({ ...input, username: e.target.value })}
        required
      />
      <TextField
        label="User-ID"
        value={input.userId}
        onChange={(e) => setInput({ ...input, userId: e.target.value })}
        required
      />
      <TextField
        label="Transaktionslimit (€)"
        type="number"
        value={input.transactionLimit}
        onChange={(e) =>
          setInput({ ...input, transactionLimit: parseInt(e.target.value) })
        }
        required
      />
      <Button variant="contained" onClick={handleSubmit}>
        Konto erstellen
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Konto erfolgreich erstellt"
      />
    </Box>
  );
};

export default AccountForm;
