// app/banking/history/page.tsx
'use client';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const dummyHistory = [
  {
    date: '2025-08-01',
    type: 'Ausgang',
    recipient: 'Stadtwerke',
    amount: -120.5,
  },
  { date: '2025-08-02', type: 'Eingang', recipient: 'Lohn', amount: 2500 },
  { date: '2025-08-03', type: 'Ausgang', recipient: 'Amazon', amount: -45.99 },
];

export default function HistoryPage() {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Transaktionshistorie
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Art</TableCell>
              <TableCell>Empfänger/Absender</TableCell>
              <TableCell>Betrag</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyHistory.map((t, idx) => (
              <TableRow key={idx}>
                <TableCell>{t.date}</TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{t.recipient}</TableCell>
                <TableCell
                  style={{ color: t.amount < 0 ? '#F87171' : '#A3E635' }}
                >
                  {t.amount.toFixed(2)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
