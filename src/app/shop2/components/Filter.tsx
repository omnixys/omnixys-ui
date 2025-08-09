// src/components/Filter.tsx (MUI-Version)
'use client';

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { sampleCategories } from '../data/categories'; // optional: für Cat-Dropdown

export default function Filter() {
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const [type, setType] = React.useState(params.get('type') || '');
  const [min, setMin] = React.useState(params.get('min') || '');
  const [max, setMax] = React.useState(params.get('max') || '');
  const [cat, setCat] = React.useState(params.get('cat') || '');
  const [sort, setSort] = React.useState(params.get('sort') || '');

  const apply = () => {
    const url = new URL(window.location.origin + pathname);
    const set = (k: string, v?: string) =>
      v && v.length ? url.searchParams.set(k, v) : url.searchParams.delete(k);

    set('type', type);
    set('min', min);
    set('max', max);
    set('cat', cat);
    set('sort', sort);
    url.searchParams.delete('page'); // zurück auf Seite 0

    replace(url.toString());
  };

  const clearAll = () => {
    const url = new URL(window.location.origin + pathname);
    replace(url.toString());
    setType('');
    setMin('');
    setMax('');
    setCat('');
    setSort('');
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid size={{ xs: 12, md: 9 }}>
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            <TextField
              select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              size="small"
            >
              <MenuItem value="">Alle</MenuItem>
              <MenuItem value="physical">Physical</MenuItem>
              <MenuItem value="digital">Digital</MenuItem>
            </TextField>

            <TextField
              label="min price"
              type="number"
              size="small"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              sx={{ width: 140 }}
            />

            <TextField
              label="max price"
              type="number"
              size="small"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              sx={{ width: 140 }}
            />

            <TextField
              select
              label="Category"
              size="small"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="">Alle</MenuItem>
              {sampleCategories.map((c) => (
                <MenuItem key={c.slug} value={c.slug}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="All Filters"
              size="small"
              disabled
              sx={{ minWidth: 160 }}
            >
              <MenuItem>—</MenuItem>
            </TextField>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
          >
            <TextField
              select
              label="Sort By"
              size="small"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="">Standard</MenuItem>
              <MenuItem value="asc price">Price (low to high)</MenuItem>
              <MenuItem value="desc price">Price (high to low)</MenuItem>
              <MenuItem value="desc createdAt">Newest</MenuItem>
              <MenuItem value="asc createdAt">Oldest</MenuItem>
            </TextField>
            <Button variant="text" onClick={clearAll}>
              Reset
            </Button>
            <Button variant="contained" onClick={apply}>
              Apply
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
