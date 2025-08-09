'use client';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Box, IconButton, InputBase, useTheme } from '@mui/material';
import { useContext } from 'react';
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Dispatch, SetStateAction } from 'react';
import { ColorModeContext, tokens } from './tokens';

type TopbarProps = {
  /** optional: vom Dashboard-Layout gesetzt, um die Sidebar ein-/auszublenden */
  setIsSidebar?: Dispatch<SetStateAction<boolean>>;
};

export default function Topbar({ setIsSidebar }: TopbarProps) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" bgcolor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex" gap={1}>
        {/* Optional: Sidebar-Button, wenn du willst:
        <IconButton onClick={() => setIsSidebar?.(v => !v)}>
          <MenuOutlinedIcon />
        </IconButton> */}

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
