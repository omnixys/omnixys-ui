import { gql } from '@apollo/client';

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
      userId
      username
      language
      showWelcomeScreen
      colorMode
      colorScheme
    }
  }
`;
