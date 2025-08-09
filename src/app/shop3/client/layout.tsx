import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import AppProviders from "./providers"; // ⬅️ MUI-Provider (Client Component)
import { Box, Container } from "@mui/material";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trendlama - Best Clothes",
  description: "Trendlama is the best place to find the best clothes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en">
       <Box className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders>
        <Container
          // maxWidth={false} disableGutters
          maxWidth='lg'
          sx={{ py: 2 }}>
            <Navbar />
            {children}
            <Footer />
          </Container>
          <ToastContainer position="bottom-right" />
        </AppProviders>
       </Box>
    // </html>
  );
}
