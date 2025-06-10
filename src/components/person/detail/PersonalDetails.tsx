import { Stack, Typography, Box, Chip } from "@mui/material";
import {
  Cake,
  CheckCircle,
  Close,
  Star,
  VerifiedUser,
  Male,
  Female,
  Transgender,
  People,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import type {
  Gender,
  MaritalStatus,
  TierLevel,
  CustomerState,
} from "../../../types/person/enums";
import { Person } from "../../../types/person/person.type";
import { JSX } from "react";
import InfoItem from "./InfoItem";

// 🎨 Mappings mit vollständiger Typabdeckung
const genderMapping: Record<Gender, { label: string; icon: JSX.Element }> = {
  MALE: { label: "Männlich", icon: <Male sx={{ color: "#6A4BBC" }} /> },
  FEMALE: { label: "Weiblich", icon: <Female sx={{ color: "#6A4BBC" }} /> },
  NON_BINARY: {
    label: "Nicht-binär",
    icon: <Transgender sx={{ color: "#6A4BBC" }} />,
  },
  OTHER: { label: "Andere", icon: <People sx={{ color: "#6A4BBC" }} /> },
};

const maritalStatusMapping: Record<
  MaritalStatus,
  { label: string; icon: JSX.Element }
> = {
  SINGLE: {
    label: "Ledig",
    icon: <FavoriteBorder sx={{ color: "#6A4BBC" }} />,
  },
  MARRIED: {
    label: "Verheiratet",
    icon: <Favorite sx={{ color: "#6A4BBC" }} />,
  },
  DIVORCED: {
    label: "Geschieden",
    icon: <Close sx={{ color: "#6A4BBC" }} />,
  },
  WIDOWED: {
    label: "Verwitwet",
    icon: <People sx={{ color: "#6A4BBC" }} />,
  },
};

const tierLevels: Record<TierLevel, { label: string; icon: string }> = {
  1: { label: "Basic", icon: "🥉" },
  2: { label: "Elite", icon: "🥈" },
  3: { label: "Supreme", icon: "🥇" },
};

const customerStates: Record<
  CustomerState,
  {
    label: string;
    color: "success" | "error" | "warning" | "default" | "info" | "secondary";
  }
> = {
  ACTIVE: { label: "🟢 Aktiv", color: "success" },
  BLOCKED: { label: "🔴 Blockiert", color: "error" },
  INACTIVE: { label: "🟠 Inaktiv", color: "warning" },
  CLOSED: { label: "⚪ Geschlossen", color: "default" },
  PENDING: { label: "🔵 Ausstehend", color: "info" },
  SUSPENDED: { label: "🟣 Suspendiert", color: "secondary" },
};

// 🧠 Komponente ohne any
export default function PersonalDetails({ customer }: { customer: Person }) {
  const { birthdate, gender, customer: customerData } = customer;

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4E3792" }}>
        Persönliche Informationen
      </Typography>
      <Stack spacing={1} sx={{ mt: 2 }}>
        <InfoItem
          icon={<Cake sx={{ color: "#6A4BBC" }} />}
          label="Geburtsdatum"
          value={new Date(birthdate).toLocaleDateString()}
        />
        <InfoItem
          icon={genderMapping[gender].icon}
          label="Geschlecht"
          value={genderMapping[gender].label}
        />
        <InfoItem
          icon={maritalStatusMapping[customerData!.maritalStatus].icon}
          label="Ehestand"
          value={maritalStatusMapping[customerData!.maritalStatus].label}
        />
        <InfoItem
          icon={<Star sx={{ color: "#6A4BBC" }} />}
          label="Mitgliedschaft"
          value={`${tierLevels[customerData!.tierLevel].icon} ${tierLevels[customerData!.tierLevel].label}`}
        />
        <InfoItem
          icon={
            customerData!.subscribed ? (
              <CheckCircle sx={{ color: "green" }} />
            ) : (
              <Close sx={{ color: "red" }} />
            )
          }
          label="Abonniert"
          value={customerData!.subscribed ? "Ja" : "Nein"}
        />
        <Box display="flex" alignItems="center">
          <VerifiedUser sx={{ color: "#6A4BBC", mr: 1 }} />
          <Chip
            label={customerStates[customerData!.customerState].label}
            color={customerStates[customerData!.customerState].color}
          />
        </Box>
      </Stack>
    </>
  );
}
