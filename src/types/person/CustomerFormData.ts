import { Address } from "./address.type";
import { MaritalStatus } from "./enums";

export interface CustomerFormState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    tierLevel: number;
    subscribed: boolean;
    maritalStatus: MaritalStatus;
    address: Address;
    contactOptions: string[];
    interests: string[];
    version: string;
  }
  

export type CustomerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  tierLevel: number;
  subscribed: boolean;
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  contactOptions: string[];
};
  

export interface EmployeeFormState {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: "ADMIN" | "MANAGER" | "STAFF";
    position: string;
    department: string;
    isExternal: boolean;
    hireDate: string; // ISO-Format: "YYYY-MM-DD"
  salary: number;
  jobTitle: string;
  active: boolean;
  address: Address;
  version: string;
}
  
export type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  position: string;
  department: string;
  isExternal: boolean;
  hireDate: string; // z. B. "2023-04-01"
  salary: number;
};
