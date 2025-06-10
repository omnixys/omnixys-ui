// components/EnhancedDataGridSkeleton.tsx
import { Skeleton, Box, Paper } from "@mui/material";

export default function EnhancedDataGridSkeleton() {
  return (
    <Paper sx={{ p: 2 }}>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
      {[...Array(8)].map((_, idx) => (
        <Box key={idx} sx={{ display: "flex", gap: 2, mb: 1 }}>
          <Skeleton variant="rectangular" height={32} width="10%" />
          <Skeleton variant="rectangular" height={32} width="25%" />
          <Skeleton variant="rectangular" height={32} width="20%" />
          <Skeleton variant="rectangular" height={32} width="15%" />
        </Box>
      ))}
    </Paper>
  );
}
