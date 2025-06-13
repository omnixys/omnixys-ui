import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
  query GetTransactions($input: TransactionSearchCriteria) {
    transactions(input: $input) {
      id
      type
      # currencyType
      amount
      sender
      receiver
      created
    }
  }
`;
