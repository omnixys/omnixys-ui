"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  Popover,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./Cart";
import { CartUpdateContext } from "../context/CartUpdateContext";

// ------------------------------
// Typen
// ------------------------------
export type CartItem = {
  id: string;
  price: number;
  productName: string;
  productImage: string;
  restaurant?: { name?: string };
};

type User = {
  id: string;
  fullName: string;
  imageUrl?: string;
};

// ------------------------------
// Header-Komponente (ohne Clerk)
// ------------------------------
export default function Header() {
  // Mock-Auth-State (ersetze das später durch deine echte Auth)
  const [user, setUser] = useState<User | null>(null);
  const isSignedIn = Boolean(user);

  // Cart-State (ohne GlobalApi)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [anchorElCart, setAnchorElCart] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const ctx = useContext(CartUpdateContext); // optional, falls du ihn nutzt
  const updateCartFlag = ctx?.updateCart;

  // Cart aus localStorage laden/speichern (pro User/Guest)
  useEffect(() => {
    const key = user?.id ? `cart:${user.id}` : "cart:guest";
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (raw) {
      try {
        setCart(JSON.parse(raw) as CartItem[]);
      } catch {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    const key = user?.id ? `cart:${user.id}` : "cart:guest";
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    // Hier könntest du auf externe Cart-Updates reagieren (falls Context benutzt)
    // Aktuell keine Aktion notwendig
  }, [updateCartFlag]);

  const openCart = Boolean(anchorElCart);
  const openUser = Boolean(anchorElUser);

  // Demo-Login (ersetzen durch echte Auth)
  const handleDemoLogin = () => {
    setUser({
      id: "user_123",
      fullName: "Jane Doe",
      imageUrl: "/images/avatar-demo.jpg", // optional
    });
  };

  const handleDemoLogout = () => {
    setUser(null);
    setAnchorElUser(null);
  };

  // Cart-Callbacks ohne Backend
  const handleRemoveFromCart = async (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Container>
        <Toolbar disableGutters sx={{ py: 1.5, gap: 2, justifyContent: "space-between" }}>
          {/* Logo */}
          <Box component={Link} href="/food" sx={{ display: "inline-flex", alignItems: "center" }}>
            <Box sx={{ position: "relative", width: 160, height: 40 }}>
              <Image src="/food/logo.png" alt="logo" fill sizes="160px" style={{ objectFit: "contain" }} />
            </Box>
          </Box>

          {/* Suche (ab md sichtbar) */}
          <Box sx={{ flex: 1, display: { xs: "none", md: "flex" }, maxWidth: 420 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Rechts: Cart + User/Buttons */}
          {isSignedIn ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Warenkorb */}
              <IconButton aria-label="Warenkorb" onClick={(e) => setAnchorElCart(e.currentTarget)}>
                <Badge badgeContent={cart?.length ?? 0} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Popover
                open={openCart}
                anchorEl={anchorElCart}
                onClose={() => setAnchorElCart(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{ sx: { width: { xs: "90vw", sm: 420 }, p: 2 } }}
              >
                <Cart cart={cart} onRemove={handleRemoveFromCart} />
              </Popover>

              {/* User-Menü */}
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.fullName ?? "User"}
                  src={user?.imageUrl ?? undefined}
                  sx={{ width: 36, height: 36 }}
                />
              </IconButton>
              <Menu
                open={openUser}
                anchorEl={anchorElUser}
                onClose={() => setAnchorElUser(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Typography variant="subtitle2" sx={{ px: 2, py: 1.5 }}>
                  My Account
                </Typography>
                <Divider />
                <MenuItem component={Link} href="/user" onClick={() => setAnchorElUser(null)}>
                  Profile
                </MenuItem>
                <MenuItem component={Link} href="/user#/my-orders" onClick={() => setAnchorElUser(null)}>
                  My Orders
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleDemoLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1.5 }}>
              {/* Für echte Auth: Link zu /login & /signup oder eigener Dialog */}
              <Button variant="outlined" component={Link} href="/login">
                Login
              </Button>
              <Button variant="contained" component={Link} href="/signup">
                Sign Up
              </Button>

              {/* Optionaler Demo-Login (lokal) */}
              <Button variant="text" onClick={handleDemoLogin}>
                Demo Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
