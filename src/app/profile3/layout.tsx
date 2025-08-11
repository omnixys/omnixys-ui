// app/layout.tsx (Server Component!)
import type { Metadata } from "next";
import * as React from "react";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import { Container, Grid, Box } from "@mui/material"; // <– MUI Komponenten sind ok als JSX
import ThemeRegistry from "./ThemeRegistry";          // <– Client-Wrapper

export const metadata: Metadata = {
  title: "Lama Dev X Clone",
  description: "Next.js social media application project",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
        <ThemeRegistry>
          <Container maxWidth="xl" sx={{ py: 0 }}>
            <Grid container columnGap={2} sx={{ mx: "auto", alignItems: "flex-start" }}>
              <Grid sx={{ px: { xs: 1, sm: 2, xl: 3 } }}>
                <LeftBar />
              </Grid>
              <Grid sx={{ minWidth: { lg: 600 }, borderLeft: 1, borderRight: 1, borderColor: "divider" }}>
                <Box>
                  {children}
                  {modal}
                </Box>
              </Grid>
              <Grid  sx={{ display: { xs: "none", lg: "flex" }, ml: { lg: 2, md: 2 }, flex: 1 }}>
                <RightBar />
              </Grid>
            </Grid>
          </Container>
        </ThemeRegistry>
  );
}
