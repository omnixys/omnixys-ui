import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import MotionWrapper from "../common/MotionWrapper";

export default function EventsSection() {
  const events = [
    {
      date: "12. Juni 2025",
      title: "Omnixys Kickstart-Webinar",
      desc: "In 30 Minuten zur modularen Plattform: Live-Demo & Q&A.",
    },
    {
      date: "25. Juni 2025",
      title: "Security First: ISO & DSGVO Deep Dive",
      desc: "Best Practices zur sicheren Plattformarchitektur.",
    },
    {
      date: "10. Juli 2025",
      title: "Microservices in Action",
      desc: "Von der Idee zur Umsetzung mit OmnixysSphere.",
    },
  ];

  return (
    <MotionWrapper delay={0.2}>
      <Box
        id="events"
        sx={{
          py: 8,
          backgroundColor: "rgba(255,255,255,0.03)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" fontWeight={700} gutterBottom>
              📅 Kommende Events & Webinare
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
              Sei live dabei, wenn wir Innovation erklären, vorstellen und
              gemeinsam gestalten.
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {events.map((event, i) => (
              <Grid sx={{ xs:12, md:4 }} key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      borderRadius: 2,
                      p: 3,
                      boxShadow: 2,
                      height: "100%",
                    }}
                  >
                    <Typography variant="overline" sx={{ opacity: 0.7 }}>
                      {event.date}
                    </Typography>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                      {event.desc}
                    </Typography>
                    <Link href="#" passHref legacyBehavior>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        sx={{ mt: 2 }}
                      >
                        Jetzt anmelden
                      </Button>
                    </Link>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </MotionWrapper>
  );
}
