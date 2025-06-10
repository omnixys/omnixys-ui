"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Chip,
  Grid,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import getApolloClient from "../../../../../lib/apolloClient";
import { GET_CUSTOMER_BY_ID } from "../../../../../graphql/customer/query/customer";
import { UPDATE_CUSTOMER } from "../../../../../graphql/customer/mutation/update";

// Optionen für Auswahlfelder
const maritalStatusOptions = ["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"];
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
const tierLevelOptions = [
  { value: 1, label: "Basic" },
  { value: 2, label: "Elite" },
  { value: 3, label: "Supreme" },
];

/**
 * CustomerEdit-Komponente (seriös, innovativ und kreativ)
 *
 * Diese Komponente bietet eine Oberfläche zur Bearbeitung von Kundendaten.
 * Das Layout ist in zwei Bereiche unterteilt: 
 * - Links ein seriöser, innovativer Infobereich mit motivierender Botschaft.
 * - Rechts ein modernes, übersichtliches Formular in einer eleganten Card.
 *
 * @component
 * @returns {JSX.Element} Die Benutzeroberfläche zur Bearbeitung von Kundendaten.
 */
export default function CustomerEdit() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  // Apollo-Client initialisieren
  const client = useMemo(
    () =>
      session
        ? getApolloClient(session.access_token)
        : getApolloClient(undefined),
    [session]
  );

  // Kundendaten via GraphQL laden
  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id },
  });

  // Mutation zum Aktualisieren der Kundendaten
  const [updateCustomer, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CUSTOMER, { client });

  // Formularzustände
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tierLevel, setTierLevel] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState({
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  });
  const [contactOptions, setContactOptions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [version, setVersion] = useState("");

  /**
   * useEffect: Befüllt das Formular mit den geladenen Kundendaten.
   */
  useEffect(() => {
    if (data && data.customer) {
      const customer = data.customer;
      setFirstName(customer.firstName || "");
      setLastName(customer.lastName || "");
      setEmail(customer.email || "");
      setPhoneNumber(customer.phoneNumber || "");
      setTierLevel(customer.tierLevel || 1);
      setSubscribed(customer.subscribed || false);
      setMaritalStatus(customer.maritalStatus || "");
      setAddress({
        street: customer.address?.street || "",
        houseNumber: customer.address?.houseNumber || "",
        zipCode: customer.address?.zipCode || "",
        city: customer.address?.city || "",
        state: customer.address?.state || "",
        country: customer.address?.country || "",
      });
      setContactOptions(customer.contactOptions || []);
      setInterests(customer.interests || []);
      setVersion(customer.version || "");
    }
  }, [data]);

  /**
   * Handler für Änderungen an Adressfeldern.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change-Event eines Adressfeldes.
   */
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handler für den Formular-Submit.
   * Aktualisiert die Kundendaten und navigiert bei Erfolg zur Detailansicht.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Das Submit-Event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      firstName,
      lastName,
      email,
      phoneNumber,
      tierLevel,
      subscribed,
      maritalStatus,
      address,
      contactOptions,
      interests,
    };

    try {
      await updateCustomer({
        variables: { id, input, version },
      });
      router.push(`/analytics/customers/${id}`);
    } catch (err) {
      console.error("Update fehlgeschlagen:", err);
    }
  };

  // Während des Ladens wird ein seriöser Ladeindikator angezeigt
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1c2b39, #394a59)",
        }}
      >
        <CircularProgress sx={{ color: "#ffffff" }} />
      </Box>
    );
  }

  // Fehleranzeige bei Ladeproblemen
  if (error) {
    console.error("Fehler beim Laden der Kundendaten:", error);
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper
          sx={{
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h5" color="error" sx={{ fontWeight: "bold" }}>
            Fehler beim Laden der Kundendaten
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "#333" }}>
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
          </Typography>
          <Button
            component={Link}
            href="/analytics/customers"
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#1c2b39",
              "&:hover": { backgroundColor: "#162029" },
            }}
          >
            Zurück zur Kundenliste
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Linker Bereich: Inspirierender Infobereich */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: "100%",
                p: 4,
                borderRadius: 2,
                background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                Innovation trifft Seriosität
              </Typography>
              <Typography variant="h6">
                Optimieren Sie Ihre Kundenprofile mit präzisen, modernen Tools
                und einem intuitiven Interface.
              </Typography>
            </Box>
          </Grid>

          {/* Rechter Bereich: Formular in einem eleganten Card-Design */}
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#ffffff",
                transition: "box-shadow 0.3s ease",
                "&:hover": { boxShadow: "0 8px 16px rgba(0,0,0,0.15)" },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#1c2b39",
                  textAlign: "center",
                }}
              >
                Kundendaten bearbeiten
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Vorname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nachname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Telefonnummer"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="tier-level-label">
                        Mitgliedschaftsstufe
                      </InputLabel>
                      <Select
                        labelId="tier-level-label"
                        value={tierLevel}
                        label="Mitgliedschaftsstufe"
                        onChange={(e) => setTierLevel(e.target.value)}
                      >
                        {tierLevelOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={subscribed}
                          onChange={(e) => setSubscribed(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Abonniert"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="marital-status-label">
                        Ehestand
                      </InputLabel>
                      <Select
                        labelId="marital-status-label"
                        value={maritalStatus}
                        label="Ehestand"
                        onChange={(e) => setMaritalStatus(e.target.value)}
                      >
                        {maritalStatusOptions.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status === "SINGLE"
                              ? "Ledig"
                              : status === "MARRIED"
                                ? "Verheiratet"
                                : status === "DIVORCED"
                                  ? "Geschieden"
                                  : "Verwitwet"}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Adressfelder */}
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", mt: 2, color: "#1c2b39" }}
                    >
                      Adresse
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Straße"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Hausnummer"
                      name="houseNumber"
                      value={address.houseNumber}
                      onChange={handleAddressChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="PLZ"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleAddressChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Stadt"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Bundesland"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Land"
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>

                  {/* Kontaktoptionen */}
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="contact-options-label">
                        Kontaktoptionen
                      </InputLabel>
                      <Select
                        labelId="contact-options-label"
                        multiple
                        value={contactOptions}
                        label="Kontaktoptionen"
                        onChange={(e) => setContactOptions(e.target.value)}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {contactOptionsOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            <Checkbox
                              checked={contactOptions.indexOf(option) > -1}
                            />
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Interessen */}
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="interests-label">Interessen</InputLabel>
                      <Select
                        labelId="interests-label"
                        multiple
                        value={interests}
                        label="Interessen"
                        onChange={(e) => setInterests(e.target.value)}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {interestOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            <Checkbox
                              checked={interests.indexOf(option) > -1}
                            />
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {updateError && (
                    <Grid item xs={12}>
                      <Typography variant="body1" color="error">
                        Fehler beim Aktualisieren: {updateError.message}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sx={{ textAlign: "center", mt: 2 }}>
                    <Box
                      sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        component={Link}
                        href={`/analytics/customers/${id}`}
                        variant="outlined"
                        sx={{
                          borderColor: "#3a3f51",
                          color: "#3a3f51",
                          transition: "all 0.3s ease",
                          "&:hover": { backgroundColor: "#e0e0e0" },
                        }}
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
                          <CircularProgress
                            size={24}
                            sx={{ color: "#ffffff" }}
                          />
                        ) : (
                          "Speichern"
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
