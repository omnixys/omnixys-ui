/**
 * @file CardWrapper.tsx
 * @description Diese Komponente aggregiert mehrere Informationskarten und rendert sie in einem modernen Grid-Layout.
 * Es werden Dummy-Daten für Salden, Kundenanzahl und Rechnungsinformationen verwendet, da die fetch-Funktionen noch nicht implementiert sind.
 */

import Grid from "@mui/material/Grid";
import CardCarousel from "./CardCarousel";
import { getLogger } from "../../../utils/logger";
import CustomCard, { formatCurrency } from "./Card";

/** Währungsumrechnungskurse */
const currencyRates = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.85,
  GHS: 12.5,
};

/**
 * Enum für den Status von Rechnungen.
 * @readonly
 * @enum {string}
 */
export enum StatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
}

export default async function CardWrapper() {
  const logger = getLogger(CardWrapper.name);

  // Dummy-Daten als Platzhalter
  const balanceEUR: number = 100; // Beispiel: 1000 EUR Balance
  const customerCount: number = 50; // Beispiel: 50 Kunden

  // Dummy-Rechnungsdaten für jeden Status aus StatusEnum
  const invoiceInfoByStatus = Object.values(StatusEnum).map((status) => {
    const dummyInfo = { totalAmount: 2000, numberOfInvoices: 10 };
    logger.warn("Dummy invoice info:", {
      status,
      totalAmount: dummyInfo.totalAmount,
      numberOfInvoices: dummyInfo.numberOfInvoices,
    });
    return { status, ...dummyInfo };
  });

  // Umrechnung der Balance in verschiedene Währungen
  const convertedBalances = Object.keys(currencyRates).map((currency) => ({
    currency,
    balance: formatCurrency(
      balanceEUR * currencyRates[currency as keyof typeof currencyRates],
      currency
    ),
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <CardCarousel
          title="Balance"
          items={convertedBalances.map(({ currency, balance }) => ({
            label: `${balance} ${currency}`,
            formatted: balance,
          }))}
          type="collected"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CardCarousel
          title="Collected"
          items={invoiceInfoByStatus.map(({ status, totalAmount }) => ({
            label: `${formatCurrency(totalAmount, "EUR")}`,
            formatted: formatCurrency(totalAmount, "EUR"),
            status: status,
          }))}
          type="collected"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CardCarousel
          title="Total Invoices"
          items={invoiceInfoByStatus.map(({ status, numberOfInvoices }) => ({
            label: `${numberOfInvoices} (${status})`,
            formatted: `${numberOfInvoices}`,
            status: status,
          }))}
          type="invoices"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <CustomCard
          title="Total Customers"
          value={customerCount.toString()}
          type="customers"
        />
      </Grid>
    </Grid>
  );
}
