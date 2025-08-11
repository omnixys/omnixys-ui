"use client";

import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Box, Stack, Typography, Select, MenuItem } from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { Button } from "./ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex + 1;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ px: 2, py: 2 }}
    >
      <Typography variant="body2" color="text.secondary">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </Typography>

      <Stack direction="row" alignItems="center" spacing={{ xs: 2, lg: 3 }}>
        {/* Rows per page */}
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Rows per page
          </Typography>

          <Select
            size="small"
            value={String(pageSize)}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            sx={{ height: 32, minWidth: 70 }}
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <MenuItem key={size} value={String(size)}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        {/* Page x of y */}
        <Box sx={{ width: 120, textAlign: "center", fontWeight: 500, fontSize: 14 }}>
          Page {pageIndex} of {table.getPageCount()}
        </Box>

        {/* Pager controls */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            variant="outline"
            size="icon"
            aria-label="Go to first page"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            sx={{ display: { xs: "none", lg: "inline-flex" } }}
          >
            <FirstPageIcon fontSize="small" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon fontSize="small" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon fontSize="small" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Go to last page"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            sx={{ display: { xs: "none", lg: "inline-flex" } }}
          >
            <LastPageIcon fontSize="small" />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default DataTablePagination;
