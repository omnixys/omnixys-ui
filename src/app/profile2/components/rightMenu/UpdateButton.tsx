'use client';

import { useFormStatus } from 'react-dom';
import { Button, CircularProgress } from '@mui/material';

export default function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      disabled={pending}
      startIcon={pending ? <CircularProgress size={16} color="inherit" /> : null}
    >
      {pending ? 'Updating...' : 'Update'}
    </Button>
  );
}
