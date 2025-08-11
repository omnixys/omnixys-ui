"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  TableSortLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

export type User = {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
  status: "active" | "inactive";
};

export const columns: ColumnDef<User>[] = [
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

  // Avatar
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Avatar
          src={user.avatar}
          alt={user.fullName}
          sx={{ width: 36, height: 36, fontSize: 14 }}
        >
          {user.fullName?.[0] ?? "?"}
        </Avatar>
      );
    },
    enableSorting: false,
    size: 56,
  },

  // Name
  { accessorKey: "fullName", header: "User" },

  // Email (mit Sort)
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isSorted = column.getIsSorted(); // 'asc' | 'desc' | false
      return (
        <Button
          onClick={() => column.toggleSorting(isSorted === "asc")}
          endIcon={
            <TableSortLabel
              active={!!isSorted}
              direction={(isSorted || "asc") as "asc" | "desc"}
              sx={{ ml: -0.5 }}
            />
          }
          sx={{ textTransform: "none" }}
        >
          Email
        </Button>
      );
    },
  },

  // Status als Chip
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue<"active" | "inactive">("status");
      return (
        <Chip
          label={status}
          size="small"
          color={status === "active" ? "success" : "error"}
          variant="soft" // falls deine MUI-Version kein "soft" hat, nimm "outlined" oder lass weg
        />
      );
    },
  },

  // Actions (MUI Menu)
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);

      return (
        <Box>
          <IconButton
            size="small"
            aria-label="Open row actions"
            onClick={(e) => setAnchorEl(e.currentTarget)}
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
                navigator.clipboard.writeText(user.id);
                setAnchorEl(null);
              }}
            >
              <ListItemText primary="Copy user ID" />
            </MenuItem>

            <MenuItem
              component={Link}
              href={`/shop3/admin/users/${user.id}`}
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
