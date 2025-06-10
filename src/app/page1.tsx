"use client";

import { Box, Container, Typography, useTheme } from "@mui/material";
import "keen-slider/keen-slider.min.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import FeatureTimeline from "../components/landing/FeatureTimeline";
import AppVideoPreview from "../components/landing/AppVideoPreview";
import CompetitorComparison from "../components/landing/CompetitorComparison";
import StepProgressNav from "../components/landing/ProgressBar";
import USPGrid from "../components/landing/USPGrid";
import KPISection from "../components/landing/KPISection";
import NewsletterSection from "../components/landing/NewsletterSection";
import ChatWidget from "../components/landing/ChatWidget";
import MotionWrapper from "../components/common/MotionWrapper";
import HeroSection from "../components/landing/HeroSection";
import ModuleCarousel from "../components/landing/ModuleCarousel";
import StickyNavbar from "../components/landing/StickyNavbar";
import ProgressBanner from "../components/landing/ProgressBanner";
import TrustBadges from "../components/landing/TrustBadges";
import BlogPreview from "../components/landing/BlogPreview";
import Testimonials from "../components/landing/Testimonials";
import EventsTeaser from "../components/landing/EventsTeaser";
import AppDownloadBadges from "../components/landing/AppDownloadBadges";
import StickyCTA from "../components/common/StickyCTA";
import ScrollSpyNavigation from "../components/landing/ScrollSpyNavigation";
import ScrollDownArrow from "../components/common/ScrollDownArrow";

const MODULES = [
  "Shop",
  "Bank",
  "Immobilien",
  "Auktion",
  "Reisen",
  "Kino",
  "Auto",
  "Aktivitäten",
  "Social Feed",
];

export default function LandingPage() {
  const theme = useTheme();
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 300], [0, -100]);
  const yModules = useTransform(scrollY, [100, 600], [0, -50]);
  const opacityFooter = useTransform(scrollY, [800, 1200], [0, 1]);
  const moduleRef = useRef<HTMLDivElement>(null);

  const scrollToModules = () => {
    if (moduleRef.current)
      moduleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getBackgroundGradient = (index: number) => {
    const gradients = [
      `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      `linear-gradient(180deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
    ];
    return gradients[index % gradients.length];
  };

  const shineOverlay = {
    position: "relative",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: "-75%",
      width: "50%",
      height: "100%",
      background:
        "linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 100%)",
      transform: "skewX(-20deg)",
      animation: "shine 4s infinite",
    },
    "@keyframes shine": {
      "0%": { left: "-75%" },
      "100%": { left: "125%" },
    },
    overflow: "hidden",
  };

  return (
    <Box sx={{ color: theme.palette.text.primary, position: "relative" }}>
      <ScrollSpyNavigation />
      <StepProgressNav />
      <StickyNavbar />

      <Container
        id="hero"
        maxWidth="md"
        sx={{
          textAlign: "center",
          py: 8,
          ...shineOverlay,
          background: getBackgroundGradient(0),
        }}
      >
        <HeroSection yHero={yHero} />
      </Container>

      <MotionWrapper delay={0.2}>
        <Box
          id="USPGrid"
          sx={{ background: getBackgroundGradient(0), py: 8, ...shineOverlay }}
        >
          <USPGrid />
        </Box>
      </MotionWrapper>

      <ScrollDownArrow
        onClick={scrollToModules}
        color="secondary.light"
        size={36}
      />

      <Box
        ref={moduleRef}
        sx={{ background: getBackgroundGradient(1), py: 8, ...shineOverlay }}
      >
        <ModuleCarousel modules={MODULES} yModules={yModules} />
      </Box>

      <ScrollDownArrow targetId="video" color="secondary.light" size={36} />

      <MotionWrapper delay={0.2}>
        <Box
          id="video"
          sx={{ background: getBackgroundGradient(2), py: 8, ...shineOverlay }}
        >
          <AppVideoPreview />
        </Box>
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <Box
          id="progress"
          sx={{ background: getBackgroundGradient(3), py: 8, ...shineOverlay }}
        >
          <ProgressBanner />
        </Box>
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <Box
          id="badges"
          sx={{ background: getBackgroundGradient(4), py: 8, ...shineOverlay }}
        >
          <TrustBadges />
        </Box>
      </MotionWrapper>

      <Box
        id="kpis"
        sx={{ background: getBackgroundGradient(5), py: 8, ...shineOverlay }}
      >
        <KPISection />
      </Box>

      <Box
        id="newsletter"
        sx={{ background: getBackgroundGradient(6), py: 8, ...shineOverlay }}
      >
        <NewsletterSection />
      </Box>

      <Box
        id="timeline"
        sx={{ background: getBackgroundGradient(7), py: 8, ...shineOverlay }}
      >
        <FeatureTimeline />
      </Box>

      <MotionWrapper delay={0.2}>
        <Box
          id="vergleich"
          sx={{ background: getBackgroundGradient(8), py: 8, ...shineOverlay }}
        >
          <CompetitorComparison />
        </Box>
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <Box
          id="blog"
          sx={{ background: getBackgroundGradient(9), py: 8, ...shineOverlay }}
        >
          <BlogPreview />
        </Box>
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <Box
          id="testimony"
          sx={{ background: getBackgroundGradient(10), py: 8, ...shineOverlay }}
        >
          <Testimonials />
        </Box>
      </MotionWrapper>

      <Box
        id="events"
        sx={{
          background: getBackgroundGradient(11),
          py: 8,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          ...shineOverlay,
        }}
      >
        <EventsTeaser />
      </Box>

      <Box
        sx={{ background: getBackgroundGradient(12), py: 8, ...shineOverlay }}
      >
        <AppDownloadBadges />
      </Box>

      <motion.footer
        id="footer"
        style={{ opacity: opacityFooter }}
        className="footer"
      >
        <Box sx={{ textAlign: "center", py: 6, pb: 10, opacity: 0.9 }}>
          <Typography variant="body2">
            © 2025 Omnixys – Modular Thinking. Infinite Possibilities.
          </Typography>
        </Box>
      </motion.footer>

      <StickyCTA />
      <ChatWidget />
    </Box>
  );
}
