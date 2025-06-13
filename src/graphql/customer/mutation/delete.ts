import { gql } from '@apollo/client';

export const DELETE_CUSTOMER_BY_ID = gql`
  mutation DeleteCustomer($id: ID!, $version: Int) {
    deleteCustomer(id: $id, version: $version) {
      message
      affectedCount
      warnings
    }
  }
`;

export const DELETE_EMPLOYEE_BY_ID = gql`
  mutation DeleteCustomer($id: ID!, $version: Int) {
    deleteCustomer(id: $id, version: $version) {
      message
      affectedCount
      warnings
    }
  }
`;
