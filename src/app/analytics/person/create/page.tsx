"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import getApolloClient from "../../../../lib/apolloClient";
import { CREATE_CUSTOMER } from "../../../../graphql/customer/mutation/create";
import { VisibilityOff, Visibility } from "@mui/icons-material";

// Optionen für Auswahlfelder und Mehrfachauswahlen
const tierLevelOptions = [
  { value: 1, label: "Basic" },
  { value: 2, label: "Elite" },
  { value: 3, label: "Supreme" },
];

const genderOptions = [
  { value: "MALE", label: "Männlich" },
  { value: "FEMALE", label: "Weiblich" },
  { value: "DIVERSE", label: "Divers" },
];

const maritalStatusOptions = [
  { value: "SINGLE", label: "Ledig" },
  { value: "MARRIED", label: "Verheiratet" },
  { value: "DIVORCED", label: "Geschieden" },
  { value: "WIDOWED", label: "Verwitwet" },
];

const contactOptionsOptions = ["EMAIL", "PHONE", "LETTER", "SMS"];

const interestOptions = [
  "INVESTMENTS",
  "SAVING_AND_FINANCE",
  "CREDIT_AND_DEBT",
  "BANK_PRODUCTS_AND_SERVICES",
  "FINANCIAL_EDUCATION_AND_COUNSELING",
  "REAL_ESTATE",
  "INSURANCE",
  "SUSTAINABLE_FINANCE",
  "TECHNOLOGY_AND_INNOVATION",
  "TRAVEL",
];

/**
 * CreateCustomerPage-Komponente
 *
 * Diese Komponente stellt ein Formular zur Erstellung eines neuen Kunden bereit.
 * Es werden sämtliche erforderliche Daten (inklusive Adresse, Kontaktoptionen,
 * Interessen etc.) abgefragt, die für die Erstellung eines Kunden im GentleCorp-System
 * benötigt werden. Nach erfolgreicher Erstellung wird der Benutzer zur Detailseite des
 * neuen Kunden weitergeleitet.
 *
 * @component
 * @returns {JSX.Element} Die Benutzeroberfläche zur Erstellung eines neuen Kunden.
 */
export default function CreateCustomerPage() {
  const router = useRouter();
  const client = getApolloClient(undefined);

  const [formData, setFormData] = useState<FormDataPerson>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthdate: "",
    gender: "MALE",
    address: {
      street: "",
      houseNumber: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
    },
    username: "",
    password: "",
    tierLevel: 1,
    subscribed: false,
    maritalStatus: "SINGLE",
    contactOptions: [],
    interests: [],
  });

  // Mutation-Hook zur Erstellung eines neuen Kunden
  const [createCustomer, { loading, error }] = useMutation(CREATE_CUSTOMER, {
    client,
  });

  /**
   * Handler für den Formular-Submit.
   * Führt die Erstellung eines neuen Kunden durch und leitet bei Erfolg zur Detailseite weiter.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Das Submit-Event des Formulars.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Bitte fülle alle erforderlichen Felder aus.");
      return;
    }

    if (loading) return <Box>Hallo</Box>;

    try {
      const { data } = await createCustomer({
        variables: {
          input: {
            personInput: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              birthdate: formData.birthdate,
              gender: formData.gender,
            },
            customerInput: {
              tierLevel: formData.tierLevel,
              subscribed: formData.subscribed,
              maritalStatus: formData.maritalStatus,
              contactOptions: formData.contactOptions,
              interests: formData.interests,
            },
            userInput: {
              username: formData.username,
              password: formData.password,
            },
          },
        },
      });

      console.log("✅ Kunde erfolgreich erstellt:", data.createCustomer);
      alert("Kunde erfolgreich erstellt!");
      if (data && data.createCustomer && data.createCustomer.id) {
        router.push(`/analytics/customers/${data.createCustomer.id}`);
      }
    } catch (error) {
      console.error("❌ Fehler beim Erstellen des Kunden:", error);
      alert("Fehler beim Erstellen des Kunden.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  /**
   * Handler für Änderungen an Adressfeldern.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Das Änderungsereignis eines Adressfeldes.
   */
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#1c2b39" }}
        >
          Neuer Kunde erstellen
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <TextField
                label="Vorname"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Nachname"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                fullWidth
                required
              />
            </Box>
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Telefonnummer"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Geburtsdatum"
              type="date"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="gender-label">Geschlecht</InputLabel>
                <Select
                  labelId="gender-label"
                  required
                  label="Geschlecht"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="marital-status-label">Ehestand</InputLabel>
                <Select
                  labelId="marital-status-label"
                  label="Ehestand"
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, maritalStatus: e.target.value })
                  }
                  required
                >
                  {maritalStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="tier-level-label">
                  Mitgliedschaftsstufe
                </InputLabel>
                <Select
                  labelId="tier-level-label"
                  value={formData.tierLevel}
                  label="Mitgliedschaftsstufe"
                  onChange={(e) =>
                    setFormData({ ...formData, tierLevel: e.target.value })
                  }
                  required
                >
                  {tierLevelOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.subscribed}
                    onChange={(e) =>
                      setFormData({ ...formData, subscribed: e.target.checked })
                    }
                  />
                }
                label="Abonniert"
              />
            </Box>

            <TextField
              label="Benutzername"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              fullWidth
              required
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="gender-label">Geschlecht</InputLabel>
                <Select
                  labelId="gender-label"
                  required
                  label="Geschlecht"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="marital-status-label">Ehestand</InputLabel>
                <Select
                  labelId="marital-status-label"
                  label="Ehestand"
                  value={formData.maritalStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, maritalStatus: e.target.value })
                  }
                  required
                >
                  {maritalStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Adresse
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 2,
                }}
              >
                <TextField
                  label="Straße"
                  name="street"
                  value={formData.address.street}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Hausnummer"
                  name="houseNumber"
                  value={formData.address.houseNumber}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="PLZ"
                  name="zipCode"
                  value={formData.address.zipCode}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Stadt"
                  name="city"
                  value={formData.address.city}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Bundesland"
                  name="state"
                  value={formData.address.state}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Land"
                  name="country"
                  value={formData.address.country}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="contact-options-label">
                  Kontaktoptionen
                </InputLabel>
                <Select
                  labelId="contact-options-label"
                  multiple
                  required
                  label="Kontaktoptionen"
                  value={formData.contactOptions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactOptions: e.target.value as string[],
                    })
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {contactOptionsOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="interests-label">Interessen</InputLabel>
                <Select
                  labelId="interests-label"
                  multiple
                  required
                  label="Interessen"
                  value={formData.interests}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interests: e.target.value as string[],
                     })
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {interestOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {error && (
              <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                Fehler: {error.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#6A4BBC",
                "&:hover": { backgroundColor: "#4E3792" },
              }}
            >
              Kunde erstellen
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

interface Address {
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
}

interface FormDataPerson {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate: string;
  gender: "MALE" | "FEMALE" | "DIVERSE";
  address: Address;
  username: string;
  password: string;
  tierLevel: 1 | 2 | 3;
  subscribed: boolean;
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  contactOptions: string[]; // Optional: genauer typisieren mit Union
  interests: string[];
}