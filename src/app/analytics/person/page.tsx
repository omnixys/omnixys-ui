"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Tabs, Tab, Box, Typography, Alert, Breadcrumbs, Button } from "@mui/material";
import PersonList from "./PersonList";
import { Home } from "@mui/icons-material";
import Link from "next/link";
import ResponsiveLayout from "../../../components/layout/ResponsiveLayout";

export default function PersonManagementPage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState(0);

  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.includes("Admin") || roles.includes("Manager");

  if (status === "loading") return <Typography>Lade Session...</Typography>;
  if (!session) return <Alert severity="warning">Nicht eingeloggt</Alert>;
  if (!isAdminOrManager)
    return <Alert severity="error">Zugriff verweigert</Alert>;

  return (
    <ResponsiveLayout title="Person">
      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          py: { xs: 2, sm: 3 },
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link href="/" passHref>
            <Button startIcon={<Home />} size="small">
              Start
            </Button>
          </Link>
          <Typography color="text.primary">Personenverwaltung</Typography>
        </Breadcrumbs>
        <Typography variant="h4" gutterBottom>
          Personenverwaltung
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Rollen: {roles.join(", ")}
        </Typography>

        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            my: 2,
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
            },
          }}
        >
          <Tab label="Kunden" />
          <Tab label="Mitarbeiter" />
        </Tabs>

        <Box hidden={tab !== 0}>
          <PersonList type="CUSTOMER" />
        </Box>
        <Box hidden={tab !== 1}>
          <PersonList type="EMPLOYEE" />
        </Box>
      </Box>
    </ResponsiveLayout>
  );
}
