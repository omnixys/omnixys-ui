"use client";

import * as React from "react";
import { Box, Grid, Paper } from "@mui/material";

import AppAreaChart from "./components/AppAreaChart";
import AppBarChart from "./components/AppBarChart";
import AppPieChart from "./components/AppPieChart";
import CardList from "./components/CardList";
import TodoList from "./components/TodoList";

const Panel: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Paper
    variant="outlined"
    sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}
  >
    {children}
  </Paper>
);

const Homepage = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {/* AppBarChart – xs: full, lg: full (2 Spalten), xl: halbe Breite (2 von 4) */}
        <Grid item xs={12} lg={12} xl={6}>
          <Panel>
            <AppBarChart />
          </Panel>
        </Grid>

        {/* Latest Transactions – xs: full, lg: halbe Breite, xl: Viertel */}
        <Grid item xs={12} lg={6} xl={3}>
          <Panel>
            <CardList title="Latest Transactions" />
          </Panel>
        </Grid>

        {/* PieChart – xs: full, lg: halbe Breite, xl: Viertel */}
        <Grid item xs={12} lg={6} xl={3}>
          <Panel>
            <AppPieChart />
          </Panel>
        </Grid>

        {/* TodoList – xs: full, lg: halbe Breite, xl: Viertel */}
        <Grid item xs={12} lg={6} xl={3}>
          <Panel>
            <TodoList />
          </Panel>
        </Grid>

        {/* AreaChart – xs: full, lg: full, xl: halbe Breite */}
        <Grid item xs={12} lg={12} xl={6}>
          <Panel>
            <AppAreaChart />
          </Panel>
        </Grid>

        {/* Popular Products – xs: full, lg: halbe Breite, xl: Viertel */}
        <Grid item xs={12} lg={6} xl={3}>
          <Panel>
            <CardList title="Popular Products" />
          </Panel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
