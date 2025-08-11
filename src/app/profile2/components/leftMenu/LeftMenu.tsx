// components/LeftMenu.tsx
import Link from 'next/link';
import ProfileCard from './ProfileCard';
import Ad from '../Ad';

// MUI
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';

// Icons
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function LeftMenu({ type }: { type: 'home' | 'profile' }) {
  const items = [
    { href: '/', label: 'My Posts', icon: <ArticleOutlinedIcon /> },
    { href: '/', label: 'Activity', icon: <TimelineOutlinedIcon /> },
    { href: '/', label: 'Marketplace', icon: <StorefrontOutlinedIcon /> },
    { href: '/', label: 'Events', icon: <EventOutlinedIcon /> },
    { href: '/', label: 'Albums', icon: <PhotoAlbumOutlinedIcon /> },
    { href: '/', label: 'Videos', icon: <SmartDisplayOutlinedIcon /> },
    { href: '/', label: 'News', icon: <NewspaperOutlinedIcon /> },
    { href: '/', label: 'Courses', icon: <SchoolOutlinedIcon /> },
    { href: '/', label: 'Lists', icon: <FormatListBulletedOutlinedIcon /> },
    { href: '/', label: 'Settings', icon: <SettingsOutlinedIcon /> },
  ];

  return (
    <Stack spacing={2}>
      {type === 'home' && <ProfileCard />}

      <Card elevation={2}>
        <CardContent sx={{ py: 1 }}>
          <List dense disablePadding>
            {items.map((it, idx) => (
              <Stack key={it.label}>
                <ListItemButton component={Link} href={it.href} sx={{ borderRadius: 2 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>{it.icon}</ListItemIcon>
                  <ListItemText primary={it.label} />
                </ListItemButton>
                {idx !== items.length - 1 && (
                  <Divider sx={{ my: 0.5, mx: 'auto', width: 144 }} />
                )}
              </Stack>
            ))}
          </List>
        </CardContent>
      </Card>

      <Ad size="sm" />
    </Stack>
  );
}
