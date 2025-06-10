// components/landing/HeroSection.jsx
"use client";

import { Box, Typography, Button, IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";
import ScrollDownArrow from "../common/ScrollDownArrow";

export default function HeroSection({ yHero }) {
  const theme = useTheme();

  return (
    <motion.div style={{ y: yHero }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/omnixys-logo.png"
          alt="Omnixys Logo"
          width={120}
          height={120}
          style={{ marginBottom: 24 }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
      >
        <Typography
          variant="h2"
          color="text.primary"
          fontWeight={700}
          gutterBottom
        >
          OmnixysSphere
        </Typography>
        <Typography
          color="text.primary"
          variant="h5"
          sx={{ opacity: 0.85 }}
          gutterBottom
        >
          The Fabric of Modular Innovation
        </Typography>
        <Typography
          color="text.primary"
          variant="body1"
          sx={{ mt: 2, mb: 4, maxWidth: 640, mx: "auto", opacity: 0.8 }}
        >
          Willkommen bei der modularen Plattform für moderne Geschäftsprozesse.
          Entdecke unsere Services für Shop, Bank, Immobilien, Auktionen, Reisen
          und mehr.
        </Typography>
        <Link href="/person" passHref>
          <Button
            variant="contained"
            size="large"
            sx={{ px: 6, py: 1.5, fontWeight: "bold" }}
          >
            Loslegen
          </Button>
        </Link>
      </motion.div>

      <ScrollDownArrow targetId="USPGrid" color="secondary.light" size={36} />
    </motion.div>
  );
}
