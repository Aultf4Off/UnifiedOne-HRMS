import type { Employee, MasterData, EmployeeDocument } from '../types/employee';

export const initialMasterData: MasterData = {
  departments: [
    { id: 'D1', name: 'Engineering', code: 'ENG', head: 'Robert Fox', status: 'Active' },
    { id: 'D2', name: 'Human Resources', code: 'HR', head: 'Jane Doe', status: 'Active' },
    { id: 'D3', name: 'Sales', code: 'SAL', head: 'Wade Warren', status: 'Active' },
  ],
  designations: [
    { id: 'DS1', name: 'Sr. Product Manager', code: 'SPM', department: 'Engineering', status: 'Active' },
    { id: 'DS2', name: 'HR Executive', code: 'HRE', department: 'Human Resources', status: 'Active' },
    { id: 'DS3', name: 'Sales Executive', code: 'SE', department: 'Sales', status: 'Active' },
  ],
  locations: [
    { id: 'L1', name: 'Mumbai HO', code: 'MUM', address: 'Mumbai, Maharashtra', status: 'Active' },
    { id: 'L2', name: 'Pune Office', code: 'PUN', address: 'Pune, Maharashtra', status: 'Active' },
  ],
  employmentTypes: [
    { id: 'ET1', name: 'Permanent', code: 'PERM', description: 'Regular employee', status: 'Active' },
    { id: 'ET2', name: 'Contract', code: 'CONT', description: 'Fixed contract', status: 'Active' },
    { id: 'ET3', name: 'Intern', code: 'INT', description: 'Internship', status: 'Active' },
  ],
  employeeCategories: [
    { id: 'EC1', name: 'Staff', code: 'STF', description: 'Office staff', status: 'Active' },
    { id: 'EC2', name: 'Management', code: 'MGT', description: 'Management team', status: 'Active' },
    { id: 'EC3', name: 'Worker', code: 'WRK', description: 'Worker category', status: 'Active' },
  ],
  shifts: [
    { id: 'S1', name: 'General Shift', code: 'GEN', start: '09:00', end: '18:00', grace: 15, halfDay: 4.5, weeklyOff: 'Sunday', status: 'Active' },
    { id: 'S2', name: 'Morning Shift', code: 'MOR', start: '06:00', end: '14:00', grace: 10, halfDay: 4, weeklyOff: 'Sunday', status: 'Active' },
  ],
  documentCategories: [
    { id: 'DC1', name: 'Identity Document', applies: 'Employee', mandatory: 'Yes', status: 'Active' },
    { id: 'DC2', name: 'HR Policy', applies: 'Company Policy', mandatory: 'No', status: 'Active' },
    { id: 'DC3', name: 'Employment Document', applies: 'Employee', mandatory: 'No', status: 'Active' },
  ],
};

export const initialEmployees: Employee[] = [
  {
    id: 'E001',
    first: 'Robert',
    middle: '',
    last: 'Fox',
    dob: '1991-05-12',
    gender: 'Male',
    mobile: '9876543210',
    personalEmail: 'robert.personal@example.com',
    officialEmail: 'robert@kinship.demo',
    address: 'Mumbai',
    emergencyName: 'Alicia Fox',
    emergencyMobile: '9876500000',
    department: 'Engineering',
    designation: 'Sr. Product Manager',
    employmentType: 'Permanent',
    category: 'Management',
    manager: 'Jane Doe',
    joining: '2022-04-11',
    location: 'Mumbai HO',
    shift: 'General Shift',
    status: 'Active',
    basic: 60000,
    bank: 'HDFC ••••2341',
    photo: 'RF',
    components: { HRA: 24000, Conveyance: 2000, PF: 7200 },
  },
  {
    id: 'E002',
    first: 'Aisha',
    middle: '',
    last: 'Khan',
    dob: '1995-09-18',
    gender: 'Female',
    mobile: '9876543211',
    personalEmail: '',
    officialEmail: 'aisha@kinship.demo',
    address: 'Pune',
    emergencyName: 'Sameer Khan',
    emergencyMobile: '9876500001',
    department: 'Human Resources',
    designation: 'HR Executive',
    employmentType: 'Permanent',
    category: 'Staff',
    manager: 'Jane Doe',
    joining: '2024-02-05',
    location: 'Pune Office',
    shift: 'General Shift',
    status: 'Active',
    basic: 35000,
    bank: 'ICICI ••••9834',
    photo: 'AK',
    components: { HRA: 14000, Conveyance: 2000, PF: 4200 },
  },
  {
    id: 'E003',
    first: 'Wade',
    middle: '',
    last: 'Warren',
    dob: '1989-03-21',
    gender: 'Male',
    mobile: '9876543212',
    personalEmail: '',
    officialEmail: 'wade@kinship.demo',
    address: 'Mumbai',
    emergencyName: '',
    emergencyMobile: '',
    department: 'Sales',
    designation: 'Sales Executive',
    employmentType: 'Permanent',
    category: 'Staff',
    manager: 'Jane Doe',
    joining: '2023-06-17',
    location: 'Mumbai HO',
    shift: 'General Shift',
    status: 'Active',
    basic: 42000,
    bank: 'SBI ••••7732',
    photo: 'WW',
    components: { HRA: 16800, Conveyance: 2000, PF: 5040 },
  },
];

export const initialDocuments: EmployeeDocument[] = [
  {
    id: 'DOC1',
    title: 'Employee Handbook 2026',
    category: 'HR Policy',
    type: 'Company Policy',
    employee: '',
    audience: 'All Employees',
    file: 'Employee_Handbook_2026.pdf',
    version: '1.0',
    effective: '2026-04-01',
    description: 'Core workplace and HR policy handbook.',
    status: 'Published',
    uploadedBy: 'Jane Doe',
    uploadedOn: '2026-04-01',
  },
  {
    id: 'DOC2',
    title: 'Robert - Appointment Letter',
    category: 'Employment Document',
    type: 'Employee Document',
    employee: 'E001',
    audience: '',
    file: 'Robert_Appointment.pdf',
    version: '1.0',
    effective: '2022-04-11',
    description: 'Official appointment letter.',
    status: 'Published',
    uploadedBy: 'Jane Doe',
    uploadedOn: '2022-04-10',
  },
];

const STORAGE_KEY_EMPLOYEES = 'kinship_hrms_employees_v1';
const STORAGE_KEY_DOCUMENTS = 'kinship_hrms_documents_v1';

export function loadStoredEmployees(): Employee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMPLOYEES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to load employees from localStorage:', err);
  }
  return initialEmployees;
}

export function saveStoredEmployees(employees: Employee[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
  } catch (err) {
    console.warn('Failed to save employees to localStorage:', err);
  }
}

export function loadStoredDocuments(): EmployeeDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DOCUMENTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to load documents from localStorage:', err);
  }
  return initialDocuments;
}

export function saveStoredDocuments(docs: EmployeeDocument[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_DOCUMENTS, JSON.stringify(docs));
  } catch (err) {
    console.warn('Failed to save documents to localStorage:', err);
  }
}
