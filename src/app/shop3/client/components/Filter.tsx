'use client';

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentSort = (searchParams.get('sort') as string) ?? 'newest';

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleChange = (e: SelectChangeEvent) => {
    handleFilter(e.target.value as string);
  };

  return (
    <Box
      sx={{
        my: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 1,
        color: 'text.secondary',
        fontSize: '0.875rem',
      }}
    >
      <Typography variant="body2">Sort by:</Typography>
      <FormControl size="small" variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="sort-label">Sort</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          value={currentSort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
