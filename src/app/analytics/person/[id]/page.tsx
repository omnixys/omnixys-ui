"use client";

import { useSearchParams } from "next/navigation";
import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import CustomerInspect from "../../../../components/person/customer/detail/CustomerPage";
import EmployeeInspect from "../../../../components/person/employee/detail/EmployeePage";

export default function PersonInspectPage() {
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

  if (type === "CUSTOMER") return <CustomerInspect />;
  if (type === "EMPLOYEE") return <EmployeeInspect />;

  return (
    <Box textAlign="center" mt={4}>
      <CircularProgress sx={{ color: "#6A4BBC" }} />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Lade Profil...
      </Typography>
    </Box>
  );
}
