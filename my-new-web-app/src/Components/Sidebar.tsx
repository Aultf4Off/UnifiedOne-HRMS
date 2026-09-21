import React from 'react';
import { useHRMS } from '../context/useHRMS';

type Item = { label: string; routeKey: string; icon: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: 'OVERVIEW',
    items: [{ label: 'Dashboard', routeKey: 'dashboard', icon: '⌂' }],
  },
  {
    title: 'PEOPLE',
    items: [{ label: 'Employees', routeKey: 'employees', icon: '⊙' }],
  },
  {
    title: 'TIME & ATTENDANCE',
    items: [
      { label: 'Attendance', routeKey: 'attendance', icon: '◷' },
      { label: 'Regularization', routeKey: 'regularization', icon: '↻' },
      { label: 'Leave Management', routeKey: 'leave', icon: '◇' },
      { label: 'Shifts & Holidays', routeKey: 'shifts', icon: '▥' },
    ],
  },
  {
    title: 'PAYROLL',
    items: [
      { label: 'Payroll', routeKey: 'payroll', icon: '₹' },
      { label: 'Salary Slips', routeKey: 'payslips', icon: '▤' },
    ],
  },
  {
    title: 'EMPLOYEE SERVICES',
    items: [{ label: 'Policies & Documents', routeKey: 'documents', icon: '▧' }],
  },
  {
    title: 'COMMUNICATION',
    items: [{ label: 'Announcements', routeKey: 'announcements', icon: '○' }],
  },
  {
    title: 'REPORTS',
    items: [{ label: 'Reports', routeKey: 'reports', icon: '●' }],
  },
  {
    title: 'ADMINISTRATION',
    items: [{ label: 'Settings', routeKey: 'settings', icon: '⚙' }],
  },
];

export const Sidebar: React.FC = () => {
  const { activeRoute, setActiveRoute, currentRole, isMobileMenuOpen, setIsMobileMenuOpen } = useHRMS();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`w-64 bg-white border-r border-slate-200 fixed inset-y-0 left-0 flex flex-col z-50 select-none transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <header className="h-16 px-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold text-sm grid place-items-center shadow-xs">
              K
            </div>
            <div className="flex flex-col">
              <strong className="text-sm font-bold text-slate-900 tracking-tight leading-tight">
                Kinship
              </strong>
              <span className="text-[11px] font-medium text-slate-500">
                {currentRole === 'admin' ? 'Admin Console' : 'Employee Self Service'}
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            type="button"
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </header>

        {/* Navigation Menu */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-4 space-y-4"
          aria-label="Main navigation"
        >
          {groups.map((group) => (
            <section key={group.title} className="space-y-1">
              <h2 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {group.title}
              </h2>
              {group.items.map((item) => {
                const isActive = activeRoute === item.routeKey;
                return (
                  <button
                    type="button"
                    key={item.label}
                    onClick={() => {
                      setActiveRoute(item.routeKey);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <i
                      aria-hidden="true"
                      className={`not-italic w-4 text-center text-sm ${
                        isActive ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </i>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </section>
          ))}
        </nav>

        {/* Account Info Footer */}
        <footer className="p-3 m-3 bg-slate-50 border border-slate-200 rounded-xl shrink-0">
          <div className="text-xs font-bold text-slate-900">
            {currentRole === 'admin' ? 'Jane Doe' : 'Robert Fox'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {currentRole === 'admin' ? 'HR Administrator' : 'Sr. Product Manager'}
          </div>
          <button
            type="button"
            className="mt-2.5 w-full py-1 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 cursor-pointer shadow-xs transition-colors"
          >
            Sign Out
          </button>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
