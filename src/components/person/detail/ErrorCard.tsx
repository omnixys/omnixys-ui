import { Container, Paper, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function ErrorCard({ message }: { message?: string }) {
  return (
    <Container maxWidth="sm">
      <Paper
        sx={{ p: 5, mt: 8, textAlign: "center", borderRadius: 3, boxShadow: 4 }}
      >
        <Typography variant="h5" color="error" sx={{ fontWeight: "bold" }}>
          Fehler beim Laden der Kundendaten
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: "#6A4BBC" }}>
          {message ||
            "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."}
        </Typography>
        <Button
          component={Link}
          href="/analytics/customers"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#6A4BBC",
            "&:hover": { backgroundColor: "#4E3792" },
          }}
        >
          Zurück zur Kundenliste
        </Button>
      </Paper>
    </Container>
  );
}
