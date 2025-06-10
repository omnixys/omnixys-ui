/**
 * @file Dashboard.tsx
 * @description Diese Komponente stellt das Haupt-Dashboard dar. Sie ruft Sitzungs- und Kontoinformationen ab
 * und rendert ein modernes, responsives Layout unter Verwendung von Material-UI (MUI) Komponenten.
 *
 * Das Dashboard zeigt wichtige Kennzahlen wie Budget, Anzahl der Kunden, Fortschritt der Aufgaben
 * und den Gesamtgewinn an. Das Layout wurde so gestaltet, dass es den modernen, benutzerfreundlichen
 * und innovativen Anforderungen entspricht. Die Hintergrundfarbe (#F8F8FC) entspricht dem vorgegebenen
 * Sekundärfarbschema für einen sauberen Look.
 *
 * @module Dashboard
 */

"use client";

import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { Budget } from "./dashboard/overview/budget";
import { TotalCustomers } from "./dashboard/overview/total-customers";
import { TasksProgress } from "./dashboard/overview/tasks-progress";
import { TotalProfit } from "./dashboard/overview/total-profit";
import { useState } from "react";
import { NewCustomers } from "./dashboard/overview/new-customers";
import { ActiveCustomers } from "./dashboard/overview/active-customers";
import { LineChart } from "@mui/x-charts/LineChart";
import dynamic from "next/dynamic";
import DashboardCard from "./dashboard/DashboardCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  // Sitzungsinformationen abrufen
  // const session = await getServerSession(authOptions);
  // const logger = getLogger(Dashboard.name);
  // logger.debug("Session-Daten:", session);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const optionscolumnchart = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      //colors: [secondarylight],
      type: "solid",
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
     // theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const seriescolumnchart = [
    {
      name: "",
      //color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  // Rückgabe des MUI-Grid-Layouts mit festgelegter Hintergrundfarbe (Sekundärfarbe) und responsiven Kennzahlen-Karten
  return (
    <Box sx={{ width: "100%" }}>
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
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Grid container spacing={3} p={3} sx={{ backgroundColor: "#F8F8FC" }}>
          <Grid item lg={3} sm={6} xs={12}>
            <Budget diff={12} trend="up" sx={{ height: "100%" }} value="$24k" />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TotalCustomers
              diff={16}
              trend="down"
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TasksProgress sx={{ height: "100%" }} value={75.5} />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: "100%" }} value="$15k" />
          </Grid>
        </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Grid container spacing={3} p={3} sx={{ backgroundColor: "#F8F8FC" }}>
          <Grid item lg={3} sm={6} xs={12}>
            <TotalCustomers
              diff={16}
              trend="down"
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ActiveCustomers
              diff={16}
              trend="down"
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <NewCustomers
              diff={16}
              trend="down"
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <DashboardCard
              title="Monthly Earnings"
              footer={
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="area"
                  height={60}
                  width={"100%"}
                />
              }
            >
              <>
                <Typography variant="h3" fontWeight="700" mt="-20px">
                  $6,820
                </Typography>
                <Stack direction="row" spacing={1} my={1} alignItems="center">
                  <Typography variant="subtitle2" fontWeight="600">
                    +9%
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    last year
                  </Typography>
                </Stack>
              </>
            </DashboardCard>
          </Grid>
        </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
