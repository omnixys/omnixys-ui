"use client";

import { useKeycloak } from "@react-keycloak/web";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function KeycloakLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized || !keycloak) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Authentifiziere Benutzer…
        </Typography>
      </Box>
    );
  }

  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  return <>{children}</>;
}
