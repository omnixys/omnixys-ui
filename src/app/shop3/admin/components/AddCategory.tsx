"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "./ui/button";
import { Box, Stack } from "@mui/material";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is Required!" }),
});
type FormValues = z.infer<typeof formSchema>;

const AddCategory = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (values: FormValues) => {
    // TODO: echte Submit-Logik einfügen
    console.log("AddCategory submit:", values);
    form.reset();
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle sx={{ mb: 2 }}>Add Category</SheetTitle>
        <SheetDescription>
          <Form {...form}>
            <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Category name" />
                      </FormControl>
                      <FormDescription>Enter category name.</FormDescription>
                      <FormMessage />
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
    </SheetContent>
  );
};

export default AddCategory;
