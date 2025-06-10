// src/app/analytics/product/page.tsx
//TODO mit echten daten noch
"use client";

import { useSession } from "next-auth/react";
import { Box, Typography, Alert, useTheme, Tabs, Tab, Grid } from "@mui/material";
import { useState } from "react";
import { BudgetCard } from "./components/budget";
import { CustomerCard } from "./components/total-customers";
import { TasksProgressCard } from "./components/tasks-progress";
import { ProfitCard } from "./components/total-profit";
import { AnalysisChart } from "./components/charts/AnalysisChart";
import EngagementChart from "./components/charts/EngagementChart";
import CustomerGrowthChart from "./components/charts/CustomerGrowthChart";
import RevenueChart from "./components/charts/RevenueChart";
import InvoiceChart from "./components/charts/InvoiceChart";
import OrderChart from "./components/charts/OrderChart";
import SupportChart from "./components/charts/SupportChart";
import SystemHealthChart from "./components/charts/SystemHealthChart";
import TransactionChart from "./components/charts/TransactionChart";
import CustomTabPanel from "../../../components/CustomTabPanel";


export default function AnalyticsProductPage() {
  const { data: session, status } = useSession();
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (status === "loading") return <Typography>Lade...</Typography>;
  if (!session) return <Alert severity="warning">Nicht eingeloggt</Alert>;

  const isAdmin = session.user?.roles?.includes("Admin");

  if (!isAdmin) {
    return <Alert severity="error">Zugriff nur für Administratoren</Alert>;
  }

  return (
    <Box
      p={4}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 2,
        boxShadow: 2,
        width: "100%",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          centered
          sx={{
            marginBottom: 3,
            "& .MuiTabs-flexContainer": {
              justifyContent: "start",
            },
            "& .MuiTab-root": {
              fontWeight: "bold",
              textTransform: "none",
            },
          }}
        >
          <Tab label="Overview" />
          <Tab label="User Behavior" />
          <Tab label="Performane" />
        </Tabs>
        <Typography variant="h4" gutterBottom>
          Produkt-KPIs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Hier folgen Charts, Metriken und Tabellen...
        </Typography>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <BudgetCard
              diff={12}
              trend="up"
              sx={{ height: "100%" }}
              value={240}
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <CustomerCard
              diff={16}
              trend="down"
              sx={{ height: "100%" }}
              total={1600}
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <TasksProgressCard sx={{ height: "100%" }} value={75.5} />
          </Grid>

          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <ProfitCard sx={{ height: "100%" }} value={15} />
          </Grid>
        </Grid>
        <AnalysisChart />

        <Typography variant="h4" fontWeight={700} gutterBottom>
          📊 KPI Dashboard – Analytics
        </Typography>

        <Grid container spacing={3}>
          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <RevenueChart />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <OrderChart />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <TransactionChart />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <InvoiceChart />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <SupportChart />
          </Grid>
          <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
            <SystemHealthChart />
          </Grid>
        </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <EngagementChart />

        <Grid sx={{ xs: 12, sm: 6, lg: 3 }}>
          <CustomerGrowthChart />
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}