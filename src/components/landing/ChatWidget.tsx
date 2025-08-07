'use client';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  ListItemButton,
  ListItemText,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
};

const faqs = [
  {
    question: 'Wie starte ich mit Omnixys?',
    answer:
      "Klicke auf 'Loslegen' und registriere dich kostenlos im Dashboard.",
  },
  {
    question: 'Ist Omnixys DSGVO-konform?',
    answer:
      'Ja, alle Daten werden in sicheren Rechenzentren in der EU verarbeitet.',
  },
  {
    question: 'Gibt es eine mobile App?',
    answer: 'Ja! Du findest sie im App Store und auf Google Play.',
  },
];

const smartPrompts = [
  '🔐 Wie funktioniert die Authentifizierung?',
  '📦 Was sind Module in Omnixys?',
  '💡 Wie kann ich meine Daten importieren?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userInput.trim() },
    ]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = `OmniBot: Danke für deine Nachricht – wir melden uns bald!`;
      setChatMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ email: '', subject: '', message: '' });
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1300,
      }}
    >
      <Snackbar
        open={submitted}
        autoHideDuration={4000}
        onClose={() => setSubmitted(false)}
      >
        <Alert severity="success" variant="filled">
          Danke für deine Nachricht!
        </Alert>
      </Snackbar>

      {open ? (
        <Paper
          elevation={6}
          sx={{
            width: 320,
            maxHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            backgroundColor: '#fdfdfd',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              pb: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Hilfe & Support
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Scrollbarer Inhalt */}
          <Box sx={{ flex: 1, overflowY: 'auto', px: 2, pb: 2 }}>
            {/* Smart Prompts */}
            <Typography variant="body2" fontWeight={600} gutterBottom>
              💡 Beliebte Themen
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                mb: 2,
              }}
            >
              {smartPrompts.map((prompt, i) => (
                <Button
                  key={i}
                  size="small"
                  variant="outlined"
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  {prompt}
                </Button>
              ))}
            </Box>

            {/* FAQ */}
            <Typography variant="body2" fontWeight={600} gutterBottom>
              📋 Häufige Fragen
            </Typography>
            {faqs.map((faq, i) => (
              <Box key={i}>
                <ListItemButton
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                >
                  <ListItemText primary={faq.question} />
                  {openFaqIndex === i ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </ListItemButton>
                <Collapse in={openFaqIndex === i} timeout="auto" unmountOnExit>
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {faq.answer}
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            ))}

            {/* Chatverlauf */}
            <Typography
              variant="body2"
              fontWeight={600}
              gutterBottom
              sx={{ mt: 3 }}
            >
              💬 Chat mit OmniBot
            </Typography>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                p: 1,
                mb: 1,
                maxHeight: 100,
                overflowY: 'auto',
                border: '1px solid #eee',
              }}
            >
              {chatMessages.map((msg, idx) => (
                <Box
                  key={idx}
                  sx={{
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                    my: 0.5,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      display: 'inline-block',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor:
                        msg.sender === 'user' ? 'primary.light' : 'grey.100',
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              ))}
              {isTyping && (
                <Typography variant="caption" sx={{ opacity: 0.6 }}>
                  OmniBot tippt...
                </Typography>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Nachricht schreiben..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button variant="contained" onClick={handleSendMessage}>
                Senden
              </Button>
            </Box>

            {/* Kontaktformular */}
            <Typography variant="body2" fontWeight={600} gutterBottom>
              ✉️ Direktnachricht senden
            </Typography>
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}
            >
              <TextField
                label="Deine E-Mail"
                name="email"
                size="small"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
              />
              <TextField
                label="Betreff"
                name="subject"
                size="small"
                required
                value={formState.subject}
                onChange={(e) =>
                  setFormState({ ...formState, subject: e.target.value })
                }
              />
              <TextField
                label="Nachricht"
                name="message"
                multiline
                rows={3}
                required
                size="small"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
              />
              <Button variant="contained" type="submit" size="small">
                Absenden
              </Button>
            </Box>
          </Box>

          {/* Footer Hinweis */}
          <Box sx={{ px: 2, py: 1, borderTop: '1px solid #eee' }}>
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              Deine Nachricht wird vertraulich übermittelt.
            </Typography>
          </Box>
        </Paper>
      ) : (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '&:hover': { backgroundColor: 'primary.dark' },
            boxShadow: 4,
          }}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      )}
    </Box>
  );
}
