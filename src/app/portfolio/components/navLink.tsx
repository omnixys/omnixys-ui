"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";

interface NavLinkProps {
  link: {
    title: string;
    url: string;
  };
}

const NavLink: FC<NavLinkProps> = ({ link }) => {
  const pathName = usePathname();
  const isActive = pathName === link.url;

  return (
    <Button
      component={Link}
      href={link.url}
      variant={isActive ? "contained" : "text"}
      sx={{
        borderRadius: 1,
        px: 2,
        py: 0.5,
        ...(isActive && {
          bgcolor: "black",
          color: "white",
          "&:hover": { bgcolor: "grey.900" },
        }),
      }}
    >
      {link.title}
    </Button>
  );
};

export default NavLink;
