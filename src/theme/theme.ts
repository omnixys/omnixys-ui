// omnixys-ui/src/theme/theme.ts
import { createTheme, Theme } from '@mui/material/styles';
import { Poppins, Inter } from 'next/font/google';
import { PaletteMode } from '@mui/material';

const poppins = Poppins({ weight: ['500', '700'], subsets: ['latin'] });
const inter = Inter({ weight: ['400'], subsets: ['latin'] });


export type OmnixysColorScheme = 'original' | 'red' | 'green' | 'yellow' | 'blue';

type ColorPreset = {
    light: {
        primary: string;
        secondary: string;
        backgroundDefault: string;
        backgroundPaper: string;
        textPrimary: string;
        textSecondary: string;
        error: string;
        success: string;
    };
    dark: {
        primary: string;
        secondary: string;
        backgroundDefault: string;
        backgroundPaper: string;
        textPrimary: string;
        textSecondary: string;
        error: string;
        success: string;
    };
};


const colorPresets: Record<OmnixysColorScheme, ColorPreset> = {
    original: {
        light: {
            primary: "#6A4BBC",
            secondary: "#4E3792",
            backgroundDefault: "#F8F8FC",
            backgroundPaper: "#FFFFFF",
            textPrimary: "#312E81",
            textSecondary: "#6B7280",
            error: "#F87171",
            success: "#A3E635",
        },
        dark: {
            primary: "#6A4BBC",
            secondary: "#4E3792",
            backgroundDefault: "#121212",
            backgroundPaper: "#1E1E1E",
            textPrimary: "#EDEDED",
            textSecondary: "#BFBFC7",
            error: "#F87171",
            success: "#A3E635",
        },
    },
    red: {
        light: {
            primary: "#DC2626",
            secondary: "#991B1B",
            backgroundDefault: "#FFF1F2",
            backgroundPaper: "#FFE4E6",
            textPrimary: "#450A0A",
            textSecondary: "#7F1D1D",
            error: "#DC2626",
            success: "#4ADE80",
        },
        dark: {
            primary: '#DC2626',
            secondary: '#991B1B',
            backgroundDefault: '#1C0B0B',
            backgroundPaper: '#2B0E0E',
            textPrimary: '#FEE2E2',
            textSecondary: '#FCA5A5',
            error: '#DC2626',
            success: '#4ADE80',
        },
    },
    green: {
        light: {
            primary: "#16A34A",
            secondary: "#065F46",
            backgroundDefault: "#F0FDF4",
            backgroundPaper: "#DCFCE7",
            textPrimary: "#064E3B",
            textSecondary: "#065F46",
            error: "#DC2626",
            success: "#16A34A",
        },
        dark: {
            primary: '#16A34A',
            secondary: '#065F46',
            backgroundDefault: '#0F172A',
            backgroundPaper: '#1E293B',
            textPrimary: '#D1FAE5',
            textSecondary: '#A7F3D0',
            error: '#F87171',
            success: '#16A34A',
        },
    },
    yellow: {
        light: {
            primary: "#F59E0B",
            secondary: "#B45309",
            backgroundDefault: "#FFFBEB",
            backgroundPaper: "#FEF3C7",
            textPrimary: "#78350F",
            textSecondary: "#92400E",
            error: "#DC2626",
            success: "#A3E635",
        },
        dark: {
            primary: '#F59E0B',
            secondary: '#B45309',
            backgroundDefault: '#1C1917',
            backgroundPaper: '#292524',
            textPrimary: '#FEF3C7',
            textSecondary: '#FCD34D',
            error: '#F87171',
            success: '#A3E635',
        },
    },
    blue: {
        light: {
            primary: "#2563EB",
            secondary: "#1E40AF",
            backgroundDefault: "#EFF6FF",
            backgroundPaper: "#FFFFFF",
            textPrimary: "#1E3A8A",
            textSecondary: "#3B82F6",
            error: "#DC2626",
            success: "#22C55E",
        },
        dark: {
            primary: '#2563EB',
            secondary: '#1E40AF',
            backgroundDefault: '#0F172A',
            backgroundPaper: '#1E293B',
            textPrimary: '#DBEAFE',
            textSecondary: '#93C5FD',
            error: '#DC2626',
            success: '#22C55E',
        },
    },
};


const themeFactory = (mode: PaletteMode, scheme: OmnixysColorScheme = 'original'): Theme => {
    const {
        primary,
        secondary,
        backgroundDefault,
        backgroundPaper,
        textPrimary,
        textSecondary,
        error,
        success,
    } = colorPresets[scheme][mode];


    return createTheme({
        palette: {
            mode,
            primary: { main: primary },
            secondary: { main: secondary },
            background: {
                default: backgroundDefault,
                paper: backgroundPaper,
            },
            text: {
                primary: textPrimary,
                secondary: textSecondary,
            },
            error: { main: error },
            success: { main: success },
        },
        typography: {
            fontFamily: `${inter.style.fontFamily}, ${poppins.style.fontFamily}, sans-serif`,
            h1: { fontFamily: poppins.style.fontFamily, fontWeight: 700 },
            h2: { fontFamily: poppins.style.fontFamily, fontWeight: 700 },
            button: { fontFamily: poppins.style.fontFamily, fontWeight: 500 },
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 960,
                lg: 1280,
                xl: 1536,
            },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        transition: 'background-color 0.3s ease',
                    },
                },
            },
        },
    });
};

export default themeFactory;
