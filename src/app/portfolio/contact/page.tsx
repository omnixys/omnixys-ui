"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
// import emailjs from "@emailjs/browser";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type EnvStr = string | undefined;

const SERVICE_ID: EnvStr = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID: EnvStr = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY: EnvStr = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const text = "Say Hello";

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    // Basic ENV check, um serialisierungsbedingte Fehler früh zu vermeiden
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setError(
        "E-Mail Service ist nicht konfiguriert. Bitte NEXT_PUBLIC_SERVICE_ID, NEXT_PUBLIC_TEMPLATE_ID und NEXT_PUBLIC_PUBLIC_KEY setzen."
      );
      return;
    }

    try {
      // await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);
      setSuccess(true);
      formRef.current?.reset();
    } catch {
      setError("Senden fehlgeschlagen. Bitte später erneut versuchen.");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      sx={{ height: "100%" }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "stretch",
          gap: 4,
          py: { xs: 4, sm: 6 },
        }}
      >
        {/* TEXT / HEADLINE */}
        <Box
          sx={{
            flex: { xs: "0 0 auto", lg: "1 1 50%" },
            minHeight: { xs: 240, lg: "auto" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            component="div"
            variant="h2"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem" },
              letterSpacing: 2,
              fontWeight: 800,
              userSelect: "none",
            }}
          >
            {text.split("").map((letter, index) => (
              <Box
                key={`${letter}-${index}`}
                component={motion.span}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.1 }}
                sx={{ display: "inline-block" }}
              >
                {letter}
              </Box>
            ))}{" "}
            😊
          </Typography>
        </Box>

        {/* FORM */}
        <Box sx={{ flex: { xs: "1 1 auto", lg: "1 1 50%" }, display: "flex", alignItems: "center" }}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "secondary.light",
              opacity: 0.35,
              filter: "saturate(0.9)",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Box
              component="form"
              onSubmit={sendEmail}
              ref={formRef}
              sx={{
                p: { xs: 3, sm: 5, md: 6 },
                display: "flex",
                flexDirection: "column",
                gap: 3,
                fontSize: "1.125rem",
              }}
            >
              <Typography>Dear Lama Dev,</Typography>

              <TextField
                name="user_message"
                label="Nachricht"
                placeholder="Deine Nachricht…"
                multiline
                minRows={6}
                variant="standard"
                InputProps={{ disableUnderline: false }}
                fullWidth
              />

              <Typography>My mail address is:</Typography>

              <TextField
                name="user_email"
                type="email"
                label="E-Mail"
                placeholder="you@example.com"
                variant="standard"
                InputProps={{ disableUnderline: false }}
                fullWidth
                required
              />

              <Typography>Regards</Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm="auto">
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "primary.light",
                      color: "common.white",
                      fontWeight: 600,
                      px: 3,
                      py: 1.25,
                      borderRadius: 2,
                      "&:hover": { bgcolor: "primary.main" },
                    }}
                  >
                    Send
                  </Button>
                </Grid>
                <Grid item xs>
                  <Stack spacing={1}>
                    {success && <Alert severity="success">Your message has been sent successfully!</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
