import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation UpdateMyProfile($input: UpdateProfileInput!) {
    updateMyProfile(input: $input) {
      id
        userId
        language
        showWelcomeScreen
        username
        colorMode
        colorScheme
    }
  }
`;
