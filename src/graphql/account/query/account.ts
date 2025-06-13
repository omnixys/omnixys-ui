import { gql } from '@apollo/client';

export const ACCOUNTS_QUERY = gql`
  query {
    accounts {
      id
      balance
      category
      state
      transactionLimit
      userId
      username
    }
  }
`;
