import React from 'react';
import { useHRMS } from '../context/useHRMS';

export const Navbar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    searchQuery,
    setSearchQuery,
    showToast,
    toggleMobileMenu,
  } = useHRMS();

  return (
    <header className="h-16 sticky top-0 z-20 bg-white/95 backdrop-blur px-4 sm:px-6 border-b border-slate-200 flex items-center justify-between gap-3 sm:gap-4">
      {/* Left side: Hamburger button (mobile only) + Search Input */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors shrink-0"
          aria-label="Toggle navigation menu"
        >
          <span className="text-lg leading-none">☰</span>
        </button>

        {/* Screen Search Input */}
        <input
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all shadow-2xs"
          type="search"
          placeholder="Search current screen..."
          aria-label="Search current screen"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Navbar Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Role Switcher */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              currentRole === 'admin'
                ? 'bg-white text-emerald-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setCurrentRole('admin')}
          >
            Admin
          </button>
          <button
            type="button"
            className={`px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              currentRole === 'employee'
                ? 'bg-white text-emerald-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => setCurrentRole('employee')}
          >
            Employee
          </button>
        </div>

        {/* Notifications Button */}
        <button
          type="button"
          className="px-2.5 sm:px-3 py-1.5 border border-slate-200 rounded-lg text-[11px] sm:text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          onClick={() => showToast('No new critical alerts')}
        >
          <span className="hidden sm:inline">Notifications</span>
          <span className="sm:hidden">🔔</span>
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold grid place-items-center">
            1
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
