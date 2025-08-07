// src/app/settings/page.tsx
'use client';

import { useSettings } from '@/context/SettingsContext';
import { useColorMode } from '@/theme/ColorModeContext';
import { useColorScheme } from '@/theme/ColorSchemeContext';
import { OmnixysColorScheme } from '@/theme/theme';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { settings, updateSettings, loading } = useSettings();
  const { toggleColorMode } = useColorMode();
  const { setScheme } = useColorScheme();

  const [localSettings, setLocalSettings] = useState(settings);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLocalSettings(settings);
    }
  }, [loading, settings]);

  const handleSchemeChange = (scheme: OmnixysColorScheme) => {
    setLocalSettings((prev) => ({ ...prev, colorScheme: scheme }));
  };

  const handleModeToggle = () => {
    const newMode = localSettings.colorMode === 'light' ? 'dark' : 'light';
    setLocalSettings((prev) => ({ ...prev, colorMode: newMode }));
  };

  const handleSave = async () => {
    updateSettings(localSettings);

    if (localSettings.colorMode !== settings.colorMode) toggleColorMode();
    if (localSettings.colorScheme !== settings.colorScheme)
      setScheme(localSettings.colorScheme);

    setShowFeedback(true);
  };

  if (loading) {
    return <Typography p={4}>Lade Einstellungen...</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Einstellungen
      </Typography>

      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="language-label">Sprache</InputLabel>
        <Select
          labelId="language-label"
          value={localSettings.language}
          label="Sprache"
          onChange={(e) =>
            setLocalSettings((prev) => ({
              ...prev,
              language: e.target.value,
            }))
          }
        >
          <MenuItem value="de">Deutsch</MenuItem>
          <MenuItem value="en">Englisch</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Switch
            checked={localSettings.compactLayout}
            onChange={(e) =>
              setLocalSettings((prev) => ({
                ...prev,
                compactLayout: e.target.checked,
              }))
            }
          />
        }
        label="Kompakte Ansicht aktivieren"
      />

      <FormControlLabel
        control={
          <Switch
            checked={localSettings.colorMode === 'dark'}
            onChange={handleModeToggle}
          />
        }
        label="Dark Mode aktivieren"
        sx={{ mt: 2 }}
      />

      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="scheme-label">Farbschema</InputLabel>
        <Select
          labelId="scheme-label"
          value={localSettings.colorScheme}
          label="Farbschema"
          onChange={(e) =>
            handleSchemeChange(e.target.value as OmnixysColorScheme)
          }
        >
          <MenuItem value="original">Original (Lila)</MenuItem>
          <MenuItem value="red">Rot</MenuItem>
          <MenuItem value="green">Grün</MenuItem>
          <MenuItem value="yellow">Gelb</MenuItem>
          <MenuItem value="blue">Blau</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={handleSave} variant="contained" sx={{ mt: 3, px: 4 }}>
        Einstellungen speichern
      </Button>

      <Snackbar
        open={showFeedback}
        autoHideDuration={3000}
        onClose={() => setShowFeedback(false)}
        message="Einstellungen gespeichert"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
}
