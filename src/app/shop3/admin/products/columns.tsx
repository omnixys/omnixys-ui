"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Box,
  Checkbox as MuiCheckbox,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TableSortLabel,
  Avatar,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import Image from "next/image";

export type Product = {
  id: string | number;
  price: number;
  name: string;
  shortDescription: string;
  description: string;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export const columns: ColumnDef<Product>[] = [
  // Auswahl
  {
    id: "select",
    header: ({ table }) => (
      <MuiCheckbox
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        inputProps={{ "aria-label": "Select all rows" }}
      />
    ),
    cell: ({ row }) => (
      <MuiCheckbox
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
        inputProps={{ "aria-label": `Select row ${row.id}` }}
      />
    ),
    size: 48,
    enableSorting: false,
    enableHiding: false,
  },

  // Bild
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original;
      const firstColor = product.colors?.[0];
      const src = firstColor ? product.images[firstColor] : undefined;

      // Rundes Bild wie vorher
      return (
        <Box sx={{ position: "relative", width: 36, height: 36 }}>
          {src ? (
            <Image
              src={src}
              alt={product.name}
              fill
              style={{ borderRadius: "50%", objectFit: "cover" }}
              sizes="36px"
            />
          ) : (
            <Avatar sx={{ width: 36, height: 36 }}>{product.name?.[0] ?? "?"}</Avatar>
          )}
        </Box>
      );
    },
    enableSorting: false,
    size: 56,
  },

  // Name
  { accessorKey: "name", header: "Name" },

  // Price (mit Sort)
  {
    accessorKey: "price",
    header: ({ column }) => {
      const isSorted = column.getIsSorted(); // 'asc' | 'desc' | false
      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === "asc")}
          endIcon={
            <TableSortLabel
              active={!!isSorted}
              direction={(isSorted || "asc") as "asc" | "desc"}
              sx={{ ml: -0.5 }} // Button hat schon Platz für Icon
            />
          }
          sx={{ textTransform: "none" }}
        >
          Price
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue<number>("price");
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value ?? 0);
    },
  },

  // Short description
  { accessorKey: "shortDescription", header: "Description" },

  // Actions (MUI Menu)
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);

      return (
        <Box>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            aria-label="Open row actions"
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                navigator.clipboard.writeText(String(product.id));
                setAnchorEl(null);
              }}
            >
              <ListItemText primary="Copy product ID" />
            </MenuItem>

            <MenuItem
              component={Link}
              href={`shop3/admin/products/${product.id}`}
              onClick={() => setAnchorEl(null)}
            >
              <ListItemText primary="View customer" />
            </MenuItem>
          </Menu>
        </Box>
      );
    },
    enableSorting: false,
    size: 56,
  },
];
