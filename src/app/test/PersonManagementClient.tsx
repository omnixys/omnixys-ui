// app/person/PersonManagementClient.tsx
"use client";

import { useState } from "react";
import { Tabs, Tab, Box, Typography, Breadcrumbs, Button } from "@mui/material";
import PersonList from "./PersonList";
import { Home } from "@mui/icons-material";
import Link from "next/link";
import ResponsiveLayout from "../../components/layout/ResponsiveLayout";
import { ApolloProvider } from "@apollo/client";
import ToastProvider from "../../components/ToastProvider";
import getApolloClient from "../../lib/apolloClient";

interface Props {
  roles: string[];
  token: string;
}

export default function PersonManagementClient({ roles, token }: Props) {
  const [tab, setTab] = useState(0);
  const client = getApolloClient(token);

  const tabs = [
    { label: "Kunden", role: "CustomerViewer" },
    { label: "Mitarbeiter", role: "EmployeeViewer" },
  ].filter((t) => {
    return (
      roles.includes("Admin") ||
      roles.includes("Manager") ||
      roles.includes(t.role)
    );
  });

  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <ResponsiveLayout title="Person">
          <Box
            sx={{
              px: { xs: 2, sm: 4 },
              py: { xs: 2, sm: 3 },
              backgroundColor: (t) => t.palette.background.paper,
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
                ".MuiTab-root": { textTransform: "none", fontWeight: 500 },
              }}
            >
              {tabs.map((t, i) => (
                <Tab key={i} label={t.label} />
              ))}
            </Tabs>

            {tabs[tab]?.label === "Kunden" && (
              <PersonList type="CUSTOMER" token={token} />
            )}
            {tabs[tab]?.label === "Mitarbeiter" && (
              <PersonList type="EMPLOYEE" token={token} />
            )}
          </Box>
        </ResponsiveLayout>
      </ToastProvider>
    </ApolloProvider>
  );
}
