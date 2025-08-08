import { Info } from '@mui/icons-material';
import { Card, Typography } from '@mui/material';

export default function ProfileSummaryCard({
  kurzprofil,
}: {
  kurzprofil?: string;
}) {
  if (!kurzprofil) return null;

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        <Info fontSize="small" /> Kurzprofil
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {kurzprofil}
      </Typography>
    </Card>
  );
}
