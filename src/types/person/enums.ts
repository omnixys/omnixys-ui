// Person
export type PersonType = 'CUSTOMER' | 'EMPLOYEE';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'NON_BINARY';

// Customer-relevant
export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
export type ContactOption = 'EMAIL' | 'PHONE' | 'LETTER' | 'SMS' | 'CHAT';
export type Interest =
  | 'INVESTMENTS'
  | 'SAVING_AND_FINANCE'
  | 'CREDIT_AND_DEBT'
  | 'BANK_PRODUCTS_AND_SERVICES'
  | 'FINANCIAL_EDUCATION_AND_COUNSELING'
  | 'REAL_ESTATE'
  | 'INSURANCE'
  | 'SUSTAINABLE_FINANCE'
  | 'TECHNOLOGY_AND_INNOVATION'
  | 'TRAVEL';
export type CustomerState =
  | 'ACTIVE'
  | 'BLOCKED'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'CLOSED'
  | 'PENDING';
export type TierLevel = 1 | 2 | 3;

// Employee-relevant
export type EmployeeRole = 'ADMIN' | 'MANAGER' | 'STAFF';
export type EmployeePosition = 'SUPPORT' | 'DEVELOPER' | 'SALES' | 'HR';

// Sonstiges
export type RelationshipType = 'SPOUSE' | 'CHILD' | 'PARENT' | 'GUARDIAN';
export type ProblemType = 'FINANCIAL' | 'TECHNICAL' | 'LEGAL' | 'GENERAL';
export type StatusType = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
export type OrderDirection = 'ASC' | 'DESC';
