"use client";

import { JSX, useMemo } from "react";
import { useParams } from "next/navigation";
import { Carousel } from "antd";
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
  Chip,
  Card,
  CardContent,
  CardHeader,
  ChipProps,
  useTheme,
} from "@mui/material";
import {
  Edit,
  ArrowBack,
  Home,
  Cake,
  CheckCircle,
  Close,
  Email,
  Phone,
  Star,
  VerifiedUser,
  Male,
  Female,
  Transgender,
  People,
  Favorite,
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
  PriorityHighRounded,
} from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import getApolloClient from "../../../../lib/apolloClient";
import { useSession } from "next-auth/react";
import InfoItem from "../../detail/InfoItem";
import LoadingSpinner from "../../detail/LoadingSpinner";
import ErrorCard from "../../detail/ErrorCard";
import { Person } from "../../../../types/person/person.type";
import { CustomerState, Interest } from "../../../../types/person/enums";
import {
  ContactPerson,
  isBinaryId,
} from "../../../../types/person/contact.type";
import { GET_CUSTOMER_BY_ID } from "../../../../graphql/customer/query/person";
import { getLogger } from "../../../../utils/logger";

// 🔤 Hilfsfunktion: Avatar-Initialen
const generateAvatarInitials = (name: string = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";

function formatDate(dateString?: string | null): string {
  if (!dateString) return "Nicht angegeben";

  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
}

const contactOptionsMapping = {
  EMAIL: { label: "E-Mail", icon: <MailOutline /> },
  PHONE: { label: "Telefon", icon: <Call /> },
  CHAT: { label: "Live-Chat", icon: <Chat /> },
  SMS: { label: "SMS", icon: <Sms /> },
  LETTER: { label: "Brief", icon: <Drafts /> },
};

const tierLevels = {
  "1": { label: "Basic", icon: "🥉" },
  "2": { label: "Elite", icon: "🥈" },
  "3": { label: "Supreme", icon: "🥇" },
};

const customerStates: Record<
  CustomerState,
  { label: string; color: ChipProps["color"] }
> = {
  ACTIVE: { label: "🟢 Aktiv", color: "success" },
  BLOCKED: { label: "🔴 Blockiert", color: "error" },
  INACTIVE: { label: "🟠 Inaktiv", color: "warning" },
  CLOSED: { label: "⚪ Geschlossen", color: "default" },
  PENDING: { label: "🔵 Ausstehend", color: "info" },
  SUSPENDED: { label: "🟣 Suspendiert", color: "secondary" },
};

const interestsMapping: Record<
  Interest,
  { label: string; icon: JSX.Element; color: ChipProps["color"] }
> = {
  INVESTMENTS: { label: "Investitionen", icon: <Savings />, color: "success" },
  SAVING_AND_FINANCE: {
    label: "Sparen & Finanzen",
    icon: <CorporateFare />,
    color: "warning",
  },
  CREDIT_AND_DEBT: {
    label: "Kredit & Schulden",
    icon: <Business />,
    color: "error",
  },
  BANK_PRODUCTS_AND_SERVICES: {
    label: "Bankprodukte",
    icon: <CorporateFare />,
    color: "info",
  },
  FINANCIAL_EDUCATION_AND_COUNSELING: {
    label: "Finanzbildung",
    icon: <School />,
    color: "primary",
  },
  REAL_ESTATE: { label: "Immobilien", icon: <Home />, color: "success" },
  INSURANCE: {
    label: "Versicherungen",
    icon: <VerifiedUser />,
    color: "secondary",
  },
  SUSTAINABLE_FINANCE: {
    label: "Nachhaltige Finanzen",
    icon: <TravelExplore />,
    color: "info",
  },
  TECHNOLOGY_AND_INNOVATION: {
    label: "Technologie & Innovation",
    icon: <TravelExplore />,
    color: "warning",
  },
  TRAVEL: { label: "Reisen", icon: <TravelExplore />, color: "success" },
};

// 🧠 Hauptkomponente
export default function CustomerInspect() {
     const logger = getLogger(CustomerInspect.name);
  const { id } = useParams();
  const theme = useTheme();
  const { data: session } = useSession();
  const client = useMemo(
    () => getApolloClient(session?.access_token),
    [session]
  );
  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id },
  });

  const customer: Person = data?.customer;
  logger.debug('customer=%o', customer);

  if (loading) return <LoadingSpinner />;
  if (error || !customer) return <ErrorCard message={error?.message} />;

  // 🎨 Mapping-Konstanten (könnten ausgelagert werden)
  const genderMapping = {
    MALE: {
      label: "Männlich",
      icon: <Male sx={{ color: theme.palette.primary.main }} />,
    },
    FEMALE: {
      label: "Weiblich",
      icon: <Female sx={{ color: theme.palette.primary.main }} />,
    },
    NON_BINARY: {
      label: "Nicht-binär",
      icon: <Transgender sx={{ color: theme.palette.primary.main }} />,
    },
    OTHER: {
      label: "Andere",
      icon: <People sx={{ color: theme.palette.primary.main }} />,
    },
  };

  const maritalStatusMapping = {
    SINGLE: {
      label: "Ledig",
      icon: <FavoriteBorder sx={{ color: theme.palette.primary.main }} />,
    },
    MARRIED: {
      label: "Verheiratet",
      icon: <Favorite sx={{ color: theme.palette.primary.main }} />,
    },
    DIVORCED: {
      label: "Geschieden",
      icon: <Close sx={{ color: theme.palette.primary.main }} />,
    },
    WIDOWED: {
      label: "Verwitwet",
      icon: <People sx={{ color: theme.palette.primary.main }} />,
    },
  };

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          p: 5,
          mt: 8,
          borderRadius: 5,
          boxShadow: 6,
          backgroundColor: theme.palette.background.default,
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
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: theme.palette.getContrastText(theme.palette.primary.main),
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
              `${customer.firstName} ${customer.lastName}`
            )}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {customer.firstName} {customer.lastName}
            </Typography>
            <Typography variant="subtitle1">{customer.username}</Typography>
          </Box>
        </Box>

        {/* 📄 Persönliche Daten & Kontakt */}
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
                icon={<Cake sx={{ color: theme.palette.primary.main }} />}
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
                  maritalStatusMapping[customer.customer!.maritalStatus]?.icon
                }
                label="Ehestand"
                value={
                  maritalStatusMapping[customer.customer!.maritalStatus]
                    ?.label || customer.customer!.maritalStatus
                }
              />
              <InfoItem
                icon={<Star sx={{ color: theme.palette.primary.main }} />}
                label="Mitgliedschaft"
                value={`${tierLevels[customer.customer!.tierLevel]?.icon} ${tierLevels[customer.customer!.tierLevel]?.label}`}
              />
              <InfoItem
                icon={
                  customer.customer!.subscribed ? (
                    <CheckCircle sx={{ color: "green" }} />
                  ) : (
                    <Close sx={{ color: "red" }} />
                  )
                }
                label="Abonniert"
                value={customer.customer!.subscribed ? "Ja" : "Nein"}
              />
              <Box display="flex" alignItems="center">
                <VerifiedUser
                  sx={{ color: theme.palette.primary.main, mr: 1 }}
                />
                <Chip
                  label={
                    customerStates[customer.customer!.customerState]?.label
                  }
                  color={
                    customerStates[customer.customer!.customerState]?.color
                  }
                />
              </Box>
            </Stack>
          </Grid>

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
                label="Email"
                value={customer.email}
              />
              <InfoItem
                icon={<Phone sx={{ color: theme.palette.primary.main }} />}
                label="Telefon"
                value={customer.phoneNumber}
              />
              <InfoItem
                icon={<Home sx={{ color: theme.palette.primary.main }} />}
                label="Adresse"
                value={`${customer.address?.street} ${customer.address?.houseNumber}, ${customer.address?.zipCode} ${customer.address?.city}, ${customer.address?.state}, ${customer.address?.country}`}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Kontaktoptionen
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                {customer.customer!.contactOptions?.length > 0 ? (
                  customer.customer!.contactOptions.map((option) => (
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

        {/* 🧠 Interessen */}
        <Divider sx={{ my: 3 }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}
        >
          Interessen
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Array.isArray(customer.customer?.interests) &&
          customer.customer.interests.length > 0 ? (
            customer.customer.interests.map((interest) => (
              <Grid key={interest}>
                <Chip
                  label={interestsMapping[interest]?.label || interest}
                  icon={interestsMapping[interest]?.icon}
                  color={interestsMapping[interest]?.color || "default"}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Keine Interessen hinterlegt.
            </Typography>
          )}
        </Grid>

        {/* 👥 Kontaktpersonen */}
        <Divider sx={{ my: 3 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: theme.palette.secondary.main,
            mb: 2,
          }}
        >
          Kontaktpersonen
        </Typography>
        {customer?.customer?.contacts?.length ? (
          <Carousel
            arrows
            autoplay
            autoplaySpeed={3000}
            dotPosition="bottom"
            infinite
            slidesToShow={Math.min(4, customer.customer.contacts.length)}
            slidesToScroll={1}
            responsive={[
              { breakpoint: 1024, settings: { slidesToShow: 4 } },
              { breakpoint: 768, settings: { slidesToShow: 2 } },
              { breakpoint: 480, settings: { slidesToShow: 1 } },
            ]}
          >
            {customer.customer.contacts.map((contact: ContactPerson) => (
              <div
                key={
                  isBinaryId(contact._id)
                    ? contact._id.$binary.base64
                    : contact._id
                }
              >
                <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 3,
                      maxWidth: 250,
                      border: contact.emergencyContact
                        ? `2px solid ${theme.palette.background.default}` // Rot laut Omnixys-Farbpalette
                        : "none",
                      backgroundColor: contact.emergencyContact
                        ? theme.palette.background.default
                        : theme.palette.background.paper,
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.secondary.main,
                          }}
                        >
                          {generateAvatarInitials(
                            `${contact.firstName} ${contact.lastName}`
                          )}
                        </Avatar>
                      }
                      title={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                              color: theme.palette.secondary.main,
                            }}
                          >
                            {contact.firstName} {contact.lastName}
                          </Typography>
                          {contact.emergencyContact && (
                            <Box component="span" ml={1} title="Notfallkontakt">
                              <PriorityHighRounded
                                sx={{ color: theme.palette.error.light }}
                              />
                            </Box>
                          )}
                        </Box>
                      }
                      subheader={
                        contact.relationship
                          ? `Beziehung: ${contact.relationship}`
                          : ""
                      }
                    />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        Start: {formatDate(contact.startDate)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Ende: {formatDate(contact.endDate)}
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
            href={`/analytics/person/${customer.id}/edit`}
            variant="contained"
            startIcon={<Edit />}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
          >
            Bearbeiten
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
