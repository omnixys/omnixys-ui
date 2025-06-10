// app/person/PersonList.tsx
"use client";

import { CircularProgress, Box } from "@mui/material";
import CustomerDataGrid from "../../components/person/customer/CustomerDataGrid";
import EmployeeDataGrid from "../../components/person/employee/EmployeeDataGrid";

interface Props {
  type: "CUSTOMER" | "EMPLOYEE";
  token: string;
}

export default function PersonList({ type, token }: Props) {
  if (!token) {
    return (
      <Box py={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (type === "CUSTOMER") return <CustomerDataGrid token={token} />;
  return <EmployeeDataGrid token={token} />;
}
