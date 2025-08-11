"use client";

import * as React from "react";
import { Box, InputBase, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: (theme) => alpha(theme.palette.grey[200], 1),
        py: 0.5,
        px: 2,
        borderRadius: 50,
      }}
    >
      <SearchIcon fontSize="small" color="action" />
      <InputBase
        placeholder="Search"
        sx={{
          flex: 1,
          fontSize: 14,
          color: "text.primary",
          "&::placeholder": {
            color: "text.secondary",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};

export default Search;
