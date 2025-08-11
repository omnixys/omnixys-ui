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

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const formSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(1, { message: "Amount must be at least 1!" }),
  userId: z.string().min(1, { message: "User Id is required!" }),
  status: z.enum(["pending", "processing", "success", "failed"]),
});

type FormValues = z.infer<typeof formSchema>;

const AddOrder = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      userId: "",
      status: "pending",
    },
  });

  const onSubmit = (values: FormValues) => {
    // TODO: ersetze dies durch deine echte Submit-Logik
    console.log("Submit AddOrder:", values);
    reset();
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle sx={{ mb: 2 }}>Add Order</SheetTitle>
        <SheetDescription>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              {/* Amount */}
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    label="Amount"
                    fullWidth
                    inputProps={{ min: 1 }}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                  />
                )}
              />

              {/* User ID */}
              <Controller
                name="userId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="User ID"
                    fullWidth
                    error={!!errors.userId}
                    helperText={errors.userId?.message ?? "Enter the User ID."}
                  />
                )}
              />

              {/* Status */}
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.status}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      {...field}
                      labelId="status-label"
                      label="Status"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="processing">Processing</MenuItem>
                      <MenuItem value="success">Success</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.status?.message ?? "Enter the status of the order."}
                    </FormHelperText>
                  </FormControl>
                )}
              />

              <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                >
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

export default AddOrder;
