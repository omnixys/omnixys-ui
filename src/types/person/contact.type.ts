export type ContactPersonId = string | { $binary: { base64: string } };

// types/person/CustomerInspectData.ts
export interface ContactPerson {
    _id?: ContactPersonId;
    firstName: string;
    lastName: string;
    relationship?: string;
    startDate?: string ;
    endDate?: string ;
    emergencyContact?:boolean,
}

export function isBinaryId(
    id: ContactPersonId | undefined
): id is { $binary: { base64: string } } {
    return typeof id === "object" && id !== null && "$binary" in id;
}
  