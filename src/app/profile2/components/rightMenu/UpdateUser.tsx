'use client';

import { useActionState, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import UpdateButton from './UpdateButton';
import { updateProfile } from '../../lib/actions'; // Server-Action (Mock oder real)

// MUI
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid,
  Stack,
  Typography,
  TextField,
  IconButton,
  Box,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type UserLite = {
  cover?: string | null;
  name?: string | null;
  surname?: string | null;
  description?: string | null;
  city?: string | null;
  school?: string | null;
  work?: string | null;
  website?: string | null;
  username?: string | null;
};

export default function UpdateUser({ user }: { user: UserLite }) {
  const [open, setOpen] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | null>(user.cover || null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    if (state.success) router.refresh();
  };

  const pickCover = () => coverInputRef.current?.click();
  const onCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setCoverUrl(url);
  };

  return (
    <Stack spacing={1}>
      <Button variant="text" size="small" onClick={() => setOpen(true)}>
        Update
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Update Profile
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="caption" color="text.secondary">
            Use the navbar profile to change the avatar or username.
          </Typography>

          {/* COVER UPLOAD */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Box
              sx={{
                position: 'relative',
                width: 96,
                height: 64,
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Image
                src={coverUrl || '/noCover.png'}
                alt="Cover"
                fill
                sizes="96px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Button variant="outlined" onClick={pickCover}>
              Change Cover
            </Button>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onCoverChange}
            />
          </Stack>

          {/* FORM */}
          <Box
            component="form"
            action={(formData) =>
              formAction({ formData, cover: coverUrl || '' })
            }
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="First Name"
                  placeholder={user.name || 'John'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="surname"
                  label="Surname"
                  placeholder={user.surname || 'Doe'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  placeholder={user.description || 'Life is beautiful...'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label="City"
                  placeholder={user.city || 'New York'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="school"
                  label="School"
                  placeholder={user.school || 'MIT'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="work"
                  label="Work"
                  placeholder={user.work || 'Apple Inc.'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="website"
                  label="Website"
                  placeholder={user.website || 'lama.dev'}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Stack spacing={1.5} sx={{ mt: 3 }}>
              <UpdateButton />
              {state.success && (
                <Alert severity="success">Profile has been updated!</Alert>
              )}
              {state.error && (
                <Alert severity="error">Something went wrong!</Alert>
              )}
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          <Link component="button" variant="body2" onClick={handleClose}>
            Close
          </Link>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
