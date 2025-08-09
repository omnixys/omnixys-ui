// components/theme-client.tsx
'use client'

import { ReactNode } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { ColorModeContext, useMode } from './tokens'

export default function ThemeClient({ children }: { children: ReactNode }) {
  const [theme, colorMode] = useMode()
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
