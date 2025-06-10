'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import CustomersClient from "./CustomerList";
import { getCustomers } from "../../../lib/api/customer";
import { Box } from "@mui/material";

export default async function CustomersPage() {
  const session = await getServerSession(authOptions);
  const initialData = await getCustomers(session?.access_token); // Kunden abrufen

  return (
    <Box>
      <CustomersClient initialData={initialData} token={session.access_token} />
    </Box>
  );
}
