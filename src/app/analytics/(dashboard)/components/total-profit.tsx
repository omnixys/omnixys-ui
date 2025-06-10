import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Carousel } from "antd";
import type { SxProps } from "@mui/material/styles";

export interface ProfitProps {
  value: number;
  sx?: SxProps;
}

const currencies = [
  { code: "EUR", symbol: "€", rate: 1 },
  { code: "USD", symbol: "$", rate: 1.08 },
  { code: "GBP", symbol: "£", rate: 0.86 },
  { code: "GHS", symbol: "₵", rate: 14.5 },
];

export function ProfitCard({ value, sx }: ProfitProps) {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
                <Stack spacing={3} justifyContent="center">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={1}>
                      <Typography color="text.secondary" variant="overline">
                        Total Profit ({currency.code})
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
                      <ReceiptIcon />
                    </Avatar>
                  </Stack>
                </Stack>
              </div>
            );
          })}
        </Carousel>
      </CardContent>
    </Card>
  );
}
