'use client'

import { useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from './tokens'
import "react-pro-sidebar/dist/css/styles.css";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'

type SidebarProps = { isSidebar: boolean }

type NavItem = { title: string; href: string; icon: ReactNode }

// zentrale Nav-Liste (passt zu deinen Routen unter /dashboard/*)
const NAV_SECTIONS: { label?: string; items: NavItem[] }[] = [
  {
    items: [{ title: 'Dashboard', href: '/dashboard', icon: <HomeOutlinedIcon /> }],
  },
  {
    label: 'Data',
    items: [
      { title: 'Manage Team', href: '/dashboard/team', icon: <PeopleOutlinedIcon /> },
      { title: 'Contacts Information', href: '/dashboard/contacts', icon: <ContactsOutlinedIcon /> },
      { title: 'Invoices Balances', href: '/dashboard/invoices', icon: <ReceiptOutlinedIcon /> },
    ],
  },
  {
    label: 'Pages',
    items: [
      { title: 'Profile Form', href: '/dashboard/form', icon: <PersonOutlinedIcon /> },
      { title: 'Calendar', href: '/dashboard/calendar', icon: <CalendarTodayOutlinedIcon /> },
      { title: 'FAQ Page', href: '/dashboard/faq', icon: <HelpOutlineOutlinedIcon /> },
    ],
  },
  {
    label: 'Charts',
    items: [
      { title: 'Bar Chart', href: '/dashboard/bar', icon: <BarChartOutlinedIcon /> },
      { title: 'Pie Chart', href: '/dashboard/pie', icon: <PieChartOutlineOutlinedIcon /> },
      { title: 'Line Chart', href: '/dashboard/line', icon: <TimelineOutlinedIcon /> },
      { title: 'Geography Chart', href: '/dashboard/geography', icon: <MapOutlinedIcon /> },
    ],
  },
]

// aktive Erkennung: exakter Match für /dashboard, ansonsten startsWith
const isActive = (pathname: string, href: string) =>
  href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

export default function Sidebar({ isSidebar }: SidebarProps) {
  const pathname = usePathname()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <Box
      sx={{
        display: isSidebar ? 'block' : 'none',
        '& .pro-sidebar-inner': { background: `${colors.primary[400]} !important` },
        '& .pro-icon-wrapper': { backgroundColor: 'transparent !important' },
        '& .pro-inner-item': { padding: '5px 35px 5px 20px !important' },
        '& .pro-inner-item:hover': { color: '#868dfb !important' },
        '& .pro-menu-item.active': { color: '#6870fa !important' },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO & TOGGLE */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: '10px 0 20px 0', color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* PROFILE */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100"
                  height="100"
                  src="/assets/user.png"
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: '10px 0 0 0' }}>
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )}

          {/* NAV */}
          {NAV_SECTIONS.map((section, idx) => (
            <Box key={idx} pl={isCollapsed ? 0 : '10%'} mb={section.label ? 1 : 0}>
              {section.label && (
                <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                  {section.label}
                </Typography>
              )}
              {section.items.map(({ title, href, icon }) => (
                <MenuItem
                  key={href}
                  active={isActive(pathname, href)}
                  style={{ color: colors.grey[100] }}
                  icon={icon}
                >
                  <Typography>{title}</Typography>
                  {/* Next.js Link als Kind (v1 arbeitet so) */}
                  <Link href={href} />
                </MenuItem>
              ))}
            </Box>
          ))}
        </Menu>
      </ProSidebar>
    </Box>
  )
}
