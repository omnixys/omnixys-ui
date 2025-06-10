import { gql } from '@apollo/client'

export const GET_REVENUE_KPIS = gql`
  query RevenueKpis($filter: KpiFilter, $sort: Boolean, $limit: Int) {
    revenue_kpis(filter: $filter, sort: $sort, limit: $limit) {
      year
      month
      total_revenue
    }
  }
`

export const GET_ORDER_KPIS = gql`
  query OrderKpis($filter: KpiFilter, $sort: Boolean, $limit: Int) {
    order_kpis(filter: $filter, sort: $sort, limit: $limit) {
      year
      month
      order_value_sum
    }
  }
`

export const GET_TRANSACTION_KPIS = gql`
  query TransactionKpis($filter: KpiFilter, $sort: Boolean, $limit: Int) {
    transaction_kpis(filter: $filter, sort: $sort, limit: $limit) {
      year
      month
      transaction_volume
    }
  }
`
