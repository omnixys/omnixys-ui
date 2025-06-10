import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import MotionWrapper from "../common/MotionWrapper";

export default function TestimonialsSection() {
  const theme = useTheme();

  return (
    <MotionWrapper delay={0.2}>
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h5" align="center" color="white" gutterBottom>
          Was unsere Nutzer sagen
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              quote:
                "Omnixys hat unser gesamtes Buchungssystem revolutioniert – besonders für unsere Reiseabwicklung.",
              name: "Lisa Müller",
              company: "TravelPro GmbH",
              image: "/user1.jpg",
            },
            {
              quote:
                "Unsere Plattform für Immobilienverkäufe konnte dank Omnixys um 40 % schneller skalieren.",
              name: "Mark Seitz",
              company: "ImmoRocket AG",
              image: "/user2.jpg",
            },
          ].map((item, i) => (
            <Grid sx={{ xs: 12, md: 6 }} key={i}>
              <Box
                sx={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  p: 3,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.grey[100] }}
                >
                  „{item.quote}“
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.grey[300] }}
                  >
                    {item.name}, {item.company}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MotionWrapper>
  );
}
