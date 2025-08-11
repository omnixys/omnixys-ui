// src/components/ui/Skeleton.tsx
"use client"

import * as React from "react"
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps } from "@mui/material/Skeleton"

export type SkeletonProps = MuiSkeletonProps

export function Skeleton(props: SkeletonProps) {
  return <MuiSkeleton animation="pulse" {...props} />
}
