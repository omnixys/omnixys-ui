// components/common/StickyCTA.jsx
"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function StickyCTA() {
  return (
    <>
      {/* Sticky Call-to-Action Banner nur auf Desktop */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: 0,
          right: 0,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: 999,
            px: 4,
            py: 1.5,
            boxShadow: 3,
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
            transition: "all 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Jetzt Teil von Omnixys werden
          </Typography>
          <Link href="/person" passHref>
            <Button size="small" variant="contained" color="secondary">
              Jetzt starten
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Sticky Call-to-Action Banner nur auf Mobilgeräten */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          left: 0,
          right: 0,
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: 999,
            px: 4,
            py: 1.5,
            boxShadow: 3,
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
            transition: "all 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            Jetzt Teil von Omnixys werden Handy
          </Typography>
          <Link href="/person" passHref>
            <Button size="small" variant="contained" color="secondary">
              Jetzt starten
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}
