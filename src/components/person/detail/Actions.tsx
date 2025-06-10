import { Box, Button } from "@mui/material";
import { Edit, ArrowBack } from "@mui/icons-material";
import Link from "next/link";

export default function Actions({ customerId }: { customerId: string }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        component={Link}
        href="/analytics/customers"
        variant="outlined"
        startIcon={<ArrowBack />}
        sx={{ borderColor: "#4E3792", color: "#4E3792" }}
      >
        Zurück zur Liste
      </Button>
      <Button
        component={Link}
        href={`/analytics/customers/${customerId}/edit`}
        variant="contained"
        startIcon={<Edit />}
        sx={{
          backgroundColor: "#6A4BBC",
          "&:hover": { backgroundColor: "#4E3792" },
        }}
      >
        Bearbeiten
      </Button>
    </Box>
  );
}
