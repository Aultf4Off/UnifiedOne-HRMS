import React from 'react';
import { HRMSProvider } from './context/HRMSProvider';
import { useHRMS } from './context/useHRMS';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import EmployeesPage from './Components/Employees/EmployeesPage';
import DashboardPage from './Components/Dashboard/DashboardPage';
import Toast from './Components/Common/Toast';

const AppContent: React.FC = () => {
  const { activeRoute, setActiveRoute, toastMessage } = useHRMS();

  const renderCurrentView = () => {
    switch (activeRoute) {
      case 'employees':
        return <EmployeesPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return (
          <div className="p-8 max-w-md mx-auto my-12 text-center bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4">
            <div className="text-4xl">⚙️</div>
            <h2 className="text-base font-bold text-slate-900 capitalize">{activeRoute} Module</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              This module is under development. Visit the Employee module to view and manage employee records.
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
              onClick={() => setActiveRoute('employees')}
            >
              Go to Employees
            </button>
          </div>
        );
    }
  };

  return (
  <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Layout */}
    <main className="ml-0 lg:ml-64 flex-1 min-w-0 flex flex-col min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-1 min-w-0">
        {renderCurrentView()}
      </div>

    </main>

    {/* Toast */}
    <Toast message={toastMessage} />
  </div>
  );
};

function App() {
  return (
    <HRMSProvider>
      <AppContent />
    </HRMSProvider>
  );
}

export default App;
