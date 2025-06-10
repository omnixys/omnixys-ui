// components/landing/Testimonials.jsx
"use client";

import { Box, Container, Typography, Grid, Avatar } from "@mui/material";

export default function Testimonials() {
  const feedback = [
    {
      text: "Omnixys hat unser gesamtes Buchungssystem revolutioniert – besonders für unsere Reiseabwicklung.",
      user: "Lisa Müller, TravelPro GmbH",
      avatar: "/user1.jpg",
    },
    {
      text: "Unsere Plattform für Immobilienverkäufe konnte dank Omnixys um 40 % schneller skalieren.",
      user: "Mark Seitz, ImmoRocket AG",
      avatar: "/user2.jpg",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography color="text.primary" variant="h5" align="center" gutterBottom>
        Was unsere Nutzer sagen
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {feedback.map((item, i) => (
          <Grid sx={{ xs:12, md:6 }} key={i}>
            <Box
              sx={{
                // backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 3,
                p: 3,
              }}
            >
              <Typography
                color="text.primary"
                variant="body1"
                sx={{ color: "#EEE" }}
              >
                „{item.text}“
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar
                  src={item.avatar}
                  alt={item.user}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Typography
                  color="text.primary"
                  variant="body2"
                  sx={{ color: "#CCC" }}
                >
                  {item.user}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
