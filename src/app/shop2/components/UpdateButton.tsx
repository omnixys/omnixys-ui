// src/components/UpdateButton.tsx
'use client';

import { Button } from '@mui/material';
import { useFormStatus } from 'react-dom';

export default function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={pending}
      sx={{
        maxWidth: 384, // entspricht max-w-96 in Tailwind
        textTransform: 'none', // verhindert Uppercase
      }}
    >
      {pending ? 'Updating...' : 'Update'}
    </Button>
  );
}
