import { useContext } from 'react';
import { HRMSContext } from './HRMSContext';
import type { HRMSContextType } from './HRMSContext';

export const useHRMS = (): HRMSContextType => {
  const ctx = useContext(HRMSContext);
  if (!ctx) {
    throw new Error('useHRMS must be used within an HRMSProvider');
  }
  return ctx;
};

export default useHRMS;

