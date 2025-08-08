import { Card, Chip, Stack, Typography } from '@mui/material';

export default function ProfileSkillsCard({ skills }: { skills?: string[] }) {
  if (!skills?.length) return null;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        🚀 Fähigkeiten
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {skills.map((skill) => (
          <Chip key={skill} label={skill} color="info" variant="outlined" />
        ))}
      </Stack>
    </Card>
  );
}
