// src/components/SearchBar.tsx (MUI-Version)
'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function SearchBar() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    if (name) router.push(`/list?name=${encodeURIComponent(name)}`);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'grey.100',
        p: 1,
        borderRadius: 1,
        flex: 1,
      }}
    >
      <TextField
        name="name"
        placeholder="Search"
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        inputProps={{ 'aria-label': 'Search products' }}
      />
      <IconButton type="submit" aria-label="submit search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
