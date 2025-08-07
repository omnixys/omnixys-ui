'use client';

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Backend/API-Call
    alert(`Danke für deine Anmeldung, ${email}!`);
    setEmail('');
  };

  return (
    <Box
      sx={{
        py: 10,
        // backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: 'blur(8px)',
        mt: 10,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            color="text.primary"
            variant="h4"
            fontWeight={700}
            gutterBottom
          >
            📬 Immer up-to-date bleiben
          </Typography>
          <Typography color="text.primary" sx={{ mb: 4, opacity: 0.8 }}>
            Melde dich für den Omnixys-Newsletter an und erfahre als Erste:r von
            neuen Modulen, Releases & Innovationen.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextField
              type="email"
              required
              placeholder="Deine E-Mail"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                width: { xs: '100%', sm: 300 },
                color: 'text.primary',
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
            >
              Jetzt abonnieren
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
