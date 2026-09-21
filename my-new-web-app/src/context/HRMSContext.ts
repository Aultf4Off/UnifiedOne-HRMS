import { createContext } from 'react';
import type { Employee, MasterData, EmployeeDocument } from '../types/employee';

export interface HRMSContextType {
  employees: Employee[];
  documents: EmployeeDocument[];
  masters: MasterData;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  currentRole: 'admin' | 'employee';
  setCurrentRole: (role: 'admin' | 'employee') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  saveEmployee: (emp: Employee, isEdit: boolean) => Promise<{ success: boolean; error?: string }>;
  getEmployee: (id: string) => Employee | undefined;
  deleteEmployee: (id: string) => void;
  addDocument: (doc: EmployeeDocument) => void;
  currentEmployeeId: string;
  setCurrentEmployeeId: (id: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

export const HRMSContext = createContext<HRMSContextType | undefined>(undefined);
