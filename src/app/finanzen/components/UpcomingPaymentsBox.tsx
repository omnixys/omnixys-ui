'use client';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

export interface UpcomingPayment {
  title: string;
  dueDate: string; // ISO
  amount: number;
}

export interface UpcomingPaymentsBoxProps {
  payments: UpcomingPayment[];
}

export default function UpcomingPaymentsBox({ payments }: UpcomingPaymentsBoxProps) {
  return (
    <Card sx={{ p: 2, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="subtitle2" fontWeight="bold">
          Upcoming Payments
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Next obligations
        </Typography>
        <List dense>
          {payments.map((p, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemText
                primary={`${p.title} — $${p.amount.toFixed(2)}`}
                secondary={`Due: ${new Date(p.dueDate).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
