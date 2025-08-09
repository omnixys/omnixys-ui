'use client'

import { useState } from 'react'
import { CssBaseline } from '@mui/material'
import Sidebar from '@/scenes/global/Sidebar'
import Topbar from '@/scenes/global/Topbar'

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const [isSidebar, setIsSidebar] = useState<boolean>(true)

  return (
    <>
      <CssBaseline />
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          {children}
        </main>
      </div>
    </>
  )
}
