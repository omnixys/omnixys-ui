// components/landing/BlogPreview.jsx
"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function BlogPreview() {
  const articles = [
    {
      title: "Die Zukunft modularer Plattformen",
      desc: "Wie OmnixysSphere Unternehmen revolutioniert.",
      href: "#",
    },
    {
      title: "Vergleich: Monolith vs. Microservices",
      desc: "Warum modulare Architekturen gewinnen.",
      href: "#",
    },
    {
      title: "Sicherheit & Compliance bei Omnixys",
      desc: "Unsere Standards für dein Vertrauen.",
      href: "#",
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        // backgroundColor: "rgba(255,255,255,0.05)"
      }}
    >
      <Container maxWidth="lg">
        <Typography
          color="text.primary"
          variant="h4"
          fontWeight={700}
          gutterBottom
        >
          Insights & Artikel
        </Typography>
        <Typography
          color="text.primary"
          variant="body1"
          sx={{ mb: 4, opacity: 0.8 }}
        >
          Bleibe auf dem Laufenden mit unseren neuesten Entwicklungen.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {articles.map((article, i) => (
            <Box
              key={i}
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.08)",
                boxShadow: 2,
                height: "100%",
              }}
            >
              <Typography
                color="text.primary"
                variant="h6"
                fontWeight={600}
                gutterBottom
              >
                {article.title}
              </Typography>
              <Typography
                color="text.primary"
                variant="body2"
                sx={{ opacity: 0.8 }}
              >
                {article.desc}
              </Typography>
              <Link href={article.href} passHref>
                <Button
                  variant="text"
                  size="small"
                  color="secondary"
                  sx={{ mt: 2 }}
                >
                  Weiterlesen
                </Button>
              </Link>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
