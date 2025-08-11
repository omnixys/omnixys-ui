"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";

// ---- Mock-Daten ----
interface NavItem {
  url: string;
  title: string;
}
const navLinks: NavItem[] = [
  { url: "/portfolio", title: "Home" },
  { url: "/portfolio/about", title: "About" },
  { url: "/portfolio/portfolio", title: "Portfolio" },
  { url: "/portfolio/contact", title: "Contact" },
];

interface SocialItem {
  title: string;
  url: string;
  iconSrc: string; // aus /public
}
const socialLinks: SocialItem[] = [
  { title: "GitHub", url: "#", iconSrc: "/portfolio/github.png" },
  { title: "Dribbble", url: "#", iconSrc: "/portfolio/dribbble.png" },
  { title: "Instagram", url: "#", iconSrc: "/portfolio/instagram.png" },
  { title: "Facebook", url: "#", iconSrc: "/portfolio/facebook.png" },
  { title: "Pinterest", url: "#", iconSrc: "/portfolio/pinterest.png" },
  { title: "LinkedIn", url: "#", iconSrc: "/portfolio/linkedin.png" },
];

// ---- Burger-Animationen ----
const topVariants = {
  closed: { rotate: 0, backgroundColor: "rgb(0,0,0)" },
  opened: { rotate: 45, backgroundColor: "rgb(255,255,255)" },
};
const centerVariants = {
  closed: { opacity: 1, backgroundColor: "rgb(0,0,0)" },
  opened: { opacity: 0 },
};
const bottomVariants = {
  closed: { rotate: 0, backgroundColor: "rgb(0,0,0)" },
  opened: { rotate: -45, backgroundColor: "rgb(255,255,255)" },
};

const listVariants = {
  closed: { x: "100vw" },
  opened: {
    x: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.2 },
  },
};
const listItemVariants = {
  closed: { x: -10, opacity: 0 },
  opened: { x: 0, opacity: 1 },
};

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (url: string) => pathname === url;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "transparent", color: "inherit" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "64px",
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* LINKS (Desktop) */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" }, width: { md: "33%" } }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={Link}
                href={link.url}
                variant={isActive(link.url) ? "contained" : "text"}
                sx={{
                  textTransform: "none",
                  borderRadius: 1,
                  ...(isActive(link.url) && {
                    bgcolor: "black",
                    color: "white",
                    "&:hover": { bgcolor: "grey.900" },
                  }),
                }}
              >
                {link.title}
              </Button>
            ))}
          </Stack>

          {/* LOGO */}
          <Box
            sx={{
              display: { xs: "flex", md: "none", lg: "flex" },
              width: { xl: "33%" },
              justifyContent: { xl: "center" },
            }}
          >
            <Button
              component={Link}
              href="/portfolio"
              sx={{
                minWidth: 0,
                px: 1,
                py: 0.5,
                bgcolor: "black",
                color: "white",
                borderRadius: 1,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { bgcolor: "grey.900" },
              }}
            >
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                Lama
              </Typography>
              <Box
                sx={{
                  width: 48,
                  height: 32,
                  borderRadius: 1,
                  bgcolor: "white",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                .dev
              </Box>
            </Button>
          </Box>

          {/* SOCIAL (Desktop) */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ display: { xs: "none", md: "flex" }, width: { md: "33%" } }}
          >
            {socialLinks.map((s) => (
              <IconButton
                key={s.title}
                component={Link}
                href={s.url}
                aria-label={s.title}
                sx={{ p: 0.5 }}
              >
                <Image src={s.iconSrc} alt={s.title} width={24} height={24} />
              </IconButton>
            ))}
          </Stack>

          {/* BURGER (Mobile) */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              onClick={() => setOpen((v) => !v)}
              sx={{ width: 40, height: 32 }}
              aria-label="Open menu"
            >
              <Box
                sx={{
                  position: "relative",
                  width: 40,
                  height: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <motion.div
                  variants={topVariants}
                  animate={open ? "opened" : "closed"}
                  style={{
                    width: 40,
                    height: 4,
                    borderRadius: 6,
                    transformOrigin: "left",
                  }}
                />
                <motion.div
                  variants={centerVariants}
                  animate={open ? "opened" : "closed"}
                  style={{ width: 40, height: 4, borderRadius: 6 }}
                />
                <motion.div
                  variants={bottomVariants}
                  animate={open ? "opened" : "closed"}
                  style={{
                    width: 40,
                    height: 4,
                    borderRadius: 6,
                    transformOrigin: "left",
                  }}
                />
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* FULLSCREEN MENU (Mobile) */}
      <Drawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            height: "100vh",
            bgcolor: "black",
            color: "white",
          },
        }}
      >
        <motion.div
          variants={listVariants}
          initial="closed"
          animate="opened"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <List sx={{ width: "100%" }}>
            {navLinks.map((link) => (
              <motion.div key={link.title} variants={listItemVariants}>
                <ListItem disableGutters sx={{ justifyContent: "center" }}>
                  <ListItemButton
                    component={Link}
                    href={link.url}
                    onClick={() => setOpen(false)}
                    sx={{ justifyContent: "center" }}
                  >
                    <ListItemText
                      primary={link.title}
                      primaryTypographyProps={{ fontSize: 32, textAlign: "center" }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </motion.div>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
