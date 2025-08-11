"use client";

import { FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { Box, Typography, useTheme } from "@mui/material";

interface TransitionProviderProps {
  children: ReactNode;
}

const TransitionProvider: FC<TransitionProviderProps> = ({ children }) => {
  const pathName = usePathname();
  const theme = useTheme();

  const current = pathName.substring(1) || "home";

  return (
    <AnimatePresence mode="wait">
      <Box
        key={pathName}
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.primary.light}20, ${theme.palette.error.light}20)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Closing/Opening Curtain */}
        <motion.div
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "black",
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            zIndex: 40,
          }}
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Route Label */}
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            margin: "auto",
            color: "white",
            cursor: "default",
            zIndex: 50,
            width: "fit-content",
            height: "fit-content",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", sm: "4rem", md: "6rem", lg: "7rem" },
              textTransform: "capitalize",
              letterSpacing: 2,
              fontWeight: 800,
            }}
          >
            {current}
          </Typography>
        </motion.div>

        {/* Bottom Opening Curtain */}
        <motion.div
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            left: 0,
            bottom: 0,
            backgroundColor: "black",
            borderTopLeftRadius: 100,
            borderTopRightRadius: 100,
            zIndex: 30,
          }}
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />

        {/* Navbar height ~ 6rem */}
        <Box sx={{ height: "6rem" }}>
          <Navbar />
        </Box>

        {/* Content area fills the rest */}
        <Box
          sx={{
            height: "calc(100vh - 6rem)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {children}
        </Box>
      </Box>
    </AnimatePresence>
  );
};

export default TransitionProvider;
