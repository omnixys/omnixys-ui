// Anpassung des Farbsystems für bessere Sichtbarkeit

"use client";

import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Tooltip,
  Container,
  useTheme,
  useMediaQuery,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Stack,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const features: Feature[] = [
  {
    label: "Modular aufgebaut",
    key: "modular",
    description: "Jedes Modul ist eigenständig deploybar und kombinierbar.",
    values: ["✅", "❌", "❌"],
  },
  {
    label: "GraphQL API-only",
    key: "graphql",
    description:
      "Keine REST-Endpunkte – nur moderne, typisierte Schnittstellen.",
    values: ["✅", "❌", "🔶"],
  },
  {
    label: "Open Source",
    key: "openSource",
    description:
      "Quelloffen unter GNU GPLv3 – anpassbar für deine Bedürfnisse.",
    values: ["✅", "❌", "❌"],
  },
  {
    label: "Eventbasiert (Kafka)",
    key: "event",
    description:
      "Microservices kommunizieren über Kafka für Echtzeit-Ereignisse.",
    values: ["✅", "❌", "❌"],
  },
  {
    label: "Echtzeit-Dashboards",
    key: "dashboards",
    description: "KPIs und Business-Daten live mit Grafana/Prometheus.",
    values: ["✅", "🔶", "🔶"],
  },
  {
    label: "Observability integriert",
    key: "observability",
    description: "Monitoring mit Tempo, Loki, Grafana – von Haus aus.",
    values: ["✅", "❌", "❌"],
  },
  {
    label: "Individuell erweiterbar",
    key: "extensible",
    description: "Plug-in-System und modulare Erweiterbarkeit.",
    values: ["✅", "❌", "🔶"],
  },
];

const legend = {
  "✅": "Vollständig vorhanden",
  "🔶": "Teilweise vorhanden",
  "❌": "Nicht vorhanden",
};

export type FeatureIcon = "✅" | "❌" | "🔶";

interface Feature {
  key: string;
  label: string;
  description: string;
  values: [FeatureIcon, FeatureIcon, FeatureIcon];
}

const columnLabels = ["Omnixys", "Mitbewerber A", "Mitbewerber B"];

export default function CompetitorComparison() {
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const filtered = showOnlyDifferences
    ? features.filter((f) => new Set(f.values).size > 1)
    : features;

  const headStyle: React.CSSProperties = {
    padding: "12px 16px",
    fontWeight: 700,
    textAlign: "left",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    color: theme.palette.text.primary,
  };

  const cellStyle: React.CSSProperties = {
    padding: "12px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    color: theme.palette.text.primary,
  };

  return (
    <Container sx={{ my: 12 }}>
      <Typography
        color="text.primary"
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Omnixys vs. Mitbewerber
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showOnlyDifferences}
              onChange={() => setShowOnlyDifferences((prev) => !prev)}
              color="secondary"
            />
          }
          label="Nur Unterschiede anzeigen"
        />
      </Box>

      {isMobile ? (
        <Box>
          {filtered.map((f) => (
            <Accordion key={f.key} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>{f.label}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  color="text.primary"
                  variant="body2"
                  sx={{ mb: 1, opacity: 0.8 }}
                >
                  {f.description}
                </Typography>
                <Stack spacing={1}>
                  {f.values.map((v, i) => (
                    <Box key={`${f.key}-${i}`}>
                      <Typography
                        color="text.primary"
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {columnLabels[i]}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={v === "✅" ? 100 : v === "🔶" ? 50 : 0}
                        color={
                          v === "✅"
                            ? "success"
                            : v === "🔶"
                              ? "warning"
                              : "error"
                        }
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            overflowX: "auto",
            borderRadius: 2,
            backdropFilter: "blur(6px)",
            boxShadow: 3,
          }}
        >
          <table
            aria-label="Vergleich Omnixys vs. Mitbewerber"
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}
          >
            <caption style={{ ...visuallyHidden }}>
              Vergleichstabelle von Plattform-Funktionen
            </caption>
            <thead>
              <tr>
                <th style={headStyle}></th>
                {columnLabels.map((label) => (
                  <th key={label} style={headStyle}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.key}>
                  <td style={cellStyle}>
                    <Tooltip title={f.description} arrow>
                      <span
                        style={{
                          cursor: "help",
                          textDecoration: "dotted underline",
                        }}
                      >
                        {f.label}
                      </span>
                    </Tooltip>
                  </td>
                  {f.values.map((v, i) => (
                    <td key={`${f.key}-${i}`} style={cellStyle}>
                      <span style={{ color: getColor(v, theme) }}>{v}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      )}

      <Box sx={{ mt: 2, opacity: 0.7, textAlign: "center" }}>
        {Object.entries(legend).map(([icon, text]) => (
          <Typography key={icon} variant="caption" sx={{ display: "block" }}>
            {icon} – {text}
          </Typography>
        ))}
      </Box>
    </Container>
  );
}

const visuallyHidden: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

function getColor(value: string, theme: any): string {
  switch (value) {
    case "✅":
      return theme.palette.success.light;
    case "❌":
      return theme.palette.error.light;
    case "🔶":
      return theme.palette.warning.light;
    default:
      return theme.palette.text.primary;
  }
}
