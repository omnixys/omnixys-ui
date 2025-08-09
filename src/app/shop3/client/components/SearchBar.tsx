'use client';

import { IconButton, InputBase, Paper, useTheme } from '@mui/material';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const theme = useTheme();

  return (
    <Paper
      component="form"
      sx={{
        display: { xs: 'none', sm: 'flex' },
        alignItems: 'center',
        gap: 1,
        borderRadius: 1,
        px: 1,
        py: 0.5,
        boxShadow: theme.shadows[2],
        border: `1px solid ${theme.palette.grey[300]}`,
      }}
    >
      <IconButton size="small" sx={{ p: 0.5 }}>
        <Search size={16} color={theme.palette.grey[500]} />
      </IconButton>
      <InputBase
        id="search"
        placeholder="Search..."
        sx={{ fontSize: '0.875rem', flex: 1 }}
        inputProps={{ 'aria-label': 'search products' }}
      />
    </Paper>
  );
};

export default SearchBar;
