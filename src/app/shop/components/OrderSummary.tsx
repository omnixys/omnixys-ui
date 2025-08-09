// Pfad: components/OrderSummary.tsx
'use client';

import * as React from 'react';
import { addressDummyData } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type Address = {
  fullName: string;
  area: string;
  city: string;
  state: string;
  [k: string]: unknown;
};

export default function OrderSummary(): JSX.Element {
  const { currency, router, getCartCount, getCartAmount } = useAppContext();

  const [userAddresses, setUserAddresses] = React.useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(
    null,
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [promo, setPromo] = React.useState('');

  const isDropdownOpen = Boolean(anchorEl);

  React.useEffect(() => {
    setUserAddresses(addressDummyData as Address[]);
  }, []);

  const handleAddressBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setAnchorEl(null);
  };

  const handleAddNewAddress = () => {
    setAnchorEl(null);
    router.push('/add-address');
  };

  const createOrder = async () => {
    // TODO: Order erstellen (API-Call)
    // selectedAddress, promo, getCartAmount() etc. verwenden
  };

  const itemsCount = getCartCount();
  const amount = getCartAmount();
  const tax = Math.floor(amount * 0.02);
  const total = amount + tax;

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: { md: 384 }, // ~ md:w-96
        bgcolor: 'background.default',
        p: 2.5,
        border: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="h5" fontWeight={600} color="text.primary">
        Order Summary
      </Typography>

      <Divider sx={{ my: 2.5 }} />

      <Box display="grid" gap={3}>
        {/* Address Select */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={600}
            mb={1}
          >
            SELECT ADDRESS
          </Typography>

          <Box position="relative">
            <Button
              fullWidth
              onClick={handleAddressBtnClick}
              variant="outlined"
              sx={{
                justifyContent: 'space-between',
                color: 'text.primary',
                bgcolor: 'background.paper',
              }}
              endIcon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  stroke="#6B7280"
                  fill="none"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            >
              <Typography
                variant="body2"
                noWrap
                sx={{ flex: 1, textAlign: 'left', mr: 1 }}
                title={
                  selectedAddress
                    ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                    : 'Select Address'
                }
              >
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : 'Select Address'}
              </Typography>
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={isDropdownOpen}
              onClose={() => setAnchorEl(null)}
              PaperProps={{ sx: { width: '100%', maxWidth: 480 } }}
            >
              {userAddresses.map((addr, i) => (
                <MenuItem key={i} onClick={() => handleAddressSelect(addr)}>
                  <Typography
                    variant="body2"
                    noWrap
                    title={`${addr.fullName}, ${addr.area}, ${addr.city}, ${addr.state}`}
                  >
                    {addr.fullName}, {addr.area}, {addr.city}, {addr.state}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={handleAddNewAddress}
                sx={{ justifyContent: 'center', fontWeight: 600 }}
              >
                + Add New Address
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Promo Code */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={600}
            mb={1}
          >
            PROMO CODE
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1.5}
          >
            <TextField
              fullWidth
              placeholder="Enter promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                px: 4,
              }}
              onClick={() => {
                /* TODO: Promo anwenden */
              }}
            >
              Apply
            </Button>
          </Box>
        </Box>

        <Divider />

        {/* Totals */}
        <Box display="grid" gap={1.5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            fontWeight={600}
          >
            <Typography variant="body1" color="text.secondary" fontWeight={600}>
              Items {itemsCount}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {currency}
              {amount}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              Shipping Fee
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              Free
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              Tax (2%)
            </Typography>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {currency}
              {tax}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1.5}
            pt={1.5}
            borderTop={1}
            borderColor="divider"
          >
            <Typography variant="h6" fontWeight={600}>
              Total
            </Typography>
            <Typography variant="h6" fontWeight={700}>
              {currency}
              {total}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt: 2.5,
          bgcolor: 'primary.main',
          '&:hover': { bgcolor: 'primary.dark' },
          py: 1.25,
        }}
        onClick={createOrder}
      >
        Place Order
      </Button>
    </Paper>
  );
}
