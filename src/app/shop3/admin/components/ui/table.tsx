"use client";

import * as React from "react";
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  TableFooter as MuiTableFooter,
  TableHead as MuiTableHeadContainer,
  TableRow as MuiTableRow,
  Paper,
  Box,
} from "@mui/material";

/** Wrapper: <Table /> mit horizontalem Scroll wie zuvor */
function Table({
  sx,
  ...props
}: React.ComponentProps<typeof MuiTable>) {
  return (
    <MuiTableContainer
      data-slot="table-container"
      component={Paper}
      elevation={0}
      sx={{
        position: "relative",
        width: "100%",
        overflowX: "auto",
      }}
    >
      <MuiTable
        data-slot="table"
        size="small"
        sx={{
          width: "100%",
          typography: "body2",
          ...sx,
        }}
        {...props}
      />
    </MuiTableContainer>
  );
}

function TableHeader({
  sx,
  ...props
}: React.ComponentProps<typeof MuiTableHeadContainer>) {
  return (
    <MuiTableHeadContainer
      data-slot="table-header"
      sx={{
        "& tr": { borderBottom: (t) => `1px solid ${t.palette.divider}` },
        ...sx,
      }}
      {...props}
    />
  );
}

function TableBody({
  sx,
  ...props
}: React.ComponentProps<typeof MuiTableBody>) {
  return (
    <MuiTableBody
      data-slot="table-body"
      sx={{
        // letzte Zeile ohne Border
        "& tr:last-child": { borderBottom: 0 },
        ...sx,
      }}
      {...props}
    />
  );
}

function TableFooter({
  sx,
  ...props
}: React.ComponentProps<typeof MuiTableFooter>) {
  return (
    <MuiTableFooter
      data-slot="table-footer"
      sx={{
        backgroundColor: (t) =>
          t.palette.mode === "dark"
            ? t.palette.action.hover
            : t.palette.action.selected,
        borderTop: (t) => `1px solid ${t.palette.divider}`,
        fontWeight: 600,
        "& > tr:last-of-type": { borderBottom: 0 },
        ...sx,
      }}
      {...props}
    />
  );
}

function TableRow({
  sx,
  ...props
}: React.ComponentProps<typeof MuiTableRow>) {
  return (
    <MuiTableRow
      data-slot="table-row"
      sx={{
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
        transition: "background-color .15s ease",
        "&:hover": { backgroundColor: (t) => t.palette.action.hover },
        // unterstützt data-state="selected"
        '&[data-state="selected"]': {
          backgroundColor: (t) => t.palette.action.selected,
        },
        ...sx,
      }}
      {...props}
    />
  );
}

/** Kopfzelle (entspricht deinem alten <th/>) */
function TableHead({
  sx,
  ...props
}: React.ComponentProps<typeof MuiTableCell>) {
  return (
    <MuiTableCell
      data-slot="table-head"
      variant="head"
      sx={{
        color: (t) => t.palette.text.primary,
        height: 40,
        px: 1,
        textAlign: "left",
        verticalAlign: "middle",
        fontWeight: 600,
        whiteSpace: "nowrap",
        // Checkbox-Ausrichtung wie vorher
        "&:has([role='checkbox'])": { pr: 0 },
        "& > [role='checkbox']": { transform: "translateY(2px)" },
        ...sx,
      }}
      {...props}
    />
  );
}

/** Normale Zelle (entspricht deinem alten <td/>) */
function TableCell({
  sx,
  ...props
}: React.ComponentProps<typeof MuiTableCell>) {
  return (
    <MuiTableCell
      data-slot="table-cell"
      sx={{
        p: 1,
        verticalAlign: "middle",
        whiteSpace: "nowrap",
        "&:has([role='checkbox'])": { pr: 0 },
        "& > [role='checkbox']": { transform: "translateY(2px)" },
        ...sx,
      }}
      {...props}
    />
  );
}

/** Caption innerhalb des Table (HTML <caption>) */
function TableCaption({
  sx,
  ...props
}: React.ComponentProps<typeof Box>) {
  return (
    <Box
      component="caption"
      data-slot="table-caption"
      sx={{
        mt: 2,
        color: (t) => t.palette.text.secondary,
        fontSize: "0.875rem",
        textAlign: "left",
        ...sx,
      }}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
