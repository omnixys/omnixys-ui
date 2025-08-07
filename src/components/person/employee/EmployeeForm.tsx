'use client';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { EmployeeFormData } from '../../../types/person/CustomerFormData';
import { Person } from '../../../types/person/person.type';
import { getLogger } from '../../../utils/logger';

interface EmployeeFormProps {
  person: Person;
  onSubmit?: (data: EmployeeFormData) => void;
}

export default function EmployeeForm({ person, onSubmit }: EmployeeFormProps) {
  const logger = getLogger(EmployeeForm.name);
  const [form, setForm] = useState<EmployeeFormData>({
    firstName: person.firstName || '',
    lastName: person.lastName || '',
    email: person.email || '',
    phoneNumber: person.phoneNumber || '',
    role: person.employee?.role || 'STAFF',
    position: person.employee?.position || '',
    department: person.employee?.department || '',
    isExternal: person.employee?.isExternal || false,
    hireDate: person.employee?.hireDate?.substring(0, 10) || '',
    salary: person.employee?.salary || 0,
  });

  const handleChange = <K extends keyof EmployeeFormData>(
    field: K,
    value: EmployeeFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    } else {
      logger.debug('🧾 Mitarbeiter gespeichert:', form);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }} component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Vorname"
            fullWidth
            value={form.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Nachname"
            fullWidth
            value={form.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="E-Mail"
            fullWidth
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Telefonnummer"
            fullWidth
            value={form.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Rolle"
            select
            fullWidth
            value={form.role}
            onChange={(e) =>
              handleChange('role', e.target.value as EmployeeFormData['role'])
            }
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="MANAGER">Manager</MenuItem>
            <MenuItem value="STAFF">Staff</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Position"
            fullWidth
            value={form.position}
            onChange={(e) => handleChange('position', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Abteilung"
            fullWidth
            value={form.department}
            onChange={(e) => handleChange('department', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Eintrittsdatum"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.hireDate}
            onChange={(e) => handleChange('hireDate', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Gehalt (€)"
            type="number"
            fullWidth
            value={form.salary}
            onChange={(e) => handleChange('salary', parseFloat(e.target.value))}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.isExternal}
                onChange={(e) => handleChange('isExternal', e.target.checked)}
              />
            }
            label="Externer Mitarbeiter"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: (theme) => theme.palette.primary.main,
              ':hover': {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            Speichern
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
