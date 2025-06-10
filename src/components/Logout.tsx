"use client";

import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { JSX } from "react";

/**
 * **Modernes Logout-Button-Design** für GentleCorp.
 *
 * @returns {JSX.Element} Logout-Button mit Premium-UX.
 */
export default function Logout(): JSX.Element {
  /**
   * Führt die Abmeldung aus und leitet zur Login-Seite weiter.
   */
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Button
      variant="contained"
      onClick={handleSignOut}
      startIcon={<LogoutIcon />}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "1rem",
        borderRadius: "12px",
        paddingX: 3,
        paddingY: 1.2,
        background: "linear-gradient(135deg, #6A4BBC, #4E3792)", // **Harmonische Farbverläufe**
        color: "#fff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          background: "linear-gradient(135deg, #4E3792, #312E81)", // **Dunklerer Hover**
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
          transform: "scale(1.05)",
        },
        "&:active": {
          transform: "scale(0.98)",
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      Abmelden
    </Button>
  );
}
