// components/profile/ProfileLocationTitleCard.tsx
import { Card, Typography } from '@mui/material';

export default function ProfileLocationTitleCard({
  location,
  headline,
}: {
  location?: string;
  headline?: string;
}) {
  if (!location && !headline) return null;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🧭 Standort & Titel
      </Typography>
      {location && (
        <Typography variant="body2" color="text.secondary">
          📍 {location}
        </Typography>
      )}
      {headline && (
        <Typography variant="body2" color="text.secondary">
          🧑‍💼 {headline}
        </Typography>
      )}
    </Card>
  );
}
