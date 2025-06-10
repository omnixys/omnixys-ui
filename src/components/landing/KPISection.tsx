"use client";

import { Box, Typography, useTheme } from "@mui/material";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const KPIS = [
  { label: "Deployments", value: 100, suffix: "+", emoji: "🚀" },
  { label: "Systemverfügbarkeit", value: 99.99, suffix: "%", emoji: "📈" },
  { label: "Kafka-Events/Min", value: 1200, suffix: "", emoji: "🔄" },
  { label: "aktive Länder", value: 24, suffix: "", emoji: "🌍" },
];

export default function KPISection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: 10,
        // backgroundColor: "rgba(255, 255, 255, 0.125)",
        backdropFilter: "blur(6px)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 4,
          maxWidth: 1000,
          mx: "auto",
          px: 2,
        }}
      >
        {KPIS.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                fontWeight={700}
                color={theme.palette.text.primary}
              >
                <span style={{ marginRight: 4 }}>{kpi.emoji}</span>
                <CountUp
                  end={kpi.value}
                  duration={2}
                  decimals={kpi.value % 1 !== 0 ? 2 : 0}
                  suffix={kpi.suffix}
                />
              </Typography>
              <Typography
                color="text.primary"
                variant="body2"
                sx={{ mt: 1, opacity: 0.75 }}
              >
                {kpi.label}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}
