// src/app/inventory/page.tsx
"use client";

import * as React from "react";
import { Box, Typography, Alert, CircularProgress, Card } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";

import Header from "../components/Header";


// --- Types wie bei dir ---
type Product = {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
};

// --- Mockdaten statt RTK Query ---
const MOCK_PRODUCTS: Product[] = [
  { productId: "p-001", name: "Omnixis T-Shirt", price: 24.9, rating: 4.6, stockQuantity: 120 },
  { productId: "p-002", name: "Omnixis Hoodie",  price: 59.0, rating: 4.8, stockQuantity: 60  },
  { productId: "p-003", name: "Sticker Pack",    price: 4.5,               stockQuantity: 500 },
];

const columns: GridColDef<Product>[] = [
  { field: "productId", headerName: "ID", width: 120 },
  { field: "name", headerName: "Product Name", flex: 1, minWidth: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 120,
    valueGetter: (value, row) => row.rating ?? "N/A",
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 160,
    type: "number",
  },
];


export default function Inventory() {
  // Simulierter Ladezustand, falls du das Verhalten testen willst
  const [loading, setLoading] = React.useState(false);
  const [error] = React.useState<string | null>(null);
  const [rows] = React.useState<Product[]>(MOCK_PRODUCTS);

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
        Failed to fetch products
      </Alert>
    );
  }

  return (
    <Box>
      <Header name="Inventory" />

      <Card sx={{ mt: 2, p: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.productId}
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
