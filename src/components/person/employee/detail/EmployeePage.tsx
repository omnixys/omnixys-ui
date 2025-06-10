"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Avatar,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Edit,
  ArrowBack,
  Email,
  Phone,
  Home,
  Business,
  Work,
  CheckCircle,
  Close,
} from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import getApolloClient from "../../../../lib/apolloClient";
import { useSession } from "next-auth/react";
import { Person } from "../../../../types/person/person.type";
import LoadingSpinner from "../../detail/LoadingSpinner";
import ErrorCard from "../../detail/ErrorCard";
import InfoItem from "../../detail/InfoItem";
import { GET_EMPLOYEE_BY_ID } from "../../../../graphql/customer/query/person";

// 🔤 Hilfsfunktion
const generateAvatarInitials = (name: string = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

export default function EmployeeInspect() {
  const { id } = useParams();
  const { data: session } = useSession();
  const theme = useTheme();

  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session]
  );
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    client,
    variables: { id },
  });

  const employee: Person = data?.employee;

  if (loading) return <LoadingSpinner />;
  if (error || !employee) return <ErrorCard message={error?.message} />;

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          p: 5,
          mt: 8,
          borderRadius: 5,
          boxShadow: 6,
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {/* 👤 Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            p: 3,
            borderRadius: 2,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,

            color: (theme) => `${theme.palette.background.paper}`,
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: theme.palette.background.paper,
              color: theme.palette.secondary.main,

              mr: 3,
              fontSize: "2rem",
            }}
          >
            {generateAvatarInitials(
              `${employee.firstName} ${employee.lastName}`
            )}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {employee.firstName} {employee.lastName}
            </Typography>
            <Typography variant="subtitle1">{employee.username}</Typography>
          </Box>
        </Box>

        {/* 📄 Persönliche Daten */}
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
            >
              Persönliche Informationen
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InfoItem
                icon={<Work sx={{ color: theme.palette.primary.main }} />}
                label="Position"
                value={employee.employee?.jobTitle ?? "Unbekannt"}
              />
              <InfoItem
                icon={<Business sx={{ color: theme.palette.primary.main }} />}
                label="Abteilung"
                value={employee.employee?.department ?? "Unbekannt"}
              />
              <InfoItem
                icon={
                  employee.employee?.active ? (
                    <CheckCircle sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )
                }
                label="Aktiv"
                value={employee.employee?.active ? "Ja" : "Nein"}
              />
            </Stack>
          </Grid>

          {/* 📞 Kontaktinformationen */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
            >
              Kontaktinformationen
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InfoItem
                icon={<Email sx={{ color: theme.palette.primary.main }} />}
                label="E-Mail"
                value={employee.email}
              />
              <InfoItem
                icon={<Phone sx={{ color: theme.palette.primary.main }} />}
                label="Telefon"
                value={employee.phoneNumber}
              />
              <InfoItem
                icon={<Home sx={{ color: theme.palette.primary.main }} />}
                label="Adresse"
                value={
                  employee.address
                    ? `${employee.address.street} ${employee.address.houseNumber}, ${employee.address.zipCode} ${employee.address.city}, ${employee.address.state}, ${employee.address.country}`
                    : "Keine Adresse hinterlegt"
                }
              />
            </Stack>
          </Grid>
        </Grid>

        {/* 🔧 Aktionen */}
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            component={Link}
            href="/analytics/person"
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{
              borderColor: theme.palette.secondary.main,
              color: theme.palette.secondary.main,
            }}
          >
            Zurück zur Liste
          </Button>
          <Button
            component={Link}
            href={`/analytics/person/${employee.id}/edit?type=EMPLOYEE`}
            variant="contained"
            startIcon={<Edit />}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              "&:hover": { borderColor: theme.palette.secondary.main },
            }}
          >
            Bearbeiten
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
