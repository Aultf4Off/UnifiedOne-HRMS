import React, { useState, useEffect } from 'react';
import type { Employee, MasterData, EmployeeDocument } from '../types/employee';
import {
  initialMasterData,
  loadStoredDocuments,
  saveStoredDocuments,
} from '../data/seedData';
import { HRMSContext } from './HRMSContext';
import { createEmployee, getEmployees } from '../services/employeeService';

export const HRMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [documents, setDocuments] = useState<EmployeeDocument[]>(() => loadStoredDocuments());
  const [masters] = useState<MasterData>(initialMasterData);
  const [activeRoute, setActiveRoute] = useState<string>('employees');
  const [currentRole, setCurrentRole] = useState<'admin' | 'employee'>('admin');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string>('E001');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  useEffect(() => {
    saveStoredDocuments(documents);
  }, [documents]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Failed to load employees from the database';
        showToast(message);
      });
  }, []);

  const getEmployee = (id: string): Employee | undefined => {
    return employees.find((e) => e.id.toLowerCase() === id.toLowerCase());
  };

  const saveEmployee = async (empData: Employee, isEdit: boolean): Promise<{ success: boolean; error?: string }> => {
    const trimmedId = empData.id.trim();
    if (!trimmedId) {
      const err = 'Employee ID is required';
      showToast(err);
      return { success: false, error: err };
    }
    if (!empData.first.trim() || !empData.last.trim()) {
      const err = 'First name and last name are required';
      showToast(err);
      return { success: false, error: err };
    }
    if (!empData.mobile.trim()) {
      const err = 'Mobile number is required';
      showToast(err);
      return { success: false, error: err };
    }
    if (!empData.officialEmail.trim()) {
      const err = 'Official email is required';
      showToast(err);
      return { success: false, error: err };
    }
    if (!empData.joining) {
      const err = 'Joining date is required';
      showToast(err);
      return { success: false, error: err };
    }

    // Check duplicate ID
    const duplicateId = employees.find(
      (e) => e.id.toLowerCase() === trimmedId.toLowerCase() && (isEdit ? e.id !== empData.id : true)
    );
    if (!isEdit && duplicateId) {
      const err = `Employee ID "${trimmedId}" is already in use`;
      showToast(err);
      return { success: false, error: err };
    }

    // Check duplicate official email
    const duplicateEmail = employees.find(
      (e) =>
        e.officialEmail.toLowerCase() === empData.officialEmail.toLowerCase() &&
        e.id !== (isEdit ? empData.id : '')
    );
    if (duplicateEmail) {
      const err = `Official email "${empData.officialEmail}" is already used by ${duplicateEmail.first} ${duplicateEmail.last} (${duplicateEmail.id})`;
      showToast(err);
      return { success: false, error: err };
    }

    const initials =
      empData.photo ||
      `${empData.first.trim()[0] || ''}${empData.last.trim()[0] || ''}`.toUpperCase();

    const normalizedEmp: Employee = {
      ...empData,
      id: trimmedId,
      photo: initials,
    };

    if (isEdit) {
      setEmployees((prev) =>
        prev.map((e) => (e.id.toLowerCase() === trimmedId.toLowerCase() ? normalizedEmp : e))
      );
      showToast('Employee updated successfully');
    } else {
      try {
        await createEmployee(normalizedEmp);
      } catch (error) {
        const err = error instanceof Error ? error.message : 'Failed to save employee to the database';
        showToast(err);
        return { success: false, error: err };
      }
      setEmployees((prev) => [normalizedEmp, ...prev]);
      showToast('New employee added successfully');
    }

    return { success: true };
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    showToast(`Employee ${id} deleted`);
  };

  const addDocument = (doc: EmployeeDocument) => {
    setDocuments((prev) => [doc, ...prev]);
    showToast(`Document "${doc.title}" added`);
  };

  return (
    <HRMSContext.Provider
      value={{
        employees,
        documents,
        masters,
        activeRoute,
        setActiveRoute,
        currentRole,
        setCurrentRole,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        saveEmployee,
        getEmployee,
        deleteEmployee,
        addDocument,
        currentEmployeeId,
        setCurrentEmployeeId,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </HRMSContext.Provider>
  );
};

export default HRMSProvider;
