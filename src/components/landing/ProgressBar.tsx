"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const steps = [
  { id: "hero", label: "Start" },
  { id: "modules", label: "Module" },
  { id: "video", label: "Vorschau" },
  { id: "USPGrid", label: "USPGrid" },
  { id: "timeline", label: "Timeline" },
  { id: "vergleich", label: "Vergleich" },
  { id: "footer", label: "Abschluss" },
];

export default function StepProgressNav() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const updateActive = () => {
      for (let i = steps.length - 1; i >= 0; i--) {
        const el = document.getElementById(steps[i].id);
        if (el && window.scrollY >= el.offsetTop - window.innerHeight * 0.3) {
          setActiveStep(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

    return (
      <>
        {/* Desktop: vertikal links */}
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            zIndex: 1300,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            gap: 1.5,
            backgroundColor: "rgba(0,0,0,0.25)",
            px: 2,
            py: 2,
            borderRadius: 2,
            backdropFilter: "blur(6px)",
          }}
        >
          {steps.map((step, i) => (
            <Box
              key={step.id}
              onClick={() => scrollTo(step.id)}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 1,
                opacity: i === activeStep ? 1 : 0.5,
                transition: "all 0.3s",
                "&:hover": { opacity: 1 },
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor:
                    i === activeStep
                      ? theme.palette.success.light
                      : "rgba(255,255,255,0.5)",
                }}
              />
              <Typography variant="caption" color="white">
                {step.label}
              </Typography>
            </Box>
          ))}
        </Box>
    
        {/* Mobile: horizontal unten */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            display: { xs: "flex", md: "none" },
            justifyContent: "space-around",
            backgroundColor: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
            py: 1,
          }}
        >
          {steps.map((step, i) => (
            <Box
              key={step.id}
              onClick={() => scrollTo(step.id)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                flex: 1,
                opacity: i === activeStep ? 1 : 0.5,
                color: "white",
                transition: "opacity 0.3s",
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor:
                    i === activeStep
                      ? theme.palette.success.light
                      : "rgba(255,255,255,0.4)",
                  mx: "auto",
                  mb: 0.5,
                }}
              />
              <Typography variant="caption">{step.label}</Typography>
            </Box>
          ))}
        </Box>
      </>
    );
    
}
