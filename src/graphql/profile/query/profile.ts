import { gql } from '@apollo/client';

export const MY_PROFILE = gql`
query MyProfile {
  myProfile {
    id
    userId
    username
    info {
      headline
      location
      profileImage
      coverImage
      socialLinks
    }
    settings {
      isSuspended
      suspendedUntil
      language
      colorMode
      colorScheme
      showWelcomeScreen
    }
  }
}

`;

export const GET_PROFILE_BY_USER_ID = gql`
query GetProfileByUserId($userId: String!) {
  getProfileByUserId(userId: $userId) {
    id
    userId
    username
    info {
      headline
      location
      profileImage
      coverImage
      socialLinks
    }
    settings {
      isSuspended
      suspendedUntil
      language
      colorMode
      colorScheme
      showWelcomeScreen
    }
  }
}

`;
