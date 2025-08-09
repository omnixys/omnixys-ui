'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Tooltip,
} from '@mui/material';
import { Send as SendIcon, Person as PersonIcon, AccountBalance as BankIcon } from '@mui/icons-material';

// Beispiel-Daten
const exampleAccounts = [
  { id: 'acc1', name: 'Girokonto', balance: 1520.55 },
  { id: 'acc2', name: 'Sparkonto', balance: 7800.1 },
];

const exampleFriends = [
  {
    id: 'f1',
    name: 'Max Mustermann',
    avatar: '/avatars/max.png',
    iban: 'DE89370400440532013000',
    bankName: 'Sparkasse Karlsruhe',
  },
  {
    id: 'f2',
    name: 'Anna Schmidt',
    avatar: '/avatars/anna.png',
    iban: 'DE55500105175407324931',
    bankName: 'Deutsche Bank',
  },
];

export default function TransferPage() {
  const [mode, setMode] = useState<'friend' | 'manual'>('friend');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');
  const [form, setForm] = useState({
    note: '',
    amount: '',
    name: '',
    iban: '',
    bankName: '',
  });

  const handleModeChange = (_: any, newMode: 'friend' | 'manual' | null) => {
    if (newMode) setMode(newMode);
  };

  const handleFriendSelect = (friendId: string) => {
    setSelectedFriend(friendId);
    const friend = exampleFriends.find((f) => f.id === friendId);
    if (friend) {
      setForm((prev) => ({
        ...prev,
        name: friend.name,
        iban: friend.iban,
        bankName: friend.bankName,
      }));
    }
  };

  const handleSubmit = () => {
    const payload = {
      mode,
      fromAccount: selectedAccount,
      toFriendId: selectedFriend,
      form,
    };
    console.log('🚀 Überweisung gesendet:', payload);
    alert(`Überweisung gesendet:\n${JSON.stringify(payload, null, 2)}`);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Geld überweisen
      </Typography>

      {/* Konto-Auswahl */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Von Konto</InputLabel>
        <Select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {exampleAccounts.map((acc) => (
            <MenuItem key={acc.id} value={acc.id}>
              {acc.name} –{' '}
              {acc.balance.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Notiz */}
      <TextField
        fullWidth
        label="Notiz (optional)"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
        sx={{ mb: 3 }}
      />

      {/* Modus */}
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        sx={{ mb: 3 }}
        fullWidth
      >
        <ToggleButton value="friend">
          <PersonIcon sx={{ mr: 1 }} /> Freund auswählen
        </ToggleButton>
        <ToggleButton value="manual">
          <BankIcon sx={{ mr: 1 }} /> Manuelle Überweisung
        </ToggleButton>
      </ToggleButtonGroup>

      {mode === 'friend' && (
        <>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Empfänger</InputLabel>
            <Select
              value={selectedFriend}
              onChange={(e) => handleFriendSelect(e.target.value)}
            >
              {exampleFriends.map((f) => (
                <MenuItem key={f.id} value={f.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar src={f.avatar} sx={{ width: 24, height: 24 }} />
                    {f.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Betrag (€)"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </>
      )}

      {mode === 'manual' && (
        <>
          <TextField
            fullWidth
            label="Empfänger-Name"
            sx={{ mb: 2 }}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="IBAN"
            sx={{ mb: 2 }}
            value={form.iban}
            onChange={(e) => setForm({ ...form, iban: e.target.value })}
          />
          <TextField
            fullWidth
            label="Bankname"
            sx={{ mb: 2 }}
            value={form.bankName}
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
          />
          <TextField
            fullWidth
            label="Betrag (€)"
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </>
      )}

      <Tooltip title="Überweisung absenden">
        <Button
          variant="contained"
          fullWidth
          startIcon={<SendIcon />}
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          disabled={!selectedAccount || !form.amount}
        >
          Senden
        </Button>
      </Tooltip>
    </Box>
  );
}
