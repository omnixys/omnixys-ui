import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      light: string
      main: string
      dark: string
    }
  }
  interface PaletteOptions {
    neutral?: {
      light: string
      main: string
      dark: string
    }
  }
}
