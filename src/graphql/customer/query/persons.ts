import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query Persons($filterInput: FilterInput!) {
    customers(filter: $filterInput) {
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
            contactIds
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

export const GET_EMPLOYEES = gql`
  query Persons {
    employees {
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