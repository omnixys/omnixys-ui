import { EmployeePosition, EmployeeRole } from "./enums";

/**
 * Employee-spezifische Felder
 */
export interface EmployeeData {
    role: EmployeeRole;
    position: EmployeePosition;
    department?: string;
    supervisorId?: string;
    hireDate?: string;
    isExternal: boolean;
    salary: number;
    jobTitle: string;
    active: boolean;
}
