'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// MUI
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Typography,
  IconButton,
  InputBase,
  alpha,
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
  Avatar,
  Button,
} from '@mui/material';

// Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

// Deine MUI-Version von MobileMenu aus vorheriger Antwort
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const name = session?.user?.name || session?.user?.email || 'User';
  const avatarSrc = (session?.user?.image as string) || '/noAvatar.png';

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar
        sx={{
          minHeight: 96,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr auto', md: '1fr 2fr 1fr' },
          gap: 2,
        }}
      >
        {/* LEFT: Logo (nur lg+) */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 700 }}
          >
            LAMASOCIAL
          </Typography>
        </Box>

        {/* CENTER: Links + Suche (ab md sichtbar) */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {/* Links */}
          <Stack direction="row" spacing={3} alignItems="center" sx={{ color: 'text.secondary' }}>
            <Stack component={Link} href="/" direction="row" spacing={1} alignItems="center" sx={{ textDecoration: 'none', color: 'inherit' }}>
              <HomeOutlinedIcon fontSize="small" />
              <Typography variant="body2">Homepage</Typography>
            </Stack>
            <Stack component={Link} href="/" direction="row" spacing={1} alignItems="center" sx={{ textDecoration: 'none', color: 'inherit' }}>
              <GroupOutlinedIcon fontSize="small" />
              <Typography variant="body2">Friends</Typography>
            </Stack>
            <Stack component={Link} href="/" direction="row" spacing={1} alignItems="center" sx={{ textDecoration: 'none', color: 'inherit' }}>
              <AutoStoriesOutlinedIcon fontSize="small" />
              <Typography variant="body2">Stories</Typography>
            </Stack>
          </Stack>

          {/* Suche (nur xl sichtbar) */}
          <Box
            sx={{
              display: { xs: 'none', xl: 'flex' },
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: 3,
              bgcolor: (t) => alpha(t.palette.text.primary, 0.06),
            }}
          >
            <InputBase placeholder="search..." sx={{ ml: 0.5, flex: 1 }} />
            <SearchIcon fontSize="small" />
          </Box>
        </Stack>

        {/* RIGHT: Icons + Avatar / Login + MobileMenu */}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
          {status === 'loading' ? (
            <CircularProgress size={18} />
          ) : session ? (
            <>
              {/* Drei Aktions-Icons */}
              <IconButton size="small">
                <PeopleAltOutlinedIcon />
              </IconButton>
              <IconButton size="small">
                <ChatBubbleOutlineOutlinedIcon />
              </IconButton>
              <IconButton size="small">
                <NotificationsNoneOutlinedIcon />
              </IconButton>

              {/* User Avatar mit Menü */}
              <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar src={avatarSrc} sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled>{name}</MenuItem>
                <Divider />
                <MenuItem component={Link} href="/profile/me">
                  Profile
                </MenuItem>
                <MenuItem component={Link} href="/settings">
                  Settings
                </MenuItem>
                <Divider />
                {/* NextAuth Standard-Route – ggf. anpassen */}
                <MenuItem component={Link} href="/api/auth/signout">
                  Sign out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              href="/api/auth/signin" // falls du eine eigene Route hast: /sign-in
              size="small"
              startIcon={<LoginOutlinedIcon />}
            >
              Login / Register
            </Button>
          )}

          {/* MobileMenu (nur < md) */}
          <MobileMenu />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
