"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Carousel } from "antd";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Divider,
  Avatar,
  Grid,
  Stack,
  Chip,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  Edit,
  ArrowBack,
  Home,
  Cake,
  CheckCircle,
  Close,
  Email,
  Favorite,
  Phone,
  Star,
  VerifiedUser,
  Male,
  Female,
  Transgender,
  People,
  FavoriteBorder,
  MailOutline,
  Call,
  Chat,
  Sms,
  Drafts,
  Business,
  CorporateFare,
  Savings,
  School,
  TravelExplore,
} from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import getApolloClient from "../../../../lib/apolloClient";
import { GET_CUSTOMER_BY_ID } from "../../../../graphql/customer/query/customer";
import { useSession } from "next-auth/react";

// Hilfsfunktion: Avatar-Initialen generieren
const generateAvatarInitials = (name) => {
  if (!name) return "U";
  const parts = name.split(" ");
  return parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : `${parts[0][0]}`.toUpperCase();
};

// Mapping-Objekte
const genderMapping = {
  MALE: {
    label: "Männlich",
    icon: <Male sx={{ color: "#6A4BBC" }} />,
    color: "#0077b6",
  },
  FEMALE: {
    label: "Weiblich",
    icon: <Female sx={{ color: "#6A4BBC" }} />,
    color: "#d63384",
  },
  NON_BINARY: {
    label: "Nicht-binär",
    icon: <Transgender sx={{ color: "#6A4BBC" }} />,
    color: "#6c757d",
  },
  OTHER: {
    label: "Andere",
    icon: <People sx={{ color: "#6A4BBC" }} />,
    color: "#6A4BBC",
  },
};

const maritalStatusMapping = {
  SINGLE: {
    label: "Ledig",
    icon: <FavoriteBorder sx={{ color: "#6A4BBC" }} />,
    color: "info",
  },
  MARRIED: {
    label: "Verheiratet",
    icon: <Favorite sx={{ color: "#6A4BBC" }} />,
    color: "success",
  },
  DIVORCED: {
    label: "Geschieden",
    icon: <Close sx={{ color: "#6A4BBC" }} />,
    color: "error",
  },
  WIDOWED: {
    label: "Verwitwet",
    icon: <People sx={{ color: "#6A4BBC" }} />,
    color: "warning",
  },
};

const contactOptionsMapping = {
  EMAIL: { label: "E-Mail", icon: <MailOutline />, color: "primary" },
  PHONE: { label: "Telefon", icon: <Call />, color: "success" },
  CHAT: { label: "Live-Chat", icon: <Chat />, color: "secondary" },
  SMS: { label: "SMS", icon: <Sms />, color: "info" },
  LETTER: { label: "Brief", icon: <Drafts />, color: "warning" },
};

const tierLevels = {
  "1": { label: "Basic", color: "#C0C0C0", icon: "🥉" },
  "2": { label: "Elite", color: "#FFD700", icon: "🥈" },
  "3": { label: "Supreme", color: "#E5E4E2", icon: "🥇" },
};

const customerStates = {
  ACTIVE: { label: "🟢 Aktiv", color: "success" },
  BLOCKED: { label: "🔴 Blockiert", color: "error" },
  INACTIVE: { label: "🟠 Inaktiv", color: "warning" },
  CLOSED: { label: "⚪ Geschlossen", color: "default" },
  PENDING: { label: "🔵 Ausstehend", color: "info" },
  SUSPENDED: { label: "🟣 Suspendiert", color: "secondary" },
};

const interestsMapping = {
  INVESTMENTS: { label: "Investitionen", icon: <Savings />, color: "success" },
  SAVING_AND_FINANCE: { label: "Sparen & Finanzen", icon: <CorporateFare />, color: "warning" },
  CREDIT_AND_DEBT: { label: "Kredit & Schulden", icon: <Business />, color: "error" },
  BANK_PRODUCTS_AND_SERVICES: { label: "Bankprodukte", icon: <CorporateFare />, color: "info" },
  FINANCIAL_EDUCATION_AND_COUNSELING: { label: "Finanzbildung", icon: <School />, color: "primary" },
  REAL_ESTATE: { label: "Immobilien", icon: <Home />, color: "success" },
  INSURANCE: { label: "Versicherungen", icon: <VerifiedUser />, color: "secondary" },
  SUSTAINABLE_FINANCE: { label: "Nachhaltige Finanzen", icon: <TravelExplore />, color: "info" },
  TECHNOLOGY_AND_INNOVATION: { label: "Technologie & Innovation", icon: <TravelExplore />, color: "warning" },
  TRAVEL: { label: "Reisen", icon: <TravelExplore />, color: "success" },
};

// Wiederverwendbare Komponente für Informationszeilen
const InfoItem = ({ icon, label, value }) => (
  <Box display="flex" alignItems="center">
    {icon && <Box mr={1}>{icon}</Box>}
    <Typography variant="body2">
      <strong>{label}:</strong> {value}
    </Typography>
  </Box>
);

export default function CustomerInspect() {
  const { id } = useParams();
  const { data: session } = useSession();
  const client = useMemo(
    () =>
      session
        ? getApolloClient(session.access_token)
        : getApolloClient(undefined),
    [session]
  );
  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id },
  });

  const customer = data?.customer;

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "#6A4BBC" }} />
      </Box>
    );
  }

  if (error || !customer) {
    return (
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: 5,
            mt: 8,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <Typography variant="h5" color="error" sx={{ fontWeight: "bold" }}>
            {error
              ? "Fehler beim Laden der Kundendaten"
              : "Kunde nicht gefunden"}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "#6A4BBC" }}>
            {error
              ? "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut."
              : "Der gesuchte Kunde existiert nicht oder wurde entfernt."}
          </Typography>
          <Button
            component={Link}
            href="/analytics/customers"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#6A4BBC",
              "&:hover": { backgroundColor: "#4E3792" },
            }}
          >
            Zurück zur Kundenliste
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          p: 5,
          mt: 8,
          borderRadius: 5,
          boxShadow: 6,
          backgroundColor: "#FAFAFC",
          overflowY: "auto",
          //height: 500
        }}
      >
        {/* Header mit kreativem Farbverlauf */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            p: 3,
            borderRadius: 2,
            background: "linear-gradient(135deg, #6A4BBC 0%, #4E3792 100%)",
            color: "#fff",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#fff",
              color: "#4E3792",
              mr: 3,
              fontSize: "2rem",
            }}
          >
            {generateAvatarInitials(
              `${customer.firstName} ${customer.lastName}`
            )}
          </Avatar>
          {/* <AccountCircle sx={{ fontSize: 50, color: "white" }} /> */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography variant="subtitle1">{customer.username}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          {/* Persönliche Informationen */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#4E3792" }}
            >
              Persönliche Informationen
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InfoItem
                icon={<Cake sx={{ color: "#6A4BBC" }} />}
                label="Geburtsdatum"
                value={new Date(customer.birthdate).toLocaleDateString()}
              />
              <InfoItem
                icon={genderMapping[customer.gender]?.icon}
                label="Geschlecht"
                value={genderMapping[customer.gender]?.label || customer.gender}
              />
              <InfoItem
                icon={
                  maritalStatusMapping[customer.customer.maritalStatus]?.icon
                }
                label="Ehestand"
                value={
                  maritalStatusMapping[customer.customer.maritalStatus]
                    ?.label || customer.customer.maritalStatus
                }
              />
              <InfoItem
                icon={<Star sx={{ color: "#6A4BBC" }} />}
                label="Mitgliedschaft"
                value={`${tierLevels[customer.customer.tierLevel]?.icon} ${tierLevels[customer.customer.tierLevel]?.label}`}
              />
              <InfoItem
                icon={
                  customer.customer.subscribed ? (
                    <CheckCircle sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )
                }
                label="Abonniert"
                value={customer.customer.subscribed ? "Ja" : "Nein"}
              />
              <Box display="flex" alignItems="center">
                <VerifiedUser sx={{ color: "#6A4BBC", mr: 1 }} />
                <Chip
                  label={customerStates[customer.customer.customerState]?.label}
                  color={customerStates[customer.customer.customerState]?.color}
                />
              </Box>
            </Stack>
          </Grid>

          {/* Kontaktinformationen */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#4E3792" }}
            >
              Kontaktinformationen
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InfoItem
                icon={<Email sx={{ color: "#6A4BBC" }} />}
                label="Email"
                value={customer.email}
              />
              <InfoItem
                icon={<Phone sx={{ color: "#6A4BBC" }} />}
                label="Telefon"
                value={customer.phoneNumber}
              />
              <InfoItem
                icon={<Home sx={{ color: "#6A4BBC" }} />}
                label="Adresse"
                value={`${customer.address?.street} ${customer.address?.houseNumber}, ${customer.address?.zipCode} ${customer.address?.city}, ${customer.address?.state}, ${customer.address?.country}`}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Kontaktoptionen
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                {customer.customer?.contactOptions?.length > 0 ? (
                  customer.customer.contactOptions.map((option) => (
                    <Chip
                      key={option}
                      label={contactOptionsMapping[option]?.label || option}
                      icon={contactOptionsMapping[option]?.icon}
                    />
                  ))
                ) : (
                  <Typography variant="body2">
                    Keine Kontaktoptionen hinterlegt.
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Interessen */}
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4E3792" }}>
          Interessen
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {customer.customer.interests?.length > 0 ? (
            customer.customer.interests.map((interest) => (
              <Grid item key={interest}>
                <Chip
                  label={interestsMapping[interest]?.label || interest}
                  icon={interestsMapping[interest]?.icon}
                  color={interestsMapping[interest]?.color}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Keine Interessen hinterlegt.
            </Typography>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Kontaktpersonen als Ant Design Carousel */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#4E3792", mb: 2 }}
        >
          Kontaktpersonen
        </Typography>
        {customer?.customer?.contactIds?.length ? (
          <Carousel
            arrows
            autoplay
            autoplaySpeed={3000}
            dotPosition="bottom"
            infinite
            slidesToShow={
              customer?.customer?.contactIds?.length > 4
                ? 4
                : customer?.customer?.contactIds?.length
            } // Zeigt immer 4 Kontakte gleichzeitig
            slidesToScroll={1} // Scrollt 1 Kontakt nach links beim Weiterklicken
            responsive={[
              {
                breakpoint: 1024, // Desktop
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 768, // Tablet
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
              {
                breakpoint: 480, // Mobile
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                },
              },
            ]}
          >
            {customer.customer.contactIds.map((contact) => (
              <div key={contact._id?.$binary?.base64 || contact._id}>
                <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                  <Card sx={{ borderRadius: 3, boxShadow: 3, maxWidth: 250 }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#4E3792", color: "#fff" }}>
                          {generateAvatarInitials(
                            `${contact.firstName} ${contact.lastName}`
                          )}
                        </Avatar>
                      }
                      title={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", color: "#4E3792" }}
                        >
                          {contact.firstName} {contact.lastName}
                        </Typography>
                      }
                      subheader={
                        contact.relationship
                          ? `Beziehung: ${contact.relationship}`
                          : ""
                      }
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Start:{" "}
                        {contact.startDate?.$date
                          ? new Date(
                              contact.startDate.$date
                            ).toLocaleDateString()
                          : "Nicht angegeben"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Ende:{" "}
                        {contact.endDate?.$date
                          ? new Date(contact.endDate.$date).toLocaleDateString()
                          : "Nicht angegeben"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </div>
            ))}
          </Carousel>
        ) : (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Keine Kontaktpersonen hinterlegt.
          </Typography>
        )}

        <Divider sx={{ my: 4 }} />

        {/* Aktionen */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            component={Link}
            href="/analytics/customers"
            variant="outlined"
            startIcon={<ArrowBack />}
            sx={{ borderColor: "#4E3792", color: "#4E3792" }}
          >
            Zurück zur Liste
          </Button>
          <Button
            component={Link}
            href={`/analytics/customers/${customer.id}/edit`}
            variant="contained"
            startIcon={<Edit />}
            sx={{
              backgroundColor: "#6A4BBC",
              "&:hover": { backgroundColor: "#4E3792" },
            }}
          >
            Bearbeiten
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
