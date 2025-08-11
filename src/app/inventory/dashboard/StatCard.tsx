"use client";

import * as React from "react";
import {
  Card, CardHeader, CardContent, Divider,
  Box, Typography, Avatar, Stack, SvgIconProps
} from "@mui/material";

type IconCtor = React.ComponentType<SvgIconProps>;

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: IconCtor;
};

type StatCardProps = {
  title: string;
  primaryIcon: React.ReactNode;
  details: StatDetail[];
  dateRange: string;
};

const StatCard: React.FC<StatCardProps> = ({
  title, primaryIcon, details, dateRange,
}) => {
  const formatPercentage = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(0)}%`;
  const tone = (v: number) => (v >= 0 ? "success.main" : "error.main");

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        title={title}
        subheader={dateRange}
        titleTypographyProps={{ variant: "h6", fontWeight: 600, component: "h3" }}
        subheaderTypographyProps={{ variant: "caption", color: "text.secondary", component: "span" }}
        sx={{ pb: 0 }}
      />
      <Divider />
      <CardContent sx={{ pt: 2 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Avatar
            variant="circular"
            sx={{
              width: 56, height: 56,
              bgcolor: "primary.light", color: "primary.main",
              border: (t) => `1px solid ${t.palette.primary.main}`,
            }}
          >
            {primaryIcon}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            {details.map((detail, i) => {
              const Icon = detail.IconComponent;
              return (
                <React.Fragment key={i}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 1.25 }}>
                    <Typography variant="body2" color="text.secondary" component="span">
                      {detail.title}
                    </Typography>

                    <Typography variant="subtitle2" fontWeight={700} component="span">
                      {detail.amount}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: tone(detail.changePercentage) }}>
                      <Icon fontSize="small" />
                      <Typography variant="body2" fontWeight={600} component="span">
                        {formatPercentage(detail.changePercentage)}
                      </Typography>
                    </Stack>
                  </Stack>
                  {i < details.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;
