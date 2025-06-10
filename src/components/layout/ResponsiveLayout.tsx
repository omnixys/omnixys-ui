// components/ResponsiveLayout.tsx
import { Container, CssBaseline } from "@mui/material";
import Head from "next/head";

export default function ResponsiveLayout({
  children,
  title = "Omnixys – Modular Innovation",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
        {children}
      </Container>
    </>
  );
}
