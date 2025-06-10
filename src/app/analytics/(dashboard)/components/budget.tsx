//TODO echte Daten hinzufügen
"use client";

import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { Carousel } from "antd";
import type { SxProps } from "@mui/material/styles";

export interface BudgetProps {
  diff?: number;
  trend: "up" | "down";
  value: number; // Basiswert in EUR
  sx?: SxProps;
}

const currencies = [
  { code: "EUR", symbol: "€", rate: 1 },
  { code: "USD", symbol: "$", rate: 1.08 },
  { code: "GBP", symbol: "£", rate: 0.86 },
  { code: "GHS", symbol: "₵", rate: 14.5 },
];

export function BudgetCard({ diff, trend, value, sx }: BudgetProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const TrendIcon = trend === "up" ? NorthIcon : SouthIcon;
  const trendColor =
    trend === "up" ? theme.palette.success.main : theme.palette.error.main;

  return (
    <Card
      sx={{
        minWidth: isSmall ? "100%" : isMedium ? 260 : 280,
        maxWidth: isSmall ? "100%" : isMedium ? 320 : 290,
        height: isSmall ? "auto" : 180,
        ...sx,
      }}
    >
      <CardContent>
        <Carousel
          autoplay
          dots={false}
          arrows={false}
          autoplaySpeed={4000}
          infinite
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide
        >
          {currencies.map((currency) => {
            const converted = value * currency.rate;
            return (
              <div key={currency.code}>
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={1}>
                      <Typography color="text.secondary" variant="overline">
                        Budget ({currency.code})
                      </Typography>
                      <Typography variant="h4">
                        {currency.symbol}
                        {converted.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                    </Stack>
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        width: 56,
                        height: 56,
                      }}
                    >
                      <CurrencyExchangeIcon />
                    </Avatar>
                  </Stack>

                  {diff !== undefined && (
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <TrendIcon
                          sx={{ color: trendColor }}
                          fontSize="small"
                        />
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
              </div>
            );
          })}
        </Carousel>
      </CardContent>
    </Card>
  );
}
