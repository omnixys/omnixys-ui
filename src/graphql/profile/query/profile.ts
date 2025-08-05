import { gql } from '@apollo/client';

export const MY_PROFILE = gql`
  query MyFullProfile {
    myFullProfile {
      friendships
      profile {
        id
        username
        info {
          bio
          profileImage
        }
        settings {
          isSuspended
          suspendedUntil
          language
          colorMode
          colorScheme
          showWelcomeScreen
          blockedUsers {
            blockedId
            blockedUsername
            blockedAt
            reason
          }
        }
      }
      followCount {
        followers
        following
      }
    }
  }
`;

export const GET_PROFILE_BY_USER_ID = gql`
  query GetFullProfileByUserId($userId: String!) {
    getFullProfileByUserId(customerId: $userId) {
      profile {
        id
        username
        info {
          bio
          profileImage
        }
        settings {
          isSuspended
          suspendedUntil
          language
          colorMode
          colorScheme
          showWelcomeScreen
          blockedUsers {
            blockedId
            blockedUsername
            blockedAt
            reason
          }
        }
      }
      followCount {
        followers
        following
      }
      friendships
    }
  }
`;
