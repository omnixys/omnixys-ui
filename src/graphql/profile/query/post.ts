import { gql } from '@apollo/client';

export const GET_POST_BY_ID = gql`
  query GetPostsByProfile($id: String!) {
    getPostsByProfile(profileId: $id) {
      id
      content
      media
      isArchived
      profileId
      createdAt
      updatedAt
    }
  }
`;
