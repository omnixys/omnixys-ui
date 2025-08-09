// Pfad: components/seller/Sidebar.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { assets } from '../../assets/assets';

// MUI
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

type MenuItem = {
  name: string;
  path: string;
  icon: any; // StaticImageData
};

const menuItems: MenuItem[] = [
  { name: 'Add Product', path: '/shop/seller', icon: assets.add_icon },
  {
    name: 'Product List',
    path: '/shop/seller/product-list',
    icon: assets.product_list_icon,
  },
  { name: 'Orders', path: '/shop/seller/orders', icon: assets.order_icon },
];

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      sx={{
        borderRight: 1,
        borderColor: 'divider',
        minHeight: '100vh',
        width: { xs: 64, md: 256 }, // xs: icon-only, md+: icon + label
        flexShrink: 0,
        bgcolor: 'background.paper',
      }}
    >
      <List sx={{ py: 1 }}>
        {menuItems.map((item) => {
          const selected = pathname === item.path;

          return (
            <ListItemButton
              key={item.name}
              component={Link}
              href={item.path}
              selected={selected}
              sx={{
                gap: 1.5,
                py: 1.25,
                borderRight: selected ? 6 : 0,
                borderRightColor: selected ? 'primary.main' : 'transparent',
                bgcolor: selected ? 'primary.main' + '1A' : 'transparent', // ~10% overlay
                '&.Mui-selected:hover': { bgcolor: 'primary.main' + '26' },
              }}
              aria-current={selected ? 'page' : undefined}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <Image
                  src={item.icon}
                  alt={`${item.name} icon`}
                  width={28}
                  height={28}
                  style={{ display: 'block' }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" noWrap>
                    {item.name}
                  </Typography>
                }
                sx={{ display: { xs: 'none', md: 'block' } }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      {/* Optional: Platz für Footer/Version o. Ä. */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, px: 2, py: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          Seller Panel
        </Typography>
      </Box>
    </Box>
  );
}
