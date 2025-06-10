"use client";

import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import type { SxProps } from "@mui/material/styles";

export interface CustomerProps {
  diff?: number;
  trend: "up" | "down";
  total: number;
  sx?: SxProps;
}

export function CustomerCard({ diff, trend, total, sx }: CustomerProps) {
  const theme = useTheme();
  const TrendIcon = trend === "up" ? NorthIcon : SouthIcon;
  const trendColor =
    trend === "up" ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card sx={{ width: "100%", maxWidth: 340, height: 180, ...sx }}>
      <CardContent>
        <Stack spacing={3} justifyContent="center">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Total Customers
              </Typography>
              <Typography variant="h4">
                {total.toLocaleString("de-DE")}
              </Typography>
            </Stack>
            <Avatar
              sx={{
                bgcolor: theme.palette.success.main,
                width: 56,
                height: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Stack>

          {diff !== undefined && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack direction="row" spacing={0.5} alignItems="center">
                <TrendIcon sx={{ color: trendColor }} fontSize="small" />
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Since last month
              </Typography>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
