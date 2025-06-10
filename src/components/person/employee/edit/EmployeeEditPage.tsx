"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  MenuItem,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import getApolloClient from "../../../../lib/apolloClient";
import AddressForm from "../../edit/AddressForm";
import { GET_EMPLOYEE_BY_ID } from "../../../../graphql/customer/query/person";
import { UPDATE_EMPLOYEE } from "../../../../graphql/customer/mutation/update";
import { EmployeeFormState } from "../../../../types/person/CustomerFormData";

export default function EmployeeEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session?.access_token]
  );

  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    client,
    variables: { id },
  });

  const [updateEmployee, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_EMPLOYEE, { client });

  const [formState, setFormState] = useState<EmployeeFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "STAFF",
    position: "",
    department: "",
    isExternal: false,
    hireDate: "",
    salary: 0,
    jobTitle: "",
    active: true,
    address: {
      street: "",
      houseNumber: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
    },
    version: "",
  });

  useEffect(() => {
    if (!data?.employee) return;
    const {
      firstName = "",
      lastName = "",
      email = "",
      phoneNumber = "",
      role = "STAFF",
      position = "",
      department = "",
      isExternal = false,
      hireDate = "",
      salary = 0,
      jobTitle = "",
      active = true,
      address = {},
      version = "",
    } = data.employee;

    setFormState({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      position,
      department,
      isExternal,
      hireDate,
      salary,
      jobTitle,
      active,
      address: {
        street: address.street ?? "",
        houseNumber: address.houseNumber ?? "",
        zipCode: address.zipCode ?? "",
        city: address.city ?? "",
        state: address.state ?? "",
        country: address.country ?? "",
      },
      version,
    });
  }, [data]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { version, ...input } = formState;
    try {
      await updateEmployee({ variables: { id, input, version } });
      router.push(`/analytics/person/${id}`);
    } catch (err) {
      console.error("Update fehlgeschlagen:", err);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "#6A4BBC" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper
          sx={{ p: 5, textAlign: "center", borderRadius: 3, boxShadow: 4 }}
        >
          <Typography variant="h5" color="error" sx={{ fontWeight: "bold" }}>
            Fehler beim Laden der Mitarbeiterdaten
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.
          </Typography>
          <Button
            component={Link}
            href="/analytics/person"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Zurück zur Liste
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
              color: "#1c2b39",
            }}
          >
            Mitarbeiter bearbeiten
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Vorname"
                  value={formState.firstName}
                  onChange={(e) =>
                    setFormState({ ...formState, firstName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nachname"
                  value={formState.lastName}
                  onChange={(e) =>
                    setFormState({ ...formState, lastName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Telefonnummer"
                  value={formState.phoneNumber}
                  onChange={(e) =>
                    setFormState({ ...formState, phoneNumber: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Abteilung"
                  value={formState.department}
                  onChange={(e) =>
                    setFormState({ ...formState, department: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Position"
                  value={formState.jobTitle}
                  onChange={(e) =>
                    setFormState({ ...formState, jobTitle: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Position"
                  value={formState.position}
                  onChange={(e) =>
                    setFormState({ ...formState, position: e.target.value })
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Rolle"
                  select
                  value={formState.role}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      role: e.target.value as EmployeeFormState["role"],
                    })
                  }
                  fullWidth
                >
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="MANAGER">Manager</MenuItem>
                  <MenuItem value="STAFF">Mitarbeiter</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Eintrittsdatum"
                  type="date"
                  value={formState.hireDate}
                  onChange={(e) =>
                    setFormState({ ...formState, hireDate: e.target.value })
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Gehalt (EUR)"
                  type="number"
                  value={formState.salary}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      salary: Number(e.target.value),
                    })
                  }
                  fullWidth
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.isExternal}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          isExternal: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Externer Mitarbeiter"
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formState.active}
                      onChange={(e) =>
                        setFormState({ ...formState, active: e.target.checked })
                      }
                    />
                  }
                  label="Aktiv"
                />
              </Grid>

              <AddressForm
                address={formState.address}
                onChange={handleAddressChange}
              />

              {updateError && (
                <Grid size={{ xs: 12 }}>
                  <Alert severity="error">{updateError.message}</Alert>
                </Grid>
              )}

              <Grid size={{ xs: 12 }} sx={{ textAlign: "center", mt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    component={Link}
                    href={`/analytics/person/${id}?type=EMPLOYEE`}
                    variant="outlined"
                  >
                    Abbrechen
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#1c2b39",
                      "&:hover": { backgroundColor: "#162029" },
                      px: 4,
                      py: 1.5,
                    }}
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <CircularProgress size={24} sx={{ color: "#ffffff" }} />
                    ) : (
                      "Speichern"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
