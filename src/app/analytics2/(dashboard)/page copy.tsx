/**
 * @file Dashboard.tsx
 * @description Enthält die Haupt-Dashboard-Komponente, welche die Sitzungs- und Kontoinformationen abruft
 * und das Dashboard in einem modernen, MUI-basierten Layout mit AppBar anzeigt.
 */

import { getServerSession } from "next-auth";
import { getLogger } from "../../../utils/logger";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { authOptions } from "../../../lib/authOptions";
import CardWrapper from "./CardWrapper";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const logger = getLogger(Dashboard.name);
  logger.debug("Session-Daten:", session);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          minHeight: "100vh",
        }}
      >
        <Box>
          <CardWrapper />
        </Box>
      </Container>
    </>
  );
}
