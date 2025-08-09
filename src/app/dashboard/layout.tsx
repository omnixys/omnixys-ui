'use client'

import { ReactNode, useState } from 'react'
import Box from '@mui/material/Box'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import ThemeClient from './components/theme-client'



export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ThemeClient>
    <Box display="grid" gridTemplateColumns="260px 1fr" minHeight="100vh">
      <Sidebar isSidebar={isSidebar} />
      <Box component="main">
        <Topbar setIsSidebar={setIsSidebar} />
        {children}
      </Box>
    </Box>
    </ThemeClient>
  )
}
