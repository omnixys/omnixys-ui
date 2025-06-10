"use client";

import { Box, Button, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import StoreIcon from "@mui/icons-material/Store";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import GavelIcon from "@mui/icons-material/Gavel";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import MovieIcon from "@mui/icons-material/Movie";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

// Timeline-Daten
const MODULE_DETAILS = [
  {
    name: "Shop",
    year: "2023",
    icon: <StoreIcon />,
    description:
      "Unsere Shop-Plattform ermöglicht den einfachen Verkauf digitaler und physischer Produkte – modular, skalierbar und 100 % via GraphQL steuerbar.",
    image: "/shop.png", // im public-Ordner
  },
  {
    name: "Bank",
    year: "2023",
    icon: <AccountBalanceIcon />,
    description:
      "Das Omnixys-Banking-Modul deckt Giro-, Spar- und Kreditkonten ab und integriert sich nahtlos mit dem Payment- und Transaction-Service.",
    image: "/shop.png", // im public-Ordner
  },
  {
    name: "Immobilien",
    year: "2023",
    icon: <HomeWorkIcon />,
    video: "/modules/bank.mp4",
  },
  { name: "Auktion", year: "2024", icon: <GavelIcon /> },
  { name: "Reisen", year: "2024", icon: <TravelExploreIcon /> },
  { name: "Kino", year: "2024", icon: <MovieIcon /> },
  { name: "Auto", year: "2025", icon: <DirectionsCarIcon /> },
  { name: "Aktivitäten", year: "2025", icon: <LocalActivityIcon /> },
  { name: "Social Feed", year: "2025", icon: <DynamicFeedIcon /> },
];

export default function FeatureTimeline() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<
    null | (typeof MODULE_DETAILS)[0]
  >(null);

  const handleOpen = (modul: (typeof MODULE_DETAILS)[0]) => {
    setSelectedModule(modul);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedModule(null);
  };

  return (
    <Box sx={{ mt: 10, px: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        color="text.primary"
        sx={{ fontWeight: "bold", mb: 6, textAlign: "center" }}
      >
        Feature-Timeline der OmnixysSphere
      </Typography>
      <Box
        sx={{
          position: "relative",
          "::before": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            left: { xs: "calc(50% - 1px)", md: "calc(50% - 1px)" },
            width: "2px",
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {MODULE_DETAILS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              marginBottom: 60,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: index % 2 === 0 ? "row-reverse" : "row",
                },
                alignItems: "center",
                gap: 3,
                width: "100%",
                justifyContent: "space-between",
                maxWidth: 900,
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "45%" },
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(6px)",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  textAlign: "left",
                  color: "#fff",
                }}
              >
                {/* Icon-Kreis */}
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: theme.palette.secondary.main,
                    color: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 3,
                    zIndex: 2,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography color="text.primary" variant="h6" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography
                  color="text.primary"
                  variant="body2"
                  sx={{ opacity: 0.8, mt: 0.5 }}
                >
                  {item.year} – Teil der modularen Plattform
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    sx={{ mt: 2 }}
                    onClick={() => handleOpen(item)}
                  >
                    Mehr erfahren
                  </Button>
                </Typography>
              </Box>
            </Box>

            {/* Jahr unterhalb auf kleinen Geräten */}
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.6)",
                display: { md: "none" },
              }}
            >
              {item.year}
            </Typography>
            {/* Punkt auf Linie */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "calc(50% - 8px)",
                transform: "translateY(-50%)",
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "secondary.main",
                border: "3px solid white",
                zIndex: 1,
              }}
            />
          </motion.div>
        ))}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.85)",
            color: "#fff",
            backdropFilter: "blur(8px)",
          },
        }}
      >
        <DialogTitle>{selectedModule?.name}</DialogTitle>
        <DialogContent>
          {selectedModule?.image && (
            <Box
              sx={{
                mb: 2,
                textAlign: "center",
                "& img": { borderRadius: 2, maxWidth: "100%" },
              }}
            >
              <img src={selectedModule.image} alt={selectedModule.name} />
            </Box>
          )}

          {selectedModule?.video && (
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <video
                src={selectedModule.video}
                autoPlay
                muted
                loop
                playsInline
                style={{ maxWidth: "100%", borderRadius: 12 }}
              />
            </Box>
          )}

          <Typography variant="body1">{selectedModule?.description}</Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
