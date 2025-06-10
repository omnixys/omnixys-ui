import { ContactPerson } from "./contact.type";
import { TierLevel, MaritalStatus, CustomerState, ContactOption, Interest } from "./enums";

/**
 * Customer-spezifische Felder
 */
export interface CustomerData {
    tierLevel: TierLevel;
    subscribed: boolean;
    maritalStatus: MaritalStatus;
    customerState: CustomerState;
    contactOptions: ContactOption[];
    interests?: Interest[] | null;
    contactIds: string[];
    contacts: ContactPerson[];
}

export interface CustomerDetails {
    tierLevel: "1" | "2" | "3";
    subscribed: boolean;
    maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
    customerState: "ACTIVE" | "BLOCKED" | "INACTIVE" | "CLOSED" | "PENDING" | "SUSPENDED";
    contactOptions: Array<"EMAIL" | "PHONE" | "CHAT" | "SMS" | "LETTER">;
    interests?: string[];
    contactIds?: ContactPerson[];
}

export interface CustomerListItem {
    id: string;
    version: number;
    username: string;
    email: string;
    tierLevel: string;
    customerState: string;
}