// src/app/(components)/Header.tsx
"use client";

import { Typography } from "@mui/material";

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return (
    <Typography
      variant="h5" // entspricht in etwa text-2xl
      fontWeight={600} // entspricht font-semibold
      color="text.primary" // text-gray-700-Äquivalent
    >
      {name}
    </Typography>
  );
};

export default Header;
