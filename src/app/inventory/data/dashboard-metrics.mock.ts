// src/data/dashboard-metrics.mock.ts
import type {
    DashboardMetrics,
    Product,
    SalesSummary,
    PurchaseSummary,
    ExpenseSummary,
    ExpenseByCategorySummary,
  } from "../types/api-types"; // anpassen an deinen Pfad

  const popularProducts: Product[] = [
    { productId: "1", name: "Omnixis T-Shirt", price: 24.9, rating: 4.6, stockQuantity: 120 },
      { productId: "2", name: "Omnixis Hoodie", price: 59.0, rating: 4.8, stockQuantity: 60 },
      {
        productId: "3",
        name: "Sticker Pack",
        price: 4.5,
        stockQuantity: 500,
      },
  ];

  const salesSummary: SalesSummary[] = [
    { salesSummaryId: "s1", totalValue: 12345.67, changePercentage: 12.4, date: "2025-08-01" },
  ];

  const purchaseSummary: PurchaseSummary[] = [
    { purchaseSummaryId: "p1", totalPurchased: 5432.1, changePercentage: -3.2, date: "2025-08-01" },
  ];

  const expenseSummary: ExpenseSummary[] = [
    { expenseSummarId: "e1", totalExpenses: 2345.67, date: "2025-08-01" },
  ];

  const expenseByCategorySummary: ExpenseByCategorySummary[] = [
    { expenseByCategorySummaryId: "c1", category: "Housing", amount: "650", date: "2025-08-01" },
    { expenseByCategorySummaryId: "c2", category: "Food", amount: "320", date: "2025-08-01" },
    { expenseByCategorySummaryId: "c3", category: "Transport", amount: "210", date: "2025-08-01" },
  ];


  export const mockDashboardMetrics: DashboardMetrics = {
    popularProducts,
    salesSummary,
    purchaseSummary,
    expenseSummary,
    expenseByCategorySummary,
  };
