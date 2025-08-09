// Pfad: app/seller/products/add/page.tsx
'use client';

import Image from 'next/image';
import * as React from 'react';
import { assets } from '../assets/assets';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Category =
  | 'Earphone'
  | 'Headphone'
  | 'Watch'
  | 'Smartphone'
  | 'Laptop'
  | 'Camera'
  | 'Accessories';

export default function AddProduct(): JSX.Element {
  const [files, setFiles] = React.useState<Array<File | undefined>>(
    new Array(4).fill(undefined),
  );
  const [previews, setPreviews] = React.useState<string[]>(
    new Array(4).fill(''),
  );
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState<Category>('Earphone');
  const [price, setPrice] = React.useState<string>('');
  const [offerPrice, setOfferPrice] = React.useState<string>('');

  const handleImageChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFiles((prev) => {
        const next = [...prev];
        next[index] = file;
        return next;
      });
      setPreviews((prev) => {
        const next = [...prev];
        if (prev[index]) URL.revokeObjectURL(prev[index]); // altes URL-Objekt aufräumen
        next[index] = file ? URL.createObjectURL(file) : '';
        return next;
      });
    };

  React.useEffect(() => {
    // Cleanup aller Objekt-URLs bei Unmount
    return () => previews.forEach((p) => p && URL.revokeObjectURL(p));
  }, [previews]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: An dein Backend posten (FormData)
    // const fd = new FormData();
    // files.forEach((f, i) => f && fd.append('images', f, f.name));
    // fd.append('name', name);
    // fd.append('description', description);
    // fd.append('category', category);
    // fd.append('price', price);
    // fd.append('offerPrice', offerPrice);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container maxWidth="md" sx={{ py: 4, flex: 1 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Add Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          {/* Produktbilder */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight={600}>
              Product Image
            </Typography>

            <Grid container spacing={2} mt={0.5}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <label htmlFor={`image${index}`}>
                    <input
                      id={`image${index}`}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange(index)}
                    />
                    <Paper
                      elevation={0}
                      sx={{
                        cursor: 'pointer',
                        p: 1,
                        border: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        aspectRatio: '1 / 1',
                      }}
                    >
                      <Image
                        src={previews[index] || assets.upload_area}
                        alt={`image_${index + 1}`}
                        width={100}
                        height={100}
                        style={{ maxWidth: 96, height: 'auto' }}
                      />
                    </Paper>
                  </label>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Name & Beschreibung */}
          <Stack spacing={2.5} mb={3} maxWidth={480}>
            <TextField
              label="Product Name"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <TextField
              label="Product Description"
              placeholder="Type here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              multiline
              minRows={4}
            />
          </Stack>

          {/* Kategorie & Preise */}
          <Grid container spacing={2} mb={3}>
            <Grid item xs={6} sm="auto">
              <Stack spacing={1} sx={{ width: 160 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Category
                </Typography>
                <Select<Category>
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  size="small"
                >
                  <MenuItem value="Earphone">Earphone</MenuItem>
                  <MenuItem value="Headphone">Headphone</MenuItem>
                  <MenuItem value="Watch">Watch</MenuItem>
                  <MenuItem value="Smartphone">Smartphone</MenuItem>
                  <MenuItem value="Laptop">Laptop</MenuItem>
                  <MenuItem value="Camera">Camera</MenuItem>
                  <MenuItem value="Accessories">Accessories</MenuItem>
                </Select>
              </Stack>
            </Grid>

            <Grid item xs={6} sm="auto">
              <Stack spacing={1} sx={{ width: 160 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Product Price
                </Typography>
                <TextField
                  type="number"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  size="small"
                  inputProps={{ min: 0, step: '0.01' }}
                  required
                />
              </Stack>
            </Grid>

            <Grid item xs={6} sm="auto">
              <Stack spacing={1} sx={{ width: 160 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Offer Price
                </Typography>
                <TextField
                  type="number"
                  placeholder="0"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  size="small"
                  inputProps={{ min: 0, step: '0.01' }}
                  required
                />
              </Stack>
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" sx={{ px: 4, py: 1.25 }}>
            ADD
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
