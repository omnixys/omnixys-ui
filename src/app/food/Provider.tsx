"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import { CartUpdateContext } from "./context/CartUpdateContext";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { createTheme } from "@mui/material/styles";

type ProviderProps = { children: React.ReactNode };

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
  shape: { borderRadius: 12 },
});

export default function Provider({ children }: ProviderProps) {
  const [updateCart, setUpdateCart] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <PayPalScriptProvider */}
        {/* options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "test",
          currency: "USD",
        }}
      > */}
        <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
          <Container sx={{ px: { xs: 2, md: 6 }, mb: 6, position: "relative" }}>
            <Header />
            {children}
          </Container>
        </CartUpdateContext.Provider>
      {/* </PayPalScriptProvider> */}
    </ThemeProvider>
  );
}
