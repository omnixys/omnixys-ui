// src/components/NavIcons.tsx (MUI-Version, ohne Wix)
'use client';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCartStore } from '../hooks/useCartStore';
import CartModal from './CartModal';

export default function NavIcons() {
  const router = useRouter();

  // Cart store (wix-frei)
  const { counter, getCart } = useCartStore();
  React.useEffect(() => {
    getCart(); // keine wixClient-Arg mehr
  }, [getCart]);

  // Cart modal
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // Account menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  // Dummy-Login-Check (ersetze nach Bedarf durch echten Auth-Store)
  const isLoggedIn =
    typeof window !== 'undefined' && Boolean(localStorage.getItem('auth'));

  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAnchorEl(null);
    router.refresh();
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1.5, xl: 2 }}
      alignItems="center"
      sx={{ position: 'relative' }}
    >
      <Tooltip title={isLoggedIn ? 'Account' : 'Login'}>
        <IconButton onClick={handleProfileClick} aria-label="account">
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem
          component={Link}
          href="/profile"
          onClick={() => setAnchorEl(null)}
        >
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Tooltip title="Notifications">
        <IconButton aria-label="notifications">
          <NotificationsNoneOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Cart">
        <IconButton aria-label="cart" onClick={() => setIsCartOpen((p) => !p)}>
          <Badge badgeContent={counter} color="primary">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      {isCartOpen && <CartModal />}
    </Stack>
  );
}
