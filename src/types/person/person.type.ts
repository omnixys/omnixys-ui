import { Address } from './address.type';
import { CustomerData } from './customer.type';
import { EmployeeData } from './employee.type';
import {
    PersonType,
    Gender,
} from './enums';

/**
 * Einheitlicher Person-Datentyp für Kunden und Mitarbeiter
 */
export interface Person {
    id: string;
    version: number;
    personType: PersonType;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    birthdate: string; // ISO 8601
    gender: Gender;
    address: Address;
    created: string;
    updated: string;

    // eingebettete Substruktur je nach Typ
    customer?: CustomerData;
    employee?: EmployeeData;
}
  