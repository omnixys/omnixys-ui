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
import { UPDATE_CUSTOMER_BY_ID } from "../../../../../graphql/customer/mutation/update";

// Optionen für Selects und Mehrfachauswahlen
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
 * CustomerEdit-Komponente (Kreativ)
 *
 * Diese Komponente bietet eine kreative, moderne und benutzerfreundliche Oberfläche
 * zur Bearbeitung von Kundendaten. Das Layout ist in zwei Bereiche unterteilt:
 * Links wird eine inspirierende Botschaft angezeigt, rechts befindet sich das Formular
 * in einer innovativ gestalteten Card mit animierten Farbverläufen und kreativen Designelementen.
 *
 * @component
 * @returns {JSX.Element} Die kreative Benutzeroberfläche zur Bearbeitung von Kundendaten.
 */
export default function CustomerEdit() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  // Initialisierung des Apollo-Clients basierend auf der aktuellen Session
  const client = useMemo(
    () =>
      session
        ? getApolloClient(session.access_token)
        : getApolloClient(undefined),
    [session]
  );

  // Laden der Kundendaten via GraphQL
  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    client,
    variables: { id },
  });

  // Mutation zur Aktualisierung der Kundendaten
  const [updateCustomer, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CUSTOMER_BY_ID, { client });

  // Zustände für das Formular
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
   * useEffect: Vorbefüllung des Formulars mit geladenen Kundendaten.
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
   * @param {React.ChangeEvent<HTMLInputElement>} e - Das Event bei Änderung eines Adressfeldes.
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
        variables: {
          id,
          input,
          version,
        },
      });
      router.push(`/analytics/customers/${id}`);
    } catch (err) {
      console.error("Update fehlgeschlagen:", err);
    }
  };

  // Anzeige eines Ladeindikators während des Ladens
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
        }}
      >
        <CircularProgress sx={{ color: "#ffffff" }} />
      </Box>
    );
  }

  // Fehleranzeige, falls das Laden der Kundendaten fehlschlägt
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
            backgroundColor: "rgba(255,255,255,0.95)",
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
              backgroundColor: "#333",
              "&:hover": { backgroundColor: "#555" },
            }}
          >
            Zurück zur Kundenliste
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
        p: 2,
      }}
    >
      {/* Transparente, kreative AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          boxShadow: "none",
          mb: 4,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
            Kreative Kundenbearbeitung
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          {/* Linke Seite: Kreativer Bereich */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 4,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,240,240,0.8))",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(8px)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 2, color: "#333" }}
              >
                Erschaffe Neues
              </Typography>
              <Typography variant="h6" sx={{ color: "#555", px: 2 }}>
                Inspiriere Dich und gestalte Kundenprofile mit innovativen und
                kreativen Lösungen.
              </Typography>
            </Box>
          </Grid>

          {/* Rechte Seite: Formular in kreativer Card */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: "linear-gradient(135deg, #ffffff, #fefefe)",
                border: "3px solid",
                borderImage: "linear-gradient(45deg, #ff9a9e, #fad0c4) 1",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#333",
                  textAlign: "center",
                }}
              >
                Bearbeite Deinen Kunden
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
                      sx={{ fontWeight: "bold", color: "#333", mt: 2 }}
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
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#333",
                        "&:hover": { backgroundColor: "#555" },
                        px: 4,
                        py: 1.5,
                      }}
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <CircularProgress size={24} sx={{ color: "#fff" }} />
                      ) : (
                        "Speichern"
                      )}
                    </Button>
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
                  backgroundColor: "#3a3f51",
                  "&:hover": { backgroundColor: "#2a2f41" },
                  transition: "all 0.3s ease",
                }}
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <CircularProgress size={24} sx={{ color: "#fff" }} />
                ) : (
                  "Speichern"
                )}
              </Button>
            </Box>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
