"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters!" }).max(50),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 digits!" }).max(15),
  address: z.string().min(2, { message: "Address is required!" }),
  city: z.string().min(2, { message: "City is required!" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditUser({
  defaultValues = {
    fullName: "John Doe",
    email: "john.doe@gmail.com",
    phone: "+1 234 5678",
    address: "123 Main St",
    city: "New York",
  },
  onSubmit,
}: {
  defaultValues?: FormValues;
  onSubmit?: (values: FormValues) => void;
}) {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onTouched",
  });

  const submit = (values: FormValues) => {
    onSubmit?.(values);
    // fallback: fürs Debuggen
    if (!onSubmit) console.log("EditUser submit:", values);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submit)} noValidate>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Edit User
      </Typography>

      <Stack spacing={3}>
        <Controller
          name="fullName"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Full Name"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? "Enter user full name."}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type="email"
              label="Email"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? "Only admin can see your email."}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Phone"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? "Only admin can see your phone number (optional)."}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? "Enter user address (optional)."}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="City"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? "Enter user city (optional)."}
            />
          )}
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
