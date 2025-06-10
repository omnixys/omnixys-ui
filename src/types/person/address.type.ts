/**
 * Adresse einer Person (gemeinsam für Customer & Employee)
 */
export interface Address {
    street: string;
    houseNumber: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
}