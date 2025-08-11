"use client";

import * as React from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import {
  Box,
  Stack,
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const categories = [
  "T-shirts",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Jackets",
  "Gloves",
] as const;

const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z.string().min(1, { message: "Short description is required!" }).max(60),
  description: z.string().min(1, { message: "Description is required!" }),
  price: z.number().min(1, { message: "Price is required!" }),
  category: z.enum(categories),
  sizes: z.array(z.enum(sizes)).min(1, { message: "Select at least one size." }),
  colors: z.array(z.enum(colors)).min(1, { message: "Select at least one color." }),
  // Wir erlauben hier File oder String (URL), damit File-Uploads möglich sind
  images: z.record(z.enum(colors), z.union([z.instanceof(File), z.string()])).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddProduct = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 1,
      category: undefined as unknown as FormValues["category"],
      sizes: [],
      colors: [],
      images: {},
    },
  });

  const selectedColors = useWatch({ control: form.control, name: "colors" }) ?? [];

  const onSubmit = (values: FormValues) => {
    // TODO: echte Submit-Logik
    console.log("AddProduct:", values);
  };

  return (
    <SheetContent>
      {/* Scrollbarer Bereich via MUI */}
      <Box sx={{ maxHeight: "100dvh", overflowY: "auto", pr: 1 }}>
        <SheetHeader>
          <SheetTitle sx={{ mb: 2 }}>Add Product</SheetTitle>
          <SheetDescription>
            <Form {...form}>
              <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Product name" />
                        </FormControl>
                        <FormDescription>Enter the name of the product.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Short Description */}
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Short description (≤ 60 chars)" />
                        </FormControl>
                        <FormDescription>Enter the short description of the product.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} minRows={4} placeholder="Full product description" />
                        </FormControl>
                        <FormDescription>Enter the description of the product.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            inputMode="decimal"
                            value={field.value}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            placeholder="Price"
                          />
                        </FormControl>
                        <FormDescription>Enter the price of the product.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category (MUI Select) */}
                  <Controller
                    name="category"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Box>
                            <InputLabel id="cat-label">Category</InputLabel>
                            <Select
                              labelId="cat-label"
                              label="Category"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value)}
                              fullWidth
                            >
                              {categories.map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                  {cat}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText error={!!fieldState.error}>
                              {fieldState.error?.message ?? "Enter the category of the product."}
                            </FormHelperText>
                          </Box>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Sizes (Checkbox Gruppe) */}
                  <FormField
                    control={form.control}
                    name="sizes"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Sizes</FormLabel>
                        <FormControl>
                          <FormGroup sx={{ mt: 1 }}>
                            <Grid container spacing={1.5}>
                              {sizes.map((size) => {
                                const checked = field.value?.includes(size);
                                return (
                                  <Grid item xs={4} key={size}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={!!checked}
                                          onChange={(e) => {
                                            const current = field.value || [];
                                            field.onChange(
                                              e.target.checked
                                                ? [...current, size]
                                                : current.filter((v: string) => v !== size)
                                            );
                                          }}
                                        />
                                      }
                                      label={size}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </FormGroup>
                        </FormControl>
                        <FormDescription>Select the available sizes for the product.</FormDescription>
                        <FormMessage />
                        {fieldState.error?.message && (
                          <FormHelperText error>{fieldState.error.message}</FormHelperText>
                        )}
                      </FormItem>
                    )}
                  />

                  {/* Colors (Checkbox Gruppe + File-Uploads je Farbe) */}
                  <FormField
                    control={form.control}
                    name="colors"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Colors</FormLabel>
                        <FormControl>
                          <FormGroup sx={{ mt: 1 }}>
                            <Grid container spacing={1.5}>
                              {colors.map((color) => {
                                const checked = field.value?.includes(color);
                                return (
                                  <Grid item xs={4} key={color}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={!!checked}
                                          onChange={(e) => {
                                            const current = field.value || [];
                                            field.onChange(
                                              e.target.checked
                                                ? [...current, color]
                                                : current.filter((v: string) => v !== color)
                                            );
                                          }}
                                        />
                                      }
                                      label={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                          <Box
                                            sx={{
                                              width: 8,
                                              height: 8,
                                              borderRadius: "50%",
                                              bgcolor: color,
                                              border: "1px solid rgba(0,0,0,.2)",
                                            }}
                                          />
                                          <Box component="span" sx={{ fontSize: 12 }}>
                                            {color}
                                          </Box>
                                        </Box>
                                      }
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </FormGroup>

                          {/* Uploads für ausgewählte Farben */}
                          {selectedColors.length > 0 && (
                            <Stack spacing={1.5} sx={{ mt: 3 }}>
                              <Box component="p" sx={{ fontSize: 14, fontWeight: 600, m: 0 }}>
                                Upload images for selected colors:
                              </Box>
                              {selectedColors.map((color) => (
                                <Controller
                                  key={color}
                                  name={`images.${color}` as const}
                                  control={form.control}
                                  render={({ field: imgField }) => (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                      <Box
                                        sx={{
                                          width: 8,
                                          height: 8,
                                          borderRadius: "50%",
                                          bgcolor: color,
                                          border: "1px solid rgba(0,0,0,.2)",
                                        }}
                                      />
                                      <Box sx={{ minWidth: 60, fontSize: 14 }}>{color}</Box>
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          const f = e.target.files?.[0];
                                          imgField.onChange(f ?? "");
                                        }}
                                      />
                                    </Box>
                                  )}
                                />
                              ))}
                            </Stack>
                          )}
                        </FormControl>
                        <FormDescription>Select the available colors for the product.</FormDescription>
                        <FormMessage />
                        {fieldState.error?.message && (
                          <FormHelperText error>{fieldState.error.message}</FormHelperText>
                        )}
                      </FormItem>
                    )}
                  />

                  <Stack direction="row" justifyContent="flex-end">
                    <Button type="submit">Submit</Button>
                  </Stack>
                </Stack>
              </Box>
            </Form>
          </SheetDescription>
        </SheetHeader>
      </Box>
    </SheetContent>
  );
};

export default AddProduct;
