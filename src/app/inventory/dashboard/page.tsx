"use client";

import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import StatCard from "./StatCard";
import { Grid } from "@mui/material";

export default function Dashboard() {
  return (
    <Grid container spacing={3} sx={{ pb: 2, overflow: { xl: "auto" } }}>
      <Grid xs={12} md={6} xl={4}>
        <CardPopularProducts />
      </Grid>
      <Grid xs={12} md={6} xl={4}>
        <CardSalesSummary />
      </Grid>
      <Grid xs={12} md={6} xl={4}>
        <CardPurchaseSummary />
      </Grid>
      <Grid xs={12} md={6} xl={4}>
        <CardExpenseSummary />
      </Grid>
      <Grid xs={12} md={6} xl={4}>
        <StatCard
          title="Customer & Expenses"
          primaryIcon={<Inventory2Icon color="primary" />}
          dateRange="22 – 29 October 2023"
          details={[
            { title: "Customer Growth", amount: "175.00", changePercentage: 131, IconComponent: TrendingUpIcon },
            { title: "Expenses", amount: "10.00", changePercentage: -56, IconComponent: TrendingDownIcon },
          ]}
        />
      </Grid>
      <Grid xs={12} md={6} xl={4}>
        <StatCard
          title="Dues & Pending Orders"
          primaryIcon={<CheckCircleIcon color="primary" />}
          dateRange="22 – 29 October 2023"
          details={[
            { title: "Dues", amount: "250.00", changePercentage: 131, IconComponent: TrendingUpIcon },
            { title: "Pending Orders", amount: "147", changePercentage: -56, IconComponent: TrendingDownIcon },
          ]}
        />
      </Grid>
      <Grid xs={12} md={6} xl={4}>
        <StatCard
          title="Sales & Discount"
          primaryIcon={<LocalOfferIcon color="primary" />}
          dateRange="22 – 29 October 2023"
          details={[
            { title: "Sales", amount: "1000.00", changePercentage: 20, IconComponent: TrendingUpIcon },
            { title: "Discount", amount: "200.00", changePercentage: -10, IconComponent: TrendingDownIcon },
          ]}
        />
      </Grid>
    </Grid>
  );
}
