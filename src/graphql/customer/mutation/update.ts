import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $version: Int!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $id, version: $version, input: $input) {
        id
    }
}
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateCustomer($id: ID!, $version: Int!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $id, version: $version, input: $input) {
        id
    }
}
`;
