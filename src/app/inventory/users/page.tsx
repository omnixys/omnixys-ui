// src/app/users/page.tsx
"use client";

import * as React from "react";
import { Box, Card, Typography, Alert, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../components/Header";

type User = {
  userId: string;
  name: string;
  email: string;
};

const MOCK_USERS: User[] = [
  { userId: "u-001", name: "Ed Roh", email: "ed.roh@example.com" },
  { userId: "u-002", name: "Rachel Dwomoh", email: "rachel@example.com" },
  { userId: "u-003", name: "Tom Tester", email: "tom.tester@example.com" },
];

const columns: GridColDef<User>[] = [
  { field: "userId", headerName: "ID", width: 120 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 220 },
];

export default function Users() {
  // Falls du später echtes Laden/Fehler simulieren willst:
  const [loading] = React.useState(false);
  const [error] = React.useState<string | null>(null);
  const [rows] = React.useState<User[]>(MOCK_USERS);

  if (loading) {
    return (
      <Box sx={{ py: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <CircularProgress size={20} />
        <Typography variant="body2">Loading…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Failed to fetch users
      </Alert>
    );
  }

  return (
    <Box>
      <Header name="Users" />
      <Card sx={{ mt: 2, p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.userId}
          checkboxSelection
          autoHeight
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": { bgcolor: "background.default" },
            "& .MuiDataGrid-cell": { color: "text.primary" },
          }}
        />
      </Card>
    </Box>
  );
}
