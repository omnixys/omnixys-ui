// Pfad: src/app/components/account/AccountList.tsx

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import { ACCOUNTS_QUERY } from "../../graphql/account/query/account";
import getApolloClient from "../../lib/apolloClient";
import { Account } from "../../types/account.type";

const AccountList = ({ type }: { type: string }) => {
  const { data: session } = useSession();
  const client = getApolloClient(session?.access_token);

  const { data, loading, error } = useQuery<{ accounts: Account[] }>(
    ACCOUNTS_QUERY,
    { client }
  );

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Fehler beim Laden der Konten</Typography>;

  const filtered = data?.accounts?.filter(
    (acc) => acc.category?.toLowerCase() === type.toLowerCase()
  );

  if (!filtered?.length) {
    return <Typography variant="body1">Keine Konten gefunden.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Konto-ID</TableCell>
            <TableCell>Saldo</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Benutzer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((account: Account) => (
            <TableRow key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.balance.toFixed(2)} €</TableCell>
              <TableCell>{account.state}</TableCell>
              <TableCell>{account.username ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountList;
