"use client";

import { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Box, Button, Container, Typography, Stack } from "@mui/material";

const Homepage: FC = () => {
  return (
    <motion.div
      style={{ height: "100%" }}
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          py: { xs: 4, sm: 8 },
        }}
      >
        {/* IMAGE CONTAINER */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "50%", lg: "100%" },
            width: { lg: "50%" },
            minHeight: 300,
          }}
        >
          <Image
            src="/portfolio/hero.png"
            alt="Hero"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>

        {/* TEXT CONTAINER */}
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{
            height: { xs: "50%", lg: "100%" },
            width: { lg: "50%" },
            textAlign: "center",
            px: { xs: 0, sm: 4 },
          }}
        >
          {/* TITLE */}
          <Typography variant="h3" component="h1" fontWeight="bold">
            Crafting Digital Experiences, Designing Tomorrow.
          </Typography>

          {/* DESCRIPTION */}
          <Typography variant="body1" sx={{ fontSize: { md: "1.25rem" } }}>
            Welcome to my digital canvas, where innovation and creativity
            converge. With a keen eye for aesthetics and a mastery of code, my
            portfolio showcases a diverse collection of projects that reflect my
            commitment to excellence.
          </Typography>

          {/* BUTTONS */}
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              sx={{
                flex: 1,
                bgcolor: "black",
                color: "white",
                "&:hover": { bgcolor: "grey.900" },
              }}
            >
              View My Work
            </Button>
            <Button
              variant="outlined"
              sx={{ flex: 1, borderColor: "black", color: "black" }}
            >
              Contact Me
            </Button>
          </Stack>
        </Stack>
      </Container>
    </motion.div>
  );
};

export default Homepage;
