'use client';

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmailIcon from '@mui/icons-material/Email';
import InsightsIcon from '@mui/icons-material/Insights';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const sections = [
  {
    title: 'Kunden & Nutzer',
    items: [
      { label: 'Personen', path: '/analytics/person', icon: <PeopleIcon /> },
      {
        label: 'Konten',
        path: '/analytics/account',
        icon: <AccountBalanceIcon />,
      },
    ],
  },
  {
    title: 'Produkte & Bestand',
    items: [
      {
        label: 'Produkte',
        path: '/analytics/product',
        icon: <InventoryIcon />,
      },
      { label: 'Lager', path: '/analytics/inventory', icon: <StorageIcon /> },
    ],
  },
  {
    title: 'Kommunikation & Logs',
    items: [
      {
        label: 'Benachrichtigungen',
        path: '/analytics/notification',
        icon: <EmailIcon />,
      },
      { label: 'Logs', path: '/analytics/logcollector', icon: <StorageIcon /> },
    ],
  },
  {
    title: 'KPI-Dashboards',
    items: [
      {
        label: 'Analytics',
        path: '/analytics/analytics',
        icon: <InsightsIcon />,
      },
      {
        label: 'Transaktionen',
        path: '/analytics/transaction',
        icon: <InsightsIcon />,
      },
    ],
  },
];

export default function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" fontWeight={700}>
          Analytics
        </Typography>
      </Box>
      <Divider />
      {sections.map((section, index) => (
        <Box key={index}>
          <Typography
            sx={{
              px: 2,
              py: 1,
              fontSize: 13,
              color: theme.palette.text.secondary,
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            {section.title}
          </Typography>
          <List disablePadding>
            {section.items.map((item) => (
              <ListItemButton
                key={item.label}
                selected={pathname === item.path}
                onClick={() => {
                  router.push(item.path);
                  onNavigate?.();
                }}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: theme.palette.text.primary, minWidth: 36 }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
