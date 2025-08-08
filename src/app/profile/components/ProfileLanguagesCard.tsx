// components/profile/ProfileLanguagesCard.tsx
import { Card, Chip, Stack, Typography } from '@mui/material';

export default function ProfileLanguagesCard({
  languages,
}: {
  languages?: string[];
}) {
  if (!languages?.length) return null;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        💬 Sprachen
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {languages.map((lang) => (
          <Chip key={lang} label={lang} variant="outlined" />
        ))}
      </Stack>
    </Card>
  );
}
