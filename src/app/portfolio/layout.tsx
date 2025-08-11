import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TransitionProvider from "./components/transitionProvider";
import MuiThemeProvider from "./components/mui-theme-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev Portfolio App",
  description: "The best animated portfolio page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <TransitionProvider>{children}</TransitionProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
  );
}
