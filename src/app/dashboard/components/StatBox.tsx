'use client'

import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from './tokens'
import { ReactNode } from 'react'
import ProgressCircle from './ProgressCircle'

type StatBoxProps = {
  title: string | number
  subtitle: string
  icon: ReactNode
  /** 0..1; Strings wie "0.75" werden unterstützt */
  progress: number | string
  increase: string
}

export default function StatBox({ title, subtitle, icon, progress, increase }: StatBoxProps) {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const progressValue = typeof progress === 'string' ? Number(progress) : progress

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {title}
          </Typography>
        </Box>
        <Box>
          {/* ProgressCircle sollte prop `progress?: number` akzeptieren */}
          <ProgressCircle progress={progressValue} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[600] }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  )
}
