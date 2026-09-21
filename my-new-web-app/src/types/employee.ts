export interface SalaryComponents {
  HRA: number;
  Conveyance: number;
  PF: number;
  [key: string]: number;
}

export interface Employee {
  id: string;
  first: string;
  middle?: string;
  last: string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other' | string;
  mobile: string;
  personalEmail?: string;
  officialEmail: string;
  address?: string;
  emergencyName?: string;
  emergencyMobile?: string;
  department: string;
  designation: string;
  employmentType: string;
  category: string;
  manager: string;
  joining: string;
  location: string;
  shift: string;
  status: 'Active' | 'Inactive' | 'Separated' | string;
  basic: number;
  bank?: string;
  photo?: string;
  components: SalaryComponents;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  status: 'Active' | 'Inactive' | string;
}

export interface Designation {
  id: string;
  name: string;
  code: string;
  department: string;
  status: 'Active' | 'Inactive' | string;
}

export interface Location {
  id: string;
  name: string;
  code: string;
  address: string;
  status: 'Active' | 'Inactive' | string;
}

export interface EmploymentType {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'Inactive' | string;
}

export interface EmployeeCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'Inactive' | string;
}

export interface Shift {
  id: string;
  name: string;
  code: string;
  start: string;
  end: string;
  grace: number;
  halfDay: number;
  weeklyOff: string;
  status: 'Active' | 'Inactive' | string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  applies: string;
  mandatory: string;
  status: 'Active' | 'Inactive' | string;
}

export interface EmployeeDocument {
  id: string;
  title: string;
  category: string;
  type: string;
  employee: string;
  audience: string;
  file: string;
  version: string;
  effective: string;
  expiry?: string;
  description?: string;
  status: 'Published' | 'Draft' | 'Archived' | string;
  uploadedBy: string;
  uploadedOn: string;
}

export interface MasterData {
  departments: Department[];
  designations: Designation[];
  locations: Location[];
  employmentTypes: EmploymentType[];
  employeeCategories: EmployeeCategory[];
  shifts: Shift[];
  documentCategories: DocumentCategory[];
}

