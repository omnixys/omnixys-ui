"use client";

import { Avatar, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import ExtensionIcon from "@mui/icons-material/Extension";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DataObjectIcon from "@mui/icons-material/DataObject";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedIcon from "@mui/icons-material/Verified";
import LockIcon from "@mui/icons-material/Lock";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const USPs = [
  {
    icon: <ExtensionIcon fontSize="large" />,
    title: "Modular & Erweiterbar",
    text: "Jeder Service ist unabhängig einsetzbar und kombinierbar.",
  },
  {
    icon: <LockPersonIcon fontSize="large" />,
    title: "Sichere Authentifizierung",
    text: "Keycloak-Support für SSO, Rollen und Berechtigungen.",
  },
  {
    icon: <RocketLaunchIcon fontSize="large" />,
    title: "Schnell deploybar",
    text: "GitHub Actions + Docker für jeden Microservice.",
  },
  {
    icon: <DataObjectIcon fontSize="large" />,
    title: "Nur GraphQL",
    text: "Typisierte Schnittstelle, kein REST.",
  },
  {
    icon: <QueryStatsIcon fontSize="large" />,
    title: "Echtzeit-Daten",
    text: "Dashboards mit Prometheus, Tempo und Grafana.",
  },
  {
    icon: <PublicIcon fontSize="large" />,
    title: "Open Source & Global",
    text: "GPL-lizenziert, i18n-fähig, API-first.",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: "success.light" }} />,
    title: "Modular aufgebaut",
  },
  {
    icon: <LockIcon sx={{ fontSize: 40, color: "#90CAF9" }} />,
    title: "Datenschutzkonform",
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#FFD54F" }} />,
    title: "Skalierbar & performant",
  },
];

export default function USPGrid() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1.1, spacing: 12 },
  });

  return (
    <Box
      sx={{
        py: 10,
        px: 2,
        // backgroundColor: "rgba(255,255,255,0.125)",
        backgroundColor: "rgba(168, 62, 180, 0.05)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Typography
        variant="h4"
        color="text.primary"
        align="center"
        fontWeight="bold"
        mb={6}
      >
        Warum OmnixysSphere?
      </Typography>

      {isMobile ? (
        <Box ref={sliderRef} className="keen-slider">
          {USPs.map((usp, index) => (
            <motion.div
              key={index}
              className="keen-slider__slide"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Box
                sx={{
                  p: 4,
                  m: 1,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  boxShadow: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, mt: 0.5 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                    {usp.icon}
                  </Avatar>
                </Box>
                <Box>
                  <Typography
                    color="text.primary"
                    variant="h6"
                    fontWeight={600}
                  >
                    {usp.title}
                  </Typography>
                  <Typography
                    color="text.primary"
                    variant="body2"
                    sx={{ mt: 0.5, opacity: 0.8 }}
                  >
                    {usp.text}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "1fr 1fr" },
            gap: 4,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          {USPs.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  boxShadow: 2,
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ color: theme.palette.primary.main, mt: 0.5 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                    {usp.icon}
                  </Avatar>
                </Box>
                <Box>
                  <Typography
                    color="text.primary"
                    variant="h6"
                    fontWeight={600}
                  >
                    {usp.title}
                  </Typography>
                  <Typography
                    color="text.primary"
                    variant="body2"
                    sx={{ mt: 0.5, opacity: 0.8 }}
                  >
                    {usp.text}
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
}
