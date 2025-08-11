"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Box,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: { sorting, rowSelection },
    // Optional: initial page size
    // initialState: { pagination: { pageSize: 10 } },
  });

  const page = table.getState().pagination.pageIndex;
  const rowsPerPage = table.getState().pagination.pageSize;
  const total = table.getFilteredRowModel().rows.length;

  return (
    <Paper variant="outlined" sx={{ width: "100%", borderRadius: 2 }}>
      {/* Bulk actions */}
      {Object.keys(rowSelection).length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <Button
            size="small"
            color="error"
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => {
              // TODO: deine Delete-Logik
              // Ausgewählte Zeilen-IDs kannst du z. B. so erhalten:
              // const selected = table.getSelectedRowModel().rows.map(r => r.original);
            }}
          >
            Delete Product(s)
          </Button>
        </Box>
      )}

      <TableContainer>
        <MuiTable size="small">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} sx={{ whiteSpace: "nowrap" }}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  selected={row.getIsSelected()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} sx={{ whiteSpace: "nowrap" }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ height: 96 }}>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_e, newPage) => table.setPageIndex(newPage)}
        onRowsPerPageChange={(e) => {
          const size = Number(e.target.value);
          table.setPageSize(size);
        }}
        rowsPerPageOptions={[10, 20, 30, 40, 50]}
      />
    </Paper>
  );
}
