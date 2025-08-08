// components/profile/ProfileExperienceCard.tsx
import { Card, Typography } from '@mui/material';

type Erfahrung = {
  wo?: string;
  als: string;
  beschreibung: string;
  von: string;
  bis: string;
};

export default function ProfileExperienceCard({
  erfahrung,
}: {
  erfahrung?: Erfahrung[];
}) {
  if (!erfahrung?.length) return null;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        💼 Berufserfahrung
      </Typography>
      {erfahrung.map((job, index) => (
        <Typography
          key={index}
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {job.von} – {job.bis}: {job.als}
          {job.wo && <> bei {job.wo}</>}
          <br />
          {job.beschreibung}
        </Typography>
      ))}
    </Card>
  );
}
