// File: app/analytics/customers/[id]/edit/components/CustomerHeaderPanel.tsx

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

export default function CustomerHeaderPanel() {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        height: "100%",
        p: 4,
        borderRadius: 2,
        // background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Innovation trifft Seriosität
      </Typography>
      <Typography variant="h6">
        Optimieren Sie Ihre Kundenprofile mit präzisen, modernen Tools und einem
        intuitiven Interface.
      </Typography>
    </Box>
  );
}
