"use client";

// app/page.tsx mit Sticky Navbar, Motion, Parallax, Karussell, Scroll Arrow & Animated Indicator
import {
  Box,
  Container,
  Typography,
  // useTheme,
} from "@mui/material";
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
// import StickyNavbar from "../components/landing/StickyNavbar";
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
  // const theme = useTheme();
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 300], [0, -100]);
  const yModules = useTransform(scrollY, [100, 600], [0, -50]);
  const opacityFooter = useTransform(scrollY, [800, 1200], [0, 1]);

  const moduleRef = useRef<HTMLDivElement>(null);

  const scrollToModules = () => {
    if (moduleRef.current)
      moduleRef.current.scrollIntoView({ behavior: "smooth" });
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
    <Box
      sx={{
        minHeight: "250vh",
        // background:
        //   "linear-gradient(180deg, #F8F8FC, #6A4BBC, #4E3792, #6A4BBC, #F8F8FC)",
        backgroundColor: (theme) => theme.palette.background.paper,
        color: "#fff",
        // position: "relative",
        ...shineOverlay,
      }}
    >
      {/* Fortschrittsbalken */}
      <ScrollSpyNavigation />
      <StepProgressNav />

      {/* Sticky Navbar */}
      {/* <StickyNavbar /> */}

      {/* Hero Section */}
      <Container id="hero" maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
        <HeroSection yHero={yHero} />
      </Container>

      {/* USP-Grid */}
      <MotionWrapper delay={0.2}>
        <Box id="USPGrid">
          <USPGrid />
        </Box>
      </MotionWrapper>

      {/* Scroll-Pfeil → MODULES */}
      <ScrollDownArrow
        onClick={scrollToModules}
        color="secondary.light"
        size={36}
      />

      {/* Karussell-Module mit Parallax */}
      <Box ref={moduleRef} sx={{ py: 8 }}>
        <ModuleCarousel modules={MODULES} yModules={yModules} />
      </Box>

      {/* Scroll-Pfeil → Video */}
      <ScrollDownArrow targetId="video" color="secondary.light" size={36} />

      {/* App-Video-Vorschau */}
      <MotionWrapper delay={0.2}>
        <Box
          id="video"
          sx={{ y: 8, backgroundColor: "rgba(255,255,255,0.125)" }}
        >
          <AppVideoPreview />
        </Box>
      </MotionWrapper>

      {/* Fortschrittsanzeige */}
      <MotionWrapper delay={0.2}>
        <Box id="progress" sx={{ py: 8 }}>
          <ProgressBanner />
        </Box>
      </MotionWrapper>

      {/* Trust-Siegel */}
      <MotionWrapper delay={0.2}>
        <Box
          id="badges"
          sx={{ py: 8, backgroundColor: "rgba(255,255,255,0.125)" }}
        >
          <TrustBadges />
        </Box>
      </MotionWrapper>

      <Box id="kpis" sx={{ py: 8 }}>
        <KPISection />
      </Box>

      <Box
        id="newsletter"
        sx={{ py: 8, backgroundColor: "rgba(255,255,255,0.125)" }}
      >
        <NewsletterSection />
      </Box>

      {/* Animated Feature Timeline */}
      <Box id="timeline" sx={{ py: 8 }}>
        <FeatureTimeline />
      </Box>
      {/* Vergleich mit Mitbewerbern */}
      <MotionWrapper delay={0.2}>
        <Box
          id="vergleich"
          sx={{ py: 8, backgroundColor: "rgba(255,255,255,0.125)" }}
        >
          <CompetitorComparison />
        </Box>
      </MotionWrapper>

      {/* Blog-Artikel */}
      <MotionWrapper delay={0.2}>
        <Box id="blog" sx={{ py: 8 }}>
          <BlogPreview />
        </Box>
      </MotionWrapper>

      {/* Testimonials */}
      <MotionWrapper delay={0.2}>
        <Box
          id="testimony"
          sx={{ py: 8, backgroundColor: "rgba(255,255,255,0.125)" }}
        >
          <Testimonials />
        </Box>
      </MotionWrapper>

      {/* Event- & Webinar-Teaser mit Animation */}
      <Box
        id="events"
        sx={{
          py: 8,
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <EventsTeaser />
      </Box>

      {/* App-Download Badges */}
      <Box sx={{ py: 8, backgroundColor: "rgba(255,255,255,0.125)" }}>
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

      {/* Sticky Call-to-Action Banner */}
      <StickyCTA />

      <ChatWidget />
    </Box>
  );
}
