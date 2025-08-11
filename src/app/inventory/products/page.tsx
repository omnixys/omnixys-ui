// src/app/products/page.tsx
"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Header from "../components/Header";
import Rating from "../components/Rating"; // deine lucide-basierte Rating-Komponente
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

type Product = {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
};

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const MOCK_PRODUCTS: Product[] = [
  { productId: "p-001", name: "Omnixis T-Shirt", price: 24.9, rating: 4, stockQuantity: 120 },
  { productId: "p-002", name: "Omnixis Hoodie",  price: 59.0, rating: 5, stockQuantity: 60 },
  { productId: "p-003", name: "Sticker Pack",    price: 4.5,              stockQuantity: 500 },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>(MOCK_PRODUCTS);

  const filtered = React.useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ),
    [products, searchTerm]
  );

  const handleCreateProduct = async (data: ProductFormData) => {
    // hier lokal anlegen (kein Redux/RTK). Später kannst du das gegen dein Backend tauschen.
    const newProduct: Product = {
      productId: uuidv4(),
      name: data.name,
      price: data.price,
      stockQuantity: data.stockQuantity,
      rating: data.rating,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <Box>
      {/* SEARCH BAR */}
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* HEADER BAR */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Header name="Products" />
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setIsModalOpen(true)}
        >
          Create Product
        </Button>
      </Box>

      {/* PRODUCTS GRID */}
      <Grid container spacing={3}>
        {filtered.map((product) => (
          <Grid key={product.productId} xs={12} sm={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <Image
                  src={`/${
                    (product.productId.charCodeAt(0) % 3) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  style={{ borderRadius: 16, width: 150, height: 150, objectFit: "cover", marginBottom: 12 }}
                />
                <Typography variant="subtitle1" fontWeight={700}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 0.5 }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  Stock: {product.stockQuantity}
                </Typography>
                {!!product.rating && (
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Rating rating={product.rating} />
                  </Box>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                {/* Platz für Actions (Edit/Delete) – optional */}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </Box>
  );
}
