"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { Button } from "./ui/button";
import { Box, Stack, TextField } from "@mui/material";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters!" }).max(50),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 characters" }).max(15),
  address: z.string().min(2, { message: "Address must be at least 2 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const AddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    // TODO: ersetze das mit deiner echten Submit-Logik
    console.log("AddUser submit:", values);
    reset();
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle sx={{ mb: 2 }}>Add User</SheetTitle>
        <SheetDescription>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message ?? "Enter user full name."}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message ?? "Only admin can see your email."}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message ?? "Only admin can see your phone number (optional)"}
                  />
                )}
              />

              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message ?? "Enter user address (optional)"}
                  />
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message ?? "Enter user city (optional)"}
                  />
                )}
              />

              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button type="button" variant="outline" onClick={() => reset()}>
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Box>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddUser;
