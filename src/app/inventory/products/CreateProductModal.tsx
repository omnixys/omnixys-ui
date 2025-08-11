// src/app/(components)/CreateProductModal.tsx
"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import Header from "../components/Header";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [formData, setFormData] = React.useState<ProductFormData>({
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleChange =
    (field: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "price" || field === "stockQuantity" || field === "rating"
            ? Number(v)
            : v,
      }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData); // gibt exakt ProductFormData zurück
    onClose();
    // Optional: Formular resetten
    setFormData({ name: "", price: 0, stockQuantity: 0, rating: 0 });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      {/* Du kannst entweder Header verwenden ... */}
      <DialogTitle sx={{ pb: 0 }}>
        <Header name="Create New Product" />
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit} id="create-product-form">
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Product Name"
              value={formData.name}
              onChange={handleChange("name")}
              required
              autoFocus
              fullWidth
            />

            <TextField
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange("price")}
              required
              inputProps={{ step: "0.01", min: 0 }}
              fullWidth
            />

            <TextField
              label="Stock Quantity"
              type="number"
              value={formData.stockQuantity}
              onChange={handleChange("stockQuantity")}
              required
              inputProps={{ step: "1", min: 0 }}
              fullWidth
            />

            <TextField
              label="Rating"
              type="number"
              value={formData.rating}
              onChange={handleChange("rating")}
              required
              inputProps={{ step: "0.5", min: 0, max: 5 }}
              fullWidth
            />
          </Stack>
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button form="create-product-form" type="submit" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductModal;
