import { gql } from '@apollo/client';

export const GET_CUSTOMER_BY_ID = gql`
  query Person($id: ID!) {
    customer(id: $id) {
      id
      version
      firstName
      lastName
      birthdate
      email
      phoneNumber
      gender
      personType
      created
      updated
      username
      address {
        street
        houseNumber
        city
        zipCode
        state
        country
      }
      customer {
        contacts {
          id
          firstName
          lastName
          relationship
          emergencyContact
          startDate
          endDate
          withdrawalLimit
        }
        contactOptions
        customerState
        interests
        maritalStatus
        subscribed
        tierLevel
      }
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query Person($id: ID!) {
    employee(id: $id) {
      id
      version
      firstName
      lastName
      birthdate
      email
      phoneNumber
      gender
      personType
      created
      updated
      username
      address {
        street
        houseNumber
        city
        zipCode
        state
        country
      }
      employee {
        department
        hireDate
        isExternal
        position
        role
        salary
      }
    }
  }
`;
