"use client";

import * as React from "react";
import {
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  Typography,
  Box,
} from "@mui/material";

export interface CardProps extends React.ComponentProps<typeof MuiCard> {}
export interface CardHeaderProps extends React.ComponentProps<typeof MuiCardHeader> {}
export interface CardTitleProps {
  children: React.ReactNode;
  sx?: object;
}
export interface CardDescriptionProps {
  children: React.ReactNode;
  sx?: object;
}
export interface CardActionProps extends React.ComponentProps<typeof MuiCardActions> {}
export interface CardContentProps extends React.ComponentProps<typeof MuiCardContent> {}
export interface CardFooterProps extends React.ComponentProps<typeof MuiCardActions> {}

export const Card: React.FC<CardProps> = ({ sx, ...props }) => (
  <MuiCard
    variant="outlined"
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 2,
      borderRadius: 2,
      boxShadow: 1,
      ...sx,
    }}
    {...props}
  />
);

export const CardHeader: React.FC<CardHeaderProps> = ({ sx, ...props }) => (
  <MuiCardHeader
    sx={{
      pb: 0,
      "& .MuiCardHeader-title": { fontWeight: 600 },
      ...sx,
    }}
    {...props}
  />
);

export const CardTitle: React.FC<CardTitleProps> = ({ children, sx }) => (
  <Typography variant="h6" component="div" sx={{ lineHeight: 1.2, fontWeight: 600, ...sx }}>
    {children}
  </Typography>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, sx }) => (
  <Typography
    variant="body2"
    color="text.secondary"
    sx={{ fontSize: "0.875rem", ...sx }}
  >
    {children}
  </Typography>
);

export const CardAction: React.FC<CardActionProps> = ({ sx, ...props }) => (
  <MuiCardActions
    sx={{
      justifyContent: "flex-end",
      ...sx,
    }}
    {...props}
  />
);

export const CardContent: React.FC<CardContentProps> = ({ sx, ...props }) => (
  <MuiCardContent sx={{ px: 3, ...sx }} {...props} />
);

export const CardFooter: React.FC<CardFooterProps> = ({ sx, ...props }) => (
  <MuiCardActions
    sx={{
      px: 3,
      pt: 2,
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      ...sx,
    }}
    {...props}
  />
);
