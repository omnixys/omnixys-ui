// src/components/Navbar.tsx
'use client';

import {
  AccountCircle,
  Brightness4,
  Brightness7,
  ColorLens,
  Refresh,
  Settings,
  Timer,
} from '@mui/icons-material';
import LogInIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useColorMode } from '../theme/ColorModeContext';
import { useColorScheme } from '../theme/ColorSchemeContext';
import { OmnixysColorScheme } from '../theme/theme';
import { formatTime } from '../utils/counter-format.util';
import Logout from './Logout';

const colorSchemeLabels: Record<OmnixysColorScheme, string> = {
  original: 'Original (Lila)',
  red: 'Rot',
  green: 'Grün',
  yellow: 'Gelb',
  blue: 'Blau',
};

const colorSchemeIcons: Record<OmnixysColorScheme, React.ReactNode> = {
  original: <ColorLens sx={{ color: '#6A4BBC' }} fontSize="small" />,
  red: <ColorLens sx={{ color: '#DC2626' }} fontSize="small" />,
  green: <ColorLens sx={{ color: '#16A34A' }} fontSize="small" />,
  yellow: <ColorLens sx={{ color: '#F59E0B' }} fontSize="small" />,
  blue: <ColorLens sx={{ color: '#2563EB' }} fontSize="small" />,
};

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useColorMode();
  const { scheme: currentScheme, setScheme: setCurrentScheme } =
    useColorScheme();

  const { data: session, update } = useSession();
  const isLoggedIn = session ?? false;
  const isAdmin = session?.user.roles?.includes('Admin');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [remainingTime, setRemainingTime] = useState<number | undefined>(
    undefined,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefreshToken = useCallback(async () => {
    try {
      await update();
    } catch (err) {
      console.error('Fehler beim Aktualisieren des Tokens:', err);
    }
  }, [update]);

  useEffect(() => {
    if (session?.expires_in) {
      const now = Math.floor(Date.now() / 1000);
      setRemainingTime(session.expires_in - now);

      const interval = setInterval(() => {
        setRemainingTime((prev) => (prev !== undefined ? prev - 1 : undefined));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session]);

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          // backgroundColor: theme.palette.background.default,
          // color: theme.palette.text.primary,
        }}
      >
        {/* <Divider sx={{ color: theme.palette.primary.light }} /> */}
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Link href="/">
              <Image
                src="/omnixys-symbol.png"
                alt="Omnixys Logo"
                width={40}
                height={40}
              />
            </Link>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              color="inherit"
              sx={{ ml: 1, textDecoration: 'none' }}
            >
              Omnixys
            </Typography>
          </Box>

          {/* RESPONSIVE */}
          {useMediaQuery(theme.breakpoints.down('sm')) ? (
            <>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
                <Box width={260} p={2}>
                  <List>
                    <ListItemButton component={Link} href="/">
                      <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton component={Link} href="/shop">
                      <ListItemText primary="shop" />
                    </ListItemButton>
                    {isLoggedIn && (
                      <ListItemButton component={Link} href="/dashboard">
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    )}
                    {isAdmin && (
                      <>
                        <ListItemButton component={Link} href="/admin">
                          <ListItemText primary="Admin" />
                        </ListItemButton>
                        <ListItemButton component={Link} href="/analytics">
                          <ListItemText primary="Analytics" />
                        </ListItemButton>
                      </>
                    )}
                    <Divider />
                    <ListItemButton onClick={toggleColorMode}>
                      <ListItemIcon>
                        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                      </ListItemIcon>
                      <ListItemText primary="Theme wechseln" />
                    </ListItemButton>
                    {isLoggedIn ? (
                      <>
                        <ListItem>
                          <Typography variant="body2" color="text.secondary">
                            {session?.user.email}
                          </Typography>
                        </ListItem>
                        <ListItemButton component={Link} href="/profile">
                          <AccountCircle fontSize="small" />
                          <ListItemText sx={{ ml: 1 }} primary="Profil" />
                        </ListItemButton>
                        <ListItemButton onClick={handleRefreshToken}>
                          <Refresh fontSize="small" />
                          <ListItemText
                            sx={{ ml: 1 }}
                            primary="Token erneuern"
                          />
                        </ListItemButton>
                        <Divider />
                        {Object.entries(colorSchemeLabels).map(
                          ([key, label]) => (
                            <ListItemButton
                              key={key}
                              selected={key === currentScheme}
                              onClick={() =>
                                setCurrentScheme(key as OmnixysColorScheme)
                              }
                            >
                              <ListItemIcon>
                                {colorSchemeIcons[key as OmnixysColorScheme]}
                              </ListItemIcon>
                              <ListItemText primary={label} />
                            </ListItemButton>
                          ),
                        )}
                        <Divider />
                        <ListItem>
                          <Logout />
                        </ListItem>
                      </>
                    ) : (
                      <ListItemButton component={Link} href="/login">
                        <LogInIcon fontSize="small" />
                        <ListItemText sx={{ ml: 1 }} primary="Login" />
                      </ListItemButton>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            // Desktop:
            <Stack direction="row" spacing={2} alignItems="center">
              <Button color="inherit" component={Link} href="/">
                Home
              </Button>
              <Button color="inherit" component={Link} href="/profile/feed">
                Feed
              </Button>
              <Button color="inherit" component={Link} href="/shop">
                shop
              </Button>
              <Button color="inherit" component={Link} href="/entertainment">
                Entertainment
              </Button>
              {/* auktion, reise */}
              {isLoggedIn && (
                <Button color="inherit" component={Link} href="/dashboard">
                  Dashboard
                </Button>
              )}
              {isAdmin && (
                <Button color="inherit" component={Link} href="/admin">
                  Admin
                </Button>
              )}
              {isAdmin && (
                <Button color="inherit" component={Link} href="/analytics">
                  Analytics
                </Button>
              )}

              <Tooltip
                title={mode === 'dark' ? 'Helles Design' : 'Dunkles Design'}
                arrow
                placement="bottom"
              >
                <IconButton color="inherit" onClick={toggleColorMode}>
                  {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Tooltip>

              {isLoggedIn ? (
                <>
                  <Tooltip title={session?.user.username || 'Profil'}>
                    <IconButton
                      onClick={handleAvatarClick}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <Avatar alt="User Avatar" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      sx: {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: 4,
                        borderRadius: 2,
                        px: 1,
                      },
                    }}
                  >
                    <MenuItem disabled>
                      <Typography variant="body2" color="text.secondary">
                        {session?.user.email || 'Nutzer'}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      component={Link}
                      href="/profile"
                      sx={{
                        borderRadius: 1,
                        transition: 'background-color 0.2s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <AccountCircle fontSize="small" sx={{ mr: 1 }} />
                      Profil
                    </MenuItem>
                    <MenuItem
                      sx={{
                        borderRadius: 1,
                        transition: 'background-color 0.2s ease',
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <Timer sx={{ mr: 1 }} />
                      Token:{' '}
                      {remainingTime ? formatTime(remainingTime) : 'Abgelaufen'}
                    </MenuItem>
                    <MenuItem onClick={handleRefreshToken}>
                      <Refresh sx={{ mr: 1 }} />
                      Token erneuern
                    </MenuItem>
                    <MenuItem component={Link} href="/settings">
                      <Settings fontSize="small" sx={{ mr: 1 }} />
                      Einstellungen
                    </MenuItem>
                    <Divider />
                    {Object.entries(colorSchemeLabels).map(([key, label]) => (
                      <MenuItem
                        key={key}
                        selected={key === currentScheme}
                        onClick={() =>
                          setCurrentScheme(key as OmnixysColorScheme)
                        }
                        sx={{
                          transition:
                            'background-color 0.2s ease, transform 0.3s ease',
                          '&.Mui-selected': {
                            backgroundColor: theme.palette.action.selected,
                            transform: 'scale(1.05)',
                          },
                          '&:hover': {
                            backgroundColor: theme.palette.action.hover,
                            transform: 'scale(1.03)',
                          },
                        }}
                      >
                        <ListItemIcon>
                          {colorSchemeIcons[key as OmnixysColorScheme]}
                        </ListItemIcon>
                        <ListItemText>{label}</ListItemText>
                      </MenuItem>
                    ))}
                    <Divider />
                    <MenuItem>
                      <Logout />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  href="/login"
                  startIcon={<LogInIcon />}
                >
                  Login
                </Button>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
