import React from 'react';
import { useHRMS } from '../../context/useHRMS';

export const DashboardPage: React.FC = () => {
  const { employees, setActiveRoute } = useHRMS();
  const activeCount = employees.filter((e) => e.status === 'Active').length;

  return (
    <div className="w-full max-w-none px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1">
          Role-specific operational summary derived from employee, attendance, leave, payroll, holiday and communication data.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveRoute('employees')}
          className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500/50 cursor-pointer transition-all group"
        >
          <div className="text-xs font-bold text-slate-500">Total Employees</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 mb-1 group-hover:text-emerald-700 transition-colors">
            {activeCount}
          </div>
          <div className="text-[11px] text-slate-400">Active employee records (click to view)</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">Present Today</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 mb-1">2</div>
          <div className="text-[11px] text-slate-400">From daily attendance</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">Absent Today</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 mb-1">1</div>
          <div className="text-[11px] text-slate-400">From daily attendance</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">New Joiners</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-2 mb-1">1</div>
          <div className="text-[11px] text-slate-400">Recent additions</div>
        </div>
      </div>

      {/* Grid for Actions & Recent Records */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setActiveRoute('employees')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Manage Employees →
            </button>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Recent Employees</h3>
          <div className="space-y-2">
            {employees.slice(0, 3).map((e) => (
              <div
                key={e.id}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold grid place-items-center shrink-0">
                  {e.photo || (e.first[0] + e.last[0]).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {e.first} {e.last}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {e.department} · {e.designation}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
