'use client';

import { useFormStatus } from 'react-dom';
import { Button, CircularProgress, Stack } from '@mui/material';

export default function AddPostButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      disabled={pending}
      sx={{ mt: 1 }}
    >
      {pending ? (
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={16} />
          <span>Senden…</span>
        </Stack>
      ) : (
        'Senden'
      )}
    </Button>
  );
}
