/**
 * @file Card.tsx
 * @description Diese Komponente rendert eine einzelne Informationskarte unter Verwendung von Material-UI.
 * Sie zeigt den Titel und den entsprechenden Wert an und überzeugt durch klare, moderne Typografie und abgerundete Ecken.
 */

import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export type CardProps = {
  /** Titel der Karte */
  title: string;
  /** Wert, der angezeigt wird (Zahl oder Text) */
  value: number | string;
  /** Typ der Karte (für zukünftige Erweiterungen, z. B. Icons) */
  type: "invoices" | "customers" | "pending" | "collected";
};

/**
 * Formatiert einen Zahlenwert in die jeweilige Währung.
 * @param {number} amount - Der Betrag, der formatiert werden soll.
 * @param {string} currency - Die Währung (z. B. "EUR").
 * @returns {string} Der formatierte Währungsbetrag.
 */
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const CustomCard: FC<CardProps> = ({ title, value }) => {
  return (
    <Card
      sx={{
        p: 2,
        backgroundColor: "common.white",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h6"
            component="div"
            sx={{ mt: 1, color: "text.primary", fontWeight: 600 }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            component="div"
            sx={{ mt: 2, fontWeight: "bold", color: "text.primary" }}
          >
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
