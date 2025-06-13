import { gql } from '@apollo/client';

export const GET_NOTIFICATION_TEMPLATES = gql`
  query Products {
    getAllTemplates {
      id
      type
      name
      subject
      body
      placeholders
      isHtml
    }
  }
`;
