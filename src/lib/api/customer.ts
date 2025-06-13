import { DELETE_CUSTOMER_BY_ID } from '../../graphql/customer/mutation/delete';
import { GET_CUSTOMER_BY_ID } from '../../graphql/customer/query/person';
import { GET_CUSTOMERS } from '../../graphql/customer/query/persons';
import getApolloClient from '../apolloClient';

export async function getCustomers(token?: string) {
  const client = getApolloClient(token); // Falls ein Token vorhanden ist

  try {
    const { data } = await client.query({
      query: GET_CUSTOMERS,
      fetchPolicy: 'no-cache', // Immer aktuelle Daten laden
    });

    return data?.customers || [];
  } catch (error) {
    console.error('Fehler beim Abrufen der Kunden:', error);
    return [];
  }
}

export async function getCustomerByID(token?: string) {
  const client = getApolloClient(token); // Falls ein Token vorhanden ist

  try {
    const { data } = await client.query({
      query: GET_CUSTOMER_BY_ID,
      fetchPolicy: 'no-cache', // Immer aktuelle Daten laden
    });

    return data?.customers || [];
  } catch (error) {
    console.error('Fehler beim Abrufen der Kunden:', error);
    return [];
  }
}

export async function deleteCustomerById(
  token?: string,
  id?: string,
  version?: number,
) {
  const client = getApolloClient(token); // Falls ein Token vorhanden ist

  try {
    const { data } = await client.query({
      query: DELETE_CUSTOMER_BY_ID,
      variables: {
        id,
        version,
      },
      fetchPolicy: 'no-cache', // Immer aktuelle Daten laden
    });

    return data || [];
  } catch (error) {
    console.error('Fehler beim Abrufen der Kunden:', error);
    return [];
  }
}
