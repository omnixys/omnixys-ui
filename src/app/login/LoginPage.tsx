/**
 * @file BrandingSignInPage.tsx
 * @description Diese Komponente stellt eine moderne, kreative und benutzerfreundliche
 * Anmeldeseite dar, die den Bildschirm in zwei Spalten aufteilt: links das klassische
 * Login mit E-Mail und Passwort, rechts die Anmeldung über externe Provider.
 * Das Design nutzt den verfügbaren Platz optimal aus und verbindet innovative UI-Elemente
 * mit seriösem Look.
 */

'use client';

import {
  AccountCircle,
  Key,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google'; // Alternativ: GTranslateIcon
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  AuthResponse,
  SupportedAuthProvider,
  type AuthProvider,
} from '@toolpad/core/SignInPage';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { JSX, useState } from 'react';
import { ENV } from '../../utils/env';
import { getLogger } from '../../utils/logger';

const { DEFAULT_ROUTE } = ENV;

/**
 * Liste der unterstützten Authentifizierungsanbieter.
 */
const providers: {
  id: SupportedAuthProvider;
  name: string;
  icon?: JSX.Element;
}[] = [
  { id: 'github', name: 'GitHub', icon: <GitHubIcon /> },
  { id: 'google', name: 'Google', icon: <GoogleIcon /> },
  { id: 'facebook', name: 'Facebook', icon: <FacebookIcon /> },
  { id: 'twitter', name: 'Twitter', icon: <TwitterIcon /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <LinkedInIcon /> },
  { id: 'keycloak', name: 'Keycloak', icon: <Key /> },
  { id: 'credentials', name: 'Username and Password' },
];

/**
 * Branding-Konfiguration mit Logo, Titel und Tagline.
 */
const BRANDING = {
  logo: (
    <Image
      src="https://mui.com/static/logo.svg"
      alt="MUI logo"
      width={50}
      height={30}
    />
  ),
  title: 'Creative MUI',
  tagline: 'Innovativ. Modern. Inspirierend.',
};

/**
 * Simulierte Anmeldefunktion, die Authentifizierungsanfragen verarbeitet.
 *
 * @param provider - Der ausgewählte Authentifizierungsanbieter.
 * @param formData - Optional: Formular-Daten, die die Anmeldedaten enthalten.
 * @returns Ein Promise, das ein AuthResponse-Objekt liefert.
 */
const handleLogin = async (
  provider: AuthProvider,
  formData?: FormData,
): Promise<AuthResponse> => {
  const logger = getLogger(handleLogin.name);
  if (provider.id === 'credentials') {
    return new Promise(async (resolve) => {
      try {
        const username = formData?.get('username');
        const password = formData?.get('password');

        const result = await signIn('credentials', {
          username,
          password,
          redirect: false,
        });

        logger.debug('result: ' + result?.ok);

        if (!result) {
          return resolve({
            type: 'CredentialsSignin',
            error: 'Keine Antwort vom Server',
          });
        }

        resolve({
          type: 'CredentialsSignin',
          error: result.error ?? undefined,
          success: result.ok ? 'Login erfolgreich' : undefined,
        });
      } catch (error) {
        resolve({
          type: 'CredentialsSignin',
          error: String(error),
        });
      }
    });
  }

  if (provider.id === 'keycloak') {
    return new Promise<AuthResponse>(async (resolve) => {
      try {
        const result = await signIn('keycloak', {
          callbackUrl: '/analytics/customers',
        });

        if (!result) {
          return resolve({
            type: 'CredentialsSignin',
            error: 'Keine Antwort vom Auth-Provider',
          });
        }

        resolve({
          type: 'CredentialsSignin',
          error: result.error ?? undefined,
          success: result.ok ? 'Erfolgreich angemeldet' : undefined,
        });
      } catch (error) {
        resolve({
          type: 'CredentialsSignin',
          error: String(error),
        });
      }
    });
  }

  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      logger.debug(`Sign in with ${provider.id}`);
      alert(`Signing in with "${provider.name}"`);
      resolve({
        type: 'CredentialsSignin',
        error: 'Invalid credentials.',
        success: 'Check your username for a verification link.',
      });
    }, 500);
  });
};

/**
 * Hauptkomponente der geteilten Anmeldeseite.
 *
 * @returns JSX.Element der Anmeldeseite.
 */
export default function SignInPage(): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handler für den klassischen Anmelde-Submit (E-Mail/Passwort).
   *
   * @param event - Das Submit-Ereignis des Formulars.
   */
  const handleCredentialsSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const result = await handleLogin(
      providers.find((p) => p.id === 'credentials') as AuthProvider,
      formData,
    );
    setLoading(false);
    if (result.success) {
      router.push(DEFAULT_ROUTE);
    } else {
      // Zeige entweder die vom Backend gelieferte Fehlermeldung oder eine Standardmeldung
      setError(
        // result.error ||
        'Ungültige Anmeldedaten. Bitte versuche es erneut.',
      );
    }
  };

  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background:
            'linear-gradient(135deg, #F8F8FC, #6A4BBC, #4E3792, #000)',
          //background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '1200px',
            gap: 4,
          }}
        >
          {/* Linke Spalte: E-Mail/Passwort Login */}
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              backgroundColor: '#ffffffee',
              backdropFilter: 'blur(5px)',
              animation: 'fadeIn 1s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              {BRANDING.logo}
              <Typography variant="h4" sx={{ mt: 1, color: '#6A4BBC' }}>
                {BRANDING.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#555' }}>
                {BRANDING.tagline}
              </Typography>
            </Box>
            <form onSubmit={handleCredentialsSubmit}>
              <CustomUsernameField />
              <CustomPasswordField />
              <AgreeWithTerms />
              <CustomButton loading={loading} />
            </form>
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}
            >
              <SignUpLink />
              <ForgotPasswordLink />
            </Box>
          </Paper>
          {/* Rechte Spalte: Login via Provider */}
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              backgroundColor: '#ffffffee',
              backdropFilter: 'blur(5px)',
              animation: 'fadeIn 1s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: '#6A4BBC' }}>
                Anmelden mit
              </Typography>
            </Box>
            {providers
              .filter((provider) => provider.id !== 'credentials')
              .map((provider) => (
                <Button
                  key={provider.id}
                  variant="outlined"
                  startIcon={provider.icon}
                  fullWidth
                  sx={{
                    my: 1,
                    borderColor: '#6A4BBC',
                    color: '#6A4BBC',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      borderColor: '#4E3792',
                      color: '#4E3792',
                    },
                  }}
                  onClick={() => handleLogin(provider)}
                >
                  {provider.name}
                </Button>
              ))}
          </Paper>
        </Box>
      </Box>
    </AppProvider>
  );
}

/**
 * Benutzerdefiniertes E-Mail-Feld mit integriertem Icon.
 *
 * @returns JSX.Element eines Textfeldes für die E-Mail-Eingabe.
 */
function CustomUsernameField(): JSX.Element {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Username"
      name="username"
      type="input"
      size="small"
      required
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle fontSize="inherit" style={{ color: '#312E81' }} />
          </InputAdornment>
        ),
        style: { backgroundColor: '#FFFFFF' }, // Weiß für Textfelder
      }}
      variant="outlined"
      sx={{
        my: 1,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    />
  );
}

/**
 * Benutzerdefiniertes Passwort-Feld mit Sichtbarkeitsumschaltung.
 *
 * @returns JSX.Element eines Eingabefeldes für das Passwort.
 */
function CustomPasswordField(): JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * Wechselt den Sichtbarkeitsstatus des Passworts.
   */
  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  /**
   * Verhindert das Standardverhalten bei Maus-Klicks.
   *
   * @param event - Das Mausereignis.
   */
  const handleMouseDownPassword = (event: React.MouseEvent): void => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
              sx={{
                transition: 'transform 0.3s',
                '&:hover': { transform: 'rotate(20deg)' },
              }}
            >
              {showPassword ? (
                <VisibilityOff
                  fontSize="inherit"
                  style={{ color: '#312E81' }}
                />
              ) : (
                <Visibility fontSize="inherit" style={{ color: '#312E81' }} />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

/**
 * Props für den CustomButton.
 */
interface CustomButtonProps {
  loading: boolean;
}

/**
 * Benutzerdefinierter Button zum Absenden des Anmeldeformulars.
 *
 * @param loading - Gibt an, ob der Ladevorgang aktiv ist.
 * @returns JSX.Element eines Buttons.
 */

function CustomButton({ loading }: CustomButtonProps): JSX.Element {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        my: 2,
        backgroundColor: '#6A4BBC', // Primärfarbe
        color: '#FFFFFF', // Weißer Text
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
          backgroundColor: '#4E3792', // Akzentfarbe für Hover
          transform: 'scale(1.03)',
        },
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
    </Button>
  );
}

/**
 * Komponente zur Zustimmung der AGB.
 *
 * @returns JSX.Element mit einem Checkbox-Element.
 */
function AgreeWithTerms(): JSX.Element {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name="tandc"
          value="true"
          sx={{
            padding: 0.5,
            color: '#6A4BBC',
            '& .MuiSvgIcon-root': {
              fontSize: 20,
              transition: 'color 0.3s',
            },
            '&:hover': {
              color: '#6A4BBC',
            },
            '&.Mui-checked': {
              color: '#6A4BBC',
            },
          }}
        />
      }
      label="I agree with the T&C"
      componentsProps={{ typography: { variant: 'body2' } }}
    />
  );
}

/**
 * Link-Komponente zur Registrierung.
 *
 * @returns JSX.Element eines Links zur Registrierungsseite.
 */
function SignUpLink(): JSX.Element {
  return (
    <Link
      href="/"
      style={{
        textDecoration: 'none',
        color: '#312E81', // Dunkelblau für Links
        fontWeight: 'bold',
      }}
    >
      Sign up
    </Link>
  );
}

/**
 * Link-Komponente für die Passwort-Wiederherstellung.
 *
 * @returns JSX.Element eines Links zur Seite "Passwort vergessen?".
 */
function ForgotPasswordLink(): JSX.Element {
  return (
    <Link
      href="/"
      style={{
        textDecoration: 'none',
        color: '#312E81', // Dunkelblau für Links
        fontWeight: 'bold',
      }}
    >
      Forgot password?
    </Link>
  );
}
