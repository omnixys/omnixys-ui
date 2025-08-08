// components/profile/ProfileEducationCard.tsx
import { Card, Typography } from '@mui/material';

type Ausbildung = {
  abschluss: string;
  in: string;
  wo: string;
};

export default function ProfileEducationCard({
  ausbildung,
}: {
  ausbildung?: Ausbildung[];
}) {
  if (!ausbildung?.length) return null;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🎓 Ausbildung
      </Typography>
      {ausbildung.map((edu, index) => (
        <Typography
          key={index}
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {edu.abschluss} in {edu.in} @ {edu.wo}
        </Typography>
      ))}
    </Card>
  );
}
