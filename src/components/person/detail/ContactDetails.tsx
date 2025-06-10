import {
  Email,
  Phone,
  Home,
  MailOutline,
  Call,
  Chat,
  Sms,
  Drafts,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import InfoItem from "./InfoItem";
import { Person } from "../../../types/person/person.type";
import type { ContactOption } from "../../../types/person/enums";
import { JSX } from "react";

const contactOptionsMapping: Record<
  ContactOption,
  { label: string; icon: JSX.Element }
> = {
  EMAIL: { label: "E-Mail", icon: <MailOutline /> },
  PHONE: { label: "Telefon", icon: <Call /> },
  CHAT: { label: "Live-Chat", icon: <Chat /> },
  SMS: { label: "SMS", icon: <Sms /> },
  LETTER: { label: "Brief", icon: <Drafts /> },
};

export default function ContactDetails({ customer }: { customer: Person }) {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#4E3792" }}>
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
          {Array.isArray(customer?.customer?.contactOptions) &&
          customer.customer.contactOptions.length > 0 ? (
            customer.customer.contactOptions.map((option: ContactOption) => (
              <InfoItem
                key={option}
                icon={contactOptionsMapping[option]?.icon}
                label={contactOptionsMapping[option]?.label || option}
                value=""
              />
            ))
          ) : (
            <Typography variant="body2">
              Keine Kontaktoptionen hinterlegt.
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
}
