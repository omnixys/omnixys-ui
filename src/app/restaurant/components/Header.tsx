'use client';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          OmnixysFood
        </Typography>
        <Link href="/cart" passHref>
          <Button color="inherit">Warenkorb</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
