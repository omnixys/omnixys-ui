"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PORTFOLIO_ITEMS } from "../data/portfolio.mock";

const MotionBox = motion(Box);

export default function PortfolioPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <MotionBox
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      sx={{ height: "100%" }}
    >
      <Box ref={ref} sx={{ height: "600vh", position: "relative" }}>
        {/* Headline Section */}
        <Box
          sx={{
            width: "100vw",
            height: "calc(100vh - 6rem)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "6rem", lg: "8rem" },
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            My Works
          </Typography>
        </Box>

        {/* Horizontal Scroller */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            gap: 4,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <MotionBox style={{ x }} sx={{ display: "flex" }}>
            {/* Intro-Slide with gradient */}
            <Box
              sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage:
                  "linear-gradient(90deg, rgba(168,85,247,0.5), rgba(244,63,94,0.5))",
              }}
            />
            {/* Slides */}
            {PORTFOLIO_ITEMS.map((item) => (
              <Box
                key={item.id}
                sx={{
                  height: "100vh",
                  width: "100vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `linear-gradient(90deg, ${item.gradient[0]}, ${item.gradient[1]})`,
                }}
              >
                <Container
                  maxWidth="lg"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 2, md: 3, lg: 4 },
                    color: "common.white",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.5rem", md: "2.5rem", lg: "4rem", xl: "6rem" },
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Image */}
                  <Box
                    sx={{
                      position: "relative",
                      width: { xs: 320, md: 384, lg: 500, xl: 600 },
                      height: { xs: 224, md: 256, lg: 350, xl: 420 },
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Image src={item.img} alt={item.title} fill />
                  </Box>

                  {/* Description */}
                  <Typography
                    sx={{
                      width: { xs: 320, md: 384, lg: 500, xl: 600 },
                      fontSize: { lg: "1.125rem" },
                    }}
                  >
                    {item.desc}
                  </Typography>

                  {/* Link */}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      component={Link}
                      href={item.link}
                      variant="contained"
                      sx={{
                        m: 1,
                        px: { xs: 2, md: 3, lg: 4 },
                        py: { xs: 1, md: 1.25, lg: 2 },
                        fontSize: { xs: "0.875rem", md: "1rem", lg: "1.125rem" },
                        bgcolor: "common.white",
                        color: "grey.700",
                        fontWeight: 700,
                        borderRadius: 2,
                        "&:hover": { bgcolor: "grey.100" },
                      }}
                    >
                      See Demo
                    </Button>
                  </Box>
                </Container>
              </Box>
            ))}
          </MotionBox>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3rem", md: "6rem", lg: "8rem" },
            fontWeight: 800,
          }}
        >
          Do you have a project?
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Rotating circular text */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 300 300"
            style={{
              width: mdUp ? 500 : 256,
              height: mdUp ? 500 : 256,
            }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath href="#circlePath">
                Front-end Developer and UI Designer
              </textPath>
            </text>
          </motion.svg>

          {/* Hire Me Button */}
          <Button
            component={Link}
            href="/contact"
            variant="contained"
            sx={{
              width: { xs: 64, md: 112 },
              height: { xs: 64, md: 112 },
              position: "absolute",
              inset: 0,
              m: "auto",
              borderRadius: "9999px",
              bgcolor: "common.black",
              color: "common.white",
              fontWeight: 800,
              "&:hover": { bgcolor: "grey.900" },
            }}
          >
            Hire Me
          </Button>
        </Box>
      </Box>
    </MotionBox>
  );
}
