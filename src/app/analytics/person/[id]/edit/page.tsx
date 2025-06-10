"use client";

import { useSearchParams } from "next/navigation";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomerEditPage from "../../../../../components/person/customer/edit/CustomerPage";
import EmployeeEditPage from "../../../../../components/person/employee/edit/EmployeeEditPage";

export default function PersonEditWrapper() {
  const searchParams = useSearchParams();
  const [type, setType] = useState<"CUSTOMER" | "EMPLOYEE" | null>(null);

  useEffect(() => {
    const rawType = searchParams.get("type");
    if (rawType === "CUSTOMER" || rawType === "EMPLOYEE") {
      setType(rawType);
    } else {
      setType(null);
    }
  }, [searchParams]);

  if (!type) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        Ungültiger oder fehlender Typ. Erwarte <code>?type=CUSTOMER</code> oder{" "}
        <code>?type=EMPLOYEE</code>.
      </Alert>
    );
  }

  if (type === "CUSTOMER") return <CustomerEditPage />;
  if (type === "EMPLOYEE") return <EmployeeEditPage />;

  return (
    <Box textAlign="center" mt={4}>
      <CircularProgress sx={{ color: "#6A4BBC" }} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Lade Editor...
      </Typography>
    </Box>
  );
}
