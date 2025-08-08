import { Address } from './address.type';
import { CustomerData } from './customer.type';
import { EmployeeData } from './employee.type';
import {
  ContactOptionEnum,
  Gender,
  InterestEnum,
  MaritalStatus,
  MaritalStatusEnum,
  PersonType,
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

// 📄 /mnt/data/CustomerFormData.ts

export type CustomerFormData = {
  // PersonInput
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;

  // Address
  street: string;
  houseNumber: string; // wird später zu number gecastet
  zipCode: string;
  city: string;
  state: string;
  country: string;

  // CustomerInput
  tierLevel?: number;
  subscribed?: boolean;
  maritalStatus?: MaritalStatusEnum | MaritalStatus;
  contactOptions: ContactOptionEnum[];
  interests: InterestEnum[];
};

export type UpdateCustomerInput = {
  personInput: {
    lastName: string;
    firstName: string;
    phoneNumber: string;
    email: string;
    address: {
      street: string;
      houseNumber: number;
      zipCode: string;
      city: string;
      state: string;
      country: string;
    };
  };
  customerInput: {
    tierLevel: number;
    subscribed: boolean;
    maritalStatus: string;
    contactOptions: string[];
    interests: string[];
  };
};
